const Director = artifacts.require('./Director.sol');
const Shareholder = artifacts.require('./Shareholder.sol');  
const QandA = artifacts.require('QandA.sol');
const IPFSUpload = require('../../src/provider/IPFSUploadProvider.js');
const IPFSDownload = require('../../src/provider/IPFSDownloadProvider.js'); 

const should = require('should');
const expect = require('expect');

contract('Director', async (accounts) => {
    let contract;
    let helper;
    let qa;

    beforeEach(async () => {
        contract = await Director.deployed();
        qa = await QandA.deployed();
        helper = await require('./utils/HelperFunctions.js')(_,qa); 
    });

    it('should create a new director', async () => {
        let instance = await Director.new(accounts[2], false, qa.address, 1);
        expect(await instance.userAddress()).toBe(accounts[2])
        expect(await instance.isAdministrator()).toBe(false);

    });

    it('should create three new answers', async () => {
        var hashA1 = await IPFSUpload.upload('answer1');
        var hashA2 = await IPFSUpload.upload('answer2');
        
        await contract.createAnswer.sendTransaction(0, hashA1, '0x92130D033C5846d2653D088c74D844f61717794d'.toLowerCase());
        await contract.createAnswer.sendTransaction(0, hashA2, '0x92130D033C5846d2653D088c74D844f61717794d'.toLowerCase());
        await contract.createAnswer.sendTransaction(0, "someHash", '0x92130D033C5846d2653D088c74D844f61717794d'.toLowerCase());
        expect(+await qa.getNumOfAnswers.call()).toBe(3);
        let answObj = await helper.getFormattedObj(0, 'answer');
        let sndAnsObj = await helper.getFormattedObj(1, 'answer');
        
        expect(+answObj.answerId).toBe(0);
        expect(+answObj.questionId).toBe(0);
        var stringA1 = await IPFSDownload.downloadString(answObj.ipfs_hash);
        expect(stringA1).toBe('answer1');
        expect(+answObj.timestamp).toBeGreaterThan(0);
        
        expect(+sndAnsObj.answerId).toBe(1);
        expect(+sndAnsObj.questionId).toBe(0);
        var stringA2 = await IPFSDownload.downloadString(sndAnsObj.ipfs_hash);
        expect(stringA2).toBe('answer2');
        expect(+sndAnsObj.timestamp).toBeGreaterThan(0);
    });

    it('should ensure that only directors can create answers', async () => {
        let sh = Shareholder.deployed();
        try {
            sh.createAnswer(0, 'exampleHash', '0x92130D033C5846d2653D088c74D844f61717794d'.toLowerCase());
            should.fail('This TX should raise an error');
        } catch (error) {
            expect(error.message).toContain('sh.createAnswer is not a function');
        }  
    })
});