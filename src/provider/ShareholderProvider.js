import ShareholderArtifact from '../../solidity/build/contracts/Shareholder.json';
import {default as contract} from 'truffle-contract';

  export function createQuestion(content, provider) {
    console.log('createQuestion()');
    const ShareholderContract = contract(ShareholderArtifact);
    ShareholderContract.setProvider(provider.currentProvider);
    console.log(ShareholderContract);
    const Shareholder = ShareholderContract.deployed();
    console.log(Shareholder);
    return Shareholder.createQuestion.sendTransaction(content);
  }

  export function test(provider) {
    const ShareholderContract = contract(ShareholderArtifact);
    ShareholderContract.setProvider(provider.currentProvider);
    var Shareholder, string;
    ShareholderContract.deployed().then(function(instance) {
      console.log(instance);
      Shareholder = instance;
      return Shareholder.test();
    }).then(function(result) {
      console.log(result);
    }).catch(function(error) {
      console.log(error.message);
    });

    return string;
  }
