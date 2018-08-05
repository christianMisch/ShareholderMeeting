'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ipfs = require('ipfs');

var _ipfs2 = _interopRequireDefault(_ipfs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ipfs = void 0;

function initIPFS() {
  var _this = this;

  var ipfsNode = new _ipfs2.default();
  return new Promise(function (res, rej) {
    ipfsNode.on('ready', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              res(ipfsNode);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    })));
  });
}

exports.default = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (ipfs) {
              _context2.next = 4;
              break;
            }

            _context2.next = 3;
            return initIPFS();

          case 3:
            ipfs = _context2.sent;

          case 4:
            return _context2.abrupt('return', ipfs);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function getIPFS() {
    return _ref2.apply(this, arguments);
  }

  return getIPFS;
}();