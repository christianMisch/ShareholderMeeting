const Director = artifacts.require('./Director.sol');
const Shareholder = artifacts.require('./Shareholder.sol');
const AgmOwner = artifacts.require('./AgmOwner.sol');
//const AgmOwnerDeployer = require('./utils/AgmOwnerDeployer.js')(AgmOwner);

const should = require('should');
const expect = require('expect');

contract('Shareholder', async (accounts) => {
    let shareholder;
    let agmOwner;
    let helper;

    beforeEach(async () => {
        //agmOwner = await AgmOwnerDeployer(accounts[0]);
        contract = await Shareholder.deployed();
        agmOwner = await AgmOwner.deployed();
        helper = await require('./utils/HelperFunctions.js')(contract);
    });

    it('should create a new shareholder instance', async () => {
        let instance = await Shareholder.new(accounts[0], 20000);
        expect(await instance.delegate()).toContain('0x0');
        expect(await instance.userAddress()).toBe(accounts[0]);
        expect(await instance.isDirector()).toBe(false);
        expect(+await instance.votingTokens(await instance.userAddress())).toBe(20000);
        
    })

    /*it('should be allowed for a shareholder to vote on a proposal', async () => {
        await agmOwner.createProposal.sendTransaction('election', 'elect the chairperson', 'A,B,C');
        console.log(await agmOwner.getProposal.call(0));
        // expect(+await shareholder.getNumOfProposals.call()).toBe(1);
        let sh = await Shareholder.new(accounts[1], 1000);
        //console.log(await sh);
        //console.log(await shareholder);
        await shareholder.vote.sendTransaction(0, 'A', {from: accounts[1]});
    })*/

    /*it('should be possible to create a question for a shareholder', async () => {
        let sh = await Shareholder.new(accounts[1], 1000);
        await sh.createQuestion.sendTransaction("question1");
        expect(+await sh.getNumOfQuestions.call()).toBe(1);
        console.log(await shareholder.questions.call(0));
        //console.log(await sh.questions.call(0));
        let questionObj = await helper.getFormattedObj(0, 'question');
    })*/

    it('should return the right length of questions', async () => {
        let sh1 = await Shareholder.new(accounts[1], 1000);
        let sh2 = await Shareholder.new(accounts[2], 1000);
        await sh1.createQuestion.sendTransaction("question1");
        await sh1.createQuestion.sendTransaction("question2");
        await sh1.createQuestion.sendTransaction("question3");
        await sh2.createQuestion.sendTransaction("question3");
        await sh2.createQuestion.sendTransaction("question3");
        expect(+await sh1.getNumOfQuestions.call() + +await sh2.getNumOfQuestions.call()).toBe(5);
    })

    it('should be possible to rate a question', async () => {
        await contract.createQuestion.sendTransaction("question1");
        await contract.rateQuestion.sendTransaction(0, 0);
        expect(+await contract.getNumOfQuestions.call()).toBe(1);
        let questObj = await helper.getFormattedObj(0, 'question');
        expect(questObj.creator).toBe(accounts[0]);
        expect(+questObj.questionId).toBe(0);
        expect(questObj.content).toBe('question1');
        expect(+questObj.timestamp).toBeGreaterThan(0);
        expect(+questObj.upvotes).toBe(0);
        expect(+questObj.downvotes).toBe(1);
    })

    it('should return a list with only shareholders', async () => {
        let o = await AgmOwner.new(3, 50, 'Siemens AGM 2018', 'Annual General Meeting 2018', '01.01.2018', 'ICC Berlin', 0, 240);
        // same count from owner and shareholder view, access the same user array
        //let sh = await Shareholder.new(accounts[1], 1000);
        await agmOwner.addUser.sendTransaction(accounts[0], true, 10);
        await agmOwner.addUser.sendTransaction(accounts[1], true, 20);
        await agmOwner.addUser.sendTransaction(accounts[2], false, 100);
        await agmOwner.addUser.sendTransaction(accounts[3], false, 200);
        expect(+await agmOwner.getNumOfUsers.call()).toBe(4);
    })

    /*it('should output the shareholder weight', async () => {
        let sh = await Shareholder.new(accounts[1], 1000);
        let shWeight = +await sh.getVoterWeight.call(accounts[1]);
        expect(shWeight).toBe(1000);
    })*/







})