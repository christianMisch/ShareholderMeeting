pragma solidity ^0.4.23;

import "./Proposal.sol";
import "./User.sol";
import {meeting as m} from "./Director.sol";

contract Shareholder is User {

    Proposal[] proposals;
    Question[] questions;

    uint propIndex;
    address public delegate;
    bool hasVoted;

    struct Question {
        address creator;
        uint questionId;
        string content;
        uint timestamp;
        uint upvotes;
        uint downvotes;
    }

    constructor(string userName, string userPassword, address userAddress, bool isAuthorized,
    uint weight, address _delegate) User(userName, userPassword, userAddress, isAuthorized, weight) public {
            
        delegate = _delegate;
        hasVoted = false;

    }
    
    enum RatingOption {UPVOTE, DOWNVOTE}

    event InvalidRatingOption(address invoker);
    event QuestionUpvote(address invoker, uint numUpvotes);
    event QuestionDownvote(address invoker, uint numDownvotes);

    function vote(address userAddress, uint proposalId) meetingPending() public {
        Shareholder voter = shareholders[msg.sender];
        Proposal prop = proposals[proposalId];
        require(!prop.votesOnProposal[msg.sender], "Already voted");
        prop.votesOnProposal[msg.sender] = true;
        voter.propIndex = proposalId;
        proposals[proposalId].voteCount += voter.weight;
    }

    function createQuestion(address _creator, string _content) public returns (uint questionId) {
        Question storage question = new Question();
        question.questionId = questions.length++;
        question.creator = _creator;
        question.content = _content;
        question.timestamp = now;
        question.upvotes = 0;
        question.downvotes = 0;

        questions.push(question);

        question.questionId;

    }

    function rateQuestion(uint questionId, RatingOption ratingOpt) public {
        Question storage question = getQuestionById(questionId);
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

    function getProposalById(uint proposalId) public returns (Proposal prop) {
        for (uint i = 0; i < proposals.length; i++) {
            if (proposals[i].proposalId == proposalId) {
                prop = proposals[i];
                break;
            }
        }
    }

    function getQuestionById(uint questionId) public returns (Question ques) {
        for (uint i = 0; i < questions.length; i++) {
            if (questions[i].questionId == questionId) {
                ques = questions[i];
                break;
            }
        }
    }

    // if shareholder voted on any proposal he cannot delegate his VP to a proxy anymore
    function delegateToProxy(address proxyAddress) public {
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
        	
    }

    

}




