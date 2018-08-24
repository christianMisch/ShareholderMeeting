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

    function createNewProposal(string _name, string _description, string _options) public returns (uint propId) {
        propId = proposals.length++;
        Proposal storage proposal = proposals[propId];
        proposal.proposalId = propId;
        proposal.name = _name;
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
        string _description,
        string _options,
        bool _proposalPassed,
        uint _passedPercent,
        uint _voteCount
    ) {
        Proposal storage proposal = proposals[proposalId];
        return
        (proposal.proposalId, proposal.name, proposal.description, proposal.options, proposal.proposalPassed,
        proposal.passedPercent, proposal.voteCount);
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

    function getVote(uint proposalID, address voter) public view returns (address user, string option, uint weight) {
        Proposal storage proposal = proposals[proposalID];

        for (uint i = 0; i < proposal.votes.length; i++) {
            Vote storage v = proposal.votes[i];

            if (true) {
                return (v.voterAddress, v.voterDecision, v.voterWeight);
            }
        }
        return (address(0), "", 0);
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

    /*function getNumOfShareholders() public view returns (uint length) {
        return shareholders.length;
    }*/

    /*function getShareholderList() public view returns (Shareholder[]) {
        return shareholders;
    }*/
}
