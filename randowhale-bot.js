/**
 * https://steemit.com/@jongeun
 */

var fs = require('fs');
var steem = require('steem');
var log4js = require('log4js');
var logger = log4js.getLogger('RANDOWHALE-BOT');
logger.setLevel('DEBUG');

var SECOND = 1000;
var CONFIG_FILEPATH = "./configs/config.json";

var config = require(CONFIG_FILEPATH);

config.lastVotingTimestamp = Date.parse(new Date());
var user = require('./configs/user.json');
var wif = initUser();


setInterval(function() {
	config = require(CONFIG_FILEPATH);
	
	startBot();
}, config.monitoringPeriod * SECOND);



function startBot(){
	
	steem.api.getAccountHistory(user.name, 99999999, 20, function(err, getAccountHistoryResult) {
		if(!err && getAccountHistoryResult){
			for(var i=0; i<getAccountHistoryResult.length; i++){
				availableTransaction = getAvailableTransaction(getAccountHistoryResult[i]);
				if(availableTransaction){
					logger.info('보팅 후보: '+availableTransaction.memo);
//					config.lastVotingTimestamp = availableTransaction.postCreatedAt;
//					var str = JSON.stringify(config, null, 4);
//					
//					fs.writeFile(CONFIG_FILEPATH, str, "utf8", function (err) {
//						
//						
//			        });
//					vote(availableTransaction);
				}
			}
		}
	});
}

function vote(postInfo){
	var max = config.maxVotingPower * 100;
	var min = config.minVotingPower * 100;
	votingPower = Math.floor(Math.random()*(max-min+1)) +min;

	
	postInfo.votingPower = votingPower;
	logger.info('보팅 파워: '+(votingPower/100));
	
	steem.broadcast.vote(wif, user.name, postInfo.author, postInfo.permlink, votingPower, function(err, voteResult) {
		if(!err && voteResult){

			logger.info('보팅 성공: '+postInfo.memo);
			createComment(postInfo);
		}else{
			logger.info('보팅 실패: '+err);
		}
	});
}

function initUser(){
	return steem.auth.toWif(user.name, user.password, 'posting');
}
function createComment(postInfo){
	
	var commentPermlink = steem.formatter.commentPermlink(postInfo.author, postInfo.permlink);
	postInfo.votingPower /= 100;
	body = 'This post received a '+postInfo.votingPower+'% upvote from @'+user.name+' thanks to @'+postInfo.to+'! For more information, [click here]('+config.introductionLink+')!';
	console.log(body);
	steem.broadcast.comment(wif,  postInfo.author, postInfo.permlink, user.name, commentPermlink, "", body, "", function(err, result) {
		if(!err && result){
			logger.info('리플 작성 성공: '+body);
		}else{
			logger.info('리플 작성 실패: '+err);
		}
	});
	
}

function getAvailableTransaction(transaction){
	var data = JSON.stringify(transaction);
	var start = data.indexOf(',');
	if(start < 0){
		return null;
	}
	var end = data.lastIndexOf(']');
	if(end < 0 || end < start){
		return null;
	}
	
	data = data.substring(start+1, end);
	data = JSON.parse(data);
	var postCreatedAt = Date.parse(data.timestamp);
	if(data.trx_id == "0000000000000000000000000000000000000000"){
		return null;
	}
	
	data = JSON.stringify(data);
	start = data.indexOf("\"op\":[\"transfer\",");
	
	if(start < 0){
		return null;
	}
	end = data.lastIndexOf(']');
	if(end < 0 || end < start){
		return null;
	}
	data = data.substring(start+"\"op\":[\"transfer\",".length, end);
	console.log(data);
	data = JSON.parse(data);
	
	if(data.amount != config.price){
		return null;
	}
	
	
	if (config.lastVotingTimestamp >= postCreatedAt){
		return null
	}
	var memo = data.memo;
	var startMemo =memo.indexOf('@');
	if(!memo || memo.length < 0 || startMemo < 0 ){
		return null;
	}
	var endMemo = memo.lastIndexOf('/');
	if(endMemo < 0){
		return null;
	}
	var permlink = memo.substring(endMemo+1);
	var author = memo.substring(startMemo+1, endMemo);
	var to = data.from;
	var result = {
		author : author,
		permlink:permlink,
		memo: memo,
		postCreatedAt:postCreatedAt,
		to: to
	}
	
	return result;

}

