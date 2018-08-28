var ipfs = require('./ipfsProvider');
const http = require('http');

exports.downloadString = async function(hash) {
  const node = await ipfs;
  const answers = await node.files.cat(hash);
  return answers.toString();
}

exports.stop = async function() {
  const node = await ipfs;
  //console.log(node);
  await node.stop();
}
