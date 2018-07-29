pragma solidity^ 0.4.23;

import "./User.sol";
import "./Director.sol";
import "./Shareholder.sol";

contract State {

    // total number of users
    uint public numberOfUsers;
    // stores all users
    User[] public users;
    // stores user's address with corresponding id
    mapping(address => uint) public userId;

    event UserCreated(uint userId, address userAddress, bool isDirector);
    event UserRemoved(uint userId, address userAddress, bool isDirector);

    function getNumOfUsers() public view returns (uint length) {
        return users.length;
    }

    function getUser(address _userAddress) public view returns (User u) {
        return users[userId[_userAddress]];
    }

    function addUser(address _userAddress, bool isDirector, uint votingTok, State _state) public {
        uint id = userId[_userAddress];
        if (id == 0) {
            id = users.length++;
            userId[_userAddress] = id;
        }

        if (isDirector) {
            users[id] = new Director({userAddress: _userAddress});
            emit UserCreated(id, _userAddress, true);
        } else {
            users[id] = new Shareholder({userAddress: _userAddress, _votingTokens: votingTok, state: _state});
            emit UserCreated(id, _userAddress, false);
        }
        numberOfUsers++;
    }

    function removeUser(address _userAddress) public {
        //require(userId[_userAddress] != 0, "User does not exist");

        uint i = userId[_userAddress];
        User remUser = users[i];
        delete users[i];

        for (; i < users.length - 1; i++) {
            users[i] = users[i+1];
            userId[users[i].userAddress()] = i;
        }
        
        users.length--;
        numberOfUsers--;

        emit UserRemoved(i, _userAddress, remUser.isDirector());
    }
}