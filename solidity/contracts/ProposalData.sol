pragma solidity^ 0.4.23;

contract ProposalData {

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
        uint voterWeight;
    }
}