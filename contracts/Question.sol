pragma solidity ^0.4.23;

contract Question {
     
    uint questionId;
    string content;
    uint timestamp;
    uint upvotes;
    uint downvotes;

    constructor (uint _questionId, string _content, uint _timestamp) public {
        questionId = ++_questionId;
        content = _content;
        timestamp = _timestamp;
    }


}