pragma solidity ^0.4.23;

contract Proposal {

    uint public proposalId;
    string name;
    string description;
    byte[] options;
    bool finished;
    bool proposalPassed;
    uint passedPercent;
    uint public voteCount;
    Vote[] votes;

    struct Vote {
        address voterAddress;
        string voterDecision;
    }

    constructor (uint _proposalId, string _name, string _description, byte[] _options, bool _finished, 
        bool _proposalPassed, uint _passedPercent) public {
        proposalId = _proposalId;
        name = _name;
        description = _description;
        options = _options;
        finished = _finished;
        proposalPassed = _proposalPassed;
        passedPercent = _passedPercent;
    }
    
}