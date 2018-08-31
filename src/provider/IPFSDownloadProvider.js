var ipfs = require('./ipfsProvider');
const http = require('http');

exports.downloadString = async function(hash) {
  const node = await ipfs;
  const answers = await node.files.cat(hash);
  return answers.toString();
}

/*exports.downloadObject = async function(hash) {
  const node = await ipfs;
  //const answers = await node.files.cat(hash);
  const answers = await node.files.get(hash);
  return answers[0];
}*/

exports.stop = async function() {
  const node = await ipfs;
  //console.log(node);
  await node.stop();
}
