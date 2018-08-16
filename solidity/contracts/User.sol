pragma solidity ^0.4.23;

contract User {

    address public userAddress;
    bool public isDirector;
    string public password;

    event UserExists(bool exists);

    constructor(address _userAddress, bool _isDirector, string _password) public {
        userAddress = _userAddress;
        isDirector = _isDirector;
        password = _password;
    }

    /*function userExists(address _userAddress) public returns (bool exists) {
        exists = userId[_userAddress] != 0;

        emit UserExists(exists); 
        return exists;
    }*/
}