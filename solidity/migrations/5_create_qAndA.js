const Shareholder = artifacts.require("./Shareholder.sol");
const Director = artifacts.require("./Director.sol");
const IPFSUpload = require('../../src/provider/IPFSUploadProvider.js');

/**
 * @summary basic shareholder and director rights are exercised including question/answer creation and rating 
 */

module.exports = async function(deployer, network, accounts) {

    if (network === 'development') {
        
        const ShareholderContract = await Shareholder.deployed();
        const DirectorContract = await Director.deployed();
        const lowCaseAcc = accounts.map(acc => acc.toLowerCase());
        // stores the current hash of the uploaded description data
        var hash;

        // hash = await IPFSUpload.upload('On which financial sector will the company focus in the next year?');
        // await ShareholderContract.createQuestion.sendTransaction(hash, '0x628FBd5a122103e8171BbB2dC70C265f9F775466');
        // hash = await IPFSUpload.upload('What is the financial statement from the last year?');
        // await ShareholderContract.createQuestion.sendTransaction(hash, '0xc179a95Ac86AAbf6baF4D97BA161152fE0cc0655');
        // hash = await IPFSUpload.upload('How many shares do we need at least to participate in this AGM?');
        // await ShareholderContract.createQuestion.sendTransaction(hash, '0x628FBd5a122103e8171BbB2dC70C265f9F775466');
        // hash = await IPFSUpload.upload('What is the income of the chairperson?');
        // await ShareholderContract.createQuestion.sendTransaction(hash, '0xc179a95Ac86AAbf6baF4D97BA161152fE0cc0655');
        // hash = await IPFSUpload.upload('How much TX fees do I have to pay for one single TX?');
        // await ShareholderContract.createQuestion.sendTransaction(hash, '0xB78E4A88e140b9ceeC48D569d6ae0ED4F419eFb1');
        // hash = await IPFSUpload.upload('When will the next AGM take place?');
        // await ShareholderContract.createQuestion.sendTransaction(hash, '0xB78E4A88e140b9ceeC48D569d6ae0ED4F419eFb1');

        // hash = await IPFSUpload.upload('The company will focus on development and research.');
        // await DirectorContract.createAnswer.sendTransaction(0, hash, '0x92130D033C5846d2653D088c74D844f61717794d');
        // hash = await IPFSUpload.upload('You can check the financial statement in the annual report for the last year.');
        // await DirectorContract.createAnswer.sendTransaction(1, hash, '0x92130D033C5846d2653D088c74D844f61717794d');
        // hash = await IPFSUpload.upload('between 3000-4500 € per month.');
        // await DirectorContract.createAnswer.sendTransaction(3, hash, '0x32B6D8932B2c4eE0C0D70044695Af4A036767Df7');
        // hash = await IPFSUpload.upload('If you only read data then the gas value will be much more cheaper than a write to the blockchain.');
        // await DirectorContract.createAnswer.sendTransaction(4, hash, '0x92130D033C5846d2653D088c74D844f61717794d');
        // hash = await IPFSUpload.upload('The available gas for any TX or CALL is 3 Mio.');
        // await DirectorContract.createAnswer.sendTransaction(4, hash, '0x32B6D8932B2c4eE0C0D70044695Af4A036767Df7');
        // hash = await IPFSUpload.upload('TX fee is changing every day but currently it costs 0.2 $.');
        // await DirectorContract.createAnswer.sendTransaction(4, hash, '0x32B6D8932B2c4eE0C0D70044695Af4A036767Df7');
        // hash = await IPFSUpload.upload('at least one share.');
        // await DirectorContract.createAnswer.sendTransaction(2, hash, '0x92130D033C5846d2653D088c74D844f61717794d');
        // hash = await IPFSUpload.upload('If you are a director then you do not need shares to participate.');
        // await DirectorContract.createAnswer.sendTransaction(2, hash, '0x92130D033C5846d2653D088c74D844f61717794d');

        // await ShareholderContract.rateQuestion.sendTransaction(0, 1, {from: lowCaseAcc[7]});
        // await ShareholderContract.rateQuestion.sendTransaction(4, 1, {from: lowCaseAcc[7]});
        // await ShareholderContract.rateQuestion.sendTransaction(2, 0, {from: lowCaseAcc[7]});
        // await ShareholderContract.rateQuestion.sendTransaction(3, 1, {from: lowCaseAcc[8]});
        // await ShareholderContract.rateQuestion.sendTransaction(4, 1, {from: lowCaseAcc[8]});
        // await ShareholderContract.rateQuestion.sendTransaction(1, 0, {from: lowCaseAcc[8]});
        // await ShareholderContract.rateQuestion.sendTransaction(3, 1, {from: lowCaseAcc[9]});
        // await ShareholderContract.rateQuestion.sendTransaction(4, 1, {from: lowCaseAcc[9]});
        // await ShareholderContract.rateQuestion.sendTransaction(2, 1, {from: lowCaseAcc[9]});
        // await ShareholderContract.rateQuestion.sendTransaction(5, 1, {from: lowCaseAcc[7]});
        // await ShareholderContract.rateQuestion.sendTransaction(5, 1, {from: lowCaseAcc[8]});
    }
}