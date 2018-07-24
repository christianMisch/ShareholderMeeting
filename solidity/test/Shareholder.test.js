const Director = artifacts.require('./Director.sol');
const Shareholder = artifacts.require('./Shareholder.sol');

const should = require('should');
const expect = require('expect');

contract('Shareholder', async (accounts) => {
    let contract;

    before(async () => {
        //contract = await Shareholder.deployed();    
    });

    it('should create a new shareholder instance', async () => {
        let instance = await Shareholder.new(accounts[0], 20000);
        expect(await instance.delegate()).toContain('0x0');
        expect(await instance.userAddress()).toBe(accounts[0]);
        expect(await instance.isDirector()).toBe(false);
        expect(+await instance.votingTokens(await instance.userAddress())).toBe(20000);
        
    })

})