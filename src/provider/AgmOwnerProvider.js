import AgmOwnerJson from '../../solidity/build/contracts/AgmOwner.json';
import web3Provider from './web3Provider';
import {default as contract} from 'truffle-contract';

export function transferOwnership() {
    console.log('web3 accounts: ' + web3Provider.eth.accounts);
    console.log('web3 default account: ' + web3Provider.eth.defaultAccount);
    web3Provider.eth.defaultAccount = web3Provider.eth.accounts[0];
    //web3Provider.personal.unlockAccount(web3Provider.eth.defaultAccount);
    console.log('web3 default account: ' + web3Provider.eth.defaultAccount);

    const AgmOwnerContract = contract(AgmOwnerJson);
    AgmOwnerContract.setProvider(web3Provider.currentProvider);
    var AgmOwner;
    const account = '0x5E3407E44756371B4D3De80Eb4378b715c444619';
    AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
        console.log(AgmOwner);
        return AgmOwner.transferOwnership(account, {from: web3Provider.eth.defaultAccount});
    }).then(function(result) {
        console.log(result);
        alert('Transaction successful');
    }).catch(function(error) {
        console.log(error);
    })
    
}

export function announceAGM() {
    const AgmOwnerContract = contract(AgmOwnerJson);
    AgmOwnerContract.setProvider(web3Provider.currentProvider);
    var AgmOwner;
    AgmOwnerContract.deployed().then(function(instance) {
        AgmOwner = instance;
    }).then(function() {
        return AgmOwner.announceAGM.call();
    }).then(function(result) {
        alert(result);
    }).catch(function(error) {
        console.log(error);
    })
}