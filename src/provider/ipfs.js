const IPFS = require('ipfs');

let ipfs

function initIPFS() {
  const ipfsNode = new IPFS();
  return new Promise((res, rej) => {
    ipfsNode.on('ready', async () => {
      res(ipfsNode)
    })
  })
}

exports.getIPFS = async function() {
  if (!ipfs) {
    ipfs = await initIPFS()
  }
  return ipfs
}
