const Shareholder = artifacts.require("./Shareholder.sol");
const Director = artifacts.require("./Director.sol");
const Factory = artifacts.require("./Factory.sol");
const QandA = artifacts.require("./QandA.sol");
const IPFSUpload = require('../../src/provider/IPFSUploadProvider.js');
const IPFSDownload = require('../../src/provider/IPFSDownloadProvider.js');

const AgmOwner = artifacts.require("./AgmOwner.sol");
//const QandA = artifacts.require("./QandA.sol");

module.exports = async function(deployer, network, accounts) {

    const ShareholderContract = await Shareholder.deployed();
    const DirectorContract = await Director.deployed();
    const f = await Factory.deployed();
    const qa = await QandA.deployed();
    const lowCaseAcc = accounts.map(acc => acc.toLowerCase());
    var hash;

    //const sh1 = await Shareholder.new(lowCaseAcc[7], 13, f.address, qa.address);
    //const sh2 = await Shareholder.new(lowCaseAcc[8], 16, f.address, qa.address);
    //const sh3 = await Shareholder.new(lowCaseAcc[9], 43, f.address, qa.address);

    hash = await IPFSUpload.upload('On which financial sector will the company focus in the next year?');
    await ShareholderContract.createQuestion.sendTransaction(hash, '0x628FBd5a122103e8171BbB2dC70C265f9F775466');
    hash = await IPFSUpload.upload('What is the financial statement from the last year?');
    await ShareholderContract.createQuestion.sendTransaction(hash, '0xc179a95Ac86AAbf6baF4D97BA161152fE0cc0655');
    hash = await IPFSUpload.upload('How many shares do we need at least to participate in this AGM?');
    await ShareholderContract.createQuestion.sendTransaction(hash, '0x628FBd5a122103e8171BbB2dC70C265f9F775466');
    hash = await IPFSUpload.upload('What is the income of the chairperson?');
    await ShareholderContract.createQuestion.sendTransaction(hash, '0xc179a95Ac86AAbf6baF4D97BA161152fE0cc0655');
    hash = await IPFSUpload.upload('How much TX fees do I have to pay for one single TX?');
    await ShareholderContract.createQuestion.sendTransaction(hash, '0xB78E4A88e140b9ceeC48D569d6ae0ED4F419eFb1');
    hash = await IPFSUpload.upload('When will the next AGM take place?');
    await ShareholderContract.createQuestion.sendTransaction(hash, '0xB78E4A88e140b9ceeC48D569d6ae0ED4F419eFb1');

    hash = await IPFSUpload.upload('The company will focus on development and research.');
    await DirectorContract.createAnswer.sendTransaction(0, hash, '0x92130D033C5846d2653D088c74D844f61717794d');
    hash = await IPFSUpload.upload('You can check the financial statement in the annual report for the last year.');
    await DirectorContract.createAnswer.sendTransaction(1, hash, '0x92130D033C5846d2653D088c74D844f61717794d');
    hash = await IPFSUpload.upload('between 3000-4500 € per month.');
    await DirectorContract.createAnswer.sendTransaction(3, hash, '0x32B6D8932B2c4eE0C0D70044695Af4A036767Df7');
    hash = await IPFSUpload.upload('If you only read data then the gas value will be much more cheaper than a write to the blockchain.');
    await DirectorContract.createAnswer.sendTransaction(4, hash, '0x92130D033C5846d2653D088c74D844f61717794d');
    hash = await IPFSUpload.upload('The available gas for any TX or CALL is 3 Mio.');
    await DirectorContract.createAnswer.sendTransaction(4, hash, '0x32B6D8932B2c4eE0C0D70044695Af4A036767Df7');
    hash = await IPFSUpload.upload('TX fee is changing every day but currently it costs 0.2 $.');
    await DirectorContract.createAnswer.sendTransaction(4, hash, '0x32B6D8932B2c4eE0C0D70044695Af4A036767Df7');
    hash = await IPFSUpload.upload('at least one share.');
    await DirectorContract.createAnswer.sendTransaction(2, hash, '0x92130D033C5846d2653D088c74D844f61717794d');
    hash = await IPFSUpload.upload('If you are a director then you do not need shares to participate.');
    await DirectorContract.createAnswer.sendTransaction(2, hash, '0x92130D033C5846d2653D088c74D844f61717794d');
    
    //console.log(hash);
    //console.log(await IPFSDownload.downloadString(hash));
    /*var prop = await f.getProposal.call(0);
    console.log(prop);
    hash = await IPFSUpload.upload(prop);
    console.log('ipfs-content: ');
    console.log(await IPFSDownload.downloadObject(hash));*/ 

    // await sh1.rateQuestion.sendTransaction(0, 1);
    // await sh1.rateQuestion.sendTransaction(4, 1);
    // await sh1.rateQuestion.sendTransaction(2, 0);
    // await sh2.rateQuestion.sendTransaction(3, 1);
    // await sh2.rateQuestion.sendTransaction(4, 1);
    // await sh2.rateQuestion.sendTransaction(1, 0);
    // await sh3.rateQuestion.sendTransaction(3, 1);
    // await sh3.rateQuestion.sendTransaction(4, 1);
    // await sh3.rateQuestion.sendTransaction(2, 1);
    // await sh1.rateQuestion.sendTransaction(5, 1);
    // await sh2.rateQuestion.sendTransaction(5, 1);
}
