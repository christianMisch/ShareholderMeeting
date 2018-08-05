'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var web3Init = function web3Init() {
  if (typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    console.log('Connected to Web3!');
    return new _web2.default(window.web3.currentProvider);
  } else {
    console.log('No Web 3? You should consider trying MetaMask and Chrome!');
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    return new _web2.default(new _web2.default.providers.HttpProvider('http://localhost:8545'));
  }
};

var web3 = web3Init();
exports.default = web3;