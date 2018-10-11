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
    // stores the password for any user
    mapping(address => string) public secretPWs;
    // owners which have permission to setup the AGM
    address[] public owners;

    bool public isFinished = false;
    bool public isAnnounced = false;
    
    //string public meetingDescription;
    string public meetingName;
    string public agenda;
    string public meetingPlace;
    string public meetingStartTime;
    string public meetingEndTime;

    modifier isSet(string param) {
        require(bytes(param).length == 0, "The parameter has already been set");
        _;
    }

    event MsgSender(address sender);

    modifier onlyOwner(address sender) {
        //emit MsgSender(msg.sender);
        bool isOwner;
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == sender) {
                isOwner = true;
            }
        }
        isOwner = false;
        require(isOwner == true, "Only an AGM owner can access this function!");
        _;
    }

    event ProposalExecuted(bool isExecuted, uint propId, uint winnOptCount);
    event ProposalCreated(uint propId, address creator);
    event Voted(address userAddress, uint proposalId, string votingOption);
    event AgmFinished(bool isFinished);
    event OwnershipSharedTo(address caller, address newOwner);
    event UserCreated(uint userId, address userAddress, string role);
    event UserRemoved(uint userId, address userAddress, uint role);
    event AgmAnnounced(bool isAnnounced);
    event AgmOwnerCreated(address adr);

    constructor(
        address _userAddress,
        //uint _minimumVotingQuorum,
        //uint _marginOfVotesForMajority,
        //string _meetingName,
        //string _meetingDescription,
        //string _meetingDate,
        //string _meetingPlace,
        //uint _meetingStartTime,
        //uint _meetingEndTime,
        Factory _fac
    )

            User(_userAddress, Role.AGMOWNER, true) public {

        //minimumVotingQuorum = _minimumVotingQuorum;
        //marginOfVotesForMajority = _marginOfVotesForMajority;
        //meetingName = _meetingName;
        //meetingDescription = _meetingDescription;
        //meetingDate = _meetingDate;
        //meetingPlace = _meetingPlace;
        //meetingStartTime = _meetingStartTime;
        //meetingEndTime = _meetingEndTime;
        fac = _fac;
        owners.push(_userAddress);
        users.push(User(address(this)));

        emit AgmOwnerCreated(_userAddress);
    }

    function setAgenda(string _agenda) public onlyOwner(msg.sender) /*isSet(agenda)*/ {
        agenda = _agenda;
    }

    function setMeetingPlace(string _meetingPlace) public /*onlyOwner*/ /*isSet(meetingPlace)*/ {
        meetingPlace = _meetingPlace;
    }

    function setMeetingStartTime(string _meetingStartTime) public /*onlyOwner*/ /*isSet(meetingStartTime)*/ {
        meetingStartTime = _meetingStartTime;
    }

    function setMeetingEndTime(string _meetingEndTime) public /*onlyOwner*/ /*isSet(meetingEndTime)*/ {
        meetingEndTime = _meetingEndTime;
    }

    function setMeetingName(string _meetingName) public /*onlyOwner*/ /*isSet(meetingName)*/ {
        meetingName = _meetingName;
    }

    // transfer contract ownership to another director
    function transferOwnership(address _owner) public /*onlyOwner*/ {
        bool isContained = false;
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                isContained = true;
            }
        }
        emit OwnershipSharedTo(msg.sender, _owner);
        //require(isContained, "The caller of the TX is not a AgmOwner");
        owners.push(_owner);

        
    }

    function addUser(address _userAddress, Role role, uint votingWeight, QandA qa) public /*onlyOwner*/ {
        uint id = userId[_userAddress];
        require(id != 0, "User has already been added to the AGM!");
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

    function removeUser(address _userAddress) public /*onlyOwner*/ {
        require(userId[_userAddress] != 0, "User does not exist");
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

    function getUser(address _userAddress) public view returns (address adr, uint role, bool isReg) {
        uint userID = userId[_userAddress];
        if (userID == 0 && _userAddress != userAddress) {
            return (address(0), 3, false);
        }
        User u = users[userID];
        return (u.userAddress(), u.role(), u.isRegistered());
    }

    function getUserList() public view returns (User[] userList) {
        return users;
    }

    function registerUser(string decrPW) public {
        uint usID = userId[msg.sender];
        if (usID != 0) {
            User u = users[usID];
            require(!u.isRegistered(), "The user has already been registered!");
            u.setIsRegistered(true);
            secretPWs[msg.sender] = decrPW;
        }
    }

    function finishAGM() public /*onlyOwner {
        require(!isFinished, "AGM has already been finished");
        isFinished = true;

        emit AgmFinished(isFinished);

    }

    function announceAGM() public /*onlyOwner*/ {
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
    function executeProposal(uint proposalId) public /*onlyOwner*/ returns (bool isExecuted) {
        require(isFinished, "AGM has to be finished first");
        uint winnOptCount;
        (winnOptCount) = fac.evaluateProposal(proposalId);
        emit ProposalExecuted(true, proposalId, winnOptCount);
        return true;
    }
}
