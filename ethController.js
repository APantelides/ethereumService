// const addUserAction = require('./actions/addUserAction.js');
// const verifyUserAction = require('./actions/verifyUserAction');
const createChallengeAction = require('./actions/createChallengeAction.js');
// const outcomeChallengeAction = require('./actions/outcomeChallengeAction.js');
// const cancelChallengeAction = require('./actions/cancelChallengeAction.js');
const rp = require('request-promise');

const controller = {
  addUser: (req, res) => {

  },
  verifyUser: (req, res) => {

  },
  createChallenge: (req, res) => {
    return new Promise((resolve, reject) => {
      createChallengeAction.createContract(req).then((returnObj) => {
        resolve(returnObj);
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  outcomeChallenge: (req, res) => {

  },
  cancelChallenge: (req, res) => {

  },
  getAllChallenges: (req, res) => {

  }
};
module.exports = controller;