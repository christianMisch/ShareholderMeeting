const Director = artifacts.require('./Director.sol');
const Shareholder = artifacts.require('./Shareholder.sol');
const AgmOwner = artifacts.require('./AgmOwner.sol');
const Factory = artifacts.require('./Factory.sol');
//const AgmOwnerDeployer = require('./utils/AgmOwnerDeployer.js')(AgmOwner);

const should = require('should');
const expect = require('expect');

contract('Shareholder', async (accounts) => {
    let agmOwner;
    let helper;
    let factory;
    let contract;

    beforeEach(async () => {
        factory = await Factory.deployed();
        contract = await Shareholder.deployed();
        agmOwner = await AgmOwner.deployed();
        helper = await require('./utils/HelperFunctions.js')(factory, contract);
    });

    it('should create a new shareholder instance', async () => {
        let instance = await Shareholder.new(accounts[0], 20000, factory.address);
        expect(await instance.delegate()).toContain('0x0');
        expect(await instance.userAddress()).toBe(accounts[0]);
        expect(await instance.isDirector()).toBe(false);
        let fac = await helper.getFactory(instance);
        expect(+await fac.votingWeights(await instance.userAddress())).toBe(20000);
        
    })

    it('should be allowed for a shareholder to vote on a proposal', async () => {
        await agmOwner.createProposal.sendTransaction('election', 'elect the chairperson', 'A,B,C');
        let propObj = await helper.getFormattedObj(0, 'proposal');
        expect(+propObj.proposalId).toBe(0);
        expect(propObj.name).toBe('election');
        expect(propObj.description).toBe('elect the chairperson');
        expect(propObj.options).toBe('A,B,C');
        expect(propObj.proposalPassed).toBe(false);
        let facOwner = await helper.getFactory(agmOwner);
        let facShareh = await helper.getFactory(contract);
        expect(+await facOwner.getNumOfProposals.call()).toBe(1);
        expect(+await facShareh.getNumOfProposals.call()).toBe(1);
        
        let sh = await Shareholder.new(accounts[1], 1000, factory.address);
        await sh.vote.sendTransaction(0, 'A', {from: accounts[1]});

        let modifPropObj = await helper.getFormattedObj(0, 'proposal');
        expect(+modifPropObj.voteCount).toBe(1);
        
        let facSh = await helper.getFactory(sh);
        expect(+await facSh.getNumOfProposals.call()).toBe(1)
        expect(+await facSh.getNumOfVotes.call(0)).toBe(1);
        //console.log(accounts[1]);
        let voteTuple = await facSh.getVote.call(0, accounts[1]); 
        //expect(+voteTuple[2]).toBe(1000);
    })

    it('should be possible to create a question for a shareholder', async () => {
        // use same contract because it invokes contract.getQuestion(id)
        //let sh = await Shareholder.new(accounts[1], 1000, factory.address);
        await contract.createQuestion.sendTransaction("question1");
        expect(+await contract.getNumOfQuestions.call()).toBe(1);
        let questionObj = await helper.getFormattedObj(0, 'question');
    })

    it('should return the right length of questions', async () => {
        let sh1 = await Shareholder.new(accounts[1], 1000, factory.address);
        let sh2 = await Shareholder.new(accounts[2], 2000, factory.address);
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
        // invoked twice contract.createQuestion() so far
        expect(+await contract.getNumOfQuestions.call()).toBe(2);
        let questObj = await helper.getFormattedObj(0, 'question');
        expect(questObj.creator).toBe(accounts[0]);
        expect(+questObj.questionId).toBe(0);
        expect(questObj.content).toBe('question1');
        expect(+questObj.timestamp).toBeGreaterThan(0);
        expect(+questObj.upvotes).toBe(0);
        expect(+questObj.downvotes).toBe(1);
    })

    it('should return a list with only shareholders', async () => {
        // same count from owner and shareholder view, access the same user array
        //let sh = await Shareholder.new(accounts[1], 1000);
        await agmOwner.addUser.sendTransaction(accounts[0], true, 10);
        await agmOwner.addUser.sendTransaction(accounts[1], true, 20);
        await agmOwner.addUser.sendTransaction(accounts[2], false, 100);
        await agmOwner.addUser.sendTransaction(accounts[3], false, 200);
        expect(+await agmOwner.getNumOfUsers.call()).toBe(4);
        let facOwner = await helper.getFactory(agmOwner);
        expect(+await facOwner.getNumOfShareholders.call()).toBe(2);
    })

    it('should output the shareholder weight', async () => {
        let sh = await Shareholder.new(accounts[1], 1000, factory.address);
        let facSh = await helper.getFactory(sh);
        let shWeight = +await facSh.votingWeights.call(accounts[1]);
        expect(shWeight).toBe(1000);
    })
})