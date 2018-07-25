const User = artifacts.require('./User.sol');

const should = require('should');
const expect = require('expect');

contract('User', async (accounts) => {
    let contract;

    before(async () => {
        //contract = User.deployed();
    })

    it("should create an abstract user", async () => {
        let user = User.new(accounts[0], true);
        expect(await user.isDirector).toBe(true);
        expect(await user.userAddress()).toBe(accounts[0])
        
    })

})