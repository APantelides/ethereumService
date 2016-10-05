'use strict';

const fs = require('fs');
const solc = require('solc');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, '/../contracts/challenge.sol'), 'utf8');
const output = solc.compile(data, 1); // 1 activates the optimiser
let contract, bytecode;
for (const contractName in output.contracts) {
  contract = JSON.parse(output.contracts[contractName].interface);
  bytecode = output.contracts[contractName].bytecode;
}

module.exports = {
  contractObj: contract,
  bytecode: bytecode,
};