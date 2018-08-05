import { Buffer } from 'buffer';
import getIPFS from './ipfs'
import promisify from './promisify'

exports.upload = async function(data) {
  const content = Buffer.from(data);
  const ipfsNode = await getIPFS()
  const files = await promisify(cb => ipfsNode.files.add({ content }, cb))
  return files[0].hash
}
