const AgmOwner = artifacts.require('./AgmOwner.sol');
const AgmOwnerDeployer = require('./utils/AgmOwnerDeployer.js')(AgmOwner);

const should = require('should');
const expect = require('expect');

contract('AgmOwner', function(accounts) {
    let contract;

    beforeEach(async () => {
        contract = await AgmOwnerDeployer(accounts[0]);
    })

    it('should transfer ownership to another director only if the sender is the deployer of the contract', async function() {
        await contract.transferOwnership.sendTransaction(accounts[1], {from: accounts[0]});
        expect(await contract.owner()).toBe(accounts[1]);
    })

    it('should not transfer ownership if the sender is not the deployer', async () => {
        try {
           await contract.transferOwnership.sendTransaction(accounts[1], {from: accounts[3]})
           should.fail("this transaction should have raised an error"); 
        } catch (error) {
            expect(error.message).toBe('VM Exception while processing transaction: revert');
        }
    })

    it('should create a new shareholder and add him to the AGM list', async () => {
        await contract.addUser.sendTransaction(accounts[1], false, 10000);
        //await contract.addUser.sendTransaction(accounts[1], false, 0);
        //await contract.addUser.sendTransaction(accounts[2], false, 0);
        expect(+await contract.getNumOfUsers.call()).toBe(1);
        //expect(await contract.users[0].userAddress).toBe(accounts[0]);
        //expect(await contract.users[0].isDirector()).toBe(accounts[0]);
        //expect(await contract.users.length).toBe(1);
    })

    /*it('should create shareholders and directors and remove users', async () => {
        await contract.addUser.sendTransaction(accounts[2], true, 0, {from: accounts[0]});
        //expect(+await contract.getNumOfUsers.call()).toBe(1);
        await contract.removeUser.sendTransaction(accounts[2]);
        expect(+await contract.getNumOfUsers.call()).toBe(0);
    })*/

    it('should create a proposal', async () => {
        await contract.createProposal.sendTransaction("election", "new board shall be elected", "A,B,C");
        expect(+await contract.getNumOfProposals.call()).toBe(1);
    })

    it('should ensure that only the owner can create a proposal', async () => {
        try {
            should.fail(await contract.createProposal.
                sendTransaction("election", "new board shall be elected", "A,B,C", {from: accounts[5]}));
        } catch (error) {
            expect(error.message).toBe('VM Exception while processing transaction: revert')
        }
    })
});