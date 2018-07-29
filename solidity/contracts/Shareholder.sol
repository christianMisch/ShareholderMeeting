pragma solidity ^0.4.23;

import "./User.sol";
import "./AgmOwner.sol";
import "./Voter.sol";
import "./State.sol";

contract Shareholder is User, Voter {

    address public delegate;
    State public state;

    //mapping(address => Delegate[]) delegations;
    Question[] public questions;
    Shareholder[] public shareholders;

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
        require((!this.isDirector()) && (votingTokens[msg.sender] > 0));
        _;
    }

    constructor(address userAddress, uint _votingTokens, State _state) 
        User(userAddress, false) public {
        
        state = _state;
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
    event Log();

    function vote(uint proposalId, string votingOption) public {
        Proposal storage prop = proposals[proposalId];
        
        /*require(!prop.votedOnProposal[msg.sender], "The shareholder already voted");
        require(delegate == address(0), "Proxy is not allowed to vote");*/

        uint voteId = prop.votes.length++;
        prop.votes[voteId] = Vote({voterAddress: msg.sender, voterDecision: votingOption});
        prop.votedOnProposal[msg.sender] = true;    
        
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
        for (uint i = 0; i < shareholders.length; i++) {
            if (shareholders[i].delegate() == _userAddress) {
                weight += votingTokens[shareholders[i].userAddress()];
            }

            if (shareholders[i].delegate() == address(0)) {
                emit Log();
                weight += votingTokens[_userAddress];
            }
        }

        emit VoterWeight(_userAddress, weight);     
    }

    function getShareholder(uint shareholderId) public view returns (
        address _userAddress,
        bool _isDirector,
        address _delegate
    ) {
        Shareholder sh = shareholders[shareholderId];
        return
            (sh.userAddress(), sh.isDirector(), sh.delegate());
    }

    function getNumOfShareholders() public view returns (uint length) {
        return shareholders.length;
    }

    function isShareholder(address _userAddress) public view returns (bool isSharehold) {
        return !state.getUser(_userAddress).isDirector(); 
    }

    /*function getShareholderList() public returns (Shareholder[]) {  
        User[] storage users = owner.users;
        for (uint i = 0; i < users.length; i++) {
            if (isShareholder(owner.users[i].userAddress())) {
                shareholders.push(Shareholder(owner.users[i]));
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




