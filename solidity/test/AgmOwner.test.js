const AgmOwner = artifacts.require('./AgmOwner.sol');
const Shareholder = artifacts.require('./Shareholder.sol');
const Factory = artifacts.require('./Factory.sol');
const QandA = artifacts.require('./QandA.sol');
const AgmOwnerDeployer = require('./utils/AgmOwnerDeployer.js')(AgmOwner);


const should = require('should');
const expect = require('expect');

contract('AgmOwner', async (accounts) => {
    //let lowCaseAcc = accounts.map(acc => acc.toLowerCase());
    let contract;
    let helper;
    let shareholder;
    let factory;
    let qa;

    beforeEach(async () => {
        factory = await Factory.new();
        qa = await QandA.deployed();
        contract =  await AgmOwnerDeployer(accounts[0], factory.address);
        //contract2 = AgmOwnerDeployer(accounts[0], factory.address);
        //console.log(contract);
        // console.log('contract 2');
        // console.log(contract2);
        shareholder = await Shareholder.new(accounts[9], 20, factory.address, qa.address);
        helper = await require('./utils/HelperFunctions.js')(factory,_);
        expect(+await contract.getNumOfUsers.call()).toBe(1);
    });

    it('should transfer ownership to another director only if the sender has the AgmOwner role', async function() {
        await contract.addUser.sendTransaction(accounts[1], 0, 0, qa.address);
        await contract.transferOwnership.sendTransaction(accounts[1], {from: accounts[0]});
        expect(await contract.userAddress()).toBe(accounts[0]);
        expect(await contract.getOwners.call()).toContain(accounts[1]);
    });

    it('should should ensure that a AGM parameter can be set only once', async () => {
        await contract.setAgenda.sendTransaction('agenda', {from: accounts[0]});
        try {
            await contract.setAgenda.sendTransaction('agenda', {from: accounts[0]});
            should.fail('This TX should raise an error');
        } catch (error) {
            expect(error.message).toContain('VM Exception while processing transaction: revert');
        }
        
        
    })

    it('should not transfer ownership if the sender is not an AgmOwner', async () => {
        try {
            await contract.transferOwnership.sendTransaction(accounts[1], {from: accounts[3]});
            should.fail("This TX raised an error");
        } catch (error) {
            expect(error.message).toContain('VM Exception while processing transaction: revert');
        }
    });

    it('should create new shareholders and add him to the AGM list', async () => {
        await contract.addUser.sendTransaction(accounts[1], 0, 10000, qa.address);
        await contract.addUser.sendTransaction(accounts[2], 1, 20, qa.address);
        await contract.addUser.sendTransaction(accounts[3], 2, 30, qa.address);
        // 4 users because the contract deployer is always added to the user list during initialization
        expect(+await contract.getNumOfUsers.call()).toBe(4);
        const user = await helper.getFormattedObj(accounts[1], 'user', contract);
        expect(user.userAddress).toBe(accounts[1]);
        expect(+user.role).toBe(0);
        expect(user.isRegistered).toBe(false);
    });

    it('should create shareholder and director and remove users', async () => {
        await contract.addUser.sendTransaction(accounts[2], 1, 0, qa.address);
        await contract.addUser.sendTransaction(accounts[3], 2, 1000, qa.address);
        expect(+await contract.numberOfUsers()).toBe(2);
        // AgmDeployer has id 0
        expect(+await contract.userId.call(accounts[2])).toBe(1);
        expect(+await contract.userId.call(accounts[3])).toBe(2);
        await contract.removeUser.sendTransaction(accounts[2]);
        expect(+await contract.numberOfUsers()).toBe(1);
        await contract.removeUser.sendTransaction(accounts[3]);
        expect(+await contract.numberOfUsers()).toBe(0);
    })

    it('should create a proposal', async () => {
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
    });

    it('should ensure that only an AgmOwner can create a proposal', async () => {
        try {
            await contract.createProposal.sendTransaction("election", "new board shall be elected", "A,B,C", {from: accounts[5]});
            should.fail('This TX should raise an error');
        } catch (error) {
            expect(error.message).toContain('VM Exception while processing transaction: revert')
        }
    });

    it('should be possible that another user who has the AgmOwner role can create a proposal', async () => {
        await contract.addUser.sendTransaction(accounts[7], 0, 0, qa.address);
        await contract.transferOwnership(accounts[7], {from: accounts[0]});
        await contract.createProposal.sendTransaction("election", "new board shall be elected", "A,B,C", {from: accounts[7]})
    })

    it('should finish the AGM', async () => {
        expect(+await contract.numberOfUsers()).toBe(0);
        expect(await contract.isFinished()).toBe(false);
        await contract.finishAGM.sendTransaction({from: accounts[0]});
        expect(await contract.isFinished()).toBe(true);
    });

    it('should announce the AGM', async () => {
        await contract.announceAGM.sendTransaction({from: accounts[0]});
        await contract.setMeetingStartTime.sendTransaction('25-09-10T11:00');
        await contract.setMeetingEndTime.sendTransaction('25-09-10T15:00');
        await contract.setMeetingPlace.sendTransaction('Koeln');
        await contract.setMeetingName.sendTransaction('Siemens AGM');
        expect(await contract.getIsAnnounced.call()).toBe(true);
        expect(await contract.meetingEndTime.call()).toBe('25-09-10T15:00');
        expect(await contract.meetingStartTime.call()).toBe('25-09-10T11:00');
    });

    it('should ensure that AgmOwner and shareholders interact with the same proposals', async () => {
        await contract.createProposal.sendTransaction("election1", "new board shall be elected", "A,B,C");
        await contract.createProposal.sendTransaction("election2", "new board shall be elected", "A,B");
        //let numOfProposalsInAgmOwner = +await Factory.at(await contract.fac()).getNumOfProposals.call();
        //let numOfProposalsInShareholder = +await Factory.at(await shareholder.fac()).getNumOfProposals.call();
        var ownFac = await helper.getFactory(contract);
        var shFac = await helper.getFactory(shareholder);
        let numOfProposalsInAgmOwner = +await ownFac.getNumOfProposals.call();
        let numOfProposalsInShareholder = +await shFac.getNumOfProposals.call();
        expect(numOfProposalsInAgmOwner).toBe(numOfProposalsInShareholder);
        expect(+await factory.getNumOfProposals.call()).toBe(2);
    });

    it('the same user cannot be added again', async () => {
        await contract.addUser(accounts[3], 2, 23, qa.address);
        try {
            await contract.addUser(accounts[3], 2, 23, qa.address);
            should.fail('This TX raises an error'); 
        } catch (error) {
            expect(error.message).toContain('VM Exception while processing transaction: revert')
        }
    });

    it('should ensure that a user can only be registered once', async () => {
        await contract.addUser.sendTransaction(accounts[6], 2, 23, qa.address);
        await contract.registerUser.sendTransaction('somePassword', {from: accounts[6]});

        try {
            await contract.registerUser.sendTransaction('somePassword', {from: accounts[6]});
            should.fail('This TX raises an error'); 
        } catch (error) {
            expect(error.message).toContain('VM Exception while processing transaction: revert')
        }

        try {
            // not existing user cannot be registered
            await contract.registerUser.sendTransaction('somePassword', {from: accounts[7]});
            should.fail('This TX raises an error'); 
        } catch (error) {
            expect(error.message).toContain('VM Exception while processing transaction: revert')
        }
    });
});