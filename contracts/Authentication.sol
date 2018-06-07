pragma solidity ^0.4.23;

import "./User.sol";

contract Authentication {

    enum Role {DIRECTOR, SHAREHOLDER}
    bool isActive = false;

    address public owner;
    uint numberOfUsers;

    modifier onlyDirector {
        require(userMap[msg.sender].role == Role.DIRECTOR);
        _;
    }

    modifier onlyShareholder {
        require(userMap[msg.sender].role == Role.SHAREHOLDER);
        _;
    }

    modifier isAuthenticated {
        require(user[msg.sender].isAuthenticated);
        _;
    }

    modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }

    constructor() public {
        owner = msg.sender;
        isActive = true;
        numberOfUsers = 0;
    }

    function initializeUserAccess(User[] users) internal {
        for (uint i = 0; i < users.length; i++) {
            addUser(users[i].userAddress, users[i].role);

            authenticatedUsers[users[i].userAddress] = true;
        }
    }

    function transferOwnership(address _owner) public {
        owner = _owner;
    }










}