pragma solidity ^0.4.23;

contract Voter {

    Proposal[] public proposals;
    mapping(address => uint) votingTokens;
    
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

    function getProposalIdByName(string name) public view returns(uint proposalId) {
        for (uint i = 0; i < proposals.length; i++) {
            if (keccak256(name) == keccak256(proposals[i].name)) {
                return i;
            }
        }
    }
}