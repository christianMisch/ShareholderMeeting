const Shareholder = artifacts.require("./Shareholder.sol");

module.exports = async function(deployer, network, accounts) {

    if (network === 'development') {
        const lowCaseAcc = accounts.map(acc => acc.toLowerCase());
        const ShareholderContract = await Shareholder.deployed();

        await ShareholderContract.vote.sendTransaction(0, 'Schmidt', {from: lowCaseAcc[4]});
        await ShareholderContract.vote.sendTransaction(1, '4%', {from: lowCaseAcc[4]});
        await ShareholderContract.vote.sendTransaction(2, 'no', {from: lowCaseAcc[4]});

        await ShareholderContract.vote.sendTransaction(0, 'Mueller', {from: lowCaseAcc[5]});
        await ShareholderContract.vote.sendTransaction(1, 'abstain', {from: lowCaseAcc[5]});
        await ShareholderContract.vote.sendTransaction(2, 'yes', {from: lowCaseAcc[5]});
        
        await ShareholderContract.vote.sendTransaction(0, 'abstain', {from: lowCaseAcc[7]});
        await ShareholderContract.vote.sendTransaction(1, '5%', {from: lowCaseAcc[7]});
        await ShareholderContract.vote.sendTransaction(2, 'no', {from: lowCaseAcc[7]});
    }
}