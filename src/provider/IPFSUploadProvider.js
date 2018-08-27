var Buffer = require('buffer');
var ipfs = require('./ipfsProvider');
//import getIPFS from './ipfs'
//import promisify from './promisify'

exports.upload = async function(data) {
  //console.log(Buffer.Buffer.from(data));
  const content = Buffer.Buffer.from(data);
  const node = await ipfs;
  //console.log(node);
  const files = await node.files.add({content: content}); 
  return files[0].hash;
}

exports.stop = async function() {
  const node = await ipfs;
  //console.log(node);
  await node.stop();
}

