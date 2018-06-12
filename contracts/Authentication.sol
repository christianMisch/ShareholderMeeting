pragma solidity ^0.4.23;

import "./User.sol";

contract Authentication {

    bool isActive = false;

    address public owner;
    

    modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }

    constructor() public {
        owner = msg.sender;
        isActive = true;
    }

    /*function initializeUserAccess(User[] users) internal {
        for (uint i = 0; i < users.length; i++) {
            addUser(users[i].userAddress, users[i].role);

            authenticatedUsers[users[i].userAddress] = true;
        }
    }*/

    function transferOwnership(address _owner) public {
        owner = _owner;
    }










}