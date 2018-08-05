'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var artifactor = require("truffle-artifactor");
var owner = require('../artifacts/contracts/AgmOwner.json');

var State =
/*static proposals;
static users;*/

function State(height, width) {
    _classCallCheck(this, State);
};

//static var proposals;
//console.log(owner);


artifactor.save(owner, './AgmOwner.sol.js').then(function () {});

//artifactor.save(owner, "../artifacts/post-build-contracts/AgmOwner.sol.js").then(function() {
// The file ./MyContract.sol.js now exists, which you can
// import into your project like any other Javascript file.
//});