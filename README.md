# node-steemit-randowhale-bot

### 1. 설치
```sh
$ git clone https://github.com/jongeunpark/node-steemit-randowhale-bot.git
$ cd node-steemit-randowhale-bot/
$ npm install
```
명령어가 정상적으로 기입이 완료되면, 아래 스크린샷과 같이 npm가 필요한 모듈을 내려받습니다. 
http://i.imgsafe.org/8bde0df6a0.png

### 2. 설정 파일 수정
설치가 완료되면, 2가지 설정 파일을 수정해야 합니다. 
설정 파일은 node-steemit-randowhale-bot/config 아래에 있는 2파일 입니다.
- user.json: 보팅 및 리플을 작성할 사용자 정보
- config.json: 보팅 파워, 폴링 주기, 보팅 가격
http://i.imgsafe.org/8bebca9eba.png

각 파일 속성 값
** user.json **
```
$ vi configs/user.json
{
	"name": "YOUR_NAME",
	"password": "YOUR_PASSWORD"
}
```
- name: 사용자 계정으로 jongeun 과 같은 값을 입력합니다. 
- password: 사용자 비밀번호로 로그인 시 사용되는 비밀번호 입니다.
** config.json **
```
{
    "monitoringPeriod": 5,
    "minVotingPower": 50,
    "maxVotingPower": 100,
    "price": "2.000 SBD",
    "introductionLink: "",
    "lastVotingTimestamp": 1498888335000
}
```
- monitoringPeriod: YOUR_NAME의 트렌젝션 목록을 조회하는 주기로 단위는 초입니다. 
- minVotingPower: 최소 보팅 파워값으로 단위는 % 입니다. 
- maxVotingPower: 최대 보팅 파워값으로 단위는 % 입니다. 
- price: 1 건의 보팅 당 필요한 금액입니다. "2.000 SBC", "1.000 SBD" 등으로 입력해야 합니다.(추후 수정 예정)
- introductionLink: 리플에 기입되는 링크
- lastVotingTimestamp: 마지막 보팅 시간입니다. 마지막 보팅 시간을 기준으로 보팅 여부를 판단합니다. 초기에는 -1로 설정하거나 현재 시간으로 입력하세요. 프로그램이 동작하면서 보팅이 완료되면 변경되는 값입니다.

### 3. 실행
```sh
$ node randowhale-bot.js
```
백그라운로 동작시키리면 아래 명령어를 입력하세요.
```sh
$ nohup node randowhale-bot.js %
```

### 4. 실행 결과
원활한 동작 확인을 위하여 코드를 조금 수정하고 아래와 같은 조건을 후 실행을 해보았습니다. 
- 조건 1: randowhale 트렌젝션 목록을 조회하여 2.000 SDB가 입금되면, 메모에 적힌 포스트에 보팅한다. (제 계정으론 돈이 없어서 테스트를 못했습니다. ㅠㅠ)
- 조건 2: 50~100% 보팅 파워로 보팅하고, 리플을 작성한다. 
실행 결과는 아래 스크린샷처럼 randowhale처럼 보팅하고, 리플도 작성합니다.
http://i.imgsafe.org/8c409dfc6a.png

### 5. 한계 및 추후 계획
- 수시로 트렌젝션 목록을 폴링으로 조회하는 것은 효율적이지 못합니다. 특정 계정에 트렌젝션이 발생하면, 이벤트를 전달하는 리스너가 있는지 파악하고 리스터를 구현할 계힉입니다.  
- 보팅 여부를 config 파일의 lastVotingTimestamp만으로 확인하고 있습니다. 낮은 확률이지만 누락되는 거래가 존재할 것으로 예상됩니다. 몇 시간 단위로 거래내역 및, 나의 보팅 내역 등을 확인하여 누락된 거래가 있는지 확인이 필요합니다. 이 부분도 개선할 예정입니다. 
- 테스트가 부족하여 어떤 에러가 발생하는지 예측하기 어렵습니다. 예를 들어 네트워크 문제, 스티밋 문제 등이 있을 것 같은데, 이 때 어떻게 동작하는지 살펴볼 필요가 있습니다. 
```

### License
MIT