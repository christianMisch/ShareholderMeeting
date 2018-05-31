pragma solidity ^0.4.23;

contract Proposal {

    uint public proposalId;
    string name;
    string description;
    bool finished;
    bool proposalPassed;
    uint passedPercent;
    uint voteCount;
    Vote[] votes;

    struct Vote {
        address voterAddress;
        string voterDecision;
    }

    constructor (uint _proposalId, string _name, string _description, bool _finished, 
        bool _proposalPassed, uint _passedPercent) public {
        proposalId = _proposalId;
        name = _name;
        description = _description;
        finished = _finished;
        proposalPassed = _proposalPassed;
        passedPercent = _passedPercent;
    }
    
}