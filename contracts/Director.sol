pragma solidity ^0.4.23;

import "./VotingStatistic.sol";
import "./User.sol";
import "./Question.sol";

contract Director is User {

    VotingStatistic statistic; 
    Question[] questions; 
    Answer[] answers;
    Proposal[] proposals;

    bool isDirector;
    address chairperson;
    mapping (address => User) users;

    constructor(string[] proposalNames) public {
        chairperson = msg.sender;
        users[chairperson].weight = 1;
    }

    function createAnswer(address userAddress, string content, uint questionId) public {

    }

    function createProposal(string content, string[] options) internal {

    }

    function createMeeting(string meetingDate, uint startTime, uint endTime, string meetingName, string meetingDescription) public returns (uint meetingId) {
        
    }

    function finishMeeting(uint meetingId) public {

    }

    function announceMeeting(string recordDate, string meetingPlace) public {

    }

    function createVotingStatistics() public {

    }
}