import ShareholderJson from '../../solidity/build/contracts/Shareholder.json';
import DirectorJson from '../../solidity/build/contracts/QandA.json';
import {default as contract} from 'truffle-contract';
import web3Provider from './web3Provider';

const ShareholderContract = contract(ShareholderJson);
ShareholderContract.setProvider(web3Provider.currentProvider);

const DirectorContract = contract(DirectorJson);
DirectorContract.setProvider(web3Provider.currentProvider);

const gas = /*'220000'*/ '3000000';

export function createQuestion(content, from) {
    ShareholderContract.deployed().then(function(instance) {
        return instance.createQuestion.sendTransaction(content, {from: from, gas: gas});
    }).then(function(txId) {
        alert('createQuestion TX was successful: ' + txId);
    }).catch(function(error) {
        console.log('error during createQuestion TX: ' + error); 
    });
     
}

export async function createAnswer(questionId, content) {
    DirectorContract.deployed().then(function(instance) {
        return instance.createAnswer.sendTransaction(questionId, content, {from: from, gas: gas});
    }).then(function(txId) {
        alert('createAnswer TX was successful: ' + txId);
    }).catch(function(error) {
        console.log('error during createAnswer TX: ' + error); 
    });
} 

