const Shareholder = artifacts.require("./Shareholder.sol");
const Director = artifacts.require("./Director.sol");
const Factory = artifacts.require("./Factory.sol");
const QandA = artifacts.require("./QandA.sol");

module.exports = async function(deployer, network, accounts) {

    //const ShareholderContract = await Shareholder.deployed();
    // const f = await Factory.deployed();
    // const qa = await QandA.deployed();
    // const lowCaseAcc = accounts.map(acc => acc.toLowerCase());

    // const sh1 = await Shareholder.new(lowCaseAcc[4], 13, f.address, qa.address);
    // const sh2 = await Shareholder.new(lowCaseAcc[5], 16, f.address, qa.address);
    // const sh3 = await Shareholder.new(lowCaseAcc[7], 43, f.address, qa.address);

    // sh1.vote.sendTransaction(0, 'Schmidt');
    // sh1.vote.sendTransaction(1, '4%');
    // sh1.vote.sendTransaction(2, 'no');

    // sh2.vote.sendTransaction(0, 'Mueller');
    // sh2.vote.sendTransaction(1, 'abstain');
    // sh2.vote.sendTransaction(2, 'yes');
    
    // sh3.vote.sendTransaction(0, 'abstain');
    // sh3.vote.sendTransaction(1, '5%');
    // sh3.vote.sendTransaction(2, 'no');


}