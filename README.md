# node-steemit-randowhale-bot
When you receive a Steam Dollar, it will automatically bot you into the desired post.

### 1. install
```sh
$ git clone https://github.com/jongeunpark/node-steemit-randowhale-bot.git
$ cd node-steemit-randowhale-bot/
$ npm install
```

### 2. Edit Settings File
When the installation is complete, you need to modify the two configuration files.
The configuration file node-steemit-randowhale-bot/config Below are the 2 files.
- user.json: User information to create botting and ripple
- config.json: Voting power, polling cycle,

Each file attribute value
** user.json **
```
$ vi configs/user.json
{
	"name": "YOUR_NAME",
	"password": "YOUR_PASSWORD"
}
```
- name: By user account jongeun Enter a value such as.
- password: Password used to login with user password.
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
- monitoringPeriod: YOUR_NAME Is the period in which to look up the transaction list in seconds.
- minVotingPower: The minimum boarding power value is in %. 
- maxVotingPower: The maximum boarding power value is in %. 
- price: 1 This is the amount required per boarding. "2.000 SBC", "1.000 SBD" Etc. (to be fixed later)
- introductionLink: Link to ripple
- lastVotingTimestamp: Last bot time. Determines whether or not to watch based on the last botting time. Initially set to -1 or enter the current time. This value changes when the program is running and the voting is completed.

### 3. Execution
```sh
$ node randowhale-bot.js
```
If you run it in background, type the following 
```sh
$ nohup node randowhale-bot.js %
```

### 4. Limitations and future plans.

- It is not efficient to look up the transaction list by polling from time to time. When a transaction occurs in a particular account, it is a way to determine if there is a listener to dispatch the event and implement a lister.
- You are checking whether you are voting with only the lastVotingTimestamp in the config file. There is a low probability but a missing transaction is expected to exist. It is necessary to check the transaction history and my voting history in several hours to see if there are any missing transactions. This part will also be improved.
- It is difficult to predict what error is due to insufficient testing. For example, there may be a network problem, a styminess problem, etc. You need to look at how it works.

### License
MIT
