pragma solidity ^0.4.2;

contract Challenge {

    address public creator;
    uint public challengeId;
    uint public numOfParticipants;
    mapping (uint => address) public participants;
    mapping (address => string) public participantNames;
    uint public pot;
    uint public buyInAmount;
    uint public challengeCreateDateTime;
    uint public challengeStartDateTime;
    uint public challengeEndDateTime;

    event ChallengeCreated(address _organizer, uint _numOfParticipants, uint _buyInAmount, uint _challengeId, uint _challengeCreateDateTime, uint _challengeStartDateTime, uint _challengeEndDateTime);
    event ChallengeCancelled(uint _pot, uint _split, uint[] _winnerIds);
    event ChallengeEnded(uint _pot, uint _split, uint[] _userIds);
    event UserAdded(address _user,uint _amount, uint _numOfParticipants);
    event InsufficientEther(uint _amountSent, uint _buyInAmount);

    function Challenge(uint _challengeId, uint _buyInAmount, uint _challengeCreateDateTime, uint _challengeStartDateTime, uint _challengeEndDateTime) {
      creator = msg.sender;
      challengeId = _challengeId;
      numOfParticipants = 0;
      buyInAmount = _buyInAmount;
      challengeCreateDateTime = _challengeCreateDateTime;
      challengeStartDateTime = _challengeStartDateTime;
      challengeEndDateTime = _challengeEndDateTime;
      ChallengeCreated(creator, numOfParticipants, buyInAmount, challengeId, challengeCreateDateTime, challengeStartDateTime, challengeEndDateTime);
    }

    function addUser (uint _userId, string _userName) payable {
      if (msg.value < buyInAmount) {
        InsufficientEther(msg.value, buyInAmount);
        throw;
      }
      participants[_userId] = msg.sender;
      participantNames[msg.sender] = _userName;
      pot = pot + msg.value;
      numOfParticipants++;
      UserAdded(msg.sender, msg.value, numOfParticipants);
    }

    function challengeOutcome (uint[] _winnerIds) payable {
      uint split = pot / _winnerIds.length;
      for (uint i = 0; i < _winnerIds.length; i++) {
        if(!participants[_winnerIds[i]].send(split)) throw;
      }
      ChallengeEnded(pot, split, _winnerIds);
    }

    function verifyUser (uint _userId) constant returns (string) {
      if(bytes(participantNames[participants[_userId]]).length > 0) {
        return "t";
      } else {
        return "f";
      }
    }

    function cancelChallenge(uint[] _userIds) payable {
      if (msg.sender == creator) {
        if(_userIds.length > 0) {
            uint split = pot / _userIds.length;
            for (uint i = 0; i < _userIds.length; i++) {
             if(!participants[_userIds[i]].send(split)) throw;
            }
        }
        suicide(creator);
        ChallengeCancelled(pot, split, _userIds);
      }
    }
}