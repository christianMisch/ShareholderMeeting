import ShareholderArtifact from '../../solidity/build/contracts/Shareholder.json';
import {default as contract} from 'truffle-contract';

  export async function createQuestion(content, from, provider) {
    console.log(ShareholderArtifact);
    const ShareholderContract = contract(ShareholderArtifact);
    ShareholderContract.setProvider(await provider.currentProvider);
    console.log(ShareholderContract);
    const Shareholder = await ShareholderContract.deployed();
    console.log(Shareholder);
    await Shareholder.createQuestion.sendTransaction(content, {from});
  }

  export async function test(provider) {
    const ShareholderContract = contract(ShareholderArtifact);
    ShareholderContract.setProvider(provider.currentProvider);
    const Shareholder = await ShareholderContract.deployed();
    return Shareholder.test.call();
  }
