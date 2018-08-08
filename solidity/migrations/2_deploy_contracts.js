const Shareholder = artifacts.require("./Shareholder.sol");
const AgmOwner = artifacts.require("./AgmOwner.sol");
const Director = artifacts.require("./Director.sol");
const User = artifacts.require("./User.sol");
const ProposalData = artifacts.require("./ProposalData.sol");
const Factory = artifacts.require("./Factory.sol");
const QandA = artifacts.require("./QandA.sol");

module.exports = function(deployer, network, accounts) {
    
    deployer.deploy(ProposalData);
    deployer.deploy(User, accounts[0], false);
    
    var f, qa;
    deployer.then(function() {
        return deployer.deploy(Factory);
    }).then(function(factory) {   
        f = factory;
        return deployer.deploy(QandA);
    }).then(function(qaInst) {
        qa = qaInst;
        var random;
        for (var i = 0; i < accounts.length; i++) {
            random = Math.floor(Math.random() * (12000 - 5000) ) + 5000;
            deployer.deploy(Shareholder, accounts[i], random, f.address, qa.address);
        }
    }).then(function() {
        return deployer.deploy(Director, accounts[1], qa.address);
    }).then(function() {
        return deployer.deploy(
            AgmOwner, 
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
    }).then(function() {
        console.log('factory address:      ' + f.address);
        console.log('QandA   address:      ' + qa.address);
        accounts.forEach(acc => console.log(acc));
    });

    
}