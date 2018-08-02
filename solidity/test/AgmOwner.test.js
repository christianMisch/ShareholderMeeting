const AgmOwner = artifacts.require('./AgmOwner.sol');
const Shareholder = artifacts.require('./Shareholder.sol');
const Factory = artifacts.require('./Factory.sol');
const QandA = artifacts.require('./QandA.sol');
const AgmOwnerDeployer = require('./utils/AgmOwnerDeployer.js')(AgmOwner);


const should = require('should');
const expect = require('expect');

contract('AgmOwner', async (accounts) => {
    let contract;
    let helper;
    let shareholder;
    let factory;
    let qa;

    beforeEach(async () => {
        factory = await Factory.deployed();
        qa = await QandA.deployed();
        contract = await AgmOwnerDeployer(accounts[0], factory.address);
        shareholder = await Shareholder.deployed();
        helper = await require('./utils/HelperFunctions.js')(factory,_);
        //expect(+await factory.getNumOfProposals.call()).toBe(0);
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
        await contract.addUser.sendTransaction(accounts[1], false, 10000, qa.address);
        await contract.addUser.sendTransaction(accounts[1], false, 20, qa.address);
        await contract.addUser.sendTransaction(accounts[2], false, 30, qa.address);
        expect(+await contract.getNumOfUsers.call()).toBe(3);
        expect(+await contract.numberOfUsers()).toBe(3);
        //shareholder and owner have same number of users
        //console.log(+await shareholder.getNumOfUsers.call());
        //await sh.getShareholderList.sendTransaction();
        //console.log(+await sh.getNumOfShareholders.call());
    })

    it('should create shareholders and directors and remove users', async () => {
        await contract.addUser.sendTransaction(accounts[2], true, 0, qa.address);
        await contract.addUser.sendTransaction(accounts[3], false, 1000, qa.address);
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
        expect(+await factory.getNumOfProposals.call()).toBe(1);
        let propObj = await helper.getFormattedObj(0, 'proposal');
        expect(+propObj.proposalId).toBe(0);
        expect(propObj.name).toBe('election');
        expect(propObj.description).toBe('new board shall be elected');
        expect(propObj.options).toBe('A,B,C');
        expect(propObj.proposalPassed).toBe(false);
        expect(+propObj.passedPercent).toBe(0);
        expect(+propObj.voteCount).toBe(0);
    })*/

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

    it('should ensure that AgmOwner and shareholders interact with the same proposals', async () => {
        await contract.createProposal.sendTransaction("election1", "new board shall be elected", "A,B,C");
        await contract.createProposal.sendTransaction("election2", "new board shall be elected", "A,B");
        let numOfProposalsInAgmOwner = +await Factory.at(await contract.fac()).getNumOfProposals.call();
        let numOfProposalsInShareholder = +await Factory.at(await shareholder.fac()).getNumOfProposals.call();
        console.log('AgmOwner factory: ' + await contract.fac())
        console.log('Shareholder factory: ' + await shareholder.fac())
        
        expect(numOfProposalsInAgmOwner).toBe(numOfProposalsInShareholder);
        expect(+await factory.getNumOfProposals.call()).toBe(2);
    })

    it('number of proposals is not set to 0 because the preceding proposals are stored in Factory', async () => {
        expect(+await factory.getNumOfProposals.call()).toBe(2);
        let numOfProposalsInAgmOwner = +await Factory.at(await contract.fac()).getNumOfProposals.call();
        let numOfProposalsInShareholder = +await Factory.at(await shareholder.fac()).getNumOfProposals.call();
        expect(numOfProposalsInAgmOwner).toBe(2);
        expect(numOfProposalsInShareholder).toBe(2);
    })

    it('should ensure that number of proposals for a new deployed Factory is 0', async () => {
        // new factory with new address -> previous created proposals are not stored
        let newFact = await Factory.new();
        let newOwner = await AgmOwnerDeployer(accounts[0], newFact.address);
        let newOwnerFac = await helper.getFactory(newOwner);
        let numOfProposalsInAgmOwner = +await newOwnerFac.getNumOfProposals.call();
        expect(+await factory.getNumOfProposals.call()).toBe(2);
        expect(numOfProposalsInAgmOwner).toBe(0);
    })
});