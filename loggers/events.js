'use strict';

module.exports = (challengeContractInstance) => {
  return {
    CreateChallenge: (cb) => {
      let watcher = challengeContractInstance.CreateChallenge((error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Event successfully created');
        }
        if (typeof cb === 'function') {
          cb(error, result);
        }
        watcher.stopWatching();
      });
    }
  };
};