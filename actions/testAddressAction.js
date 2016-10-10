const web3Connection = require('../web3.js');
// const loggers = require ('../loggers/events.js');
const Promise = require('bluebird');

const web3 = web3Connection.web3;

const testAddressAction = {
  testAddress: (req, res) => {
    web3.eth.getAccounts((err, result) => {
      if ( err === null ) {
        const accounts = result;
        const accountsWBal = [];
        accounts.forEach((account) => {
          accountsWBal.push({
            accountAddr: account,
            balance: web3.fromWei(web3.eth.getBalance(account), 'ether')
          });
        });
        res.send(accountsWBal);
      } else {
        res.send(err);
      }
    });
    
  }
};

module.exports = testAddressAction;