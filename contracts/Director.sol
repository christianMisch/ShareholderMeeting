pragma solidity ^0.4.23;

import "./VotingStatistic.sol";
import "./User.sol";

contract Director is User {

    // storing the answers of directors
    Answer[] public answers;

    // answer object used by the director
    struct Answer {
        uint answerId;
        uint questionId;
        address answerCreator;
        string content;
        uint timestamp; 
    }

    event AnswerCreated(uint ansId, address creator);
 
    constructor(address userAddress) 
        User(userAddress, true, true) public {
        weight = 0;
    }

    // only director is allowed to create an answer
    function createAnswer(uint _questionId, address _answerCreator, string _content) 
        onlyDirector public returns (uint answerId)  {

        uint id = answers.length++;
        Answer storage answer = answers[id];
        answer.answerId = id;
        answer.questionId = _questionId;
        answer.answerCreator = _answerCreator;
        answer.content = _content;
        answer.timestamp = now;

        emit AnswerCreated(answerId, msg.sender);
    }
}