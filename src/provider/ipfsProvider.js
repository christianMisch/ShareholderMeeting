var IPFS = require('ipfs');

/**
 * @summary initialize a new IPFS node if no active node exists
 */

// the current IPFS node
var node;

/**
 * @function ipfsInit creates a new IPFS node
 * @returns the current IPFS node or a new node
 */
async function ipfsInit() {
    if (!node) {
        node = new IPFS({
            init: true,
            start: true,
            config: {
                preload: {
                    enabled: true,
                    addresses: [
                        '/dns4/node0.preload.ipfs.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
                        '/dns4/node1.preload.ipfs.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6'
                    ]
                },
                // contains the addresses of the bootstrap nodes (peers) in the IPFS network which load the off-chain stored data
                Bootstrap: [
                    '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
                    '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
                    '/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
                    '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
                    '/dns4/node0.preload.ipfs.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
                    '/dns4/node1.preload.ipfs.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6'
                ]
            }
        });
        return new Promise((res,rej) => {
            node.on('ready', async() => {
                const version = await node.version();
                console.log('version: ' + version.version);
                res(node);
            });

            node.on('stop', async() => {
                console.log('The IPFS has been stopped');
            });
        });
    } else {
        return node;
    }

}

const ipfs = ipfsInit();
module.exports = ipfs;
