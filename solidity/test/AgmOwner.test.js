const AgmOwner = artifacts.require('./AgmOwner.sol');
const AgmOwnerDeployer = require('./utils/AgmOwnerDeployer.js')(AgmOwner);

const should = require('should');
const expect = require('expect');

contract('AgmOwner', function(accounts) {
    let contract;

    before(async () => {
        contract = await AgmOwnerDeployer(accounts[0]);
    })

    it('should transfer ownership to another director only if the sender is the deployer of the contract', async function() {
        await contract.transferOwnership.sendTransaction(accounts[1], {from: accounts[0]});
        expect(await contract.owner()).toBe(accounts[1]);
    })

    it('should not transfer ownership if the sender is not the deployer', async () => {

    })
});