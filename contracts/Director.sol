pragma solidity ^0.4.23;

import "./VotingStatistic.sol";
import "./User.sol";

contract Director is User {

    Meeting public meeting;
    VotingStatistic statistic;
    uint minimumQuorum;

    Question[] questions; 
    Answer[] answers;
    Proposal[] proposals;
    Shareholder[] shareholders;

    bool isDirector;
    address director;
    uint propId = 0;
    uint answerId = 0;
    uint meetingId = 0;

    modifier onlyDirector {
        require(director == msg.sender);
        _;
    }

    struct Answer {
        uint answerId;
        string content;
        uint timestamp; 
    }
        
    constructor(string[] proposalNames) public {
        director = msg.sender;
        users[director].weight = 1;
    }

    function transferOwnership(address newDirector) public {
        director = newDirector;
    }

    function uploadAuthorizedShareholderList(Shareholder[] _shareholders) public {
        shareholders = _shareholders;
    }
    
    function createAnswer(address userAddress, string newContent, uint questionId) meetingPending(meeting) public {
        Answer storage answer = new Answer({answerId: ++answerId, content: newContent, timestamp: now});
        answers.push(answer);
    }

    function createProposal(string name, string description, byte[] options) meetingPending(meeting) internal {
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

    function giveVotingRight(address voter) meetingPending(meeting) public {
        require(msg.sender == director, "Only director can determine eligablitiy of voting");
        require(!users[msg.sender].hasVoted, "The user has already voted");
        require(users[msg.sender].weight == 0);

        users[msg.sender].weight = 1;

    }

    function createMeeting(string newMeetingDate, string newMeetingPlace, uint newStartTime, uint newEndTime, string newMeetingName, string newMeetingDescription) onlyDirector public returns (uint meetingId) {
        Meeting storage newMeeting = new Meeting({meetingId: ++meetingId, meetingName: newMeetingName, 
            meetingDescription: newMeetingDescription, meetingDate: newMeetingDate, meetingPlace: newMeetingPlace, startTime: newStartTime, endTime: newEndTime});
        meeting = newMeeting;
    }

    function finishMeeting(uint meetingId) meetingPending(meeting) public {
        require(!meeting.isMeetingFinished);
        meeting.isMeetingFinished = true;
    }

    function announceMeeting(Meeting m) meetingPending(meeting) public returns(string recordDate, string recordPlace) {
        return (m.meetingDate, m.meetingPlace);
    }

    function executeProposal(uint proposalId, string voterDecision) meetingPending(meeting) public returns(bool isExecuted) {
        Proposal storage prop = proposals[proposalId];

        require(!prop.finished && prop.numberOfVotes > minimumQuorum);
        p.finished = true;

        uint approve;
        uint disapprove;
        for (uint i = 0; i < proposals.votes.length; i++) {
            if (prop.votes[i].voterDecision == voterDecision) {
                ++approve;
            } else {
                ++disapprove;
            }
        }
        if (approve > disapprove) {
            prop.proposalPassed = true;
        } else {
            prop.proposalPassed = false;
        }

        prop.passedPercent = approve / (approve + disapprove);

        isExecuted = true;
    }
 
    function createVotingStatistics() meetingFinished(meeting) public {
        VotingStatistic statistic = new VotingStatistic();
        
        for (uint i = 0; i < proposals.length; i++) {
            statistic.proposalPassedMap[proposals[i].proposalId] = proposals[i].proposalPassed;
            statistic.percMap[proposals[i].proposalId] = proposals[i].passedPercent;
        }

        for (uint j = 0; j < shareholders.length; j++) {
            statistic.votingPowerMap[shareholders[j].userId] = shareholders[j].weight;
            statistic.totalVotingPower += shareholders[j].weight;
        }
    }
}