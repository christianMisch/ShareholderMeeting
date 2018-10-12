pragma solidity ^0.4.23;

/**
*   @title this contract represents an abstract user who participates in the AGM 
*/
contract User {

    address public userAddress;
    // role of the user = 0 (AgmOwner) | 1 (Director) | 2 (Shareholder) | 3 (user does not exist)
    uint public role;
    // to indicated whether the user registered for the AGM
    bool public isRegistered;
    // different user roles
    enum Role {AGMOWNER, DIRECTOR, SHAREHOLDER}

    event UserExists(bool exists);

    /**
    *   @dev the role is encoded as integer and the isRegistered flag is initialized to false
    */
    constructor(address _userAddress, Role _role, bool _isRegistered) public {
        userAddress = _userAddress;
        role = uint(_role);
        isRegistered = _isRegistered;
    }

    // change the status to true if the user has registered in the AGM app
    function setIsRegistered(bool reg) public {
        isRegistered = reg;
    }
}
