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

    modifier onlyDirector {
        require(this.isDirector());
        _;

    }
 
    constructor(address userAddress) 
        User(userAddress, true) public {
    }

    // only director is allowed to create an answer
    function createAnswer(uint _questionId, string _content) 
        /*onlyDirector*/ public returns (uint answerId)  {

        uint id = answers.length++;
        Answer storage answer = answers[id];
        answer.answerId = id;
        answer.questionId = _questionId;
        answer.answerCreator = msg.sender;
        answer.content = _content;
        answer.timestamp = now;

        emit AnswerCreated(answerId, msg.sender);
    }

    function getNumOfAnswers() public view returns (uint length) {
        return answers.length;
    }

    function getAnswer(uint answerId) public view returns (
        uint _answerId,
        uint _questionId,
        address _answerCreator,
        string _content,
        uint _timestamp
    ) {

        Answer storage answer = answers[answerId];
        return 
            (answer.answerId, answer.questionId, answer.answerCreator, answer.content, answer.timestamp);
    }
}