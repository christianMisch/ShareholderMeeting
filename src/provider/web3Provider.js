import Web3 from 'web3';

/**
 * @summary initializes a web3 provider
 */

/**
 * @function web3Init create a new web3 provider
 * @returns the current provider or a new one
 */
export function web3Init() {
  console.log(typeof window.web3 !== 'undefined');
  if (typeof window.web3 !== 'undefined') {
    console.log('Connected to Web3!');
    return new Web3(window.web3.currentProvider);
  } else {
    console.log('No Web 3? You should consider trying MetaMask and Chrome!');
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    return web3;
  }
}

const web3 = web3Init();
export default web3;