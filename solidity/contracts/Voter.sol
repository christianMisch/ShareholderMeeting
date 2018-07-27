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

    function getProposalIdByName(string name) public view returns(uint proposalId) {
        for (uint i = 0; i < proposals.length; i++) {
            if (keccak256(name) == keccak256(proposals[i].name)) {
                return i;
            }
        }
    }

    function getProposal(uint proposalId) public view returns (
        uint _proposalId,
        string _name,
        string _description,
        string _options,
        bool _proposalPassed,
        uint _passedPercent,
        uint _voteCount
    ) {
        Proposal storage proposal = proposals[proposalId];
        return
        (proposal.proposalId, proposal.name, proposal.description, proposal.options, proposal.proposalPassed,
        proposal.passedPercent, proposal.voteCount);
    }
}