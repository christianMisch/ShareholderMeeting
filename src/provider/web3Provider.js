import Web3 from 'web3';

function web3Init() {
  if (typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    console.log('Connected to Web3!');
    return new Web3(window.web3.currentProvider);
  } else {
    console.log('No Web 3? You should consider trying MetaMask and Chrome!');
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    var web3Provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    //web3Provider.eth.defaultAccount = web3Provider.eth.accounts[0];
    //web3Provider.personal.unlockAccount(web3Provider.eth.defaultAccount);
    return web3Provider;
  }
}

const web3Provider = web3Init();
export default web3Provider;


