pragma solidity^ 0.4.23;

import "./User.sol";
import "./Director.sol";
import "./Shareholder.sol";
import "./ProposalData.sol";

contract Factory is ProposalData {

    Proposal[] public proposals;
    mapping(address => uint) public votingWeights;

    function createNewShareholder(address _userAddress, uint votingTok) public view returns (Shareholder) {
        return new Shareholder(_userAddress, votingTok, this);
    }

    function createNewDirector(address adr) public view returns (Director) {
        new Director(adr);
    }

    function createNewProposal(string _name, string _description, string _options) public view returns (uint propId) {
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

    function getProposalIdByName(string name) public view returns(uint proposalId) {
        for (uint i = 0; i < proposals.length; i++) {
            if (keccak256(name) == keccak256(proposals[i].name)) {
                return i;
            }
        }
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
    }

    function setVotingWeight(address userAddress, uint weight) public {
        votingWeights[userAddress] = weight;
    }
    

   
}