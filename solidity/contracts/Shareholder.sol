pragma solidity ^0.4.23;

import "./User.sol";
import "./AgmOwner.sol";
import "./Factory.sol";
import "./ProposalData.sol";

/**
*   @title this contract represents a shareholder of the corporation and his shareholder rights during the AGM
*/
contract Shareholder is User, ProposalData {
    // reference to the proposals
    Factory public fac;
    // reference to the Q&A lists
    QandA public qa;
    // list of all share blocks which are created during denomination
    uint[] public votingDenominations;
    // list of all delegations to proxies
    Delegate[] private delegations;
    // to remember which shareholder rated on which specific question
    mapping (uint => address) private ratings;
    // possible rating options
    enum RatingOption {DOWNVOTE, UPVOTE}

    struct Delegate {
        address proxy;
        // number of shares of the sender
        uint votingWeight;
    }

    /**
    *   @dev checks that the caller has the shareholder role
    */
    modifier onlyShareholder {
        require((this.role() == 2), "User is not a shareholder");
        _;
    }

    event QuestionCreated(uint questionId, string creator);
    event Voted(address invoker, uint proposalId, string votingOption);
    event VoterWeight(address userAddress, uint weight);
    event PartialDelegationFrom(address sender, uint senderWeight, address proxy, uint proxyWeight);
    event SimpleDelegationFrom(address sender, uint senderWeight, address proxy, uint proxyWeight);
    event ShareholderCreated(address userAddress, uint votingWeight);
    event WeightDivision(uint result);
    event CalculateDivision(uint num, uint copy, uint divider);

    /**
    *   @dev the voting weight is set during the shareholder construction
    */
    constructor(address userAddress, uint _votingWeight, Factory _fac, QandA _qa)
        User(userAddress, Role.SHAREHOLDER, false) public {

        fac = _fac;
        qa = _qa;
        fac.setVotingWeight(userAddress, _votingWeight);

        emit ShareholderCreated(userAddress, fac.votingWeights(userAddress));
    }

    /**
    *   @dev implements the voting behavior: a shareholder can vote on a specific proposal
    *   @param proposalId the id of the proposal
    *   @param votingOption the voting option for which the shareholder voted
    */
    function vote(uint proposalId, string votingOption) public onlyShareholder {
        fac.setVote(proposalId, votingOption, msg.sender);

        emit Voted(userAddress, proposalId, votingOption);
    }

    /**
    *   @dev create a new question
    *   @param _ipfs_hash the hash where the question content is stored
    *   @param creator the creator of the question
    *   @return questId the id of the new generated question
    */
    function createQuestion(string _ipfs_hash, string creator) public onlyShareholder returns (uint questId) {
        questId = qa.createNewQuestion(_ipfs_hash, creator);

        emit QuestionCreated(questId, creator);
    }

    /**
    *   @dev rate a specific question
    *   @param questionId the id of the question
    *   @param ratingOpt = 0 (dislike) | 1 (like)
    */
    function rateQuestion(uint questionId, RatingOption ratingOpt) public onlyShareholder {
        require(ratings[questionId] == address(0), "The shareholder has already rated this question");
        qa.setRating(questionId, uint(ratingOpt), msg.sender);
        ratings[questionId] = msg.sender;
    }

    /**
    *   @dev denominate the number of shares into smaller share blocks and to store them in the denomination list
    *   @param numOfBlockWeights the number of share blocks which shall be created
    *   @param factor the number of shares which are stored in a single share block 
    */
    function denominateVotingTokens(uint numOfBlockWeights, uint factor) public onlyShareholder {
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

    /**
    *   @dev supporting delegation types:
    *            - simple delegation: all shares are delegated to the proxy
    *            - partial delegation: a specific share block from the denomination list is delegated to a specific proxy
    *    @param proxyAddress the address of the proxy
    *    @param partialDelegation indicated which delegation type shall be applied
    *    @param voteBlockIndex the index of the share block in the denomination list
    */
    function delegateToProxy(address proxyAddress, bool partialDelegation, uint voteBlockIndex) public onlyShareholder {
        require(fac.votingWeights(msg.sender) >= 0, "Sender does not own enough voting tokens");
        uint senderWeight = fac.votingWeights(msg.sender);
        if (partialDelegation) {
            require(votingDenominations.length != 0, "shareholder cannot delegate partially because he does not denominated his shares");
            // the enumaration of share blocks starts from 1 in the UI
            uint targetVoteWeight = votingDenominations[voteBlockIndex - 1];
            // deletes voting weight block in the denomination list of the shareholder
            delete votingDenominations[voteBlockIndex - 1];
            uint newWeightWithPartDeleg = fac.votingWeights(proxyAddress) + targetVoteWeight;
            // add the voting weight of the sender to the proxy
            fac.setVotingWeight(proxyAddress, newWeightWithPartDeleg);
            delegations.push(Delegate(proxyAddress, targetVoteWeight));

            emit PartialDelegationFrom(msg.sender, senderWeight, proxyAddress, targetVoteWeight);
        } else {
            // subtract ALL shares from the sender and add them to proxy
            fac.setVotingWeight(msg.sender, 0);
            uint newWeight = fac.votingWeights(proxyAddress) + senderWeight;
            fac.setVotingWeight(proxyAddress, newWeight);
            delegations.push(Delegate(proxyAddress, senderWeight));

            emit SimpleDelegationFrom(msg.sender, senderWeight, proxyAddress, newWeight);
        }
    }
}
