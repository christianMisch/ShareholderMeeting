var Migrations = artifacts.require("../contracts/Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations, {gas: 4500000});
};
