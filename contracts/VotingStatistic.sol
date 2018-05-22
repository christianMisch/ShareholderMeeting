pragma solidity ^0.4.23;

contract VotingStatistic {

    uint totalVotingPower;
    mapping(address => uint) votingPowerMap;
    mapping(uint => bool) propPassedMap;
    mapping(uint => uint) percMap;
    
}