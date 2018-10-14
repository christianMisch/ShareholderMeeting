const Shareholder = artifacts.require("./Shareholder.sol");
const AgmOwner = artifacts.require("./AgmOwner.sol");
const Director = artifacts.require("./Director.sol");
const ProposalData = artifacts.require("./ProposalData.sol");
const Factory = artifacts.require("./Factory.sol");
const QandA = artifacts.require("./QandA.sol");
const User = artifacts.require("./User.sol");
const DevelopmentContract = artifacts.require('./DevelopmentContract.sol');

/**
 * @summary deploy the core contracts to the ganache test chain
 */
module.exports = function(deployer, network, accounts) {


    if (network === 'development') {
        deployer.deploy(DevelopmentContract, true);
    }
    const lowCaseAcc = accounts.map(acc => acc.toLowerCase());
    deployer.deploy(ProposalData);
    var f, qa;
    deployer.then(function() {
        return deployer.deploy(Factory);
    }).then(function(factory) {
        f = factory;
        return deployer.deploy(QandA);
    }).then(function() {
        return deployer.deploy(User, accounts[8].toUpperCase(), 0, false);
    }).then(function(qaInst) {
        qa = qaInst;
        deployer.deploy(Shareholder, lowCaseAcc[8], 10, f.address, qa.address);
    }).then(function() {
        return deployer.deploy(Director, lowCaseAcc[9], false, qa.address, 1);
    }).then(function() {
        return deployer.deploy(
            AgmOwner,
            lowCaseAcc[0],
            f.address
        );
    }).then(async function(agmOwner) {
        console.log('factory contract address:      ' + f.address);
        console.log('QandA   contract address:      ' + qa.address);
        console.log('superadmin user address: ' + await agmOwner.userAddress());
    });
}
