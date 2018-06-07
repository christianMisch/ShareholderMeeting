pragma solidity ^0.4.23;

import "./Shareholder.sol";
import "./Director.sol";

contract User {

    mapping (address => int) userIds;
    User[] users;

    uint userId;
    address userAddress;
    uint role;
    bool isAuthorized;
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

    constructor(uint _userId, address _userAddress, uint _role, bool _isAuthorized, uint _weight) internal {
        userId = _userId;
        userAddress = _userAddress;
        role = _role;
        isAuthorized = _isAuthorized;
        weight = _weight;
    }

    function login(address _userAddress, string _userPassword) public;

    function logout(address _userAddress) public;

    function addUser(Role _role) public;

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