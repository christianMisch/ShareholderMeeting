const Director = artifacts.require('./Director.sol');
const Shareholder = artifacts.require('./Shareholder.sol');
const AgmOwner = artifacts.require('./AgmOwner.sol');
const Factory = artifacts.require('./Factory.sol');
const QandA = artifacts.require('./QandA.sol');
const IPFSUpload = require('../../src/provider/IPFSUploadProvider.js');
const IPFSDownload = require('../../src/provider/IPFSDownloadProvider.js');
const AgmOwnerDeployer = require('./utils/AgmOwnerDeployer.js')(AgmOwner);

const should = require('should');
const expect = require('expect');

contract('Shareholder', async (accounts) => {
    let agmOwner;
    let helper;
    let factory;
    let contract;

    beforeEach(async () => {
        factory = await Factory.new();
        qa = await QandA.new();
        contract = await Shareholder.new(accounts[9], 202, factory.address, qa.address);
        agmOwner = await AgmOwnerDeployer(accounts[0], factory.address);
        helper = await require('./utils/HelperFunctions.js')(factory, qa);
    })

    it('should ensure that a shareholder can only vote once on the same proposal', async () => {
        expect(+await factory.getNumOfProposals.call()).toBe(0);
        await agmOwner.createProposal.sendTransaction('board election', 'Who should be the new chairperson for the next year?', 'Schmidt, Mueller, Guenther');
        expect(+await factory.getNumOfProposals.call()).toBe(1);
        await contract.vote.sendTransaction(0, 'Schmidt', {from: accounts[9]});
        try {
            await contract.vote.sendTransaction(0, 'Schmidt', {from: accounts[9]});
            should.fail('This TX raises an error');
        } catch (error) {
            expect(error.message).toContain('VM Exception while processing transaction: revert');
        }
    })

    it('should create a new shareholder instance', async () => {
        let instance = await Shareholder.new(accounts[5], 20000, factory.address, qa.address);
        expect(await instance.userAddress()).toBe(accounts[5]);
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
        
        let sh = await Shareholder.new(accounts[1], 10, factory.address, qa.address);
        let sh2 = await Shareholder.new(accounts[2], 20, factory.address, qa.address);
        await sh.vote.sendTransaction(0, 'A', {from: accounts[1]});
        await sh2.vote.sendTransaction(0, 'C', {from: accounts[2]});
        await contract.vote.sendTransaction(0, 'B', {from: accounts[9]});

        let modifPropObj = await helper.getFormattedObj(0, 'proposal');
        expect(+modifPropObj.voteCount).toBe(3);
        
        let facSh = await helper.getFactory(sh);
        expect(+await facSh.getNumOfProposals.call()).toBe(1)
        expect(+await facSh.getNumOfVotes.call(0)).toBe(3);
        expect(await sh.userAddress()).toBe(accounts[1]);
        let voteObj = await helper.getFormattedObj(0,'vote',_,2); 
        expect(voteObj.userAddress).toBe(accounts[9]);
        expect(voteObj.option).toBe('B');
        expect(+voteObj.weight).toBe(202);
    })

    it('should be possible to create a question for a shareholder', async () => {
        let sh = await Shareholder.new(accounts[1], 1000, factory.address, qa.address);
        var hash = await IPFSUpload.upload('question1')
        await sh.createQuestion.sendTransaction(hash, accounts[1]);
        let contrQA = await helper.getQandA(sh);
        expect(+await contrQA.getNumOfQuestions.call()).toBe(1);
        let questionObj = await helper.getFormattedObj(0, 'question');
       
        expect(questionObj.creator).toBe(await sh.userAddress());
        expect(+questionObj.questionId).toBe(0);
        expect(await IPFSDownload.downloadString(questionObj.ipfs_hash)).toBe('question1');
        expect(+questionObj.timestamp).toBeGreaterThan(1000000);
        expect(+questionObj.upvotes).toBe(0);
        expect(+questionObj.downvotes).toBe(0);
    })

    it('should return the right length of questions', async () => {
        let sh1 = await Shareholder.new(accounts[1], 1000, factory.address, qa.address);
        let sh2 = await Shareholder.new(accounts[2], 2000, factory.address, qa.address);
        var hash1 = await IPFSUpload.upload('question1');
        var hash2 = await IPFSUpload.upload('question2');
        var hash3 = await IPFSUpload.upload('question3');
        await sh1.createQuestion.sendTransaction(hash1, accounts[1]);
        await sh1.createQuestion.sendTransaction(hash2, accounts[1]);
        await sh2.createQuestion.sendTransaction(hash3, accounts[2]);
        let qaSh1 = await helper.getQandA(sh1);
        let qaSh2 = await helper.getQandA(sh2);

        expect(+await qaSh1.getNumOfQuestions.call()).toBe(3);
        expect(+await qaSh2.getNumOfQuestions.call()).toBe(3);
        expect(+await qa.getNumOfQuestions.call()).toBe(3)
    })

    it('should be possible to rate a question', async () => {
        var hash = await IPFSUpload.upload('question1')
        await contract.createQuestion.sendTransaction(hash, accounts[9]);
        expect(await contract.userAddress()).toBe(accounts[9]);
        await contract.rateQuestion.sendTransaction(0, 0, {from: accounts[6]});
        
        let qa = await helper.getQandA(contract);
        expect(+await qa.getNumOfQuestions.call()).toBe(1);
        let questObj = await helper.getFormattedObj(0, 'question');
        
        expect(questObj.creator).toBe(accounts[9]);
        expect(+questObj.questionId).toBe(0);
        expect(await IPFSDownload.downloadString(questObj.ipfs_hash)).toBe('question1');
        expect(+questObj.timestamp).toBeGreaterThan(0);
        expect(+questObj.upvotes).toBe(0);
        expect(+questObj.downvotes).toBe(1);
    })

    it('should ensure that a shareholder cannot rate more than once on the same question', async () => {
        var hash = await IPFSUpload.upload('question1')
        await contract.createQuestion.sendTransaction(hash, accounts[9]);
        await contract.rateQuestion.sendTransaction(0, 0, {from: accounts[9]});
        try {
            await contract.rateQuestion.sendTransaction(0, 0, {from: accounts[9]});
            should.fail("This TX raises an error");    
        } catch (error) {
            expect(error.message).toContain('VM Exception while processing transaction: revert');
        }
    })

    it('should return a list with only shareholders', async () => {
        await agmOwner.addUser.sendTransaction(accounts[0], 2, 10, qa.address);
        await agmOwner.addUser.sendTransaction(accounts[1], 2, 20, qa.address);
        await agmOwner.addUser.sendTransaction(accounts[2], 1, 0, qa.address);
        await agmOwner.addUser.sendTransaction(accounts[3], 0, 0, qa.address);
        expect(+await agmOwner.getNumOfUsers.call()).toBe(5);
        let facOwner = await helper.getFactory(agmOwner);
        let shObj = await facOwner.getShareholder.call(accounts[0]);
        expect(typeof(shObj)).toBe('object');
        try {
            await facOwner.getShareholder.call(accounts[2]);
        } catch (error) {
            expect(error.message).toBe('VM Exception while processing transaction: revert');
        }
        

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
    })

    it('should be possible for a shareholder to denominate his voting weight into smaller blocks', async () => {
        let sh = await Shareholder.new(accounts[1], 45, factory.address, qa.address);
        await sh.denominateVotingTokens.sendTransaction(4, 0, {from: accounts[1]});

        expect(+await sh.votingDenominations(0)).toBe(1);
        expect(+await sh.votingDenominations(1)).toBe(1);
        expect(+await sh.votingDenominations(2)).toBe(1);
        expect(+await sh.votingDenominations(3)).toBe(1);
    })

    it('is not possible to denominate more voting weight than he owns', async () => {
        let sh = await Shareholder.new(accounts[1], 4, factory.address, qa.address);
        try {
            // 6 * 1 voting weight blocks
            await sh.denominateVotingTokens.sendTransaction(6, 0);
            should.fail('This TX raised an error');
        } catch (error) {
            expect(error.message).toContain('VM Exception while processing transaction: revert');
        }
    })

    it('should be possible to denominate voting weight and then perform partial delegation', async () => {
        let sender = await Shareholder.new(accounts[3], 5432, factory.address, qa.address);
        let proxy1 = await Shareholder.new(accounts[4], 1234, factory.address, qa.address);
        let proxy2 = await Shareholder.new(accounts[5], 56777, factory.address, qa.address);
        let proxy3 = await Shareholder.new(accounts[6], 754432, factory.address, qa.address);
        
        let facSender = await helper.getFactory(sender);
        
        // denominateVotingTokens(numOfBlockWeights, factorizedBlockWeights)
        await sender.denominateVotingTokens.sendTransaction(3, 0, {from: accounts[3]});
        expect(+await facSender.votingWeights(accounts[3])).toBe(5429);
        // delegateToProxy(proxyAddress, enablePartialDelegation, votingBlockIndex) => votingBlockIndex starts from 1!
        await sender.delegateToProxy.sendTransaction(accounts[4], true, 1, {from: accounts[3]});
        expect(+await facSender.votingWeights(accounts[4])).toBe(1235);
        
        await sender.delegateToProxy(accounts[5], true, 2, {from: accounts[3]});
        expect(+await facSender.votingWeights(accounts[5])).toBe(56778);
        
        await sender.delegateToProxy(accounts[6], true, 3, {from: accounts[3]});
        expect(+await facSender.votingWeights(accounts[6])).toBe(754433);    
    })

    it('should support complex weight denomination and delegation', async () => {
        let sender = await Shareholder.new(accounts[8], 43, factory.address, qa.address);
        let proxy1 = await Shareholder.new(accounts[4], 11, factory.address, qa.address);
        let proxy2 = await Shareholder.new(accounts[5], 63, factory.address, qa.address);
        let facSender = await helper.getFactory(sender);
        // 1st example 2 * 4 delegation blocks
        await sender.denominateVotingTokens.sendTransaction(2, 4, {from: accounts[8]});
        await sender.denominateVotingTokens.sendTransaction(5, 0, {from: accounts[8]});
        await proxy2.denominateVotingTokens.sendTransaction(3, 7, {from: accounts[5]});

        expect(+await facSender.votingWeights(accounts[8])).toBe(30);
        expect(+await facSender.votingWeights(accounts[5])).toBe(42);
        expect(+await sender.votingDenominations(0)).toBe(4);
        expect(+await sender.votingDenominations(1)).toBe(4);
        for (i = 2; i < 7; i++) {
            expect(+await sender.votingDenominations(i)).toBe(1);
        }

        await sender.delegateToProxy(accounts[4], true, 1, {from: accounts[8]});
        await sender.delegateToProxy(accounts[5], true, 3, {from: accounts[8]});
        await proxy1.delegateToProxy(accounts[5], false, 0, {from: accounts[4]});
        await proxy2.delegateToProxy(accounts[8], true, 2, {from: accounts[8]});
        
        expect(+await facSender.votingWeights(accounts[4])).toBe(0);
        expect(+await facSender.votingWeights(accounts[5])).toBe(58);
        expect(+await facSender.votingWeights(accounts[8])).toBe(37);
    })
})