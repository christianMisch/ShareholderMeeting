const AgmOwner = artifacts.require('./AgmOwner.sol');
const AgmOwnerDeployer = require('./utils/AgmOwnerDeployer.js')(AgmOwner);

const should = require('should');
const expect = require('expect');

contract('AgmOwner', function(accounts) {
    let contract;

    before(async () => {
        contract = await AgmOwnerDeployer();
    })

    it('should transfer ownership to another director', async function() {
        console.log(await contract);
        await contract.transferOwnership.sendTransaction(accounts[1]);
        expect(contract.owner.equals(accounts[1]));
    })
});