pragma solidity ^0.4.23;

import "./User.sol";
import "./Shareholder.sol";
import "./Director.sol";
import "./Factory.sol";

contract AgmOwner is User {

    Factory public fac;
    // total number of users
    uint public numberOfUsers;
    // stores all users
    User[] public users;
    // stores user's address with corresponding id
    mapping(address => uint) public userId;
    // owners which have permission to setup the AGM
    address[] owners;

    bool public isFinished = false;
    bool public isAnnounced = false;

    //uint public marginOfVotesForMajority;
    string public meetingName;
    string public meetingDescription;
    //string public meetingDate;
    //string public meetingPlace;
    //uint public meetingStartTime;
    //uint public meetingEndTime;

    modifier onlyOwner {
        bool isOwner;
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                isOwner = true;
            }
        }
        isOwner = false;
        //require(isOwner == true, "only an AGM owner can access this function!");
        _;
    }

    event ProposalCreated(uint propId, address creator);
    event Voted(address userAddress, uint proposalId, string votingOption);
    event AgmFinished(bool isFinished);
    event OwnershipSharedTo(address newOwner);
    event UserCreated(uint userId, address userAddress, string role);
    event UserRemoved(uint userId, address userAddress, uint role);
    event AgmAnnounced(bool isAnnounced);

    constructor(
        address _userAddress,
        //uint _minimumVotingQuorum,
        //uint _marginOfVotesForMajority,
        string _meetingName,
        string _meetingDescription,
        //string _meetingDate,
        //string _meetingPlace,
        //uint _meetingStartTime,
        //uint _meetingEndTime,
        Factory _fac
    )

            User(_userAddress, Role.AGMOWNER) public {

        //minimumVotingQuorum = _minimumVotingQuorum;
        //marginOfVotesForMajority = _marginOfVotesForMajority;
        meetingName = _meetingName;
        meetingDescription = _meetingDescription;
        //meetingDate = _meetingDate;
        //meetingPlace = _meetingPlace;
        //meetingStartTime = _meetingStartTime;
        //meetingEndTime = _meetingEndTime;
        fac = _fac;
        owners.push(_userAddress);
        users.push(User(address(this)));
    }

    // transfer contract ownership to another director
    function transferOwnership(address _owner) public onlyOwner {
        //userAddress = _owner;
        owners.push(_owner);

        emit OwnershipSharedTo(_owner);
    }

    function addUser(address _userAddress, Role role, uint votingWeight, QandA qa) public {
        uint id = userId[_userAddress];
        if (id == 0) {
            id = users.length++;
            userId[_userAddress] = id;
        }
        if (uint(role) == 0) {
            Director o = fac.createNewDirector(_userAddress, true, qa);
            users[id] = o;

            emit UserCreated(id, _userAddress, "AgmOwner");
        }
        else if (uint(role) == 1) {
            Director d = fac.createNewDirector(_userAddress, false, qa);
            users[id] = d;

            emit UserCreated(id, _userAddress, "Director");

        } else if(uint(role) == 2) {
            Shareholder s = fac.createNewShareholder(_userAddress, votingWeight, qa);
            users[id] = s;

            emit UserCreated(id, _userAddress, "Shareholder");
        }
        numberOfUsers++;
    }

    function removeUser(address _userAddress) public {
        //require(userId[_userAddress] != 0, "User does not exist");

        uint i = userId[_userAddress];
        User remUser = users[i];
        delete users[i];

        for (; i < users.length - 1; i++) {
            users[i] = users[i+1];
            userId[users[i].userAddress()] = i;
        }

        users.length--;
        numberOfUsers--;

        emit UserRemoved(i, _userAddress, remUser.role());
    }

    function getNumOfUsers() public view returns (uint length) {
        return users.length;
    }

    function getUser(address _userAddress) public view returns (address adr, uint role) {
        User u = users[userId[_userAddress]];
        return (u.userAddress(), u.role());
    }

    function getUserList() public view returns (User[] userList) {
        return users;
    }

    function finishAGM() public /*onlyOwner*/ {
        require(!isFinished, "AGM has already been finished");
        isFinished = true;

        emit AgmFinished(isFinished);

    }

    function announceAGM() public onlyOwner {
        require(!isAnnounced, "AGM has already been announced");
        isAnnounced = true;

        emit AgmAnnounced(isAnnounced);
    }

    function createProposal(string _name, string _ipfs_hash, string _options)
        public /*onlyOwner*/ returns(uint propId) {

        propId = fac.createNewProposal(_name, _ipfs_hash, _options);
        emit ProposalCreated(propId, msg.sender);

        return propId;
    }

    function getOwnerAddress() public view returns (address ownerAdr) {
        return userAddress;
    }

    function getOwners() public view returns (address[] ownerAdr) {
        return owners;
    }

    function getIsFinished() public view returns (bool finished) {
        return isFinished;
    }

    function getIsAnnounced() public view returns (bool announced) {
        return isAnnounced;
    }

    // executes the pending proposal
    function executeProposal(uint proposalId) public returns (bool success) {
        bool isExecuted = fac.executeProposal(proposalId);
        return isExecuted;
    }
}
