pragma solidity ^0.4.23;

import "./Meeting.sol";

contract User {

    Meeting meeting;

    struct UserData {
        string userName;
        string userPassword;
        address userAddress;
        bool isAuthorized;
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