pragma solidity^ 0.4.23;

import "./User.sol";
import "./Director.sol";
import "./Shareholder.sol";
import "./ProposalData.sol";
import "./QandA.sol";
import "./AgmOwner.sol";

contract Factory is ProposalData {

    mapping(address => Shareholder) public shareholders;
    Proposal[] public proposals;
    mapping(address => uint) public votingWeights;
    // store options to every proposal
    VotingOption[] public votingOptions;
    uint public minimumVotingQuorum;

    struct VotingOption {
        string optionName;
        uint optionCount;
    }

    event ProposalExecuted(uint proposalId, bool proposalPassed, uint passedPercentage);


    function createNewShareholder(address _userAddress, uint votingTok, QandA qa) public returns (Shareholder) {
        Shareholder sh = new Shareholder(_userAddress, votingTok, this, qa);
        shareholders[_userAddress] = sh;
        return sh;
    }

    function createNewDirector(address _userAddress, bool isAdministrator, QandA qa) public returns (Director) {
        if (isAdministrator) {
            return new Director(_userAddress, isAdministrator, qa, 0);
        } else {
            return new Director(_userAddress, isAdministrator, qa, 1);
        }
        
    }

    function createNewProposal(string _name, string _ipfs_hash, string _options) public returns (uint propId) {
        propId = proposals.length++;
        Proposal storage proposal = proposals[propId];
        proposal.proposalId = propId;
        proposal.name = _name;
        proposal.ipfs_hash = _ipfs_hash;
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
        string _ipfs_hash,
        string _options,
        bool _proposalPassed,
        uint _passedPercent,
        uint _voteCount
    ) {
        Proposal storage proposal = proposals[proposalId];
        return
        (proposal.proposalId, proposal.name, proposal.ipfs_hash, proposal.options, proposal.proposalPassed, proposal.passedPercent, proposal.voteCount);
    }

    function setVote(uint proposalId, string votingOption) public {
        Proposal storage prop = proposals[proposalId];

        /*require(!prop.votedOnProposal[msg.sender], "The shareholder already voted");
        require(delegate == address(0), "Proxy is not allowed to vote");*/

        uint voteId = prop.votes.length++;
        prop.votes[voteId] = Vote({
            voterAddress: msg.sender,
            voterDecision: votingOption,
            voterWeight: votingWeights[msg.sender]}
        );
        prop.votedOnProposal[msg.sender] = true;
        prop.voteCount++;
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

    function setMinimumVotingQuorum(uint quorum) public view {
        minimumVotingQuorum = quorum;
    }

    function getVotingOptions(uint optionId) public view returns (string votingOption, uint votingCount) {
        VotingOption storage votOpt = votingOptions[optionId];
        return (votOpt.optionName, votOpt.optionCount);
    }

    /*function getNumOfShareholders() public view returns (uint length) {
        return shareholders.length;
    }*/

    /*function getShareholderList() public view returns (Shareholder[]) {
        return shareholders;
    }*/

    function executeProposal(uint proposalId) public returns (bool success) {
        Proposal storage prop = proposals[proposalId];

        //require(isFinished, "meeting has not finished yet");

        // iterate over all options to store default options in the array
        for (uint k = 0; k < prop.options.length; k++) {
            uint id = votingOptions.length++;
            votingOptions[id] = VotingOption({optionName: prop.options[k], optionCount: 0});

            // iterate over all votes to check which voter voted for option k
            for (uint i = 0; i < prop.votes.length; i++) {

                Vote storage v = prop.votes[i];
                /*if (keccak256(v.voterDecision) == keccak256(prop.options[k])) {
                    votingOptions[k].optionCount++;
                }*/
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
    
        if (countSum >= minimumVotingQuorum
            /*&& (winningOptionCount * 100 / countSum) > marginOfVotesForMajority*/) {
            prop.proposalPassed = true;
        } else {
            prop.proposalPassed = false;
        }

        prop.passedPercent = winningOptionCount * 100 / countSum;

        emit ProposalExecuted(proposalId, prop.proposalPassed, prop.passedPercent);
        return true;
    }
}
