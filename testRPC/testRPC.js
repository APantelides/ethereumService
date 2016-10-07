const TestRPC = require('ethereumjs-testrpc');

const server = TestRPC.server();
server.listen(8545, (err, blockchain) => {
  console.log('TEST RPC server running on http://localhost:8545');
  console.log('Account Addresses:');
  console.log(Object.keys(blockchain.accounts));
});

module.exports = server;