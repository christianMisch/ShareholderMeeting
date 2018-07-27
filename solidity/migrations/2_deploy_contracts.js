const Shareholder = artifacts.require("./Shareholder.sol");
const AgmOwner = artifacts.require("./AgmOwner.sol");
const Director = artifacts.require("./Director.sol");
const User = artifacts.require("./User.sol");
const Voter = artifacts.require("./Voter.sol");

module.exports = function(deployer, network, accounts) {
    console.log('network=' + network);
    deployer.deploy(Shareholder, accounts[0], 10000);
    deployer.deploy(User, accounts[0], false);
    deployer.deploy(AgmOwner, 3, 50, 'Siemens AGM 2018', 'Annual General Meeting 2018', '01.01.2018', 'ICC Berlin', 0, 240);
    deployer.deploy(Director, accounts[1]);
    deployer.deploy(Voter);
    
}