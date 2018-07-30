//import web3 from 'web3';
var web3 = require('web3');

function initializeWeb3() {
    if (typeof web3 !== 'undefined') {
        console.log('connected to web3');
        web3 = new Web3(web3.currentProvider);
      } else {
        console.log('No web3? first install chrome with MetaMask');
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
}

function notifyUser(message) {
    console.log(message);
}

function checkAccountStatus() {
    const accounts = web3.eth.getAccounts(); 
    console.log(accounts);
}

console.log(notifyUser(web3));

// export default initializeWeb3;




