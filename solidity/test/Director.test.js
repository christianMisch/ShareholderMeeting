const Director = artifacts.require('./Director.sol');
const Shareholder = artifacts.require('./Shareholder.sol');  
const QandA = artifacts.require('QandA.sol'); 

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
        let instance = await Director.new(accounts[2], qa.address);
        expect(await instance.userAddress()).toBe(accounts[2])
        expect(await instance.isDirector()).toBe(true);

    });

    it('should create three new answers', async () => {
        await contract.createAnswer.sendTransaction(0, "answer1");
        await contract.createAnswer.sendTransaction(0, "answer2");
        await contract.createAnswer.sendTransaction(0, "answer3");
        expect(+await qa.getNumOfAnswers.call()).toBe(3);
        let answObj = await helper.getFormattedObj(0, 'answer');
        let sndAnsObj = await helper.getFormattedObj(1, 'answer');
        
        expect(+answObj.answerId).toBe(0);
        expect(+answObj.questionId).toBe(0);
        expect(answObj.content).toBe('answer1');
        expect(+answObj.timestamp).toBeGreaterThan(0);
        
        expect(+sndAnsObj.answerId).toBe(1);
        expect(+sndAnsObj.questionId).toBe(0);
        expect(sndAnsObj.content).toBe('answer2');
        expect(+sndAnsObj.timestamp).toBeGreaterThan(0);
    });

    it('should ensure that only directors can create answers', async () => {
        let sh = Shareholder.deployed();
        try {
            should.fail(sh.createAnswer(0, "answer5"));
        } catch (error) {
            expect(error.message).toContain('sh.createAnswer is not a function');
        }  
    })
});