pragma solidity ^0.4.23;

import "./User.sol";
import "./Shareholder.sol";
import "./Director.sol";
import "./State.sol";

contract AgmOwner is User, Voter {

    State public state = new State();

    // store options to every proposal
    VotingOption[] public votingOptions;

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
        require(userAddress == msg.sender);
        _;
    }

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
        uint _meetingEndTime) 
            
            User(msg.sender, true) public {
        
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
        userAddress = _owner;

        emit OwnershipTransferedTo(_owner);
    }

    function finishAGM() onlyOwner public {
        require(!isFinished, "AGM has already been finished");
        isFinished = true;

        emit AgmFinished(isFinished);

    }

    function announceAGM() onlyOwner public view returns (string recordDate, string recordPlace) {
        return (meetingDate, meetingPlace);
    }

    // only director is allowed to create a proposal
    function createProposal(string _name, string _description, string _options) 
        onlyOwner public returns(uint propId) {

        propId = proposals.length++;
        Proposal storage proposal = proposals[propId];
        proposal.proposalId = propId;
        proposal.name = _name;
        proposal.description = _description;
        proposal.options = _options;
        proposal.proposalPassed = false;
        proposal.passedPercent = 0;
        proposal.voteCount = 0;
        
        emit ProposalCreated(propId, msg.sender);
    }

    // executes the pending proposal
    /*function executeProposal(uint proposalId) public {
        
        Proposal storage prop = proposals[proposalId];
        var optionString = proposals[proposalId].options.toSlice();
        var delim = ";".toSlice();
        var options = new string[](optionString.count(delim) + 1);
        for (uint l = 0; l < options.length; l++) {
            options[l] = optionString.split(delim).toString();
        }

        require(now > meetingEndTime, "meeting has not finished yet");

        
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

        delete votingOptions;

        emit ProposalExecuted(proposalId, prop.proposalPassed, prop.passedPercent, votingOptions);
    }*/
}