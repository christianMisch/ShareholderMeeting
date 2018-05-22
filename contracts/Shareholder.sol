pragma solidity ^0.4.23;

import "./Proposal.sol";
import "./Question.sol";

contract Shareholder {

    Proposal[] proposals;
    enum RatingOption {UPVOTE, DOWNVOTE}

    struct ShareholderData {
        bool isProxy;
        uint votingPower;
    }

    function vote(address userAddress, uint proposalId) public {

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

    }

    

}




