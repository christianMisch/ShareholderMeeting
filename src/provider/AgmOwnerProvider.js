import AgmOwnerJson from '../../solidity/build/contracts/AgmOwner.json';
import QandAJson from '../../solidity/build/contracts/QandA.json';
//import {web3} from '../app/scripts/index';
import web3 from './web3Provider';
import {default as contract} from 'truffle-contract'; 

//const ownerAccount = web3Provider.eth.accounts[0];

console.log(web3);
const AgmOwnerContract = contract(AgmOwnerJson);
AgmOwnerContract.setProvider(web3.currentProvider);
var AgmOwner;

const QandAContract = contract(QandAJson);
QandAContract.setProvider(web3.currentProvider);
var QandA;


const gas = /*'220000'*/ '3000000';

export function transferOwnership(newOwnerAdr, from) {
    //console.log('web3 accounts: ' + web3Provider.eth.accounts);
    //console.log('web3 default account: ' + web3Provider.eth.defaultAccount);
    //web3Provider.eth.defaultAccount = web3Provider.eth.accounts[0];
    //web3Provider.personal.unlockAccount(web3Provider.eth.defaultAccount);
    //console.log('web3 default account: ' + web3Provider.eth.defaultAccount);
    //const receiver = web3Provider.eth.accounts[2];

    AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
        /*AgmOwner.userAddress.call().then(function(result) {
            console.log('userAddress: ' + result); 
        });*/
        return AgmOwner.transferOwnership.sendTransaction(newOwnerAdr, {from: from});
    }).then(function(result) {
        console.log(result);
        alert('transferOwnership TX was successful: ' + result);
    }).catch(function(error) {
        console.log(error);
    });   
}

export function getOwnerAddress(from) {
    return AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
        return AgmOwner.getOwnerAddress.call({from: from});
    }).then(function(result) {
        console.log(result);
        //alert('getOwnerAddress call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log(error);
    });   
}

export function hasPermission(from) {
    return AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
        return AgmOwner.hasPermission.call({from: from});
    }).then(function(result) {
        console.log(result);
        //alert('hasPermission call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log(error);
    });   
}



export function getOwners() {
    return AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
        return AgmOwner.getOwners.call();
    }).then(function(result) {
        console.log(result);
        //alert('getOwners call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log(error);
    });   
}



export function announceAGM() {
    AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
    }).then(function() {
        return AgmOwner.announceAGM.call({from: ownerAccount});
    }).then(function(result) {
        alert(result);
    }).catch(function(error) {
        console.log(error);
    })
}

export function addUser(address, role, votingWeight, sender) {
    QandAContract.deployed().then(function(depQandA) {
        QandA = depQandA;
        console.log(QandA.address);
        return AgmOwnerContract.deployed();
    }).then(function(depAgmOwner) {
        AgmOwner = depAgmOwner;
        return AgmOwner.addUser.sendTransaction(address, role, votingWeight, QandA.address, {from: sender, gas: gas});
    }).then(function(result) {
        alert('addUser transaction was successful: ' + result);
    }).catch(function(error) {
        console.log('error during addUser TX: ' + error);
    })
}

export function removeUser(address, from) {
    AgmOwnerContract.deployed().then(function(deplOwner) {
        AgmOwner = deplOwner;
        return AgmOwner.removeUser.sendTransaction(address, {from: from, gas: gas});
    }).then(function(result) {
        alert('removeUser TX was successful: ' + result);
    }).catch(function(error) {
        console.log('Error during removerUser TX: ' + error.message);
    }); 
}

export function getNumOfUsers() {
    AgmOwnerContract.deployed().then(function(deplOwner) {
        AgmOwner = deplOwner;
        return AgmOwner.getNumOfUsers.call();
    }).then(function(result) {
        alert('getNumOfUsers call was successful: ' + result);
    }).catch(function(error) {
        console.log('Error during getNumOfUsers call: ' + error.message);
    });
}

export function getUser(address) {
    return AgmOwnerContract.deployed().then(function(deplOwner) {
        AgmOwner = deplOwner;
        return AgmOwner.getUser.call(address);
    }).then(function(result) {
        //alert('getUser call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log('Error during getUser call: ' + error.message);
    });
}

export function finishAGM() {
    AgmOwnerContract.deployed().then(function(deplOwner) {
        AgmOwner = deplOwner;
        return AgmOwner.finishAGM();
    }).then(function(result) {
        alert('finishAGM TX was successful: ' + result);
    }).catch(function(error) {
        console.log('Error during finishAGM TX: ' + error.message);
    });
}

export function createProposal(name, description, options, sender) {   
    AgmOwnerContract.deployed().then(function(deplOwner) {
        AgmOwner = deplOwner;
        AgmOwner.userAddress.call().then(function(result) {
            console.log('userAddress: ' + result); 
        });
        return AgmOwner.createProposal.sendTransaction(name, description, options, {from: sender, gas: gas});
    }).then(function(result) {
        alert('createProposal TX was successful: ' + result);
    }).catch(function(error) {
        console.log('Error during createProposal TX: ' + error.message);
    });
}

export function getUserList() {
    return AgmOwnerContract.deployed().then(function(deplOwner) {
        AgmOwner = deplOwner;
        return AgmOwner.getUserList.call();
    }).then(function(result) {
        alert('getUserList call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log('Error during getUserList call: ' + error.message);
    });
}

