pragma solidity ^0.4.23;

import "./User.sol";
import "./AgmOwner.sol";
import "./Voter.sol";

contract Shareholder is User, Voter {

    address public delegate;

    //mapping(address => Delegate[]) delegations;
    Question[] public questions;
    Shareholder[] public shareholders;

    enum RatingOption {UPVOTE, DOWNVOTE}

    struct Question {
        address creator;
        uint questionId;
        string content;
        uint timestamp;
        uint upvotes;
        uint downvotes;
    }

    /*struct Delegate {
        address proxy;
        uint votingTok;
    }*/

    modifier onlyShareholder {
        require(votingTokens[msg.sender] > 0);
        _;
    }

    constructor(address userAddress, uint _votingTokens) 
        User(userAddress, false) public {
        
        votingTokens[userAddress] = _votingTokens;
        delegate = address(0);
    }
    
    event InvalidRatingOption(address invoker);
    event QuestionUpvote(address invoker, uint numUpvotes);
    event QuestionDownvote(address invoker, uint numDownvotes);
    event QuestionCreated(uint questionId, address creator);
    event Voted(address invoker, uint proposalId, string votingOption);
    event VoterWeight(address userAddress, uint weight);
    event DelegatedFrom(address sender, uint votingTokens, address proxy);

    function vote(uint proposalId, string votingOption) public {
        Proposal storage prop = proposals[proposalId];
        
        /*require(!prop.votedOnProposal[msg.sender], "The shareholder already voted");
        require(delegate == address(0), "Proxy is not allowed to vote");*/

        uint voteId = prop.votes.length++;
        prop.votes[voteId] = Vote({voterAddress: msg.sender, voterDecision: votingOption});
        prop.votedOnProposal[msg.sender] = true;    
        
        emit Voted(userAddress, proposalId, votingOption);
    }

    function createQuestion(address _creator, string _content) private returns (uint id) {
        id = questions.length++;
        Question storage question = questions[id];
        question.questionId = id;
        question.creator = _creator;
        question.content = _content;
        question.timestamp = now;
        question.upvotes = 0;
        question.downvotes = 0;

        emit QuestionCreated(id, _creator);
    }

    function rateQuestion(uint questionId, RatingOption ratingOpt) private {
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

    /*function denominateVotingTokens() public view {

    }*/

    function getVoterWeight(address _userAddress) private returns(uint weight) {
        weight = 0;
        for (uint i = 0; i < shareholders.length; i++) {
            if (shareholders[i].delegate() == _userAddress) {
                weight += votingTokens[shareholders[i].userAddress()];
            }

            if (shareholders[i].userAddress() == _userAddress && shareholders[i].delegate() == address(0)) {
                weight += votingTokens[_userAddress];
            }
        }

        emit VoterWeight(_userAddress, weight);     
    }

    /*function isShareholder(address _userAddress) public view returns (bool isSharehold) {
        return !users[userId[_userAddress]].isDirector(); 
    }

    function getShareholderList() public returns (Shareholder[]) {  
        for (uint i = 0; i < users.length; i++) {
            if (isShareholder(users[i].userAddress())) {
                shareholders.push(Shareholder(users[i]));
            }
        }
    }*/

    // if shareholder voted on any proposal he cannot delegate his VP to a proxy anymore
    function delegateToProxy(address proxyAddress, bool partialDelegation) private {
        require(votingTokens[msg.sender] > 0, "Sender does not own enough voting tokens");
        require(proxyAddress != msg.sender, "Self-delegation is not allowed");
        //require(userExists(proxyAddress), "Proxy is not a registered user");
        //require(userExists(msg.sender), "the user account is not registered");
        require(delegate == address(0), "user already has delegated to another proxy");
        // partial voting, delegate a part of his token to multiple proxies
        // so far it's simple delegation: only whole number of voting token can be delegated to one proxy

        // subtract tokens from sender and add them to proxy
        uint tokens = votingTokens[msg.sender];
        votingTokens[msg.sender] = 0;
        votingTokens[proxyAddress] += tokens;

        delegate = proxyAddress; 

        emit DelegatedFrom(msg.sender, tokens, proxyAddress);  
    }


}




