pragma solidity ^0.4.23;

import "./User.sol";
import "./QandA.sol";

/**
* @title this contract represents a director (board member) of the corporation
*/
contract Director is User {

    // reference to the Q&A list
    QandA public qa;
    // internally directors with admin rights are just director objects who are indicated with this flag
    bool public isAdministrator;

    /**
    *   @dev checks whether the caller has the director role 
    */
    modifier onlyDirector {
        require(this.role() == 1, "The user is not a director");
        _;

    }

    event AnswerCreated(uint ansId, string creator);
    
    /**
    *   @dev determines whether the director has admin rights
    */
    constructor(address userAddress, bool _isAdministrator, QandA _qa, uint _role)
        User(userAddress, Role(_role), false) public {

        isAdministrator = _isAdministrator;    
        qa = _qa;
    }

    /**
    *   @dev directors are able to create answers to a specific questions submitted by a shareholder
    *   @param _questionId id of the question
    *   @param _ipfs_hash hash where the answer description is stored
    *   @param sender the creator of the answer 
    */
    function createAnswer(uint _questionId, string _ipfs_hash, string sender) public onlyDirector returns (uint answerId)  {

        answerId = qa.createNewAnswer(_questionId, _ipfs_hash, sender);

        emit AnswerCreated(answerId, sender);
    }
}
