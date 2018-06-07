pragma solidity ^0.4.23;

import "./Shareholder.sol";

contract VotingStatistic {

    //Vote[] votes;
    Shareholder[] shareholders;

    uint totalVotingPower;
    mapping(address => uint) votingPowerMap;
    mapping(uint => bool) propPassedMap;
    mapping(uint => uint) percMap;

}