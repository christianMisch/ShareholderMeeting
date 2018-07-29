const AgmOwner = artifacts.require('./AgmOwner.sol');
const Shareholder = artifacts.require('./Shareholder.sol');
const AgmOwnerDeployer = require('./utils/AgmOwnerDeployer.js')(AgmOwner);


const should = require('should');
const expect = require('expect');

contract('AgmOwner', function(accounts) {
    let contract;
    let helper;

    beforeEach(async () => {
        contract = await AgmOwnerDeployer(accounts[0]);
        helper = await require('./utils/HelperFunctions.js')(contract);
    })

    it('should transfer ownership to another director only if the sender is the deployer of the contract', async function() {
        await contract.transferOwnership.sendTransaction(accounts[1], {from: accounts[0]});
        expect(await contract.userAddress()).toBe(accounts[1]);
    })

    it('should not transfer ownership if the sender is not the deployer', async () => {
        try {
            should.fail(await contract.transferOwnership.sendTransaction(accounts[1], {from: accounts[3]}))
        } catch (error) {
            expect(error.message).toBe('VM Exception while processing transaction: revert');
        }
    })

    it('should create a new shareholder and add him to the AGM list', async () => {
        await contract.addUser.sendTransaction(accounts[1], false, 10000);
        await contract.addUser.sendTransaction(accounts[1], false, 20);
        await contract.addUser.sendTransaction(accounts[2], false, 30);
        expect(+await contract.getNumOfUsers.call()).toBe(3);
        expect(+await contract.numberOfUsers()).toBe(3);
        /* shareholder and owner have same number of users
        let sh = await Shareholder.deployed();
        console.log(+await sh.getNumOfUsers.call());
        await sh.getShareholderList.sendTransaction();
        console.log(+await sh.getNumOfShareholders.call());*/
    })

    it('should create shareholders and directors and remove users', async () => {
        await contract.addUser.sendTransaction(accounts[2], true, 0);
        await contract.addUser.sendTransaction(accounts[3], false, 1000);
        expect(+await contract.numberOfUsers()).toBe(2);
        expect(+await contract.userId.call(accounts[2])).toBe(0);
        expect(+await contract.userId.call(accounts[3])).toBe(1);
        await contract.removeUser.sendTransaction(accounts[2]);
        expect(+await contract.numberOfUsers()).toBe(1);
        await contract.removeUser.sendTransaction(accounts[3]);
        expect(+await contract.numberOfUsers()).toBe(0);
    })

    it('should create a proposal', async () => {
        await contract.createProposal.sendTransaction("election", "new board shall be elected", "A,B,C");
        expect(+await contract.getNumOfProposals.call()).toBe(1);
        let propObj = await helper.getFormattedObj(0, 'proposal');
        expect(+propObj.proposalId).toBe(0);
        expect(propObj.name).toBe('election');
        expect(propObj.description).toBe('new board shall be elected');
        expect(propObj.options).toBe('A,B,C');
        expect(propObj.proposalPassed).toBe(false);
        expect(+propObj.passedPercent).toBe(0);
        expect(+propObj.voteCount).toBe(0);
    })

    it('should ensure that only the owner can create a proposal', async () => {
        try {
            should.fail(await contract.createProposal.
                sendTransaction("election", "new board shall be elected", "A,B,C", {from: accounts[5]}));
        } catch (error) {
            expect(error.message).toBe('VM Exception while processing transaction: revert')
        }
    })

    it('should finish the AGM', async () => {
        expect(+await contract.numberOfUsers()).toBe(0);
        expect(await contract.isFinished()).toBe(false);
        await contract.finishAGM.sendTransaction({from: accounts[0]});
        expect(await contract.isFinished()).toBe(true);
    })

    it('should announce the AGM', async () => {
        let announceObj = await contract.announceAGM.call({from: accounts[0]});
        expect(announceObj[0]).toBe('01.01.2018');
        expect(announceObj[1]).toBe('ICC Berlin');
    })
});