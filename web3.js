const Web3 = require('web3');

const url = 'http://localhost:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(url));

module.exports = { web3 };