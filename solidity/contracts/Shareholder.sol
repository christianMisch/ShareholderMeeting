pragma solidity ^0.4.23;

import "./User.sol";
import "./AgmOwner.sol";
import "./Factory.sol";
import "./ProposalData.sol";

contract Shareholder is User, ProposalData {

    Factory public fac;
    QandA public qa;

    address public delegate;
    

    //mapping(address => Delegate[]) delegations;

    enum RatingOption {DOWNVOTE, UPVOTE}

    /*struct Delegate {
        address proxy;
        uint votingTok;
    }*/

    modifier onlyShareholder {
        require((!this.isDirector()) && (fac.votingWeights(msg.sender) > 0));
        _;
    }

    event QuestionCreated(uint questionId, address creator);
    event Voted(address invoker, uint proposalId, string votingOption);
    event VoterWeight(address userAddress, uint weight);
    event DelegatedFrom(address sender, uint senderWeight, address proxy, uint proxyWeight);
    
    constructor(address userAddress, uint _votingWeight, Factory _fac, QandA _qa) 
        User(userAddress, false) public {
        
        fac = _fac;
        qa = _qa;
        fac.setVotingWeight(userAddress, _votingWeight);
        delegate = address(0);
    }

    function vote(uint proposalId, string votingOption) public {
        fac.setVote(proposalId, votingOption);
        
        emit Voted(userAddress, proposalId, votingOption);
    }

    function createQuestion(string _content) public returns (uint questId) {

        questId = qa.createNewQuestion(_content);

        emit QuestionCreated(questId, msg.sender);
    }

    function rateQuestion(uint questionId, RatingOption ratingOpt) public {
        qa.setRating(questionId, uint(ratingOpt));
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
    function delegateToProxy(address proxyAddress/*bool partialDelegation*/) public {
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
        uint newWeight = fac.votingWeights(proxyAddress) + senderWeight;
        fac.setVotingWeight(proxyAddress, newWeight);

        delegate = proxyAddress; 

        emit DelegatedFrom(msg.sender, senderWeight, proxyAddress, newWeight);  
    }


}




