pragma solidity ^0.4.23;

import "./Meeting.sol";
import "./Shareholder.sol";

contract User {

    Meeting meeting;
    mapping (address => Shareholder) users;

    string userName;    
    string userPassword;
    address userAddress;
    bool isAuthorized;
    uint weight;

    constructor(string _userName, string _userPassword, address _userAddress, bool _isAuthorized, uint _weight) internal {
        userName = _userName;
        userPassword = _userPassword;
        userAddress = _userAddress;
        isAuthorized = _isAuthorized;
        weight = _weight;
    }

    function login(address userAddress, string userPassword) public;

    function logout(address userAddress) public;

    modifier authorizedUser(User user) {
        //require(user.isAuthorized());
    }

    modifier meetingNotFinished(Meeting m) {
        require(now < m.meetingEndTime());
        _;
    }

    modifier userExists(address userAddress) {

    }
    
}