var artifactor = require("truffle-artifactor");
const owner = require('../artifacts/contracts/AgmOwner.json');

class State {
    /*static proposals;
    static users;*/

    constructor(height, width) {
      
    }
}

//static var proposals;
//console.log(owner);
artifactor.save(owner, './AgmOwner.sol.js').then(function() {

});

//artifactor.save(owner, "../artifacts/post-build-contracts/AgmOwner.sol.js").then(function() {
    // The file ./MyContract.sol.js now exists, which you can
    // import into your project like any other Javascript file.
//});