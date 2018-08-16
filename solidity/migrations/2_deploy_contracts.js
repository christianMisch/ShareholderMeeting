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
    
    var f, qa;
    deployer.then(function() {
        return deployer.deploy(Factory);
    }).then(function(factory) {   
        f = factory;
        return deployer.deploy(QandA);
    }).then(function(qaInst) {
        qa = qaInst;
        var random;
        for (var i = 1; i < 4; i++) {
            random = Math.floor(Math.random() * (12000 - 5000) ) + 5000;
            deployer.deploy(Shareholder, accounts[i], random, f.address, qa.address, `sh${i}`);
        }
    }).then(function() {
        return deployer.deploy(Director, accounts[5], qa.address, 'director');
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
            f.address,
            'master'
        );
    }).then(function(agmOwner) {
        agmOwner.createProposal.sendTransaction('board election', 'Who should be the new chairperson for the next year?', 'Schmidt, Mueller, Guenther, abstain');
        /*agmOwner.createProposal('dividend distribution', 'How much percentage should be increased the dividend for shareholders?', '3%, 4%, 5%, abstain');
        agmOwner.createProposal.sendTransaction('foster research', 'Should the research into new technologies be more fostered?', 'yes, no, abstain');*/
    }).then(function() {
        console.log('factory address:      ' + f.address);
        console.log('QandA   address:      ' + qa.address);
        //accounts.forEach(acc => console.log(acc));
    });

    
}