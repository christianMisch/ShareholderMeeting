pragma solidity ^0.4.23;

import "./User.sol";
import "./AGM.sol";

contract Shareholder is User {

    address public delegate;
    Question[] public questions;
    AGM public agm;

    enum RatingOption {UPVOTE, DOWNVOTE}

    struct Question {
        address creator;
        uint questionId;
        string content;
        uint timestamp;
        uint upvotes;
        uint downvotes;
    }

    constructor(address userAddress) 
        User(userAddress, false, true) public {
            
        delegate = address(0);
    }
    
    event InvalidRatingOption(address invoker);
    event QuestionUpvote(address invoker, uint numUpvotes);
    event QuestionDownvote(address invoker, uint numDownvotes);
    
    function vote(address userAddress, uint proposalId, string votingOption) public {
        agm.voteOnProposal(userAddress, proposalId, votingOption);
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
    /*function delegateToProxy(address proxyAddress) meetingPending(meeting) public {
        Shareholder sender = shareholders[msg.sender];
        
        require(!shareholders[msg.sender].hasVoted, "The user has already voted");
        require(proxyAddress != msg.sender, "Self-delegation is not allowed");

        if (shareholders[proxyAddress] != address(0)) {
            proxyAddress = shareholders[msg.sender].delegate;
            require(proxyAddress != msg.sender);
        }

        sender.hasVoted = true;
        sender.delegate = proxyAddress;
        Shareholder delegate_ = shareholders[proxyAddress];

        if (delegate_.hasVoted) {
            proposals[delegate_.propIndex].voteCount += sender.weight;
        } else {
            delegate.weight += sender.weight;
        }
        	
    }*/
}




