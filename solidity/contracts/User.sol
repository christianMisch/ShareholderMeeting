pragma solidity ^0.4.23;

contract User {

    address public userAddress;
    bool public isDirector;

    event UserExists(bool exists);

    constructor(address _userAddress, bool _isDirector) public {
        userAddress = _userAddress;
        isDirector = _isDirector;
    }

    /*function userExists(address _userAddress) public returns (bool exists) {
        exists = userId[_userAddress] != 0;

        emit UserExists(exists); 
        return exists;
    }*/
}