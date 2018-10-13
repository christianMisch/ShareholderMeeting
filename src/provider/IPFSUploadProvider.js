var Buffer = require('buffer');
var ipfs = require('./ipfsProvider');

/**
 * @function provides simple upload functionality to the IPFS network
 * @param {string} data which shall be uploaded
 * @return the hash to access the uploaded data
 */
exports.upload = async function(data) {
  const content = Buffer.Buffer.from(data);
  const node = await ipfs;
  const files = await node.files.add({content: content});
  var hash = files[0].hash;
  return hash;
}
