pragma solidity ^0.4.23;

contract Voter {

    Proposal[] public proposals;
    mapping(address => uint) public votingTokens;
    
    struct Proposal {
        uint proposalId;
        string name;
        string description;
        string options;
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

    function getNumOfProposals() public view returns (uint length) {
        return proposals.length;
    }

    function getProposalIdByName(string name) internal view returns(uint proposalId) {
        for (uint i = 0; i < proposals.length; i++) {
            if (keccak256(name) == keccak256(proposals[i].name)) {
                return i;
            }
        }
    }
}