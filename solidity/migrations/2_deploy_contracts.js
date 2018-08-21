const Shareholder = artifacts.require("./Shareholder.sol");
const AgmOwner = artifacts.require("./AgmOwner.sol");
const Director = artifacts.require("./Director.sol");
const User = artifacts.require("./User.sol");
const ProposalData = artifacts.require("./ProposalData.sol");
const Factory = artifacts.require("./Factory.sol");
const QandA = artifacts.require("./QandA.sol");

module.exports = function(deployer, network, accounts) {

    deployer.deploy(ProposalData);
    //deployer.deploy(User, accounts[1], false);
    console.log('web3 accounts');
    console.log(web3.eth.accounts);
    console.log('truffle accounts');
    console.log(accounts);
    var f, qa;
    deployer.then(function() {
        return deployer.deploy(Factory);
    }).then(function(factory) {
        f = factory;
        return deployer.deploy(QandA);
    }).then(function(qaInst) {
        qa = qaInst;
        var random = Math.floor(Math.random() * (12 - 5)) + 5;
        deployer.deploy(Shareholder, accounts[8], random, f.address, qa.address);
    }).then(function() {
        return deployer.deploy(Director, accounts[9], qa.address);
    }).then(function() {
        return deployer.deploy(
            AgmOwner,
            accounts[0],
            3,
            50,
            'Siemens AGM 2018',
            'Annual General Meeting 2018',
            '01.01.2018',
            'ICC Berlin',
            0,
            240,
            f.address
        );
    }).then(function(agmOwner) {
        console.log('factory address:      ' + f.address);
        console.log('QandA   address:      ' + qa.address);
        console.log('AgmOwner address: ' + agmOwner.address);
        //accounts.forEach(acc => console.log(acc));
    });


}
