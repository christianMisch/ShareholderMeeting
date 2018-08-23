pragma solidity ^0.4.23;

import "./VotingStatistic.sol";
import "./User.sol";
import "./QandA.sol";

contract Director is User {

    QandA public qa;

    event AnswerCreated(uint ansId, address creator);

    modifier onlyDirector {
        require(this.role() == 1, "the user is not a director");
        _;

    }

    constructor(address userAddress, bool isAdministrator, QandA _qa)
        User(userAddress, Role.DIRECTOR) public {

        qa = _qa;
    }

    // only director is allowed to create an answer
    function createAnswer(uint _questionId, string _content)
        onlyDirector public returns (uint answerId)  {

        answerId = qa.createNewAnswer(_questionId, _content, msg.sender);

        emit AnswerCreated(answerId, msg.sender);
    }
}
