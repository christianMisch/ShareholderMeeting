pragma solidity ^0.4.23;

import "./VotingStatistic.sol";
import "./User.sol";

contract Director is User {

    // storing the answers of directors
    Answer[] public answers;

    // answer object used by the director
    struct Answer {
        uint answerId;
        uint questionId;
        address answerCreator;
        string content;
        uint timestamp; 
    }

    event ProposalCreated(uint propId, address creator);
    event AnswerCreated(uint ansId, address creator);
 
    constructor(address userAddress) 
        User(userAddress, true, true) public {
        weight = 0;
    }

    // only director is allowed to create an answer
    function createAnswer(uint _questionId, address _answerCreator, string _content) 
        onlyDirector public returns (uint answerId)  {

        answerId = answers.length++;
        Answer storage answer = answers[answerId];
        answer.questionId = _questionId;
        answer.answerCreator = _answerCreator;
        answer.content = _content;
        answer.timestamp = now;

        emit AnswerCreated(answerId, msg.sender);
    }

    // only director is allowed to create a proposal
    function createProposal(string _name, string _description, byte[] _options, uint _proposalDeadline) 
        onlyDirector internal returns (uint proposalId) {

        proposalId = proposals.length++;
        Proposal storage proposal = proposals[proposalId];
        proposal.name = _name;
        proposal.description = _description;
        proposal.options = _options;
        proposal.proposalDeadline = _proposalDeadline;
        proposal.finished = false;
        proposal.proposalPassed = false;
        proposal.passedPercent = 0;
        
        emit ProposalCreated(proposalId, msg.sender);

    }

    // executes the pending proposal
    function executeProposal(uint proposalId, string voterDecision) public returns(bool isExecuted) {
        Proposal storage prop = proposals[proposalId];

        require(!prop.finished && now > prop.proposalDeadline);
        prop.finished = true;

        uint approve;
        uint disapprove;
        for (uint i = 0; i < prop.votes.length; i++) {
            Vote storage v = prop.votes[i];
            if (keccak256(v.voterDecision) == keccak256(voterDecision)) {
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

    /*function uploadAuthorizedShareholderList(Shareholder[] _shareholders) onlyDirector public {
        shareholders = _shareholders;
    }

    function finishMeeting(Meeting m) meetingPending(meeting) public {
        require(!m.isMeetingFinished());
        m.isMeetingFinished = true;
    }

    function announceMeeting(Meeting m) meetingPending(meeting) public returns(string recordDate, string recordPlace) {
        return (m.meetingDate(), m.meetingPlace());
    }
 
    function createVotingStatistics() meetingFinished(meeting) onlyDirector public {
        statistic = new VotingStatistic();
        
        for (uint i = 0; i < proposals.length; i++) {
            statistic.proposalPassedMap[proposals[i].proposalId] = proposals[i].proposalPassed;
            statistic.percMap[proposals[i].proposalId] = proposals[i].passedPercent;
        }

        for (uint j = 0; j < shareholders.length; j++) {
            statistic.votingPowerMap[shareholders[j].userId] = shareholders[j].weight;
            statistic.totalVotingPower += shareholders[j].weight;
        }
    }*/
}