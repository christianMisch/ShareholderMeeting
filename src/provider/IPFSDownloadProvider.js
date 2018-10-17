var ipfs = require('./ipfsProvider');

/**
 * @function downloadString provides simple download functionality for a given IPFS hash
 * @param {string} hash the IPFS hash of the data
 * @return the downloaded data from IPFS as string
 */
exports.downloadString = async function(hash) {
  const node = await ipfs;
  const answer = await node.files.cat(hash);
  return answer.toString();
}
