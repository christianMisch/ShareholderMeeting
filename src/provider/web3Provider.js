import Web3 from 'web3';

export async function web3Init() {
  if (typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    console.log('Connected to Web3!');
    return new Web3(window.web3.currentProvider);
  } else {
    console.log('No Web 3? You should consider trying MetaMask and Chrome!');
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    return new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }
}
