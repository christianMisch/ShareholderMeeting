pragma solidity ^0.4.23;

contract User {

    User[] users;
    mapping(address => User) public userMap;
    uint public numberOfUsers;

    enum Role {DIRECTOR, SHAREHOLDER}

    uint public userId;
    address public userAddress;
    Role public role;
    bool public isAuthorized;
    uint public weight;

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

    event UserCreated(uint userId, address userAddress, Role role);

    modifier onlyDirector {
        require(userMap[msg.sender].role() == Role.DIRECTOR);
        _;

    }

    modifier onlyShareholder {
        require(userMap[msg.sender].role() == Role.SHAREHOLDER);
        _;
    }

    modifier isAuthenticated {
        require(userMap[msg.sender].isAuthorized());
        _;
    }

    constructor(uint _userId, address _userAddress, Role _role, bool _isAuthorized) public {
        userId = _userId;
        userAddress = _userAddress;
        role = _role;
        isAuthorized = _isAuthorized;
        weight = 0;
    }

    function userExists(address _userAddress) public returns (bool exists) {
        return true;
    }

    function addUser(address _userAddress, Role _role) public;
    
}