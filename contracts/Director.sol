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
    uint propId = 0;

    constructor(string[] proposalNames) public {
        chairperson = msg.sender;
        users[chairperson].weight = 1;
    }

    function createAnswer(address userAddress, string content, uint questionId) public {

    }

    function createProposal(string name, string description, byte[] options) internal {
        Proposal storage proposal = new Proposal();
        proposal.proposalId = ++propId;
        proposal.name = name;
        proposal.description = description;
        proposal.options = options;
        proposal.finished = false;
        proposal.proposalPassed = false;
        proposal.passedPercent = 0;
        proposal.voteCount = 0;

        proposals.push(proposal);

    }

    function giveVotingRight(address voter) public {
        require(msg.sender == chairperson, "Only chairperson can determine eligablitiy of voting");
        require(!users[msg.sender].hasVoted, "The user has already voted");
        require(users[msg.sender].weight == 0);

        users[msg.sender].weight = 1;

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