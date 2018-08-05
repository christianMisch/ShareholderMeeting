'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ipfs = require('./ipfs');

var _ipfs2 = _interopRequireDefault(_ipfs);

var _promisify = require('./promisify');

var _promisify2 = _interopRequireDefault(_promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(hash) {
    var ipfsNode, answers;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _ipfs2.default)();

          case 2:
            ipfsNode = _context.sent;
            _context.next = 5;
            return (0, _promisify2.default)(function (cb) {
              return ipfsNode.files.get(hash, cb);
            });

          case 5:
            answers = _context.sent;
            return _context.abrupt('return', answers[0].content.toString('utf8'));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function downloadString(_x) {
    return _ref.apply(this, arguments);
  }

  return downloadString;
}();