const Shareholder = artifacts.require("./Shareholder.sol");
const Director = artifacts.require("./Director.sol");
const Factory = artifacts.require("./Factory.sol");
const QandA = artifacts.require("./QandA.sol");
const IPFSUpload = require('../../src/provider/IPFSUploadProvider.js');
const IPFSDownload = require('../../src/provider/IPFSDownloadProvider.js');

module.exports = async function(deployer, network, accounts) {

    const ShareholderContract = await Shareholder.deployed();
    const DirectorContract = await Director.deployed();
    const f = await Factory.deployed();
    const qa = await QandA.deployed();
    const lowCaseAcc = accounts.map(acc => acc.toLowerCase());
    var hash;

    const sh1 = await Shareholder.new(lowCaseAcc[2], 13, f.address, qa.address);
    const sh2 = await Shareholder.new(lowCaseAcc[3], 16, f.address, qa.address);
    const sh3 = await Shareholder.new(lowCaseAcc[4], 43, f.address, qa.address);

    hash = await IPFSUpload.upload('On which financial sector will the company focus in the next year?');
    await ShareholderContract.createQuestion.sendTransaction(hash);
    hash = await IPFSUpload.upload('What is the financial statement from the last year?');
    await ShareholderContract.createQuestion.sendTransaction(hash);
    hash = await IPFSUpload.upload('How many shares do we need at least to participate in this AGM?');
    await ShareholderContract.createQuestion.sendTransaction(hash);
    hash = await IPFSUpload.upload('What is the income of the chairperson?');
    await ShareholderContract.createQuestion.sendTransaction(hash);
    hash = await IPFSUpload.upload('How much TX fees do I have to pay for one single TX?');
    await ShareholderContract.createQuestion.sendTransaction(hash);
    hash = await IPFSUpload.upload('When will the next AGM take place?');
    await ShareholderContract.createQuestion.sendTransaction(hash);

    hash = await IPFSUpload.upload('The company will focus on development and research.');
    await DirectorContract.createAnswer.sendTransaction(0, hash);
    hash = await IPFSUpload.upload('You can check the financial statement in the annual report for the last year.');
    await DirectorContract.createAnswer.sendTransaction(1, hash);
    hash = await IPFSUpload.upload('between 3000-4500 € per month.');
    await DirectorContract.createAnswer.sendTransaction(3, hash);
    hash = await IPFSUpload.upload('If you only read data then the gas value will be much more cheaper than a write to the blockchain.');
    await DirectorContract.createAnswer.sendTransaction(4, hash);
    hash = await IPFSUpload.upload('The available gas for any TX or CALL is 3 Mio.');
    await DirectorContract.createAnswer.sendTransaction(4, hash);
    hash = await IPFSUpload.upload('TX fee is changing every day but currently it costs 0.2 $.');
    await DirectorContract.createAnswer.sendTransaction(4, hash);
    hash = await IPFSUpload.upload('at least one share.');
    await DirectorContract.createAnswer.sendTransaction(2, hash);
    hash = await IPFSUpload.upload('If you are a director then you do not need shares to participate.');
    await DirectorContract.createAnswer.sendTransaction(2, hash);
    /*
    console.log(hash);
    var prop = await f.getProposal.call(0);
    console.log(prop);
    hash = await IPFSUpload.upload(prop);
    console.log('ipfs-content: ');
    console.log(await IPFSDownload.downloadObject(hash));*/ 

    await sh1.rateQuestion.sendTransaction(0, 1);
    await sh1.rateQuestion.sendTransaction(4, 1);
    await sh1.rateQuestion.sendTransaction(2, 0);
    await sh2.rateQuestion.sendTransaction(3, 1);
    await sh2.rateQuestion.sendTransaction(4, 1);
    await sh2.rateQuestion.sendTransaction(1, 0);
    await sh3.rateQuestion.sendTransaction(3, 1);
    await sh3.rateQuestion.sendTransaction(4, 1);
    await sh3.rateQuestion.sendTransaction(2, 1);
    await sh1.rateQuestion.sendTransaction(5, 1);
    await sh2.rateQuestion.sendTransaction(5, 1);

    //IPFSUpload.stop((err) => {if (err) {throw(err)}});
}
