pragma solidity ^0.4.23;

import "./VotingStatistic.sol";
import "./User.sol";

contract Director is User {

    // minimum quorum for voting
    uint public minimumQuorum;
    // activate and deactivate the contract
    bool private isActive = false;
    // owner of the contract initializes the AGM
    address public owner;
    // storing the answers of directors
    Answer[] public answers;
    // reference to the meeting object
    Meeting private meeting;

    // answer object used by the director
    struct Answer {
        uint answerId;
        uint questionId;
        address answerCreator;
        string content;
        uint timestamp; 
    }

    struct Meeting {
        uint meetingId;
        string meetingName;
        string meetingDescription;
        string meetingDate;
        string meetingPlace;
        uint meetingStartTime;
        uint meetingEndTime;
        bool isMeetingFinished; 
    }

    event ProposalCreated(uint propId, address creator);
    event AnswerCreated(uint ansId, address creator);

    modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }
 
    constructor(address userAddress, bool isAuthorized) 
        User(userAddress, true, isAuthorized) public {
        owner = msg.sender;
        isActive = true;
        weight = 0;
    }

    // transfer contract ownership to another director
    function transferOwnership(address _owner) public {
        owner = _owner;
    }

    /*function initializeUserAccess(User[] users) internal {
        for (uint i = 0; i < users.length; i++) {
            addUser(users[i].userAddress, users[i].isDirector);

            //authenticatedUsers[users[i].userAddress] = true;
        }
    }*/

    // add a user to the list of users
    function addUser(address _userAddress, bool isDirector) public {
        if (isDirector) {
            numberOfUsers++;

            if (userId[msg.sender] == 0) {
                
                uint id = users.length++;
                userId[msg.sender] = id;
                /*users[id] = Director({
                    userAddress: _userAddress, 
                    isAuthorized: true
                });*/

                /*userMap[msg.sender] = d;
                emit UserCreated(d.userId, d.userAddress, d.userRole);*/
            }
        }
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

    // only owner is allowed to create a meeting
    function createMeeting(
        string _meetingDate, 
        string _meetingPlace, 
        uint _meetingStartTime, 
        uint _meetingEndTime, 
        string _meetingName, 
        string _meetingDescription) 
        onlyOwner internal returns (uint meetingId) {
        
        meeting = Meeting({
            meetingId: 1, 
            meetingName: _meetingName, 
            meetingDescription: _meetingDescription, 
            meetingDate: _meetingDate, 
            meetingPlace: _meetingPlace, 
            meetingStartTime: _meetingStartTime, 
            meetingEndTime: _meetingEndTime,
            isMeetingFinished: false
        });

        return 1;
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

    function giveVotingRight(address voter) meetingPending(meeting) onlyDirector public {
        require(msg.sender == director, "Only director can determine eligablitiy of voting");
        require(!shareholders[msg.sender].hasVoted(), "The user has already voted");
        require(shareholders[msg.sender].weight == 0);

        shareholders[msg.sender].weight = 1;

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