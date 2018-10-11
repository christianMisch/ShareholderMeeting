pragma solidity^ 0.4.23;

import "./User.sol";
import "./Director.sol";
import "./Shareholder.sol";
import "./ProposalData.sol";
import "./QandA.sol";
import "./AgmOwner.sol";

contract Factory is ProposalData {

    mapping(address => Shareholder) public shareholders;
    mapping(uint => string[]) public propToOptMapping;
    address[] public votingShareholders;
    Proposal[] public proposals;
    mapping(address => uint) public votingWeights;
    // stores all option names
    //string[] public propOptions;
    // stores the counter to every voting option
    VotingOption[] public votingOptions;
    uint public minimumVotingQuorum;
    uint public propId = 0;

    struct VotingOption {
        string optionName;
        uint optionCount;
    }

    function createNewShareholder(address _userAddress, uint weight, QandA qa) public returns (Shareholder) {
        Shareholder sh = new Shareholder(_userAddress, weight, this, qa);
        shareholders[_userAddress] = sh;
        //votingWeights[_userAddress] = weight;
        return sh;
    }

    function createNewDirector(address _userAddress, bool isAdministrator, QandA qa) public returns (Director) {
        if (isAdministrator) {
            return new Director(_userAddress, isAdministrator, qa, 0);
        } else {
            return new Director(_userAddress, isAdministrator, qa, 1);
        }
        
    }

    function createNewProposal(string _name, string _description, string _options) public returns (uint propId) {
        propId = proposals.length++;
        Proposal storage proposal = proposals[propId];
        proposal.proposalId = propId;
        proposal.name = _name;
        //proposal.ipfs_hash = _ipfs_hash;
        proposal.description = _description;
        proposal.options = _options;
        proposal.proposalPassed = false;
        proposal.passedPercent = 0;
        proposal.voteCount = 0;
    }

    function getNumOfProposals() public view returns (uint length) {
        return proposals.length;
    }

    function getProposal(uint proposalId) public view returns (
        uint _proposalId,
        string _name,
        //string _ipfs_hash,
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

    function setVote(uint proposalId, string votingOption, address sender) public {
        Proposal storage prop = proposals[proposalId];
        require(prop.votedOnProposal[sender] != true, "The shareholder already voted");

        uint voteId = prop.votes.length++;
        prop.votes[voteId] = Vote({
            voterAddress: sender,
            voterDecision: votingOption,
            voterWeight: votingWeights[sender]}
        );
        prop.votedOnProposal[sender] = true;
        prop.voteCount++;
        votingShareholders.push(sender);
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

    function setVotingWeight(address userAddress, uint weight) public {
        votingWeights[userAddress] = weight;
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

    /*function getShareholderWithOption(address shAdr, uint optId) public view returns (string _opt) {
        Shareholder sh = shareholders[shAdr];
        return sh.selectVotOptions(optId);
    }

    function getShareholderWithOptionLength(address shAdr) public view returns (uint length) {
        var sh = shareholders[shAdr];
        return sh.getNumOfSelectVotOptions();
    }*/

    function setMinimumVotingQuorum(uint quorum) public {
        minimumVotingQuorum = quorum;
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

    /*function getNumOfShareholders() public view returns (uint length) {
        return shareholders.length;
    }*/

    /*function getShareholderList() public view returns (Shareholder[]) {
        return shareholders;
    }*/

    function incrementPropId() public view {
        propId++;
    }

    function appendVotingOptionToProposal(uint proposalId, string opt) public {
        propToOptMapping[proposalId].push(opt);
    }

    function getOptionsLengthForProposal(uint proposalId) public view returns (uint length) {
        return propToOptMapping[proposalId].length;
    }

    function getPropOptions(uint proposalId, uint optId) public view returns (string opt) {
        return propToOptMapping[proposalId][optId];
    }

    function evaluateProposal(uint proposalId) public returns (uint winnCount) {

        //require(isFinished, "meeting has not finished yet");
        // iterate over all options to store default options in the array
        /*for (uint k = 0; k < propOptions.length; k++) {
            uint id = votingOptions.length++;
            votingOptions[id] = VotingOption({optionName: propOptions[k], optionCount: 0});
            // iterate over all votes of all proposals to check which voter voted for option k
            for (uint l = 0; l < proposals.length; l++) {
                Proposal storage prop = proposals[l];
                for (uint i = 0; i < prop.votes.length; i++) {
                    Vote storage v = prop.votes[i];
                    if (utilCompareInternal(v.voterDecision, propOptions[k])) {
                        votingOptions[k].optionCount++;
                    }
                }  
            }
        }*/
        Proposal storage prop = proposals[proposalId];
        for (uint k = 0; k < propToOptMapping[proposalId].length; k++) {
            /*uint id = */
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
            //countSum += votingOptions[j].optionCount;
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

    function utilCompareInternal(string a, string b) public pure returns (bool) {
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
