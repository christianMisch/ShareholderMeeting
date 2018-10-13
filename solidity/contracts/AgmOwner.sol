pragma solidity ^0.4.23;

import "./User.sol";
import "./Shareholder.sol";
import "./Director.sol";
import "./Factory.sol";

/**
*    @title AgmOwner - is the superadmin of the AGM process and therefore, a singleton
*/
contract AgmOwner is User {

    // reference to proposal storage
    Factory public fac;
    // total number of users
    uint public numberOfUsers;
    // stores all users
    User[] public users;
    // stores user's address with corresponding id
    mapping(address => uint) public userId;
    // stores the decrypted password for any user
    mapping(address => string) public secretPWs;
    // stores the owners who have permission to setup the AGM
    address[] public owners;
    // timers for AGM process
    bool public isFinished = false;
    bool public isAnnounced = false;
    
    // params for AGM setup
    string public meetingName;
    string public agenda;
    string public meetingPlace;
    string public meetingStartTime;
    string public meetingEndTime;

    /**
    *    @dev checks whether the parameter is already set
    */
    modifier isSet(string param) {
        require(bytes(param).length == 0, "The parameter has already been set");
        _;
    }

    /**
    *    @dev checks that the caller is an administrator (=AgmOwner)
    */
    modifier onlyOwner {
        bool isOwner = false;
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                isOwner = true;
            }
        }
        require(isOwner == true, "Only an AGM owner can access this function!");
        _;
    }

    /**
    *    @dev events for testing and debugging
    */
    event ProposalExecuted(bool isExecuted, uint propId, uint winnOptCount);
    event ProposalCreated(uint propId, address creator);
    event Voted(address userAddress, uint proposalId, string votingOption);
    event AgmFinished(bool isFinished);
    event OwnershipSharedTo(address caller, address newOwner);
    event UserCreated(uint userId, address userAddress, string role);
    event UserRemoved(uint userId, address userAddress, uint role);
    event AgmAnnounced(bool isAnnounced);
    event AgmOwnerCreated(address adr);

    /**
    *    @dev the deployer of this contract is always appended as first user to the user list
    */
    constructor(
        address _userAddress,
        Factory _fac
    ) User(_userAddress, Role.AGMOWNER, true) public {

        fac = _fac;
        owners.push(_userAddress);
        users.push(User(address(this)));
        userId[_userAddress] = 0;

        emit AgmOwnerCreated(_userAddress);
    }

    /**
    *    @dev setters for setting the AGM parameters and getters
    */
    function setAgenda(string _agenda) public onlyOwner isSet(agenda) {
        agenda = _agenda;
    }

    function setMeetingPlace(string _meetingPlace) public onlyOwner isSet(meetingPlace) {
        meetingPlace = _meetingPlace;
    }

    function setMeetingStartTime(string _meetingStartTime) public onlyOwner isSet(meetingStartTime) {
        meetingStartTime = _meetingStartTime;
    }

    function setMeetingEndTime(string _meetingEndTime) public onlyOwner isSet(meetingEndTime) {
        meetingEndTime = _meetingEndTime;
    }

    function setMeetingName(string _meetingName) public onlyOwner isSet(meetingName) {
        meetingName = _meetingName;
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

    /**
    *   @dev transfer admin rights to another user who has the AgmOwner role
    *   @param _owner address of the user
    */
    function transferOwnership(address _owner) public onlyOwner {
        require(userId[_owner] != 0, "The new user does not exist!");
        owners.push(_owner);

        emit OwnershipSharedTo(msg.sender, _owner);
    }

    /**
    *   @dev adds a user to the user list
    *   @param _userAddress address of the user
    *   @param role role of the user
    *   @param qa reference to the Q&A lists
    */
    function addUser(address _userAddress, Role role, uint votingWeight, QandA qa) public onlyOwner {
        uint id = userId[_userAddress];
        require(id == 0, "User has already been added to the AGM!");
        
        id = users.length++;
        userId[_userAddress] = id;
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

    /**
    *   @dev remove a user from the user list thus, he cannot login into the app
    *   @param _userAddress the address of the user who shall be removed 
    */
    function removeUser(address _userAddress) public onlyOwner {
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

    /**
    *   @dev for authentication, if users are registered once they only need their private password to login
    *   @param decrPW - the randomly generated pw of the user which is stored in the address to pw mapping
    */
    function registerUser(string decrPW) public {
        uint usID = userId[msg.sender];
        require(usID != 0, "User has not been added to the user list");
        User u = users[usID];
        require(!u.isRegistered(), "The user has already been registered!");
        u.setIsRegistered(true);
        secretPWs[msg.sender] = decrPW;
    }

    /**
    *   @dev set the finish flag which is required to show the statistics 
    */
    function finishAGM() public onlyOwner {
        require(!isFinished, "AGM has already been finished");
        isFinished = true;

        emit AgmFinished(isFinished);

    }

    /**
    *   @dev announce the AGM, then all the AGM params are visible to the other users 
    */
    function announceAGM() public onlyOwner {
        require(!isAnnounced, "AGM has already been announced");
        isAnnounced = true;

        emit AgmAnnounced(isAnnounced);
    }

    /**
    *   @dev create a new proposal
    *   @param _name name of the proposal
    *   @param description of the proposal
    *   @param _options different voting options of the proposal
    *   @return propId the id of the proposal  
    */
    function createProposal(string _name, string description, string _options)
        public onlyOwner returns(uint propId) {

        propId = fac.createNewProposal(_name, description, _options);
        emit ProposalCreated(propId, msg.sender);

        return propId;
    }

    /**
    *   @dev executes a pending proposal, required to evaluate the proposals (vote tally etc.)
    *   @param proposalId id of the proposal
    *   @return isExecuted is true if the execution was successfull
    */
    function executeProposal(uint proposalId) public onlyOwner returns (bool isExecuted) {
        require(isFinished, "AGM has to be finished first");
        uint winnOptCount;
        (winnOptCount) = fac.evaluateProposal(proposalId);
        emit ProposalExecuted(true, proposalId, winnOptCount);
        return true;
    }
}
