const Director = artifacts.require('./Director.sol');
const Shareholder = artifacts.require('./Shareholder.sol');
const AgmOwner = artifacts.require('./AgmOwner.sol');
const Factory = artifacts.require('./Factory.sol');
const QandA = artifacts.require('./QandA.sol');
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
        qa = await QandA.deployed();
        contract = await Shareholder.deployed();
        agmOwner = await AgmOwner.deployed();
        helper = await require('./utils/HelperFunctions.js')(factory, qa);
    });

    it('should create a new shareholder instance', async () => {
        let instance = await Shareholder.new(accounts[0], 20000, factory.address, qa.address);
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
        
        let sh = await Shareholder.new(accounts[1], 1000, factory.address, qa.address);
        await sh.vote.sendTransaction(0, 'A');
        await sh.vote.sendTransaction(0, 'A');

        let modifPropObj = await helper.getFormattedObj(0, 'proposal');
        expect(+modifPropObj.voteCount).toBe(2);
        
        let facSh = await helper.getFactory(sh);
        expect(+await facSh.getNumOfProposals.call()).toBe(1)
        expect(+await facSh.getNumOfVotes.call(0)).toBe(2);
        expect(await sh.userAddress()).toBe(accounts[1]);
        //let voteTuple = await facSh.getVote.call(1, accounts[1]); 
        //console.log(voteTuple);
        //expect(+voteTuple[2]).toBe(1000);
    })

    it('should be possible to create a question for a shareholder', async () => {
        // use same contract because it invokes contract.getQuestion(id)
        let sh = await Shareholder.new(accounts[1], 1000, factory.address, qa.address);
        await sh.createQuestion.sendTransaction("question1", {from: accounts[1]});
        let contrQA = await helper.getQandA(sh);
        expect(+await contrQA.getNumOfQuestions.call()).toBe(1);
        let questionObj = await helper.getFormattedObj(0, 'question');
       
        expect(questionObj.creator).toBe(await sh.userAddress());
        expect(+questionObj.questionId).toBe(0);
        expect(questionObj.content).toBe('question1');
        expect(+questionObj.timestamp).toBeGreaterThan(1000000);
        expect(+questionObj.upvotes).toBe(0);
        expect(+questionObj.downvotes).toBe(0);
    })

    it('should return the right length of questions', async () => {
        let newQandAref = await QandA.new();
        let sh1 = await Shareholder.new(accounts[1], 1000, factory.address, newQandAref.address);
        let sh2 = await Shareholder.new(accounts[2], 2000, factory.address, newQandAref.address);
        await sh1.createQuestion.sendTransaction("question1");
        await sh1.createQuestion.sendTransaction("question2");
        await sh1.createQuestion.sendTransaction("question3");
        await sh2.createQuestion.sendTransaction("question3");
        await sh2.createQuestion.sendTransaction("question3");
        let qaSh1 = await helper.getQandA(sh1);
        let qaSh2 = await helper.getQandA(sh2);

        expect(+await qaSh1.getNumOfQuestions.call()).toBe(5);
        expect(+await qaSh2.getNumOfQuestions.call()).toBe(5);
        expect(+await newQandAref.getNumOfQuestions.call()).toBe(5)
    })

    it('should be possible to rate a question', async () => {
        await contract.createQuestion.sendTransaction("question1", {from: accounts[0]});
        expect(await contract.userAddress()).toBe(accounts[0]);
        await contract.rateQuestion.sendTransaction(0, 0, {from: accounts[0]});
        
        let qa = await helper.getQandA(contract);
        expect(+await qa.getNumOfQuestions.call()).toBe(2);
        let questObj = await helper.getFormattedObj(0, 'question');
        //console.log(questObj);
        //console.log(accounts[0]);
        
        //expect(questObj.creator).toBe(accounts[0]);
        expect(+questObj.questionId).toBe(0);
        expect(questObj.content).toBe('question1');
        expect(+questObj.timestamp).toBeGreaterThan(0);
        expect(+questObj.upvotes).toBe(0);
        expect(+questObj.downvotes).toBe(1);
    })

    it('should return a list with only shareholders', async () => {
        // same count from owner and shareholder view, access the same user array
        //let sh = await Shareholder.new(accounts[1], 1000);
        await agmOwner.addUser.sendTransaction(accounts[0], true, 10, qa.address);
        await agmOwner.addUser.sendTransaction(accounts[1], true, 20, qa.address);
        await agmOwner.addUser.sendTransaction(accounts[2], false, 100, qa.address);
        await agmOwner.addUser.sendTransaction(accounts[3], false, 200, qa.address);
        expect(+await agmOwner.getNumOfUsers.call()).toBe(4);
        let facOwner = await helper.getFactory(agmOwner);
        expect(+await facOwner.getNumOfShareholders.call()).toBe(2);
    })

    it('should output the shareholder weight', async () => {
        let sh = await Shareholder.new(accounts[1], 1000, factory.address, qa.address);
        let facSh = await helper.getFactory(sh);
        let shWeight = +await facSh.votingWeights.call(accounts[1]);
        expect(shWeight).toBe(1000);
    })

    it('should add the full shareholder weight to the proxy in a simple delegation', async () => {
        let sender = await Shareholder.new(accounts[9], 1, factory.address, qa.address);
        let proxy = await Shareholder.new(accounts[2], 2, factory.address, qa.address);
        expect(await proxy.userAddress()).toBe(accounts[2]);
        expect(await sender.userAddress()).toBe(accounts[9]);
        sender.delegateToProxy.sendTransaction(await proxy.userAddress(), false, 0, {from: accounts[9]});
        
        let facSender = await helper.getFactory(sender);
        let facProxy = await helper.getFactory(proxy);
        
        expect(+await facProxy.votingWeights(await proxy.userAddress())).toBe(3);
        expect(+await facSender.votingWeights(await sender.userAddress())).toBe(0);

        let delegateObj = await helper.getFormattedObj(0, 'delegate', sender);

        expect(delegateObj.proxy).toBe(accounts[2]);
        expect(+delegateObj.votingWeight).toBe(1);
        expect(+await sender.getNumOfDelegations.call()).toBe(1);
    })

    it('should be possible for a shareholder to denominate his voting weigth into smaller blocks', async () => {
        let sh = await Shareholder.new(accounts[1], 4500, factory.address, qa.address);
        await sh.denominateVotingTokens.sendTransaction(4, 0, 0);

        expect(+await sh.getNumOfVotingDenominations.call()).toBe(4);
        expect(+await sh.votingDenominations(0)).toBe(1000);
        expect(+await sh.votingDenominations(1)).toBe(1000);
        expect(+await sh.votingDenominations(2)).toBe(1000);
        expect(+await sh.votingDenominations(3)).toBe(1000);
    })

    it('is not possible to denominate more voting weight than he owns', async () => {
        let sh = await Shareholder.new(accounts[1], 4500, factory.address, qa.address);
        try {
            // 6 * 1000 voting weight blocks
            should.fail(await sh.denominateVotingTokens.sendTransaction(6, 0, 0));
        } catch (error) {
            expect(error.message).toContain('undefined');
        }
    })

    it('should be possible to denominate voting weight and then perform partial delegation', async () => {
        let sender = await Shareholder.new(accounts[3], 5432, factory.address, qa.address);
        let proxy1 = await Shareholder.new(accounts[4], 1234, factory.address, qa.address);
        let proxy2 = await Shareholder.new(accounts[5], 56777, factory.address, qa.address);
        let proxy3 = await Shareholder.new(accounts[6], 754432, factory.address, qa.address);
        // would be enough to use only one factory because all factories store same global state
        let facSender = await helper.getFactory(sender);
        let facProxy1 = await helper.getFactory(proxy1);
        let facProxy2 = await helper.getFactory(proxy2);
        let facProxy3 = await helper.getFactory(proxy3);
        
        // denominateVotingTokens(numOfBlockWeights, equallyDistribution, factorizedBlockWeights)
        await sender.denominateVotingTokens.sendTransaction(3, 0, 0, {from: accounts[3]});
        expect(+await sender.getNumOfVotingDenominations.call()).toBe(3);
        expect(+await facSender.votingWeights(accounts[3])).toBe(2432);
        // delegateToProxy(proxyAddress, enablePartialDelegation, votingBlockIndex)
        await sender.delegateToProxy(accounts[4], true, 0, {from: accounts[3]});
        expect(+await facProxy1.votingWeights(accounts[4])).toBe(2234);
        
        await sender.delegateToProxy(accounts[5], true, 1, {from: accounts[3]});
        expect(+await facProxy2.votingWeights(accounts[5])).toBe(57777);
        
        await sender.delegateToProxy(accounts[6], true, 2, {from: accounts[3]});
        expect(+await facProxy3.votingWeights(accounts[6])).toBe(755432);    
    })

    /*it('should be possible to divide voting weight into equally distributed blocks', async () => {
        let sender = await Shareholder.new(accounts[8], 15000, factory.address, qa.address);
        let facSender = await helper.getFactory(sender);
        expect(+await facSender.votingWeights(accounts[8])).toBe(15000)
        await sender.denominateVotingTokens.sendTransaction(0, 5, 0, {from: accounts[8]});
        expect(+await facSender.votingWeights(accounts[8])).toBe(0)
        expect(+await sender.getNumOfVotingDenominations.call()).toBe(5);
        expect(+await sender.votingDenominations(0)).toBe(1000);
        expect(+await sender.votingDenominations(1)).toBe(1000);
        expect(+await sender.votingDenominations(2)).toBe(1000);
        expect(+await sender.votingDenominations(3)).toBe(1000);
        expect(+await sender.votingDenominations(4)).toBe(1000);


    })*/

    it('should perform an approximate division', async () => {
        let sender = await Shareholder.new(accounts[8], 16789, factory.address, qa.address);
        //expect(+await sender.safeDivision(10, 2)).toBe(5);
    })

    it('should support complex weight denomination and delegation', async () => {
        let sender = await Shareholder.new(accounts[8], 16789, factory.address, qa.address);
        let proxy1 = await Shareholder.new(accounts[4], 1234, factory.address, qa.address);
        let proxy2 = await Shareholder.new(accounts[5], 56777, factory.address, qa.address);
        let facSender = await helper.getFactory(sender);
        await sender.denominateVotingTokens.sendTransaction(2, 0, 4, {from: accounts[8]});
        await sender.denominateVotingTokens.sendTransaction(5, 0, 0, {from: accounts[8]});
        await proxy2.denominateVotingTokens.sendTransaction(3, 0, 7, {from: accounts[5]});

        expect(+await facSender.votingWeights(accounts[8])).toBe(3789);
        expect(+await facSender.votingWeights(accounts[5])).toBe(35777);
        expect(+await sender.getNumOfVotingDenominations.call()).toBe(7);
        expect(+await proxy2.getNumOfVotingDenominations.call()).toBe(3);
        expect(+await sender.votingDenominations(0)).toBe(4000);
        expect(+await sender.votingDenominations(0)).toBe(4000);
        for (i = 2; i < 7; i++) {
            expect(+await sender.votingDenominations(i)).toBe(1000);
        }

        await sender.delegateToProxy(accounts[4], true, 0, {from: accounts[8]});
        await sender.delegateToProxy(accounts[5], true, 2, {from: accounts[8]});
        await proxy1.delegateToProxy(accounts[5], false, 0, {from: accounts[4]});
        await proxy2.delegateToProxy(accounts[8], true, 1, {from: accounts[8]});

        
        expect(+await facSender.votingWeights(accounts[4])).toBe(0);
        expect(+await facSender.votingWeights(accounts[5])).toBe(42011);
        expect(+await facSender.votingWeights(accounts[8])).toBe(10789);



    }) 

    it('should ensure that a shareholder can only rate at most once on a question', async () => {
        let newQARef = await QandA.new();
        let rater = await Shareholder.new(accounts[4], 1000, factory.address, newQARef.address);
        let otherRater = await Shareholder.new(accounts[2], 2, factory.address, newQARef.address);

        let qaRater = await helper.getQandA(rater);
        let qaOthRat = await helper.getQandA(otherRater);

        await rater.createQuestion.sendTransaction('how many vacation days can we claim?');
        let numOfQuestionsInRater = await qaRater.getNumOfQuestions.call();
        let numOfQuestionsInOtherRat = await qaOthRat.getNumOfQuestions.call();
        
        expect(+numOfQuestionsInRater).toBe(1);
        expect(+numOfQuestionsInOtherRat).toBe(1);

        await rater.rateQuestion.sendTransaction(0, 1);
        await otherRater.rateQuestion.sendTransaction(0, 0);

        try {
            should.fail(await rater.rateQuestion.sendTransaction(0, 1));
        } catch (error) {
            expect(error.message).toContain('revert');
        }
        
    })
})