pragma solidity ^0.4.23;

import "./VotingStatistic.sol";
import "./User.sol";
import "./Meeting.sol";
import "./Authentication.sol";

contract Director is User {

    uint minimumQuorum;

    struct Answer {
        uint answerId;
        string content;
        uint timestamp; 
    }

        
    constructor(uint userId, address userAddress, Role role, bool isAuthorized, uint _minimumQuorum) 
        User(userId, userAddress, role, isAuthorized) public {
        
        minimumQuorum = _minimumQuorum;
    }

    function addUser(address _userAddress, Role _role) public {
        if (_role == Role.DIRECTOR) {
            numberOfUsers++;

            if (!userExists(_userAddress)) {
                Director d = new Director({
                    userId: users.length++,
                    userAddress: _userAddress, 
                    role: _role, 
                    isAuthorized: true, 
                    weight: 0
                });

                users.push(d);
                userMap[msg.sender] = d;
                emit UserCreated(d.userId, d.userAddress, d.userRole);
            }
        }
    }

    /*function uploadAuthorizedShareholderList(Shareholder[] _shareholders) onlyDirector public {
        shareholders = _shareholders;
    }
    
    function createAnswer(uint answerId, address userAddress, string newContent, uint questionId) 
        meetingPending(meeting) onlyDirector public {
        Answer storage answer = answers[answerId];
        answer.answerId = answers.length++;
        answer.content = newContent;
        answer.timestamp = now; 
        answers.push(answer);
    }

    function createProposal(uint proposalId, string name, string description, byte[] options) 
        meetingPending(meeting) onlyDirector internal {
        Proposal storage proposal = proposals[proposalId];
        proposal.proposalId = proposals.length++;
        proposal.name = name;
        proposal.description = description;
        proposal.options = options;
        proposal.finished = false;
        proposal.proposalPassed = false;
        proposal.passedPercent = 0;
        proposal.voteCount = 0;

        proposals.push(proposal);

    }

    function giveVotingRight(address voter) meetingPending(meeting) onlyDirector public {
        require(msg.sender == director, "Only director can determine eligablitiy of voting");
        require(!shareholders[msg.sender].hasVoted(), "The user has already voted");
        require(shareholders[msg.sender].weight == 0);

        shareholders[msg.sender].weight = 1;

    }

    function createMeeting(string newMeetingDate, string newMeetingPlace, uint newStartTime, uint newEndTime, string newMeetingName, string newMeetingDescription) 
        internal returns (uint meetingId) {
        
        meeting = new Meeting(
            1, 
            newMeetingName, 
            newMeetingDescription, 
            newMeetingDate, 
            newMeetingPlace, 
            newStartTime, 
            newEndTime,
            false);

        return 1;
    }

    function finishMeeting(Meeting m) meetingPending(meeting) public {
        require(!m.isMeetingFinished());
        m.isMeetingFinished = true;
    }

    function announceMeeting(Meeting m) meetingPending(meeting) public returns(string recordDate, string recordPlace) {
        return (m.meetingDate(), m.meetingPlace());
    }

    function executeProposal(uint proposalId, string voterDecision) meetingPending(meeting) public returns(bool isExecuted) {
        Proposal storage prop = proposals[proposalId];

        require(!prop.finished && prop.numberOfVotes > minimumQuorum);
        prop.finished = true;

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