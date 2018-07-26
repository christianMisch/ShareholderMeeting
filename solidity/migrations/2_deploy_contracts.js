var Shareholder = artifacts.require("./Shareholder.sol");
var AgmOwner = artifacts.require("./AgmOwner.sol");
var Director = artifacts.require("./Director.sol");
var User = artifacts.require("./User.sol");

module.exports = function(deployer, network, accounts) {
    console.log(network);
    //deployer.deploy(Shareholder, accounts[0], 10000);
    deployer.deploy(AgmOwner, 3, 50, 'Siemens AGM 2018', 'Annual General Meeting 2018', '01.01.2018', 'ICC Berlin', 0, 240);
    //deployer.deploy(Director, accounts[1]);
}