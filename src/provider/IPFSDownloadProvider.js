const getIPFS = require('./ipfs.js');
const promisify = require('./promisify.js');

exports.downloadString = async function(hash) {
  const ipfsNode = await getIPFS()
  const answers = await promisify(cb => ipfsNode.files.get(hash, cb))
  return answers[0].content.toString('utf8')
}

