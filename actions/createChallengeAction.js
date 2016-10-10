const contractFuncs = require('../contracts/contractFuncs.js');
const web3Connection = require('../web3.js');
// const loggers = require ('../loggers/events.js');
const Promise = require('bluebird');

const web3 = web3Connection.web3;

const createChallengeAction = {
  createContract: req => new Promise((resolve, reject) => {
    const senderAddress = req.body.senderAddress || web3.eth.accounts[0];
    const challengeId = req.body.challengeId || 99;
    const buyInAmount = web3.toWei(req.body.buyInAmount || 1337, 'ether');
    const challengeCreateDateTime = req.body.challengeCreateDateTime || 700007;
    const challengeStartDateTime = req.body.challengeStartDateTime || 700008;
    const challengeEndDateTime = req.body.challengeEndDateTime || 700009; 

    const challengeContractInstance = web3.eth.contract(contractFuncs.contractObj).new(challengeId, buyInAmount, challengeCreateDateTime, challengeStartDateTime, challengeEndDateTime, {
      data: contractFuncs.bytecode,
      gas: 2000000,
      from: senderAddress
    }, (err, contract) => {
      if (!err) {
        if (!contract.address) {
          console.log(contract.transactionHash, 'contract transaction hash!');
        } else {
          console.log(contract.address, 'contract address!');
          resolve(contract.address);
        }
      } else {
        console.log(err);
        reject(err);
      }
    });
  })
};

module.exports = createChallengeAction;