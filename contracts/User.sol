pragma solidity ^0.4.23;

contract User {

   
    Proposal[] public proposals;

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
    }

    function userExists(address _userAddress) public returns (bool exists) {
        return true;
    }
    
}