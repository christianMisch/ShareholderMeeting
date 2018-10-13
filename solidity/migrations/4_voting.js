const Shareholder = artifacts.require("./Shareholder.sol");
const Factory = artifacts.require("./Factory.sol");
const QandA = artifacts.require("./QandA.sol");

module.exports = async function(deployer, network, accounts) {

    if (network === 'development') {
        const f = await Factory.deployed();
        const qa = await QandA.deployed();
        const lowCaseAcc = accounts.map(acc => acc.toLowerCase());

        const sh1 = await Shareholder.new(lowCaseAcc[4], 13, f.address, qa.address);
        const sh2 = await Shareholder.new(lowCaseAcc[5], 16, f.address, qa.address);
        const sh3 = await Shareholder.new(lowCaseAcc[7], 43, f.address, qa.address);

        await sh1.vote.sendTransaction(0, 'Schmidt', {from: lowCaseAcc[4]});
        await sh1.vote.sendTransaction(1, '4%', {from: lowCaseAcc[4]});
        await sh1.vote.sendTransaction(2, 'no', {from: lowCaseAcc[4]});

        await sh2.vote.sendTransaction(0, 'Mueller', {from: lowCaseAcc[5]});
        await sh2.vote.sendTransaction(1, 'abstain', {from: lowCaseAcc[5]});
        await sh2.vote.sendTransaction(2, 'yes', {from: lowCaseAcc[5]});
        
        await sh3.vote.sendTransaction(0, 'abstain', {from: lowCaseAcc[7]});
        await sh3.vote.sendTransaction(1, '5%', {from: lowCaseAcc[7]});
        await sh3.vote.sendTransaction(2, 'no', {from: lowCaseAcc[7]});
    }
}