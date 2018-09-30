import FactoryJson from '../../solidity/build/contracts/Factory.json';
import {default as contract} from 'truffle-contract'; 
import web3 from './web3Provider';

const FactoryContract = contract(FactoryJson);
FactoryContract.setProvider(web3.currentProvider);
var Factory;

const gas = /*'220000'*/ '3000000';

export function getProposal(proposalId) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        return Factory.getProposal.call(proposalId);
    }).then(function(result) {
        alert('getProposal call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log('Error during getProposal call: ' + error.message);
    }); 
}

export function getNumOfProposals() {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        //Factory.getNumOfProposals.estimateGas().then(function(result){console.log('estimateGas: ' + result)});
        return Factory.getNumOfProposals.call();
    }).then(function(result) {
        //alert('getNumOfProposals call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log('Error during getNumOfProposals call: ' + error.message);
    }); 
}

export function setMinimumVotingQuorum(quorum, from) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        //Factory.getNumOfProposals.estimateGas().then(function(result){console.log('estimateGas: ' + result)});
        return Factory.setMinimumVotingQuorum.sendTransaction(quorum, {gas: gas, from: from});
    }).then(function(result) {
        //alert('getNumOfProposals call was successful: ' + result);
    }).catch(function(error) {
        console.log('Error during getNumOfProposals call: ' + error.message);
    }); 
}


