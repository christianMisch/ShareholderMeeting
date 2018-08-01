pragma solidity ^0.4.23;

import "./User.sol";
import "./AgmOwner.sol";
import "./Factory.sol";
import "./ProposalData.sol";

contract Shareholder is User, ProposalData {

    Factory public fac;

    address public delegate;
    

    //mapping(address => Delegate[]) delegations;
    Question[] public questions;

    enum RatingOption {DOWNVOTE, UPVOTE}

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
        require((!this.isDirector()) && (fac.votingWeights(msg.sender) > 0));
        _;
    }

    event InvalidRatingOption(address invoker);
    event QuestionUpvote(address invoker, uint numUpvotes);
    event QuestionDownvote(address invoker, uint numDownvotes);
    event QuestionCreated(uint questionId, address creator);
    event Voted(address invoker, uint proposalId, string votingOption);
    event VoterWeight(address userAddress, uint weight);
    event DelegatedFrom(address sender, uint votingTokens, address proxy);
    
    constructor(address userAddress, uint _votingWeight, Factory _fac) 
        User(userAddress, false) public {
        
        fac = _fac;
        fac.setVotingWeight(userAddress, _votingWeight);
        delegate = address(0);
    }

    function vote(uint proposalId, string votingOption) public {
        fac.setVote(proposalId, votingOption);
        
        emit Voted(userAddress, proposalId, votingOption);
    }

    function createQuestion(string _content) public returns (uint id) {
        id = questions.length++;
        Question storage question = questions[id];
        question.questionId = id;
        question.creator = msg.sender;
        question.content = _content;
        question.timestamp = now;
        question.upvotes = 0;
        question.downvotes = 0;

        emit QuestionCreated(id, msg.sender);
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

    function getNumOfQuestions() public view returns (uint length) {
        return questions.length;
    }

    function getQuestion(uint questionId) public view returns (
        address _creator,
        uint _questionId,
        string _content,
        uint _timestamp,
        uint _upvotes,
        uint _downvotes
    ) {
        Question storage question = questions[questionId];
        return
            (question.creator, question.questionId, question.content, question.timestamp, question.upvotes, question.downvotes);
    }

    /*function denominateVotingTokens() public view {

    }*/

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
    function delegateToProxy(address proxyAddress, bool partialDelegation) private {
        require(fac.votingWeights(msg.sender) > 0, "Sender does not own enough voting tokens");
        require(proxyAddress != msg.sender, "Self-delegation is not allowed");
        //require(userExists(proxyAddress), "Proxy is not a registered user");
        //require(userExists(msg.sender), "the user account is not registered");
        require(delegate == address(0), "user already has delegated to another proxy");
        // partial voting, delegate a part of his token to multiple proxies
        // so far it's simple delegation: only whole number of voting token can be delegated to one proxy

        // subtract tokens from sender and add them to proxy
        uint senderWeight = fac.votingWeights(msg.sender);
        fac.setVotingWeight(msg.sender, 0);
        fac.setVotingWeight(proxyAddress, fac.votingWeights(proxyAddress) + senderWeight);

        delegate = proxyAddress; 

        emit DelegatedFrom(msg.sender, senderWeight, proxyAddress);  
    }


}




