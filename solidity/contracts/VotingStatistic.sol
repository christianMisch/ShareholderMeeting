pragma solidity ^0.4.23;

import "./Shareholder.sol";

contract VotingStatistic {

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

}