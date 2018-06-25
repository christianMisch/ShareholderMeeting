pragma solidity ^0.4.23;

contract User {

    User[] public users;
    Proposal[] public proposals;
    mapping(address => uint) public userId;
    uint public numberOfUsers;

    address public userAddress;
    bool public isDirector;
    bool public isAuthorized;
    uint public weight;

    struct Proposal {
        string name;
        string description;
        byte[] options;
        bool finished;
        bool proposalPassed;
        uint passedPercent;
        uint proposalDeadline;
        Vote[] votes;
        mapping(address => bool) votesOnProposal;
    }

    struct Vote {
        address voterAddress;
        string voterDecision;
    }

    event UserCreated(uint userId, address userAddress, bool isDirector);

    modifier onlyDirector {
        require(true);
        _;

    }

    /*modifier onlyShareholder {
        require(!users[userId[msg.sender]].isDirector);
        _;
    }

    modifier isAuthenticated {
        require(users[userId[msg.sender]].isAuthorized);
        _;
    }*/

    constructor(address _userAddress, bool _isDirector, bool _isAuthorized) public {
        userAddress = _userAddress;
        isDirector = _isDirector;
        isAuthorized = _isAuthorized;
        weight = 0;
        userId[msg.sender] = users.length++;  
    }

    function userExists(address _userAddress) public returns (bool exists) {
        return true;
    }

    function addUser(address _userAddress, bool _isDirector) public;
    
}