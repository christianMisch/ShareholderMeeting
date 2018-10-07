pragma solidity ^0.4.23;

contract User {

    address public userAddress;
    uint public role;
    bool public isRegistered;
    // enum for roles
    enum Role {AGMOWNER, DIRECTOR, SHAREHOLDER}

    event UserExists(bool exists);

    constructor(address _userAddress, Role _role, bool _isRegistered) public {
        userAddress = _userAddress;
        role = uint(_role);
        isRegistered = _isRegistered;
    }

    function setIsRegistered(bool reg) public {
        isRegistered = reg;
    }

    /*function userExists(address _userAddress) public returns (bool exists) {
        exists = userId[_userAddress] != 0;

        emit UserExists(exists);
        return exists;
    }*/
}
