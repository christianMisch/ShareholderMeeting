import FactoryArtifact from '../artifacts/contracts/Factory.json';
import AgmOwnerArtifact from '../artifacts/contracts/AgmOwner.json';
import contract from 'truffle-contract';
import web3 from 'web3';

export async function createNewProposal(name, description, options, from) {
    console.log('createNewProposal');
    
    const FactoryContract = contract(FactoryArtifact);
    FactoryContract.setProvider(web3.currentProvider);

    const Factory = await FactoryContract.deployed();
    const txId = Factory.createNewProposal.sendTransaction(name, description, options, { from });

    console.log(await Factory.getNumOfProposals.call());
    return txId
}

export async function createProposal(name, description, options, from) {
    const AgmOwnerContract = contract(AgmOwnerArtifact);
    AgmOwnerContract.setProvider(web3.currentProvider);

    const AgmOwner = await AgmOwnerContract.deployed();
    return AgmOwner.createProposal.sendTransaction(name, description, options, {from});
}


