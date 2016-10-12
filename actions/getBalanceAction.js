const web3Connection = require('../web3.js');
// const loggers = require ('../loggers/events.js');
const Promise = require('bluebird');

const web3 = web3Connection.web3;

const testAddressAction = {
  getBalance: (req, res) => {
    var balance = web3.eth.getBalance(req.params.addr);
    res.send(balance);
  }
};

module.exports = testAddressAction;