import FactoryJson from '../../solidity/build/contracts/Factory.json';
import {default as contract} from 'truffle-contract'; 
import web3 from './web3Provider';

/**
 * @summary provider component for invoking functionality of the Factory contract from the frontend
 */

const FactoryContract = contract(FactoryJson);
FactoryContract.setProvider(web3.currentProvider);
var Factory;

const gas = '3000000';

export function getProposal(proposalId) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        return Factory.getProposal.call(proposalId);
    }).then(function(result) {
        console.log('getProposal call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log('Error during getProposal call: ' + error.message);
    }); 
}

export function getNumOfProposals() {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        return Factory.getNumOfProposals.call();
    }).then(function(result) {
        return result;
    }).catch(function(error) {
        console.log('Error during getNumOfProposals call: ' + error.message);
    }); 
}

export function setMinimumVotingQuorum(quorum, from) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        return Factory.setMinimumVotingQuorum.sendTransaction(quorum, {gas: gas, from: from});
    }).then(function(result) {
        console.log('setMinimumVotingQuorum TX was successful: ' + result);
    }).catch(function(error) {
        console.log('Error during setMinimumVotingQuorum TX: ' + error.message);
    }); 
}

export function getNumOfVotingOptions() {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        return Factory.getNumOfVotingOptions.call();
    }).then(function(result) {
        return result;
    }).catch(function(error) {
        console.log('Error during getNumOfVotingOptions call: ' + error.message);
    }); 
}

export function getVotingOption(optionId) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        return Factory.getVotingOption.call(optionId);
    }).then(function(result) {
        return result;
    }).catch(function(error) {
        console.log('Error during getVotingOption call: ' + error.message);
    }); 
}

export function getWeightOfShareholder(shareholId) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        return Factory.getWeightOfShareholder.call(shareholId);
    }).then(function(result) {
        return result;
    }).catch(function(error) {
        console.log('Error during getWeightOfShareholder call: ' + error.message);
    }); 
}

export function getNumOfVotingShareholders() {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        return Factory.getNumOfVotingShareholders.call();
    }).then(function(result) {
        return result;
    }).catch(function(error) {
        console.log('Error during getNumOfVotingShareholders call: ' + error.message);
    }); 
}

export function getTotalVoteCount() {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        return Factory.countSum.call();
    }).then(function(result) {
        return result;
    }).catch(function(error) {
        console.log('Error during getTotalVoteCount call: ' + error.message);
    }); 
}

export function appendVotingOptionToProposal(propId, option, from) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        return Factory.appendVotingOptionToProposal.sendTransaction(propId, option, {gas: gas, from: from});
    }).then(function(result) {
        console.log('appendVotingOptionToProposal call was successful: ' + result);
    }).catch(function(error) {
        console.log('Error during appendVotingOptionToProposal TX: ' + error.message);
    }); 
}

export function incrementPropId(from) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        return Factory.incrementPropId.sendTransaction({gas: gas, from: from});
    }).then(function(result) {
        console.log('incrementPropId TX was successful: ' + result);
    }).catch(function(error) {
        console.log('Error during incrementPropId TX: ' + error.message);
    }); 
}

export function getPropId() {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        return Factory.propId.call();
    }).then(function(result) {
        return result;
    }).catch(function(error) {
        console.log('Error during getPropId call: ' + error.message);
    }); 
}