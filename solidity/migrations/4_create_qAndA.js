const Shareholder = artifacts.require("./Shareholder.sol");
const Director = artifacts.require("./Director.sol");

module.exports = async function(deployer, network, accounts) {

    const ShareholderContract = await Shareholder.deployed();
    const DirectorContract = await Director.deployed();
    
    await ShareholderContract.createQuestion.sendTransaction('On which financial sector will the company focus in the next year?');
    await ShareholderContract.createQuestion.sendTransaction('What is the financial statement from the last year?');
    await ShareholderContract.createQuestion.sendTransaction('How many shares do we need at least to participate in this AGM?');
    await ShareholderContract.createQuestion.sendTransaction('What is the income of the chairperson?');
    await ShareholderContract.createQuestion.sendTransaction('How much TX fees do I have to pay for one single TX?');

    await DirectorContract.createAnswer.sendTransaction(0, 'The company will focus on development and research.');
    await DirectorContract.createAnswer.sendTransaction(1, 'You can check the financial statement in the annual report for the last year.');
    await DirectorContract.createAnswer.sendTransaction(3, 'between 3000-4500 € per month.');
    await DirectorContract.createAnswer.sendTransaction(4, 'If you only read data then the gas value will be much more cheaper than a write to the blockchain.');
    await DirectorContract.createAnswer.sendTransaction(4, 'The available gas for any TX or CALL is 3 Mio.');
    await DirectorContract.createAnswer.sendTransaction(4, 'TX fee is changing every day but currently it costs 0.2 $.');
    await DirectorContract.createAnswer.sendTransaction(2, 'at least one share.');
    await DirectorContract.createAnswer.sendTransaction(2, 'If you are a director then you do not need shares to participate.');

}