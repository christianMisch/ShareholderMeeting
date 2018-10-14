pragma solidity ^0.4.23;

contract DevelopmentContract {
    bool internal active;

    constructor(bool _active) public {
        active = _active;
    }

    function setProduction() internal {
        active = false;
    }
}