pragma solidity ^0.4.23;

import "./Shareholder.sol";
import "./Director.sol";

contract User {

    mapping (address => Shareholder) shareholders;

    uint userId;
    string userName;    
    string userPassword;
    address userAddress;
    bool public isAuthorized;
    uint weight;

    struct Proposal {
        uint proposalId;
        string name;
        string description;
        byte[] options;
        bool finished;
        bool proposalPassed;
        uint passedPercent;
        uint voteCount;
        Vote[] votes;
        mapping(address => bool) votesOnProposal;
    }

    struct Vote {
        address voterAddress;
        string voterDecision;
    }

    constructor(string _userName, string _userPassword, address _userAddress, bool _isAuthorized, uint _weight) internal {
        userName = _userName;
        userPassword = _userPassword;
        userAddress = _userAddress;
        isAuthorized = _isAuthorized;
        weight = _weight;
    }

    function login(address _userAddress, string _userPassword) public;

    function logout(address _userAddress) public;

    modifier authorizedUser(User user) {
        require(user.isAuthorized());
        _;
    }

    /*modifier meetingFinished(Meeting m) {
        require(now > m.meetingEndTime);
        _;
    }

    modifier meetingPending(Meeting m) {
        require(now > m.meetingStartTime && now < m.meetingEndTime);
        _;
    }*/

    /*modifier userExists(address userAddress) {

    }*/
    
}