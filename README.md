# node-steemit-randowhale-bot



## 설치

```
$git clone https://github.com/jongeunpark/node-steemit-randowhale-bot.git
```

```
$cd node-steemit-randowhale-bot/
```

```
$ npm install
```
## 설정
```
configs/user.json 에서 본인 계정명과 비밀번호를 입력하세요.
{
	"name": "USER_NAME",
	"password": "USER_PASSWORD"
}

configs/config.json 에서 가격, 최소 보팅파워, 최대 보팅파워를 입력하세요.
각 변수들의 의미는 다음과 같습니다.
-monitoringPeriod: 트렌젝션 조회의 주기(단위: 초)
-minVotingPower: 최소 보팅파워(단위: %)
-maxVotingPower: 최대 보팅파워(단위: %)
-price: 보팅 금액(현재 2.000, 1.000 과 같이 소수점 3자리까지 직접 입력해야 합니다.)
lastVotingTimestamp: 시작 타임스템프, 봇이 동작하면서 가장 최근에 보팅한 시간이 기록됩니다. 초기 값은 -1 또는 현재 시간으로 설정하는 것이 좋습니다.
예를들어 50~100% 보팅파워로 보팅을 하길 원하시면 minVotingPower: 50, maxVotingPower: 100으로 설정하세요.
{
    "monitoringPeriod": 5,
    "minVotingPower": 0.5,
    "maxVotingPower": 2.5,
    "price": "2.000 SBD",
    "lastVotingTimestamp": 1498886877000
}

```
## 시작
설정이 완료되면, 아래의 명령어로 시작할 수 있습니다. 
```
$ node randowhale-bot.js
```

## License
MIT