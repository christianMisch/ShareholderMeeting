pragma solidity ^0.4.23;

import "./Shareholder.sol";
import "./Director.sol";

contract User {

    mapping (address => Shareholder) shareholders;

    uint userId;
    string userName;    
    string userPassword;
    address userAddress;
    bool isAuthorized;
    uint weight;

    struct Meeting {
        uint meetingId;
        string meetingName;
        string meetingDescription;
        string meetingDate;
        string meetingPlace;
        uint meetingStartTime;
        uint meetingEndTime;
        bool isMeetingFinished;
    }

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
        require(user.isAuthorized);
    }

    modifier meetingFinished(Meeting m) {
        require(now > m.meetingEndTime);
        _;
    }

    modifier meetingPending(Meeting m) {
        require(now > m.meetingStartTime && now < m.meetingEndTime);
        _;
    }

    /*modifier userExists(address userAddress) {

    }*/
    
}