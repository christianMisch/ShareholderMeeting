'use strict';

// import * as AgmOwnerArtifact from './../artifacts/contracts/AgmOwner';

//console.log(AgmOwnerArtifact);

var IPFS = require('ipfs');
var series = require('async/series');

var node = new IPFS();

series([function (cb) {
  return node.on('ready', cb);
}, function (cb) {
  return node.version(function (err, version) {
    if (err) {
      return cb(err);
    }
    console.log('Version:', version.version);
    cb();
  });
}, function (cb) {
  return node.files.add({
    path: 'hello.txt',
    content: Buffer.from('Hello World 101')
  }, function (err, filesAdded) {
    if (err) {
      return cb(err);
    }

    console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash);
    fileMultihash = filesAdded[0].hash;
    cb();
  });
}, function (cb) {
  return node.files.cat(fileMultihash, function (err, data) {
    if (err) {
      return cb(err);
    }

    console.log('\nFile content:');
    process.stdout.write(data);
  });
}]);