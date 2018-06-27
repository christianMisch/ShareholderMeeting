pragma solidity ^0.4.23;

import "./Shareholder.sol";

contract VotingStatistic {

    // sum of the weights or voting power of all users
    uint public totalVotingPower;
    // how much voting power each uses owns
    mapping(address => uint) public votingPower;
    // which proposal is passed
    mapping(uint => bool) public passedProposal;
    // with how much persentage each proposal is passed or not
    mapping(uint => uint) public proposalPercentage;

}