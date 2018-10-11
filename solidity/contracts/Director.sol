pragma solidity ^0.4.23;

import "./VotingStatistic.sol";
import "./User.sol";
import "./QandA.sol";

contract Director is User {

    QandA public qa;
    // delete property
    bool public isAdministrator;

    event AnswerCreated(uint ansId, string creator);

    modifier onlyDirector {
        require(this.role() == 1, "The user is not a director");
        _;

    }
    
    constructor(address userAddress, bool _isAdministrator, QandA _qa, uint _role)
        User(userAddress, Role(_role), false) public {

        isAdministrator = _isAdministrator;    
        qa = _qa;
    }

    // only director is allowed to create an answer
    function createAnswer(uint _questionId, string _ipfs_hash, string sender) public onlyDirector returns (uint answerId)  {

        answerId = qa.createNewAnswer(_questionId, _ipfs_hash, sender);

        emit AnswerCreated(answerId, sender);
    }
}
