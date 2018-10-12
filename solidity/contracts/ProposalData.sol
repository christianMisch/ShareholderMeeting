pragma solidity^ 0.4.23;

/**
*   @dev data (model) contract to define the proposal and vote structure  
*/
contract ProposalData {

    struct Proposal {
        uint proposalId;
        string name;
        string description;
        string options;
        // a proposal is passed if the vote count on a specific proposal is greater or equal than the voting quorum
        bool proposalPassed;
        // computed as follows: number of votes in this propsal / sum of all proposal vote counts * 100
        uint passedPercent;
        uint voteCount;
        Vote[] votes;
        // to remember who voted on this proposal
        mapping(address => bool) votedOnProposal;
    }

    struct Vote {
        address voterAddress;
        // which voting option the shareholder has chosen
        string voterDecision;
        // number of shares the shareholder owns
        uint voterWeight;
    }
}