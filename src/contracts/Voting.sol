// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 < 0.9.0;

contract Ballot {
  // Variables
  struct vote {
    address voterAddress;
    bool choice;
  }

  struct voter {
    string voterName;
    bool voted;
  }

  uint private countResult = 0;
  uint public finalResult = 0;
  uint public totalVoter = 0;
  uint public totalVote = 0;

  address public ballotOfficialAddress;
  string public ballotOfficialName;
  string public proposal;

  mapping(uint => vote) private votes;
  mapping(address => voter) public voterRegister;

  enum State {
    Created,
    Voting,
    Ended
  }
  State public state;

  // Modifiers
  modifier condition(bool _condition) {
    require(_condition == true);
    _;
  }

  modifier onlyOfficial() {
    require(msg.sender == ballotOfficialAddress);
    _;
  }

  modifier inState(State _state) {
    require(state == _state);
    _;
  }

  // Events

  // Functions
  constructor(string memory _ballotOfficialName, string memory _proposal) {
    ballotOfficialAddress = msg.sender;
    ballotOfficialName = _ballotOfficialName;
    proposal = _proposal;

    state = State.Created;
  }

  // inState(State.Created) means can only be called while State.Created
  function addVoter(address _voterAddress, string memory _voterName) public inState(State.Created) onlyOfficial {
    // create a new voter
    voter memory v;
    v.voterName = _voterName;
    v.voted = false;
    voterRegister[_voterAddress] = v; // add _voterAddress to the voterRegister map
    totalVoter++;
  }

  function startVote() public inState(State.Created) onlyOfficial {
    state = State.Voting;
  }

  function doVote(bool _choice) public inState(State.Voting) returns (bool voted) { // allows users to vote
    bool found = false;
    // check if msg.sender can vote or not
    if (bytes(voterRegister[msg.sender].voterName).length != 0 && voterRegister[msg.sender].voted == false) {
      voterRegister[msg.sender].voted = true;
      vote memory v;
      v.voterAddress = msg.sender;
      v.choice = _choice;
      if (_choice == true) {
        countResult++;
      }
      votes[totalVote] = v;
      totalVote++;
      found = true;
    }
    return found;
  }

  function endVote() public inState(State.Voting) onlyOfficial { // sets State to Ended
    state = State.Ended;
    finalResult = countResult; // recall that countResult is private and finalResult is public
  }
}
