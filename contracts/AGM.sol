pragma solidity ^0.4.23;

import "./User.sol";
import "./Director.sol";
import "./Shareholder.sol";
import "./VotingStatistic.sol";
//import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract AGM {

    // owner of the contract initializes the AGM
    address public owner;
    // access to all users
    User[] public users;
    // for initializing the proposals
    Proposal[] public proposals;
    // store options to every proposal
    VotingOption[] public votingOptions;
    // stores user's address with corresponsing id
    mapping(address => uint) public userId;
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

    struct Proposal {
        string name;
        string description;
        string[] options;
        bool finished;
        bool proposalPassed;
        uint passedPercent;
        uint voteCount;
        Vote[] votes;
        mapping(address => bool) votedOnProposal;
    }

    struct Vote {
        address voterAddress;
        string voterDecision;
    }

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

    // transfer contract ownership to another director
    function transferOwnership(address _owner) onlyOwner public {
        require(users[userId[_owner]].isDirector(), "the new owner is not a director");
        owner = _owner;
    }

    constructor(
        uint _minimumVotingQuorum,
        uint _marginOfVotesForMajority,
        string _meetingName,
        string _meetingDescription,
        string _meetingDate,
        string _meetingPlace,
        uint _meetingStartTime,
        uint _meetingEndTime) public {
        
        minimumVotingQuorum = _minimumVotingQuorum;
        marginOfVotesForMajority = _marginOfVotesForMajority;
        meetingName = _meetingName;
        meetingDescription = _meetingDescription;
        meetingDate = _meetingDate;
        meetingPlace = _meetingPlace;
        meetingStartTime = _meetingStartTime;
        meetingEndTime = _meetingEndTime;
    }

    function addUser(address _userAddress, bool isDirector) public {
        uint id = userId[_userAddress];
        if (id == 0) {
            userId[_userAddress] = users.length++;
            id = users.length++;
        }

        if (isDirector) {
            users[id] = new Director({userAddress: _userAddress});
            emit UserCreated(id, _userAddress, true);
        } else {
            users[id] = new Shareholder({userAddress: _userAddress});
            emit UserCreated(id, _userAddress, false);
        }
    }

    function removeUser(address _userAddress) public {
        require(userId[_userAddress] != 0, "User does not exist");

        uint i = userId[_userAddress];
        User remUser = users[i];

        for (; i < users.length; i++) {
            users[i] = users[i+1];
        }
        delete users[users.length - 1];
        users.length--;

        emit UserRemoved(i, _userAddress, remUser.isDirector());
    }

    // convert the shareholder registry in a list of authorized users
    function initializeUserAccess(string registry) internal {
        //string[] parts = registry.split(";");
        for (uint i = 0; i < users.length; i++) {
            
            addUser(users[i].userAddress(), users[i].isDirector());
        }
    }

    function finishAGM() onlyOwner public {
        require(!isFinished, "AGM has already been finished");
        isFinished = true;
    }

    function announceAGM() onlyOwner public returns(string recordDate, string recordPlace) {
        return (meetingDate, meetingPlace);
    }

    // only director is allowed to create a proposal
    function createProposal(string _name, string _description, string[] _options, uint _proposalDeadline) 
        onlyOwner internal returns (uint proposalId) {

        proposalId = proposals.length++;
        Proposal storage proposal = proposals[proposalId];
        proposal.name = _name;
        proposal.description = _description;
        proposal.options = _options;
        proposal.finished = false;
        proposal.proposalPassed = false;
        proposal.passedPercent = 0;
        proposal.voteCount = 0;
        
        emit ProposalCreated(proposalId, msg.sender);
    }

    // executes the pending proposal
    function executeProposal(uint proposalId) public {
        
        Proposal storage prop = proposals[proposalId];
        string[] storage options = proposals[proposalId].options;

        require(!prop.finished);

        
        // iterate over all options to store default options in the map
        for (uint k = 0; k < options.length; k++) {
            uint id = votingOptions.length++;
            votingOptions[id] = VotingOption({optionName: options[k], optionCount: 0});

            // iterate over all votes to check which voter voted for option k
            for (uint i = 0; i < prop.votes.length; i++) {
                
                Vote storage v = prop.votes[i];
                if (keccak256(v.voterDecision) == keccak256(options[k])) {
                    votingOptions[k].optionCount++; 
                } 
            }
        }
        uint winningOptionCount = 0;
        uint countSum = 0;
        
        for (uint j = 0; j < votingOptions.length; j++) {
            countSum += votingOptions[j].optionCount;
            if (winningOptionCount < votingOptions[j].optionCount) {
                winningOptionCount = votingOptions[j].optionCount;
            }
        }

        if (winningOptionCount > minimumVotingQuorum 
            && (winningOptionCount * 100 / countSum) > marginOfVotesForMajority) {
            prop.proposalPassed = true;
        } else {
            prop.proposalPassed = false;
        }

        prop.passedPercent = winningOptionCount * 100 / countSum;
        prop.finished = true;
        delete votingOptions;

    }

    function calculateVotingStatistic(uint proposalId) public {
        VotingStatistic statistic = new VotingStatistic();

        for (uint j = 0; j < users.length; j++) {
            statistic.updateVotingPower(users[j].userAddress(), Shareholder(users[j]).weight());
            //statistic.setTotalVotingPower(statistic.getTotalVotingPower() += users[j].weight);
        }
        for (uint i = 0; i < proposals.length; i++) {
            //statistic.passedProposal[proposals[i].proposalId] = proposals[i].proposalPassed;
            //statistic.proposalPercentage(proposalId) = proposals[i].passedPercent;
            //statistic.updateVotingPower();
        }
    }

    function voteOnProposal(address userAddress, uint proposalId, string votingOption) public returns(uint voteId) {
        Proposal storage prop = proposals[proposalId];
        
        require(!prop.votedOnProposal[msg.sender], "The shareholder already voted");
        
        voteId = prop.votes.length++;
        prop.votes[voteId] = Vote({voterAddress: userAddress, voterDecision: votingOption});
        prop.votedOnProposal[msg.sender] = true;
        
        emit Voted(userAddress, proposalId, votingOption);
    }

    function userExists(address userAddress) public returns (bool exists) {
        return userId[userAddress] != 0;
    }
}

/*for (uint k = 0; k < options.length; k++) {
            uint id = optionCount[proposalId].length++;
            optionCount[proposalId][id] = VotingOption({optionName: options[k], optionCount: 0});

            // iterate over all votes to check which voter voted for option k
            for (uint i = 0; i < prop.votes.length; i++) {
                
                Vote storage v = prop.votes[i];
                if (keccak256(v.voterDecision) == keccak256(options[k])) {
                    optionCount[proposalId][k].optionCount++; 
                } 
            }
        }*/ 