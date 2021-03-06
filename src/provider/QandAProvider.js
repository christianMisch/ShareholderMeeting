import ShareholderJson from '../../solidity/build/contracts/Shareholder.json';
import DirectorJson from '../../solidity/build/contracts/Director.json';
import QandAJson from '../../solidity/build/contracts/QandA.json';
import {default as contract} from 'truffle-contract';
import web3 from './web3Provider';

/**
 * @summary provider component for invoking functionality of the QandA contract from the frontend
 */

const ShareholderContract = contract(ShareholderJson);
ShareholderContract.setProvider(web3.currentProvider);

const DirectorContract = contract(DirectorJson);
DirectorContract.setProvider(web3.currentProvider);

const QandAContract = contract(QandAJson);
QandAContract.setProvider(web3.currentProvider);

const gas = '3000000';

export function createQuestion(ipfs_hash, from) {
    ShareholderContract.deployed().then(function(instance) {
        return instance.createQuestion.sendTransaction(ipfs_hash, from, {from: from, gas: gas});
    }).then(function(txId) {
        alert('createQuestion TX was successful: ' + txId);
    }).catch(function(error) {
        console.log('error during createQuestion TX: ' + error.message);
    });
}

export function createAnswer(questionId, ipfs_hash, from) {
    DirectorContract.deployed().then(function(instance) {
        return instance.createAnswer.sendTransaction(questionId, ipfs_hash, from, {from: from, gas: gas});
    }).then(function(txId) {
        alert('createAnswer TX was successful: ' + txId);
    }).catch(function(error) {
        console.log('error during createAnswer TX: ' + error.message);
    });
}

export function getNumOfAnswers() {
    return QandAContract.deployed().then(function(instance) {
        return instance.getNumOfAnswers.call({gas: gas});
    }).then(function(result) {
        return result;
    }).catch(function(error) {
        console.log('error during getNumOfAnswers call: ' + error.message);
    });
}

export function getNumOfQuestions() {
    return QandAContract.deployed().then(function(instance) {
        return instance.getNumOfQuestions.call({gas: gas});
    }).then(function(result) {
        return result;
    }).catch(function(error) {
        console.log('error during getNumOfQuestions call: ' + error.message);
    });
}

export function getQuestion(questionId) {
    return QandAContract.deployed().then(function(instance) {
        return instance.getQuestion.call(questionId, {gas: gas});
    }).then(function(result) {
        return result;
    }).catch(function(error) {
        console.log('error during getQuestion call: ' + error.message);
    });
}

export function getAnswer(answId) {
    return QandAContract.deployed().then(function(instance) {
        return instance.getAnswer.call(answId, {gas: gas});
    }).then(function(result) {
        return result;
    }).catch(function(error) {
        console.log('error during getAnswer call: ' + error.message);
    });
}