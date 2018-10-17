const AgmOwner = artifacts.require("./AgmOwner.sol");
const QandA = artifacts.require("./QandA.sol");
const Factory = artifacts.require("./Factory.sol");

/**
 * @summary basic setup of the AGM is provided by the superadmin: proposal creation, add users and announce the AGM
 */

module.exports = async function(deployer, network, accounts) {
    // the following TX are only migrated to the ganache test chain if the network is specified as 'development' in the command line
    // the migration files starting from 3_xxx... provide toy data for the test chain
    // if another network is specified the whole setup has be performed in the app
    if (network === 'development') {
        const AgmOwnerContract = await AgmOwner.deployed();
        const QandAContract = await QandA.deployed();
        const FactoryContract = await Factory.deployed();

        await AgmOwnerContract.addUser.sendTransaction(accounts[0], 0, 0, QandAContract.address);
        await AgmOwnerContract.addUser.sendTransaction(accounts[1], 2, 30, QandAContract.address);
        await AgmOwnerContract.addUser.sendTransaction(accounts[2], 2, 45, QandAContract.address);
        await AgmOwnerContract.addUser.sendTransaction(accounts[3], 2, 12, QandAContract.address);
        await AgmOwnerContract.addUser.sendTransaction(accounts[4], 1, 0, QandAContract.address);
        await AgmOwnerContract.addUser.sendTransaction(accounts[5], 1, 0, QandAContract.address);

        await AgmOwnerContract.createProposal.sendTransaction('board election', 'Who should be the new chairperson for the next year?', 'Schmidt, Mueller, Guenther');
        await FactoryContract.appendVotingOptionToProposal.sendTransaction(0, 'Schmidt');
        await FactoryContract.appendVotingOptionToProposal.sendTransaction(0, 'Mueller');
        await FactoryContract.appendVotingOptionToProposal.sendTransaction(0, 'Guenther');
        await FactoryContract.appendVotingOptionToProposal.sendTransaction(0, 'abstain');
        
        await AgmOwnerContract.createProposal.sendTransaction('dividend distribution', 'How much percentage should be increased the dividend for shareholders?', '3%, 4%, 5%');
        await FactoryContract.appendVotingOptionToProposal.sendTransaction(1, '3%');
        await FactoryContract.appendVotingOptionToProposal.sendTransaction(1, '4%');
        await FactoryContract.appendVotingOptionToProposal.sendTransaction(1, '5%');
        await FactoryContract.appendVotingOptionToProposal.sendTransaction(1, 'abstain');
        
        await AgmOwnerContract.createProposal.sendTransaction('foster research', 'Should the research into new technologies be more fostered?', 'yes, no');
        await FactoryContract.appendVotingOptionToProposal.sendTransaction(2, 'yes');
        await FactoryContract.appendVotingOptionToProposal.sendTransaction(2, 'no');
        await FactoryContract.appendVotingOptionToProposal.sendTransaction(2, 'abstain');

        await AgmOwnerContract.announceAGM.sendTransaction();
        await AgmOwnerContract.setAgenda.sendTransaction('action1,action2');
        await AgmOwnerContract.setMeetingPlace.sendTransaction('Köln');
        await AgmOwnerContract.setMeetingStartTime.sendTransaction('2018-12-20T11:11');
        await AgmOwnerContract.setMeetingEndTime.sendTransaction('2018-12-20T14:22');
        await AgmOwnerContract.setMeetingName.sendTransaction('Siemens AGM 2018');
    }
}