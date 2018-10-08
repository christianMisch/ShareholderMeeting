import ShareholderJson from '../../solidity/build/contracts/Shareholder.json';
import FactoryJson from '../../solidity/build/contracts/Factory.json';
import {default as contract} from 'truffle-contract';
import web3 from './web3Provider';

const ShareholderContract = contract(ShareholderJson);
ShareholderContract.setProvider(web3.currentProvider);
var Shareholder;

const FactoryContract = contract(FactoryJson);
FactoryContract.setProvider(web3.currentProvider);
var Factory;

const gas = /*'220000'*/ '3000000';

export function denominateVotingTokens(numOfBlocks, factor, from) {
  return ShareholderContract.deployed().then(function (deplShareh) {
    Shareholder = deplShareh;
    return Shareholder.denominateVotingTokens.sendTransaction(numOfBlocks, factor, {from: from, gas: gas});
  }).then(function (result) {
    alert('denominateVotingTokens TX was successful: ' + result);
    return result;
  }).catch(function (error) {
    return 'error';
    //console.log('error during denominateVotingTokens TX: ' + error.message);
  });
}

export function delegateToProxy(proxyAddress, partialDelegation, voteBlockIndex, from) {
  return ShareholderContract.deployed().then(function (deplShareh) {
    Shareholder = deplShareh;
    return Shareholder.delegateToProxy.sendTransaction(proxyAddress, partialDelegation, voteBlockIndex, {from: from, gas: gas});
  }).then(function (result) {
    alert('delegateToProxy TX was successful: ' + result);
    return result;
  }).catch(function (error) {
    console.log('error during delegateToProxy TX: ' + error.message);
    return 'error';
  });
}

export function getVotingDenominations() {
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

export async function rateQuestion(questId, ratOpt, from) {
  /*return ShareholderContract.deployed().then(function (deplShareh) {
    Shareholder = deplShareh;
    return Shareholder.rateQuestion.sendTransaction(questId, ratOpt, {from: from});
  }).then(function (result) {
    alert('rateQuestion TX was successful: ' + result);
    return result;
  }).catch(function (error) {
    console.log('error during rateQuestion TX: ' + error.message);
    return error.message;
  });*/

  const deplShContract = await ShareholderContract.deployed();

  const txId = await deplShContract.rateQuestion.sendTransaction(questId, ratOpt, {from: from});
  alert('rateQuestion TX was successful: ' + txId);
  return txId;
}

export function getShareholder(shareholderId) {
  return FactoryContract.deployed().then(function (deplFac) {
    Factory = deplFac;
    return Factory.getShareholder.call(shareholderId);
  }).then(function (result) {
    //alert('getShareholder call was successful: ' + result);
    return result;
  }).catch(function (error) {
    console.log('error during getShareholder call: ' + error.message);
  });
}

export function getNumOfShareholders() {
  return FactoryContract.deployed().then(function (deplFac) {
    Factory = deplFac;
    return Factory.getNumOfShareholders.call();
  }).then(function (result) {
    //alert('getNumOfShareholders call was successful: ' + result);
    return result;
  }).catch(function (error) {
    console.log('error during getNumOfShareholders call: ' + error.message);
  });
}

export function vote(propId, votOpt, from) {
  return ShareholderContract.deployed().then(function (deplShareh) {
    Shareholder = deplShareh;
    return Shareholder.vote.sendTransaction(propId, votOpt, {from: from, gas: gas});
  }).then(function (result) {
    console.log('vote TX was successful: ' + result);
    return result;
  }).catch(function (error) {
    return error.message;
    console.log('error during vote TX: ' + error.message);
  });
}

export function getSelVotOpt(optId) {
  return ShareholderContract.deployed().then(function (deplFac) {
    Factory = deplFac;
    return Factory.selectVotOptions.call(optId);
  }).then(function (result) {
    //alert('getShareholder call was successful: ' + result);
    return result;
  }).catch(function (error) {
    console.log('error during getSelVotOpt call: ' + error.message);
  });
}

export function getShareholderWithOption(adr, optId) {
  return ShareholderContract.deployed().then(function (deplFac) {
    Factory = deplFac;
    return Factory.getShareholderWithOption.call(adr, optId);
  }).then(function (result) {
    //alert('getShareholder call was successful: ' + result);
    return result;
  }).catch(function (error) {
    console.log('error during getShareholderWithOption call: ' + error.message);
  });
}

export function getShareholderWithOptionLength(adr) {
  return ShareholderContract.deployed().then(function (deplFac) {
    Factory = deplFac;
    return Factory.getShareholderWithOptionLength.call(adr);
  }).then(function (result) {
    //alert('getShareholder call was successful: ' + result);
    return result;
  }).catch(function (error) {
    console.log('error during getShareholderWithOptionLength call: ' + error.message);
  });
}


