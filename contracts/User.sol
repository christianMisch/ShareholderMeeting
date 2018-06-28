pragma solidity ^0.4.23;

contract User {

    address public userAddress;
    bool public isDirector;

    constructor(address _userAddress, bool _isDirector) public {
        userAddress = _userAddress;
        isDirector = _isDirector;
    }
}