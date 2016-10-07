const contractFuncs = require('../contracts/contractFuncs.js');
const web3Connection = require('../web3.js');
// const loggers = require ('../loggers/events.js');
const Promise = require('bluebird');

const web3 = web3Connection.web3;

const outcomeChallengeAction = {
  challengeOutcome: (req, res) => {
    const winnerIds = [1];
    const fromAddress = req.body.fromAddress;
    const contractAddress = req.body.contractAddress;
    const challengeContractInstance = web3.eth.contract(contractFuncs.contractObj).at(contractAddress);

    const ethParams = {
      from: fromAddress
    };

    challengeContractInstance.challengeOutcome(winnerIds, ethParams, (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log('funds successfully distributed');
        res.status(200).send('funds successfully distributed');
      }
    });
  }
};

module.exports = outcomeChallengeAction;