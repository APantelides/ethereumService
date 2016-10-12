const web3Connection = require('../web3.js');
// const loggers = require ('../loggers/events.js');
const Promise = require('bluebird');

const web3 = web3Connection.web3;

const testAddressAction = {
  testAddress: (req, res) => {
    var accounts = web3.eth.accounts;
    var accWBal = accounts.map((account) => {
      return {account: account, balance: web3.eth.getBalance(account)};
    });
    res.status(200).send(accWBal);
    
  }
};

module.exports = testAddressAction;