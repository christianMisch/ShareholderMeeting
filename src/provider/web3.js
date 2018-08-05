//const IPFS = require('ipfs');
//const series = require('async/series')
//import {default as contract} from 'truffle/packages/truffle-artifactor';
import web3 from 'web3';

//const node = new IPFS();
//let fileMultihash;

const web3Init = () => {
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

const web3 = web3Init();
export default web3;
  

/*series([
    (cb) => node.on('ready', cb),
    (cb) => node.version((err, version) => {
      if (err) { return cb(err) }
      console.log('Version:', version.version)
      cb()
    }),
    (cb) => node.files.add({
        path: 'hello.txt',
        content: Buffer.from('Hello World 101')
      }, (err, filesAdded) => {
        if (err) { return cb(err) }
    
        console.log('\nAdded file:',filesAdded[0].path, filesAdded[0].hash)
        fileMultihash = filesAdded[0].hash
        cb()
      }),
      (cb) => node.files.cat(fileMultihash, (err, data) => {
        if (err) { return cb(err) }
    
        console.log('\nFile content:')
        process.stdout.write(data)
      })


  ])*/

