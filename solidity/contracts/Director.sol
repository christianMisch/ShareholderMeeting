pragma solidity ^0.4.23;

import "./VotingStatistic.sol";
import "./User.sol";
import "./QandA.sol";

contract Director is User {

    QandA public qa;

    event AnswerCreated(uint ansId, address creator);

    modifier onlyDirector {
        require(this.isDirector());
        _;

    }
 
    constructor(address userAddress, QandA _qa) 
        User(userAddress, true) public {

        qa = _qa;
    }

    // only director is allowed to create an answer
    function createAnswer(uint _questionId, string _content) 
        onlyDirector public returns (uint answerId)  {

        answerId = qa.createNewAnswer(_questionId, _content);

        emit AnswerCreated(answerId, msg.sender);
    }
}