var IPFS = require('ipfs');

var node;

async function ipfsInit() {
    if (!node) {
        node = new IPFS();
        //console.log(node);
        return new Promise((res,rej) => {
            node.on('ready', async() => {
                const version = await node.version();
                console.log('version: ' + version.version);
                res(node);
            });
        });
    } else {
        return node;
    }
    
}

const ipfs = ipfsInit();
module.exports = ipfs;

