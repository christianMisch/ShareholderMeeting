const Director = artifacts.require('./Director.sol');
const Shareholder = artifacts.require('./Shareholder.sol');
const AgmOwner = artifacts.require('./AgmOwner.sol');
const Voter = artifacts.require('./Voter.sol');
const AgmOwnerDeployer = require('./utils/AgmOwnerDeployer.js')(AgmOwner);

const should = require('should');
const expect = require('expect');

contract('Shareholder', async (accounts) => {
    let shareholder;
    let agmOwner;
    let voter;

    beforeEach(async () => {
        //agmOwner = await AgmOwnerDeployer(accounts[0]);
        shareholder = await Shareholder.deployed();
        agmOwner = await AgmOwner.deployed();
        voter = await Voter.deployed();
    });

    it('should create a new shareholder instance', async () => {
        let instance = await Shareholder.new(accounts[0], 20000);
        expect(await instance.delegate()).toContain('0x0');
        expect(await instance.userAddress()).toBe(accounts[0]);
        expect(await instance.isDirector()).toBe(false);
        expect(+await instance.votingTokens(await instance.userAddress())).toBe(20000);
        
    })

    it('should be allowed for a shareholder to vote on a proposal', async () => {
        await agmOwner.createProposal.sendTransaction('election', 'elect the chairperson', 'A,B,C');
        console.log(await agmOwner.getProposal.call(0));
        // expect(+await shareholder.getNumOfProposals.call()).toBe(1);
        let sh = await Shareholder.new(accounts[1], 1000);
        console.log(await sh.vote);
        await sh.vote.sendTransaction(0, 'A');
    })





})