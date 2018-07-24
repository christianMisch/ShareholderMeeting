pragma solidity ^0.4.23;

contract User {

    // access to all users
    User[] public users;
    // stores user's address with corresponding id
    mapping(address => uint) public userId;

    address public userAddress;
    bool public isDirector;

    constructor(address _userAddress, bool _isDirector) public {
        userAddress = _userAddress;
        isDirector = _isDirector;
    }

    function userExists(address _userAddress) public view returns (bool exists) {
        return userId[_userAddress] != 0;
    }
}