pragma solidity ^0.4.23;

import "./User.sol";
import "./AgmOwner.sol";
import "./Voter.sol";

contract Shareholder is User, Voter {

    address delegate;

    //mapping(address => Delegate[]) delegations;
    Question[] public questions;

    enum RatingOption {UPVOTE, DOWNVOTE}

    struct Question {
        address creator;
        uint questionId;
        string content;
        uint timestamp;
        uint upvotes;
        uint downvotes;
    }

    struct Delegate {
        address proxy;
        uint votingTok;
    }

    modifier onlyShareholder {
        require(votingTokens[msg.sender] > 0);
        _;
    }

    constructor(address userAddress, uint _votingTokens) 
        User(userAddress, false) public {
            
        delegate = address(0);
    }
    
    event InvalidRatingOption(address invoker);
    event QuestionUpvote(address invoker, uint numUpvotes);
    event QuestionDownvote(address invoker, uint numDownvotes);
    event Voted(address invoker, uint proposalId, string votingOption);

    function vote(address userAddress, uint proposalId, string votingOption) public {
        Proposal storage prop = proposals[proposalId];
        
        require(!prop.votedOnProposal[msg.sender], "The shareholder already voted");

        uint voteId = prop.votes.length++;
        prop.votes[voteId] = Vote({voterAddress: userAddress, voterDecision: votingOption});
        prop.votedOnProposal[msg.sender] = true;    
        emit Voted(userAddress, proposalId, votingOption);
    }

    function createQuestion(uint questionId, address _creator, string _content) public returns (uint id) {
        id = questions.length++;
        Question storage question = questions[id];
        question.questionId = id;
        question.creator = _creator;
        question.content = _content;
        question.timestamp = now;
        question.upvotes = 0;
        question.downvotes = 0;
    }

    function rateQuestion(uint questionId, RatingOption ratingOpt) public {
        Question storage question = questions[questionId];
        if (ratingOpt == RatingOption.UPVOTE) {
            question.upvotes++;
            emit QuestionUpvote(msg.sender, question.upvotes);
        } else if (ratingOpt == RatingOption.DOWNVOTE) {
            question.downvotes++;
            emit QuestionDownvote(msg.sender, question.downvotes);
        } else {
            emit InvalidRatingOption(msg.sender);
        }
    }

    // if shareholder voted on any proposal he cannot delegate his VP to a proxy anymore
    function delegateToProxy(address proxyAddress, uint _votingTokens, bool partialDelegation) public {
        require(votingTokens[msg.sender] >= _votingTokens);
        require(proxyAddress != msg.sender, "Self-delegation is not allowed");
        require(userExists(proxyAddress), "Proxy is not a registered user");
        require(userExists(msg.sender), "the user account is not registered");
        require(delegate == address(0), "user already has delegated to another proxy");
        // partial voting, delegate a part of his token to multiple proxies
        // so far it's simple delegation: only whole number of voting token can be delegated to one proxy

        delegate = proxyAddress;
       
        
        
    }
}




