const Director = artifacts.require('./Director.sol');

const should = require('should');
const expect = require('expect');

contract('Director', async (accounts) => {
    let contract;

    beforeEach(async () => {
        contract = await Director.deployed();    
    })

    it('should create a new director', async () => {
        let instance = Director.new(0x93bbc9ddb6f63f060dcdf3400cab22931de867ab);
        //console.log(await instance);

    });

    it('should create an answer', async () => {
        let answerId = await contract.createAnswer.sendTransaction(0, "content");
        console.log(contract.answers);
        expect(+await contract.answers.length).toEqual(1);
    });
});