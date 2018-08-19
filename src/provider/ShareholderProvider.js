import ShareholderJson from '../../solidity/build/contracts/Shareholder.json';
import {default as contract} from 'truffle-contract';
import web3Provider from './web3Provider';

const ShareholderContract = contract(ShareholderJson);
ShareholderContract.setProvider(web3Provider.currentProvider);
var Shareholder;
const gas = /*'220000'*/ '3000000';

export async function createQuestion(content) {
  const Shareholder = await ShareholderContract.deployed();
  Shareholder.createQuestion.sendTransaction(content);
}

export function denominateVotingTokens(numOfBlocks, factor, from) {
  ShareholderContract.deployed().then(function (deplShareh) {
    Shareholder = deplShareh;
    return Shareholder.denominateVotingTokens.sendTransaction(numOfBlocks, factor, {from: from});
  }).then(function (result) {
    alert('denominateVotingTokens TX was successful: ' + result);
  }).catch(function (error) {
    console.log('error during denominateVotingTokens TX: ' + error.message);
  });
}

export function delegateToProxy(proxyAddress, partialDelegation, voteBlockIndex) {
  ShareholderContract.deployed().then(function (deplShareh) {
    Shareholder = deplShareh;
    return Shareholder.delegateToProxy.sendTransaction(proxyAddress, partialDelegation, voteBlockIndex);
  }).then(function (result) {
    alert('delegateToProxy TX was successful: ' + result);
  }).catch(function (error) {
    console.log('error during delegateToProxy TX: ' + error.message);
  });
}

export function getVotingDenominations() {
  var Shareholder;
  return ShareholderContract.deployed().then(function (deplShareh) {
    Shareholder = deplShareh;
    return Shareholder.getVotingDenominations.call();
  }).then(function (result) {
    //alert('getVotingDenominations TX was successful: ' + result);
    return result;
  }).catch(function (error) {
    console.log('error during getVotingDenominations TX: ' + error.message);
  });
} 


