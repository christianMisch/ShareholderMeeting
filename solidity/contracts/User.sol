pragma solidity ^0.4.23;

contract User {

    // stores all users
    User[] public users;
    // stores user's address with corresponding id
    mapping(address => uint) public userId;

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