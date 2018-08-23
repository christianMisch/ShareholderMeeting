pragma solidity ^0.4.23;

contract User {

    address public userAddress;
    uint public role;
    // enum for roles
    enum Role {AGMOWNER, DIRECTOR, SHAREHOLDER}

    event UserExists(bool exists);

    constructor(address _userAddress, Role _role) public {
        userAddress = _userAddress;
        role = uint(_role);
    }

    /*function userExists(address _userAddress) public returns (bool exists) {
        exists = userId[_userAddress] != 0;

        emit UserExists(exists);
        return exists;
    }*/
}
