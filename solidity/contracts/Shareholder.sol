pragma solidity ^0.4.23;

import "./User.sol";
import "./AgmOwner.sol";
import "./Factory.sol";
import "./ProposalData.sol";

contract Shareholder is User, ProposalData {

    Factory public fac;
    QandA public qa;

    address public delegate;
    uint[] public votingDenominations;
    Delegate[] public delegations;
    mapping (uint => address) public ratings;

    enum RatingOption {DOWNVOTE, UPVOTE}

    struct Delegate {
        address proxy;
        uint votingWeight;
    }

    modifier onlyShareholder {
        require((!this.isDirector()) && (fac.votingWeights(msg.sender) > 0));
        _;
    }

    event QuestionCreated(uint questionId, address creator);
    event Voted(address invoker, uint proposalId, string votingOption);
    event VoterWeight(address userAddress, uint weight);
    event PartialDelegationFrom(address sender, uint senderWeight, address proxy, uint proxyWeight);
    event SimpleDelegationFrom(address sender, uint senderWeight, address proxy, uint proxyWeight);
    event ShareholderCreated(address userAddress, uint votingWeight, address delegate);
    
    constructor(address userAddress, uint _votingWeight, Factory _fac, QandA _qa) 
        User(userAddress, false) public {
        
        fac = _fac;
        qa = _qa;
        fac.setVotingWeight(userAddress, _votingWeight);
        delegate = address(0);

        emit ShareholderCreated(userAddress, fac.votingWeights(userAddress), delegate);
    }

    function vote(uint proposalId, string votingOption) public {
        fac.setVote(proposalId, votingOption);
        
        emit Voted(userAddress, proposalId, votingOption);
    }

    function createQuestion(string _content) public returns (uint questId) {

        questId = qa.createNewQuestion(_content, msg.sender);

        emit QuestionCreated(questId, msg.sender);
    }

    function rateQuestion(uint questionId, RatingOption ratingOpt) public {
        require(ratings[questionId] != msg.sender, "sender has already rated this question");
        qa.setRating(questionId, uint(ratingOpt));
        ratings[questionId] = msg.sender;
    }

    function denominateVotingTokens(uint numOfThousandWeights, uint divider) public {
        uint voterWeight = fac.votingWeights(msg.sender);
        if (divider == 0) {
            for (uint i = 0; i < numOfThousandWeights; i++) {
                votingDenominations.push(1000);
            }
        } else {
            uint dividedWeight = voterWeight / divider;
            for (uint j = 0; j < divider; j++) {
                votingDenominations.push(dividedWeight);
            }
        }
    }

    function getVoterWeight(address _userAddress) public returns (uint weight) {
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
    }

    // if shareholder voted on any proposal he cannot delegate his VP to a proxy anymore
    function delegateToProxy(address proxyAddress, bool partialDelegation, uint voteBlockIndex) public {
        require(fac.votingWeights(msg.sender) > 0, "Sender does not own enough voting tokens");
        require(proxyAddress != msg.sender, "Self-delegation is not allowed");
        //require(userExists(proxyAddress), "Proxy is not a registered user");
        //require(userExists(msg.sender), "the user account is not registered");
        //require(delegate == address(0), "user already has delegated to another proxy");

        uint senderWeight = fac.votingWeights(msg.sender);
        if (partialDelegation) {
            // partial voting, delegate a voting weight block of his total voting weight to one proxy
            uint targetVoteWeight = votingDenominations[voteBlockIndex];
            // deletes voting weight block in the weight array and deletes the entry with swapping elements if required
            delete votingDenominations[voteBlockIndex];

            for (; voteBlockIndex < votingDenominations.length - 1; voteBlockIndex++) {
                votingDenominations[voteBlockIndex] = votingDenominations[voteBlockIndex+1];
            }
        
            votingDenominations.length--; 

            fac.setVotingWeight(msg.sender, senderWeight - targetVoteWeight);
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


}




