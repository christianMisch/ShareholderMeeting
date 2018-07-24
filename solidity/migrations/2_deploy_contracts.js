var Shareholder = artifacts.require("./Shareholder.sol");
var AgmOwner = artifacts.require("./AgmOwner.sol");
var Director = artifacts.require("./Director.sol");

module.exports = function(deployer, network, accounts) {
    console.log(network);
    deployer.deploy([
        [Shareholder, 0x70831e5fc1cac207162c03fc5bc423cd31075f78, 10000],
        [Director, 0x68e26a21bb1210306e71d07d0a4a21588d2ec520]
        //[AgmOwner, 3, 50, 'Siemens AGM 2018', 'Annual General Meeting 2018', '01.01.2018', 'ICC Berlin', 0, 240]
    ]);
}