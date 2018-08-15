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
    // store options to every proposal
    VotingOption[] public votingOptions;

    bool public isFinished = false;

    uint public minimumVotingQuorum;
    uint public marginOfVotesForMajority;
    string public meetingName;
    string public meetingDescription;
    string public meetingDate;
    string public meetingPlace;
    uint public meetingStartTime;
    uint public meetingEndTime;

    struct VotingOption {
        string optionName;
        uint optionCount;
    }

    modifier onlyOwner {
        require(userAddress == msg.sender, "only the contract owner can access this function!");
        _;
    }

    event ProposalCreated(uint propId, address creator);
    event Voted(address userAddress, uint proposalId, string votingOption);
    event AgmFinished(bool isFinished);
    event ProposalExecuted(uint proposalId, bool proposalPassed, uint passedPercentage, VotingOption[] options);
    event OwnershipTransferedTo(address newOwner);
    event UserCreated(uint userId, address userAddress, bool isDirector);
    event UserRemoved(uint userId, address userAddress, bool isDirector);

    constructor(
        address _userAddress,
        uint _minimumVotingQuorum,
        uint _marginOfVotesForMajority,
        string _meetingName,
        string _meetingDescription,
        string _meetingDate,
        string _meetingPlace,
        uint _meetingStartTime,
        uint _meetingEndTime,
        Factory _fac
    ) 
            
            User(_userAddress, true) public {
        
        minimumVotingQuorum = _minimumVotingQuorum;
        marginOfVotesForMajority = _marginOfVotesForMajority;
        meetingName = _meetingName;
        meetingDescription = _meetingDescription;
        meetingDate = _meetingDate;
        meetingPlace = _meetingPlace;
        meetingStartTime = _meetingStartTime;
        meetingEndTime = _meetingEndTime;
        fac = _fac;
    }

    // transfer contract ownership to another director
    function transferOwnership(address _owner) public onlyOwner {
        userAddress = _owner;

        emit OwnershipTransferedTo(_owner);
    }

    function addUser(address _userAddress, bool isDirector, uint votingWeight, QandA qa) public {
        uint id = userId[_userAddress];
        if (id == 0) {
            id = users.length++;
            userId[_userAddress] = id;
        }

        if (isDirector) {
            Director d = fac.createNewDirector(_userAddress, qa);
            users[id] = d;
            
            emit UserCreated(id, _userAddress, true);
        
        } else {
            Shareholder s = fac.createNewShareholder(_userAddress, votingWeight, qa);
            users[id] = s;
            
            emit UserCreated(id, _userAddress, false);
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

        emit UserRemoved(i, _userAddress, remUser.isDirector());
    }

    function getNumOfUsers() public view returns (uint length) {
        return users.length;
    }

    function getUser(address _userAddress) public view returns (User u) {
        return users[userId[_userAddress]];
    }

    function finishAGM() public /*onlyOwner*/ {
        require(!isFinished, "AGM has already been finished");
        isFinished = true;

        emit AgmFinished(isFinished);

    }

    function announceAGM() public onlyOwner view returns (string recordDate, string recordPlace) {
        return (meetingDate, meetingPlace);
    }

    // only director is allowed to create a proposal
    function createProposal(string _name, string _description, string _options) 
        public /*onlyOwner*/ returns(uint propId) {

        propId = fac.createNewProposal(_name, _description, _options);
        emit ProposalCreated(propId, msg.sender);

        return propId;
    }

    // executes the pending proposal
    /*function executeProposal(uint proposalId) public {
        
        Proposal storage prop = proposals[proposalId];
        var optionString = proposals[proposalId].options.toSlice();
        var delim = ";".toSlice();
        var options = new string[](optionString.count(delim) + 1);
        for (uint l = 0; l < options.length; l++) {
            options[l] = optionString.split(delim).toString();
        }

        require(now > meetingEndTime, "meeting has not finished yet");

        
        // iterate over all options to store default options in the map
        for (uint k = 0; k < options.length; k++) {
            uint id = votingOptions.length++;
            votingOptions[id] = VotingOption({optionName: options[k], optionCount: 0});

            // iterate over all votes to check which voter voted for option k
            for (uint i = 0; i < prop.votes.length; i++) {
                
                Vote storage v = prop.votes[i];
                if (keccak256(v.voterDecision) == keccak256(options[k])) {
                    votingOptions[k].optionCount++; 
                } 
            }
        }
        uint winningOptionCount = 0;
        uint countSum = 0;
        
        for (uint j = 0; j < votingOptions.length; j++) {
            countSum += votingOptions[j].optionCount;
            if (winningOptionCount < votingOptions[j].optionCount) {
                winningOptionCount = votingOptions[j].optionCount;
            }
        }

        if (winningOptionCount > minimumVotingQuorum 
            && (winningOptionCount * 100 / countSum) > marginOfVotesForMajority) {
            prop.proposalPassed = true;
        } else {
            prop.proposalPassed = false;
        }

        prop.passedPercent = winningOptionCount * 100 / countSum;

        delete votingOptions;

        emit ProposalExecuted(proposalId, prop.proposalPassed, prop.passedPercent, votingOptions);
    }*/
}