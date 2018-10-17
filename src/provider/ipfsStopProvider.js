const ipfs = require('./ipfsProvider');

exports.stop = async function() {
  try {
    const node = await ipfs;
    await node.stop();
    console.log('Node stopped!')
  } catch (error) {
    console.error('IPFS node failed to stop!', error);
  }
}