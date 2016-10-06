const contractFuncs = require('../contracts/contractFuncs.js');
const web3Connection = require('../web3.js');
// const loggers = require ('../loggers/events.js');
const Promise = require('bluebird');

const web3 = web3Connection.web3;

const addUserAction = {
  addUser: (req, res) => {
    const contractAddress = req.body.contractAddress;
    const fromAddress = req.body.fromAddress;
    const userName = req.body.userName;
    const userId = req.body.userId;
    const challengeContractInstance = web3.eth.contract(contractFuncs.contractObj).at(contractAddress);

    const ethParams = {
      from: fromAddress,
      value: req.body.buyInAmount
    };

    if (req.body.gas) {
      ethParams.gas = req.body.gas;
    }

    challengeContractInstance.addUser(userId, userName, ethParams, (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log('user added successfully!');
        res.status(200).send('user added successfully!');
      }
    });
  }
};

module.exports = addUserAction;