pragma solidity ^0.4.23;

import "./Shareholder.sol";
//import "../lib/solidity-stringutils/src/strings.sol";

/*

import "./Director.sol";
import "./Shareholder.sol";
import "./VotingStatistic.sol";
import "./Voter.sol"; */

contract VotingStatistic {
    //using strings for *;

    // sum of the weights or voting power of all users
    uint private totalVotingPower;
    // how much voting power each uses owns
    mapping(address => uint) private votingPower;
    // which proposal is passed
    mapping(uint => bool) private passedProposal;
    // with how much persentage each proposal is passed or not
    mapping(uint => uint) private proposalPercentage;

    function updateVotingPower(address userAddress, uint weight) public {
        votingPower[userAddress] = weight;
    }

    function updatePassedProposal(uint proposalId, bool proposalPassed) public {
        passedProposal[proposalId] = proposalPassed;
    }

    function updateProposalPercentage(uint proposalId, uint passedPercentage) public {
        proposalPercentage[proposalId] = passedPercentage;
    }

    function setTotalVotingPower(uint newTotalVP) public {
        totalVotingPower = newTotalVP;
    }

    function getTotalVotingPower() public returns (uint totalVP) {
        return totalVotingPower;
    }

    /*
    function calculateVotingStatistic(uint proposalId) public {
        VotingStatistic statistic = new VotingStatistic();

        for (uint j = 0; j < users.length; j++) {
            statistic.updateVotingPower(users[j].userAddress(), votingTokens[users[j].userAddress()]);
            uint totalVotPow = statistic.getTotalVotingPower();
            statistic.setTotalVotingPower(totalVotPow + votingTokens[users[j].userAddress()]);
        }
        for (uint i = 0; i < proposals.length; i++) {
            statistic.updatePassedProposal(proposals[i].proposalId, proposals[i].proposalPassed);
            statistic.updateProposalPercentage(proposalId, proposals[i].passedPercent);
        }
    } */

    /*

    

    function finishAGM() onlyOwner public {
        require(!isFinished, "AGM has already been finished");
        isFinished = true;

        emit AgmFinished(isFinished);

    }

    function announceAGM() onlyOwner public view returns(string recordDate, string recordPlace) {
        return (meetingDate, meetingPlace);
    }

    // only director is allowed to create a proposal
    function createProposal(string _name, string _description, string _options) 
        onlyOwner public {

        uint propId = proposals.length++;
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
    function executeProposal(uint proposalId) public {
        
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

    } */
}