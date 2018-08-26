import Web3 from 'web3';

export function web3Init() {
  console.log(typeof window.web3 !== 'undefined');
  if (typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    console.log('Connected to Web3!');
    return new Web3(window.web3.currentProvider);
  } else {
    console.log('No Web 3? You should consider trying MetaMask and Chrome!');
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    //web3.setProvider(new Web3.providers.HttpProvider('http://' + 'ChristianM' + ':' + 'ShareholderMeeting' + '@localhost:7545'));
    //web3Provider.eth.defaultAccount = web3Provider.eth.accounts[0];
    //web3Provider.personal.unlockAccount(web3Provider.eth.defaultAccount);
    return web3;
  }
}

const web3 = web3Init();
export default web3;


