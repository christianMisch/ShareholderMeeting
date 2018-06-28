pragma solidity ^0.4.23;

import "./User.sol";
import "./AGM.sol";

contract Shareholder is User {

    address public delegate;
    bool public hasVoted;
    uint public weight;

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

    modifier onlyShareholder {
        require(!this.isDirector());
        _;
    }

    constructor(address userAddress) 
        User(userAddress, false) public {
            
        delegate = address(0);
        hasVoted = false;
        weight = 0;
    }
    
    event InvalidRatingOption(address invoker);
    event QuestionUpvote(address invoker, uint numUpvotes);
    event QuestionDownvote(address invoker, uint numDownvotes);
    
    function vote(address userAddress, uint proposalId, string votingOption) public {
        //agm.voteOnProposal(userAddress, proposalId, votingOption);
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
    function delegateToProxy(address proxyAddress) public {
        //Shareholder sender = Shareholder(agm.users(agm.userId(msg.sender)));
        //Shareholder proxy = Shareholder(agm.users(agm.userId(proxyAddress)));
        
        //require(!agm.users(agm.userId(msg.sender)).hasVoted, "The user has already voted");
        require(proxyAddress != msg.sender, "Self-delegation is not allowed");
        //require(agm.userExists(proxyAddress), "Proxy is not a registered user");
        //require(agm.userExists(msg.sender), "the user account is not registered");
        //require(agm.users[agm.userId[msg.sender]].delegate == address(0), "user already has delegated to another proxy");
        // partial voting, delegate a part of his token to multiple proxies
        // so far it's simple delegation: only whole number of voting token can be delegated to one proxy
        //if (!proxy.hasVoted()) {
            //sender.delegate() = proxyAddress;
            //proxy.weight() += sender.weight();	
        //}
    }
}




