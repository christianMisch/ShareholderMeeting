const Shareholder = artifacts.require("./Shareholder.sol");
const AgmOwner = artifacts.require("./AgmOwner.sol");
const Director = artifacts.require("./Director.sol");
const User = artifacts.require("./User.sol");
const ProposalData = artifacts.require("./ProposalData.sol");
const Factory = artifacts.require("./Factory.sol");

module.exports = function(deployer, network, accounts) {
    
    deployer.deploy(ProposalData);
    deployer.deploy(User, accounts[0], false);
    deployer.deploy(Director, accounts[1]);
    
    var f;
    deployer.deploy(Factory).then(function(instance) {
        f = instance;
        return deployer.deploy(Shareholder, accounts[0], 100, f.address);
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
            240
        );
    }).then(function(owner) {
        owner.setFactory(f.address);
        console.log('address:      ' + f.address);
    });

    
}