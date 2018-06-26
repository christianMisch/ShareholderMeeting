pragma solidity ^0.4.23;

import "./User.sol";
import "./Director.sol";
import "./Shareholder.sol";
//import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract AGM {

    // owner of the contract initializes the AGM
    address public owner;
    // access to all users
    User[] public users;
    // stores user's address with corresponsing id
    mapping(address => uint) public userId;
    // total number of users
    uint public numberOfUsers;

    uint minimumVotingQuorum;
    string meetingName;
    string meetingDescription;
    string meetingDate;
    string meetingPlace;
    uint meetingStartTime;
    uint meetingEndTime;
    bool isMeetingFinished; 

    modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }

    event UserCreated(uint userId, address userAddress, bool isDirector);
    event UserRemoved(uint userId, address userAddress, bool isDirector);

    // transfer contract ownership to another director
    function transferOwnership(address _owner) onlyOwner public {
        owner = _owner;
    }

    constructor(
        uint _minimumVotingQuorum,
        string _meetingName,
        string _meetingDescription,
        string _meetingDate,
        string _meetingPlace,
        uint _meetingStartTime,
        uint _meetingEndTime,
        bool _isMeetingFinished) public {
        
        
        minimumVotingQuorum = _minimumVotingQuorum;
        meetingName = _meetingName;
        meetingDescription = _meetingDescription;
        meetingDate = _meetingDate;
        meetingPlace = _meetingPlace;
        meetingStartTime = _meetingStartTime;
        meetingEndTime = _meetingEndTime;
        isMeetingFinished = _isMeetingFinished;
    }

    function addUser(address _userAddress, bool isDirector) public {
        uint id = userId[_userAddress];
        if (id == 0) {
            userId[_userAddress] = users.length++;
            id = users.length++;
        }

        if (isDirector) {
            users[id] = new Director({userAddress: _userAddress});
            emit UserCreated(id, _userAddress, true);
        } else {
            users[id] = new Shareholder({userAddress: _userAddress});
            emit UserCreated(id, _userAddress, false);
        }
    }

    function removeUser(address _userAddress) public {
        require(userId[_userAddress] != 0, "User does not exist");

        uint i = userId[_userAddress];
        User remUser = users[0];

        for (; i < users.length; i++) {
            users[i] = users[i+1];
        }
        delete users[users.length - 1];
        users.length--;

        emit UserRemoved(i, _userAddress, remUser.isDirector());
    }

    // convert the shareholder registry in a list of authorized users
    function initializeUserAccess(string registry) internal {
        //string[] parts = registry.split(";");
        for (uint i = 0; i < users.length; i++) {
            
            addUser(users[i].userAddress(), users[i].isDirector());
        }
    }

}