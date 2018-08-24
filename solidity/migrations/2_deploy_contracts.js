const Shareholder = artifacts.require("./Shareholder.sol");
const AgmOwner = artifacts.require("./AgmOwner.sol");
const Director = artifacts.require("./Director.sol");
const User = artifacts.require("./User.sol");
const ProposalData = artifacts.require("./ProposalData.sol");
const Factory = artifacts.require("./Factory.sol");
const QandA = artifacts.require("./QandA.sol");

module.exports = function(deployer, network, accounts) {

    const uppCaseAcc = accounts.map(acc => acc.toLowerCase());
    deployer.deploy(ProposalData);
    console.log('acc[0]: ' + uppCaseAcc[0]);
    //deployer.deploy(User, accounts[1], false);
    /*console.log('web3 accounts');
    console.log(web3.eth.accounts);
    console.log('truffle accounts');
    console.log(accounts);*/

    var f, qa;
    deployer.then(function() {
        return deployer.deploy(Factory);
    }).then(function(factory) {
        f = factory;
        return deployer.deploy(QandA);
    }).then(function(qaInst) {
        qa = qaInst;
        //var random = Math.floor(Math.random() * (12 - 5)) + 5;
        deployer.deploy(Shareholder, uppCaseAcc[8], 10, f.address, qa.address);
    }).then(function() {
        return deployer.deploy(Director, uppCaseAcc[9], false, qa.address);
    }).then(function() {
        return deployer.deploy(
            AgmOwner,
            uppCaseAcc[0],
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
    }).then(async function(agmOwner) {
        console.log('factory address:      ' + f.address);
        console.log('QandA   address:      ' + qa.address);
        console.log('AgmOwner user address: ' + await agmOwner.userAddress());
        console.log(uppCaseAcc[0]);
        //console.log(agmOwner.then(function(deplOwner){console.log(deplOwner.userAddress)}));
        //accounts.forEach(acc => console.log(acc));
    });


}
