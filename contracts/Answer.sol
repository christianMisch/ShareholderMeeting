pragma solidity ^0.4.23;

contract Answer {
    
    uint answerId;
    string content;
    uint timestamp;

    constructor (uint _answerId, string _content, uint _timestamp) public {
        answerId = _answerId;
        content = _content;
        timestamp = _timestamp;
    }
}