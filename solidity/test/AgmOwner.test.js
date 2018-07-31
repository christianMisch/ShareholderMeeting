const AgmOwner = artifacts.require('./AgmOwner.sol');
const Shareholder = artifacts.require('./Shareholder.sol');
const Factory = artifacts.require('./Factory.sol');
const AgmOwnerDeployer = require('./utils/AgmOwnerDeployer.js')(AgmOwner);


const should = require('should');
const expect = require('expect');

contract('AgmOwner', function(accounts) {
    let contract;
    let helper;
    let shareholder;

    beforeEach(async () => {
        contract = await AgmOwner.deployed();
        shareholder = await Shareholder.deployed();
        helper = await require('./utils/HelperFunctions.js')(contract);
    })

    /*it('should transfer ownership to another director only if the sender is the deployer of the contract', async function() {
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
        console.log(+await sh.getNumOfShareholders.call());
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

    /*it('should create a proposal', async () => {
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

    /*it('should make the identical proposal array available to all shareholders and the owner', async () => {
        await contract.createProposal.sendTransaction("election1", "new board shall be elected", "A,B,C");
        await contract.createProposal.sendTransaction("election2", "new board shall be elected", "A,B");
        await contract.createProposal.sendTransaction("election3", "new board shall be elected", "A,C");
        expect(+await contract.getNumOfProposals.call()).toBe(3);
        //let sh = await Shareholder.new(accounts[1], 1000);
        expect(+await test.getNumOfProposals.call()).toBe(3);
    })*/

    it('should ensure that AgmOwner and shareholders interact with the same proposals', async () => {
        console.log(await contract.createProposal.sendTransaction("election1", "new board shall be elected", "A,B,C", {from: accounts[0]}));
        let numOfProposalsInAgmOwner = +await Factory.at(await contract.fac()).getNumOfProposals.call();
        let numOfProposalsInShareholder = +await Factory.at(await shareholder.fac()).getNumOfProposals.call();
        console.log(await contract.fac())
        console.log(await shareholder.fac())
        expect(numOfProposalsInAgmOwner).toBe(numOfProposalsInShareholder);
        
        //expect(await contract.fac.getNumOfProposals.call()).toBe(1);
    })
});