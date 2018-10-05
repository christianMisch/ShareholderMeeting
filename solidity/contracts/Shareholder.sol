pragma solidity ^0.4.23;

import "./User.sol";
import "./AgmOwner.sol";
import "./Factory.sol";
import "./ProposalData.sol";

contract Shareholder is User, ProposalData {

    Factory public fac;
    QandA public qa;

    //address public delegate;
    uint[] public votingDenominations;
    Delegate[] public delegations;
    string[] public selectVotOptions;
    mapping (uint => address) public ratings;

    enum RatingOption {DOWNVOTE, UPVOTE}

    struct Delegate {
        address proxy;
        uint votingWeight;
    }

    modifier onlyShareholder {
        require((this.role() == 2) && (fac.votingWeights(msg.sender) > 0), "user is not a shareholder");
        _;
    }

    event QuestionCreated(uint questionId, address creator);
    event Voted(address invoker, uint proposalId, string votingOption);
    event VoterWeight(address userAddress, uint weight);
    event PartialDelegationFrom(address sender, uint senderWeight, address proxy, uint proxyWeight);
    event SimpleDelegationFrom(address sender, uint senderWeight, address proxy, uint proxyWeight);
    event ShareholderCreated(address userAddress, uint votingWeight);
    event WeightDivision(uint result);
    event CalculateDivision(uint num, uint copy, uint divider);

    constructor(address userAddress, uint _votingWeight, Factory _fac, QandA _qa)
        User(userAddress, Role.SHAREHOLDER) public {

        fac = _fac;
        qa = _qa;
        fac.setVotingWeight(userAddress, _votingWeight);

        emit ShareholderCreated(userAddress, fac.votingWeights(userAddress));
    }

    function vote(uint proposalId, string votingOption) public {
        selectVotOptions.push(votingOption);
        fac.setVote(proposalId, votingOption, msg.sender);

        emit Voted(userAddress, proposalId, votingOption);
    }

    function getNumOfSelectVotOptions() public view returns (uint length) {
        return selectVotOptions.length;
    }

    function createQuestion(string _ipfs_hash) public returns (uint questId) {

        questId = qa.createNewQuestion(_ipfs_hash, msg.sender);

        emit QuestionCreated(questId, msg.sender);
    }

    function rateQuestion(uint questionId, RatingOption ratingOpt) public {
        //require(ratings[questionId] != msg.sender, "sender has already rated this question");
        qa.setRating(questionId, uint(ratingOpt));
        ratings[questionId] = msg.sender;
    }

    function denominateVotingTokens(uint numOfBlockWeights, uint factor) public {

        uint voterWeight = fac.votingWeights(msg.sender);
        uint subtractedVoteWeight;

        if (factor != 0 && numOfBlockWeights != 0) {
            require(voterWeight >= factor * numOfBlockWeights, "sender has not enough voting weight for factor-based denomination");
            for (uint i = 0; i < numOfBlockWeights; i++) {
                votingDenominations.push(factor);
            }
            subtractedVoteWeight = voterWeight - (factor * numOfBlockWeights);
            fac.setVotingWeight(msg.sender, subtractedVoteWeight);

        } else if (numOfBlockWeights != 0 && factor == 0) {
            require(voterWeight > numOfBlockWeights, "sender does not have enough voting weight");
            for (uint k = 0; k < numOfBlockWeights; k++) {
                votingDenominations.push(1);
            }
            subtractedVoteWeight = voterWeight - numOfBlockWeights;
            fac.setVotingWeight(msg.sender, subtractedVoteWeight);

        } else {
            revert("Denomination failed. Please check the params for correct denomination");
        }
    }

    /*function getVoterWeight(address _userAddress) public returns (uint weight) {
        weight = 0;
        for (uint i = 0; i < fac.getNumOfShareholders(); i++) {

            (address currAddress,,address _delegate) = fac.getShareholder(i);
            if (_delegate == _userAddress) {
                weight += fac.votingWeights(currAddress);
            }

            if (currAddress == _userAddress && _delegate == address(0)) {
                weight += fac.votingWeights(currAddress);
            }
        }

        emit VoterWeight(_userAddress, weight);
    }*/

    // if shareholder voted on any proposal he cannot delegate his VP to a proxy anymore
    function delegateToProxy(address proxyAddress, bool partialDelegation, uint voteBlockIndex) public {
        require(fac.votingWeights(msg.sender) >= 0, "Sender does not own enough voting tokens");
        //require(proxyAddress != msg.sender, "Self-delegation is not allowed");
        //require(userExists(proxyAddress), "Proxy is not a registered user");
        //require(userExists(msg.sender), "the user account is not registered");
        //require(delegate == address(0), "user already has delegated to another proxy");

        uint senderWeight = fac.votingWeights(msg.sender);
        if (partialDelegation) {
            require(votingDenominations.length != 0, "shareholder cannot delegate partially because he doesn't own weight blocks");
            // partial voting, delegate a voting weight block of his total voting weight to one proxy
            uint targetVoteWeight = votingDenominations[voteBlockIndex - 1];
            // deletes voting weight block in the weight array
            delete votingDenominations[voteBlockIndex - 1];

            
            // deletes the entry with swapping elements if required
            for (; voteBlockIndex < votingDenominations.length - 1; voteBlockIndex++) {
                votingDenominations[voteBlockIndex] = votingDenominations[voteBlockIndex+1];
            }

            votingDenominations.length--;

            uint newWeightWithPartDeleg = fac.votingWeights(proxyAddress) + targetVoteWeight;
            fac.setVotingWeight(proxyAddress, newWeightWithPartDeleg);

            delegations.push(Delegate(proxyAddress, targetVoteWeight));

            emit PartialDelegationFrom(msg.sender, senderWeight, proxyAddress, targetVoteWeight);
        } else {

            // subtract tokens from sender and add them to proxy
            fac.setVotingWeight(msg.sender, 0);
            uint newWeight = fac.votingWeights(proxyAddress) + senderWeight;
            fac.setVotingWeight(proxyAddress, newWeight);

            delegations.push(Delegate(proxyAddress, senderWeight));

            emit SimpleDelegationFrom(msg.sender, senderWeight, proxyAddress, newWeight);
        }
    }

    function getDelegate(uint delegateId) public view returns (address _proxyAddress, uint _votingWeight) {
        Delegate storage deleg = delegations[delegateId];
        return (deleg.proxy, deleg.votingWeight);
    }

    function getNumOfDelegations() public view returns (uint length) {
        return delegations.length;
    }

    function getNumOfVotingDenominations() public view returns (uint length) {
        return votingDenominations.length;
    }

    function getVotingDenominations() public view returns (uint[] denominations) {
        return votingDenominations;
    }
}

/*
} else if (numOfBlockWeights == 0 && factor == 0 && dividedWeight != 0 && divider != 0) {
            for (uint j = 0; j < divider; j++) {
                votingDenominations.push(dividedWeight);
            }
            fac.setVotingWeight(msg.sender, 0);
            emit WeightDivision(dividedWeight);

    function safeDivision(uint number, uint divider) public returns (uint result) {
        uint copy = number;
        emit CalculateDivision(number, copy, divider);
        uint currVal;
        result = 0;
        for (; copy == 0; result++) {
            currVal = copy - divider;
            copy = currVal;
        }

        return result;
    }

*/
