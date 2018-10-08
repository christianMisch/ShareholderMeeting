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
        console.log('Error during setMinimumVotingQuorum TX: ' + error.message);
    }); 
}

/*export function appendVotingOption(opt, from) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        //Factory.getNumOfProposals.estimateGas().then(function(result){console.log('estimateGas: ' + result)});
        return Factory.appendVotingOption.sendTransaction(opt, {gas: gas, from: from});
    }).then(function(result) {
        //alert('getNumOfProposals call was successful: ' + result);
    }).catch(function(error) {
        console.log('Error during getNumOfProposals call: ' + error.message);
    }); 
}*/

export function getNumOfVotingOptions() {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        //Factory.getNumOfProposals.estimateGas().then(function(result){console.log('estimateGas: ' + result)});
        return Factory.getNumOfVotingOptions.call();
    }).then(function(result) {
        //alert('getNumOfProposals call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log('Error during getNumOfProposals call: ' + error.message);
    }); 
}

export function getVotingOption(optionId) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        //Factory.getNumOfProposals.estimateGas().then(function(result){console.log('estimateGas: ' + result)});
        return Factory.getVotingOption.call(optionId);
    }).then(function(result) {
        //alert('getNumOfProposals call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log('Error during getVotingOption call: ' + error.message);
    }); 
}

export function getWeightOfShareholder(shareholId) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        //Factory.getNumOfProposals.estimateGas().then(function(result){console.log('estimateGas: ' + result)});
        return Factory.getWeightOfShareholder.call(shareholId);
    }).then(function(result) {
        //alert('getNumOfProposals call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log('Error during getWeightOfShareholder call: ' + error.message);
    }); 
}

export function getNumOfVotingShareholders() {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        //Factory.getNumOfProposals.estimateGas().then(function(result){console.log('estimateGas: ' + result)});
        return Factory.getNumOfVotingShareholders.call();
    }).then(function(result) {
        //alert('getNumOfProposals call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log('Error during getNumOfVotingShareholders call: ' + error.message);
    }); 
}

export function getTotalVoteCount() {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        //Factory.getNumOfProposals.estimateGas().then(function(result){console.log('estimateGas: ' + result)});
        return Factory.countSum.call();
    }).then(function(result) {
        //alert('getNumOfProposals call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log('Error during getTotalVoteCount call: ' + error.message);
    }); 
}

export function appendVotingOptionToProposal(propId, option, from) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        //Factory.getNumOfProposals.estimateGas().then(function(result){console.log('estimateGas: ' + result)});
        return Factory.appendVotingOptionToProposal.sendTransaction(propId, option, {gas: gas, from: from});
    }).then(function(result) {
        //alert('getNumOfProposals call was successful: ' + result);
    }).catch(function(error) {
        console.log('Error during appendVotingOptionToProposal TX: ' + error.message);
    }); 
}

export function incrementPropId(from) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        //Factory.getNumOfProposals.estimateGas().then(function(result){console.log('estimateGas: ' + result)});
        return Factory.incrementPropId.sendTransaction({gas: gas, from: from});
    }).then(function(result) {
        //alert('getNumOfProposals call was successful: ' + result);
    }).catch(function(error) {
        console.log('Error during incrementPropId TX: ' + error.message);
    }); 
}

export function getPropId() {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        //Factory.getNumOfProposals.estimateGas().then(function(result){console.log('estimateGas: ' + result)});
        return Factory.propId.call();
    }).then(function(result) {
        //alert('getNumOfProposals call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log('Error during getPropId call: ' + error.message);
    }); 
}

export function hasVoted(propId, from) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        //Factory.getNumOfProposals.estimateGas().then(function(result){console.log('estimateGas: ' + result)});
        return Factory.hasVoted.call(propId, {from: from});
    }).then(function(result) {
        //alert('hasVoted call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log('Error during hasVoted call: ' + error.message);
    }); 
}