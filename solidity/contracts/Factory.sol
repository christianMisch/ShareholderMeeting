pragma solidity^ 0.4.23;

import "./User.sol";
import "./Director.sol";
import "./Shareholder.sol";
import "./ProposalData.sol";
import "./QandA.sol";
import "./AgmOwner.sol";

/**
*   @title factory for creating different users according to their role
*          stores also the proposals and voting weights which can be accessed by other user contracts
*/
contract Factory is ProposalData {

    // stores a shareholder object to a specific user address
    mapping(address => Shareholder) private shareholders;
    // stores all available voting options for a specific proposal
    mapping(uint => string[]) private propToOptMapping;
    // stores all shareholders who casted their vote
    address[] private votingShareholders;
    // stores all proposals
    Proposal[] private proposals;
    // stores the voting weight of every user
    mapping(address => uint) public votingWeights;
    // stores the number of votes for a specific voting option
    VotingOption[] private votingOptions;
    // determines the minimum number of votes per proposal which is required to compute the tally and statistic
    uint private minimumVotingQuorum;
    // for incrementing the proposal id to assign the options the right proposal
    uint private propId = 0;

    struct VotingOption {
        string optionName;
        uint optionCount;
    }

    /**
    *   @dev getters and setters
    */

    function setVote(uint proposalId, string votingOption, address sender) public {
        Proposal storage prop = proposals[proposalId];
        require(prop.votedOnProposal[sender] != true, "The shareholder already voted");
        uint voteId = prop.votes.length++;
        // the shareholder weight is stored within the vote
        prop.votes[voteId] = Vote({
            voterAddress: sender,
            voterDecision: votingOption,
            voterWeight: votingWeights[sender]}
        );
        // the shareholder is marked that he voted on this proposal
        prop.votedOnProposal[sender] = true;
        prop.voteCount++;
        // the shareholder is appended to the list of voters
        votingShareholders.push(sender);
    }

    function setVotingWeight(address userAddress, uint weight) public {
        votingWeights[userAddress] = weight;
    }

    function setMinimumVotingQuorum(uint quorum) public {
        minimumVotingQuorum = quorum;
    }

    function getNumOfProposals() public view returns (uint length) {
        return proposals.length;
    }

    function getProposal(uint proposalId) public view returns (
        uint _proposalId,
        string _name,
        string description,
        string _options,
        bool _proposalPassed,
        uint _passedPercent,
        uint _voteCount
    ) {
        Proposal storage proposal = proposals[proposalId];
        return
        (proposal.proposalId, proposal.name, proposal.description, proposal.options, proposal.proposalPassed, proposal.passedPercent, proposal.voteCount);
    }

    function getVote(uint proposalID, uint voteId) public view returns (address user, string option, uint weight) {
        Proposal storage proposal = proposals[proposalID];
        Vote storage v = proposal.votes[voteId];
        if (v.voterAddress == address(0)) {
            return (address(0), "", 0);
        }
        return (v.voterAddress, v.voterDecision, v.voterWeight);
    }

    function getNumOfVotes(uint proposalId) public view returns (uint length) {
        Proposal storage proposal = proposals[proposalId];
        return proposal.votes.length;
    }

    function getShareholder(address shAdr) public view returns (
        address _userAddress,
        uint _role,
        uint _shares
    ) {
        Shareholder sh = shareholders[shAdr];
        return
            (sh.userAddress(), sh.role(), votingWeights[sh.userAddress()]);
    }

    function getVotingOption(uint optionId) public view returns (string votingOption, uint votingCount) {
        VotingOption storage votOpt = votingOptions[optionId];
        return (votOpt.optionName, votOpt.optionCount);
    }

    function getNumOfVotingOptions() public view returns (uint length) {
        return votingOptions.length;
    }

    function getWeightOfShareholder(uint shareholderId) public view returns (address adr, uint weight) {
        return (votingShareholders[shareholderId], 
            votingWeights[votingShareholders[shareholderId]]);
    }

    function getNumOfVotingShareholders() public view returns (uint length) {
        return votingShareholders.length;
    }

    function getOptionsLengthForProposal(uint proposalId) public view returns (uint length) {
        return propToOptMapping[proposalId].length;
    }

    function getPropOptions(uint proposalId, uint optId) public view returns (string opt) {
        return propToOptMapping[proposalId][optId];
    }

    /**
    *   @dev factory method to create a new shareholder
    *   @param _userAddress address of the user
    *   @param weight voting weight = number of shares of the user
    *   @param qa reference to access the Q&A lists
    *   @return sh a new Shareholder object 
    */
    function createNewShareholder(address _userAddress, uint weight, QandA qa) public returns (Shareholder) {
        Shareholder sh = new Shareholder(_userAddress, weight, this, qa);
        shareholders[_userAddress] = sh;
        return sh;
    }

    /**
    *   @dev factory method to create a new director
    *   @param _userAddress address of the user
    *   @param isAdministrator indicated whether the director has admin rights
    *   @param qa reference to access the Q&A lists
    *   @return d a new Director object
    */
    function createNewDirector(address _userAddress, bool isAdministrator, QandA qa) public returns (Director) {
        if (isAdministrator) {
            return new Director(_userAddress, isAdministrator, qa, 0);
        } else {
            return new Director(_userAddress, isAdministrator, qa, 1);
        }
        
    }

    /**
    *   @dev factory method to create a new proposal
    *   @param _name name of the proposal
    *   @param _description description of the proposal
    *   @param _options voting options of the proposal
    *   @return proposalId the id of the new created proposal
    */
    function createNewProposal(string _name, string _description, string _options) public returns (uint proposalId) {
        proposalId = proposals.length++;
        Proposal storage proposal = proposals[propId];
        proposal.proposalId = propId;
        proposal.name = _name;
        proposal.description = _description;
        proposal.options = _options;
        proposal.proposalPassed = false;
        proposal.passedPercent = 0;
        proposal.voteCount = 0;
    }

    /**
    *   @dev increment the proposal id 
    */
    function incrementPropId() public {
        propId++;
    }

    /**
    *   @dev push a voting option to the proposal - voting option mapping
    *   @param proposalId the id of the proposal
    *   @param opt the voting options which shall be added
    */
    function appendVotingOptionToProposal(uint proposalId, string opt) public {
        propToOptMapping[proposalId].push(opt);
    }

    /**
    *   @dev complete the execution of the proposal and compute the vote tally for every voting option
    *         and checks whether the voting quorum is satisfied
    *   @param proposalId the id of the proposal which shall be evaluated
    *   @return winnCount the voting option's vote number for which most of the shareholder voted
    */
    function evaluateProposal(uint proposalId) public returns (uint winnCount) {
        Proposal storage prop = proposals[proposalId];
        for (uint k = 0; k < propToOptMapping[proposalId].length; k++) {
            votingOptions.length++;
            votingOptions[k] = VotingOption({optionName: propToOptMapping[proposalId][k], optionCount: 0});
            // iterate over all votes of all proposals to check which voter voted for option k
            for (uint i = 0; i < prop.votes.length; i++) {
                Vote storage v = prop.votes[i];
                if (utilCompareInternal(v.voterDecision, votingOptions[k].optionName)) {
                    votingOptions[k].optionCount++;
                }
            }  
        }
        uint winningOptionCount = 0;
        for (uint j = 0; j < votingOptions.length; j++) {
            if (winningOptionCount < votingOptions[j].optionCount) {
                winningOptionCount = votingOptions[j].optionCount;
            }
        }
        if (prop.voteCount >= minimumVotingQuorum) {
            prop.proposalPassed = true;
            prop.passedPercent = winningOptionCount / prop.voteCount * 100;
        } else {
            prop.proposalPassed = false;
        }
        return (winningOptionCount);
    }

    /**
    *   @dev utility function for comparing strings
    *   @param a fist string
    *   @param b second string
    *   @return isEqual indicates whether the two input strings are equal
    */
    function utilCompareInternal(string a, string b) public pure returns (bool isEqual) {
        if (bytes(a).length != bytes(b).length) {
            return false;
        }
        for (uint i = 0; i < bytes(a).length; i ++) {
            if(bytes(a)[i] != bytes(b)[i]) {
                return false;
            }
        }
        return true;
    }
}
