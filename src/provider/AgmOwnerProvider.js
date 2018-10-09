import AgmOwnerJson from '../../solidity/build/contracts/AgmOwner.json';
import QandAJson from '../../solidity/build/contracts/QandA.json';
//import {web3} from '../app/scripts/index';
import web3 from './web3Provider';
import {default as contract} from 'truffle-contract'; 

//const ownerAccount = web3Provider.eth.accounts[0];

//console.log(web3);
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

export function getIsAnnounced() {
    return AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
        return AgmOwner.getIsAnnounced.call();
    }).then(function(result) {
        console.log(result);
        //alert('getOwners call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log(error);
    });   
}

export function getIsFinished() {
    return AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
        return AgmOwner.getIsFinished.call();
    }).then(function(result) {
        console.log(result);
        //alert('getOwners call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log(error);
    });   
}

export function announceAGM(from) {
    return AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
    }).then(function() {
        return AgmOwner.announceAGM.sendTransaction({from: from, gas: gas});
    }).then(function(result) {
        //alert(result);
        return result;
    }).catch(function(error) {
        console.log(error);
    })
}

export function addUser(address, role, votingWeight, sender) {
    console.log('addUser sender: ' + sender);
    QandAContract.deployed().then(function(depQandA) {
        QandA = depQandA;
        //console.log(QandA.address);
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

export function finishAGM(from) {
    AgmOwnerContract.deployed().then(function(deplOwner) {
        AgmOwner = deplOwner;
        return AgmOwner.finishAGM.sendTransaction({gas: gas, from: from});
    }).then(function(result) {
        //alert('finishAGM TX was successful: ' + result);
    }).catch(function(error) {
        console.log('Error during finishAGM TX: ' + error.message);
    });
}

export function createProposal(name, hash, options, from) {   
    return AgmOwnerContract.deployed().then(function(deplOwner) {
        AgmOwner = deplOwner;
        AgmOwner.userAddress.call().then(function(result) {
            console.log('userAddress: ' + result); 
        });
        return AgmOwner.createProposal.sendTransaction(name, hash, options, {from: from, gas: gas});
    }).then(function(result) {
        alert('createProposal TX was successful: ' + result);
        return result;
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

export function executeProposal(proposalId, from) {
    return AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
    }).then(function() {
        return AgmOwner.executeProposal(proposalId, {from: from, gas: gas});
    }).then(function(result) {
        alert('executeProposal TX was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log('Error during executeProposal TX: ' + error);
    })
}

export function setAgenda(agenda, from) {   
    AgmOwnerContract.deployed().then(function(deplOwner) {
        AgmOwner = deplOwner;
        return AgmOwner.setAgenda.sendTransaction(agenda, {from: from, gas: gas});
    }).then(function(result) {
        alert('setAgenda TX was successful: ' + result);
        //return result;
    }).catch(function(error) {
        console.log('Error during setAgenda TX: ' + error.message);
    });
}

export function setMeetingPlace(place, from) {   
    AgmOwnerContract.deployed().then(function(deplOwner) {
        AgmOwner = deplOwner;
        return AgmOwner.setMeetingPlace.sendTransaction(place, {from: from, gas: gas});
    }).then(function(result) {
        alert('setMeetingPlace TX was successful: ' + result);
        //return result;
    }).catch(function(error) {
        console.log('Error during setMeetingPlace TX: ' + error.message);
    });
}

export function setMeetingStartTime(start, from) {   
    AgmOwnerContract.deployed().then(function(deplOwner) {
        AgmOwner = deplOwner;
        return AgmOwner.setMeetingStartTime.sendTransaction(start, {from: from, gas: gas});
    }).then(function(result) {
        alert('setMeetingStartTime TX was successful: ' + result);
        //return result;
    }).catch(function(error) {
        console.log('Error during setMeetingStartTime TX: ' + error.message);
    });
}

export function setMeetingEndTime(end, from) {   
    AgmOwnerContract.deployed().then(function(deplOwner) {
        AgmOwner = deplOwner;
        return AgmOwner.setMeetingEndTime.sendTransaction(end, {from: from, gas: gas});
    }).then(function(result) {
        alert('setMeetingEndTime TX was successful: ' + result);
        //return result;
    }).catch(function(error) {
        console.log('Error during setMeetingEndTime TX: ' + error.message);
    });
}

export function setMeetingName(name, from) {   
    AgmOwnerContract.deployed().then(function(deplOwner) {
        AgmOwner = deplOwner;
        return AgmOwner.setMeetingName.sendTransaction(name, {from: from, gas: gas});
    }).then(function(result) {
        alert('setMeetingName TX was successful: ' + result);
        //return result;
    }).catch(function(error) {
        console.log('Error during setMeetingName TX: ' + error.message);
    });
}

export function getAgenda() {
    return AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
        return AgmOwner.agenda.call();
    }).then(function(result) {
        console.log(result);
        //alert('getAgenda call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log(error);
    });   
}

export function getMeetingStartTime() {
    return AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
        return AgmOwner.meetingStartTime.call();
    }).then(function(result) {
        console.log(result);
        //alert('getMeetingStartTime call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log(error);
    });   
}

export function getMeetingEndTime() {
    return AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
        return AgmOwner.meetingEndTime.call();
    }).then(function(result) {
        console.log(result);
        //alert('getMeetingEndTime call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log(error);
    });   
}

export function getMeetingPlace() {
    return AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
        return AgmOwner.meetingPlace.call();
    }).then(function(result) {
        console.log(result);
        //alert('getMeetingPlace call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log(error);
    });   
}

export function getMeetingName() {
    return AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
        return AgmOwner.meetingName.call();
    }).then(function(result) {
        console.log(result);
        //alert('getMeetingName call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log(error);
    });   
}

export function registerUser(secretPW, from) {   
    AgmOwnerContract.deployed().then(function(deplOwner) {
        AgmOwner = deplOwner;
        return AgmOwner.registerUser.sendTransaction(secretPW, {from: from, gas: gas});
    }).then(function(result) {
        alert('registerUser TX was successful: ' + result);
        //return result;
    }).catch(function(error) {
        console.log('Error during registerUser TX: ' + error.message);
    });
}

export function getUserId(address) {
    return AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
        return AgmOwner.userId.call(address);
    }).then(function(result) {
        console.log(result);
        //alert('getUserId call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log(error);
    });   
}

export function getUserPW(address) {
    return AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
        return AgmOwner.secretPWs.call(address);
    }).then(function(result) {
        console.log(result);
        //alert('getUserPW call was successful: ' + result);
        return result;
    }).catch(function(error) {
        console.log(error);
    });   
}