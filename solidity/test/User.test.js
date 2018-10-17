const User = artifacts.require('./User.sol');

const expect = require('expect');

contract('User', async (accounts) => {
    let contract;

    before(async () => {
        contract = await User.new(accounts[2], 1, false);
    })

    it('should create an abstract user', async () => {
        expect(await contract.userAddress()).toBe(accounts[2]);
        expect(+await contract.role()).toBe(1);
        expect(await contract.isRegistered()).toBe(false);
        
    })

    it('should be possible to register an user', async () => {
        await contract.setIsRegistered.sendTransaction(true);
        expect(await contract.isRegistered()).toBe(true);
    })

})