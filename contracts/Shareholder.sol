pragma solidity ^0.4.23;

import "./Proposal.sol";
import "./Question.sol";
import "./User.sol";

contract Shareholder is User {

    Proposal[] proposals;
    Question[] questions;

    uint public propIndex;
    bool public hasVoted;
    address public delegate;

    struct Question {
        uint questionId;
        string content;
        uint timestamp;
        uint upvotes;
        uint downvotes;
    }

    constructor(string userName, string userPassword, address userAddress, bool isAuthorized,
    uint weight, uint _propIndex, bool _hasVoted, address _delegate) 
        User(userName, userPassword, userAddress, isAuthorized, weight) public {
            
        propIndex = _propIndex;
        hasVoted = _hasVoted;
        delegate = _delegate;

    }
    
    enum RatingOption {UPVOTE, DOWNVOTE}

    function vote(address userAddress, uint proposalId) public {
        Shareholder storage voter = users[msg.sender];

        require(!voter.hasVoted(), "Already voted");
        voter.hasVoted() = true;
        voter.propIndex = proposalId;
        proposals[proposalId].voteCount += voter.weight;
    }

    function createQuestion(address userAddress, string content) public returns (uint questionId) {

    }

    function rateQuestion(uint questionId, RatingOption ratingOpt) public {

    }

    function getProposalById(uint proposalId) public returns (Proposal prop) {
        Proposal p;
        for (uint i = 0; i < proposals.length; i++) {
            if (proposals[i].proposalId() == proposalId) {
                p = proposals[i];
            }
        }
        return prop;
    }

    function getQuestionById(uint questionId) public returns (Question ques) {

    }

    function checkVoteOccurence(address userAddress, Proposal prop) public returns (bool hasNotVoted) {

    }

    function delegateToProxy(address proxyAddress, uint votingPow) public {
        User sender = users[msg.sender];
        
        require(!users[msg.sender].hasVoted(), "The user has already voted");
        require(proxyAddress != msg.sender, "Self-delegation is not allowed");

        while (users[proxyAddress] != address(0)) {
            proxyAddress = users[msg.sender].delegate();
            require(proxyAddress != msg.sender);
        }

        sender.hasVoted = true;
        //sender.delegate = proxyAddress;
        Shareholder delegate_ = users[proxyAddress];

        if (delegate_.hasVoted()) {
            proposals[delegate_.propIndex()].voteCount += sender.weight();
        } else {
            delegate.weight += sender.weight;
        }
        	
    }

    

}




