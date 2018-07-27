const Director = artifacts.require('./Director.sol');
const Shareholder = artifacts.require('./Shareholder.sol');   

const should = require('should');
const expect = require('expect');

contract('Director', async (accounts) => {
    let contract;
    let helper;

    beforeEach(async () => {
        contract = await Director.deployed();
        helper = await require('./utils/HelperFunctions.js')(contract); 
    });

    it('should create a new director', async () => {
        let instance = await Director.new(accounts[2]);
        expect(await instance.userAddress()).toBe(accounts[2])
        expect(await instance.isDirector()).toBe(true);

    });

    /*it('should create three new answer', async () => {
        await contract.createAnswer.sendTransaction(0, "answer1");
        await contract.createAnswer.sendTransaction(0, "answer2");
        await contract.createAnswer.sendTransaction(0, "answer3");
        expect(+await contract.getNumOfAnswers.call()).toBe(3);
        //console.log(helper.getFormattedAnswer);
        let answObj = await helper.getFormattedAnswer.call(0);
        console.log(answObj);
        //expect(await contract.answers.call(0).questionId()).toBe(0);
        //expect(await contract.answers[0].questionId()).toBe("answer1");
    });*/

    it('should ensure that only directors can create answers', async () => {
        let sh = Shareholder.deployed();
        try {
            should.fail(sh.createAnswer(0, "answer5"));
        } catch (error) {
            expect(error.message).toContain('sh.createAnswer is not a function');
        }
        
    })
});