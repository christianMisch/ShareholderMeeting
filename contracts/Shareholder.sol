pragma solidity ^0.4.23;

import "./User.sol";

contract Shareholder is User {

    Proposal[] public proposals;
    Question[] public questions;

    uint public propIndex;
    address public delegate;
    bool public hasVoted;

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

    function vote(address userAddress, uint proposalId) /*meetingPending(meeting)*/ public {
        //Shareholder voter = shareholders[msg.sender];
        //Proposal prop = proposals[proposalId];
        //require(!prop.votesOnProposal[msg.sender], "Already voted");
        //prop.votesOnProposal[msg.sender] = true;
        //voter.propIndex = proposalId;
        //proposals[proposalId].voteCount += voter.weight;
    }

    function createQuestion(uint questionId, address _creator, string _content) /*meetingPending(meeting)*/ public returns (uint quesId) {
        Question storage question = questions[questionId];
        question.questionId = questions.length++;
        question.creator = _creator;
        question.content = _content;
        question.timestamp = now;
        question.upvotes = 0;
        question.downvotes = 0;

        questions.push(question);

        return question.questionId;

    }

    function rateQuestion(uint questionId, RatingOption ratingOpt) /*meetingPending(meeting)*/ public {
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

    /*function getProposalById(uint proposalId) public returns (Proposal prop) {
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
    }*/

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




