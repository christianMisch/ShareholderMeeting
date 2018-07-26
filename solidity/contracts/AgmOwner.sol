pragma solidity ^0.4.23;

import "./User.sol";

contract AgmOwner {

    // owner of the contract initializes the AGM
    address public owner;
    // store options to every proposal
    VotingOption[] public votingOptions;
    // total number of users
    uint public numberOfUsers;

    bool public isFinished = false;
    uint public minimumVotingQuorum;
    uint public marginOfVotesForMajority;
    string public meetingName;
    string public meetingDescription;
    string public meetingDate;
    string public meetingPlace;
    uint public meetingStartTime;
    uint public meetingEndTime;

    struct VotingOption {
        string optionName;
        uint optionCount;
    }

    modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }

    event UserCreated(uint userId, address userAddress, bool isDirector);
    event UserRemoved(uint userId, address userAddress, bool isDirector);
    event ProposalCreated(uint propId, address creator);
    event Voted(address userAddress, uint proposalId, string votingOption);
    event AgmFinished(bool isFinished);
    event ProposalExecuted(uint proposalId, bool proposalPassed, uint passedPercentage, VotingOption[] options);
    event OwnershipTransferedTo(address newOwner);

    constructor(
        uint _minimumVotingQuorum,
        uint _marginOfVotesForMajority,
        string _meetingName,
        string _meetingDescription,
        string _meetingDate,
        string _meetingPlace,
        uint _meetingStartTime,
        uint _meetingEndTime) public {
        
        owner = msg.sender;
        minimumVotingQuorum = _minimumVotingQuorum;
        marginOfVotesForMajority = _marginOfVotesForMajority;
        meetingName = _meetingName;
        meetingDescription = _meetingDescription;
        meetingDate = _meetingDate;
        meetingPlace = _meetingPlace;
        meetingStartTime = _meetingStartTime;
        meetingEndTime = _meetingEndTime;
    }

    // transfer contract ownership to another director
    function transferOwnership(address _owner) onlyOwner public {
        owner = _owner;

        emit OwnershipTransferedTo(_owner);
    }

    /*function addUser(address _userAddress, bool isDirector, uint votingTok) public {
        uint id = userId[_userAddress];
        if (id == 0) {
            userId[_userAddress] = users.length++;
            id = users.length++;
        }

        if (isDirector) {
            users[id] = new Director({userAddress: _userAddress});
            emit UserCreated(id, _userAddress, true);
        } else {
            users[id] = new Shareholder({userAddress: _userAddress, _votingTokens: votingTok});
            emit UserCreated(id, _userAddress, false);
        }
    }*/

    /*function removeUser(address _userAddress) public {
        require(userId[_userAddress] != 0, "User does not exist");

        uint i = userId[_userAddress];
        User remUser = users[i];

        for (; i < users.length; i++) {
            users[i] = users[i+1];
        }
        delete users[users.length - 1];
        users.length--;

        emit UserRemoved(i, _userAddress, remUser.isDirector());
    }*/
}