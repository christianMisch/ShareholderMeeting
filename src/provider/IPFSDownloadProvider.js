var ipfs = require('./ipfsProvider');
const http = require('http');

exports.downloadString = async function(hash) {
  const node = await ipfs;
  //const answers = await node.files.get(hash);
  //return answers[0].content.toString('utf8');
  console.log('cat');
  /*console.log(hash);
  console.log(hash[0]);
  console.log(hash[0].hash);
  console.log(await node.files.cat(hash));*/
  const answer = await node.files.cat(hash);
  /*return new Promise((res, rej) => {
    http.get({
      host: 'ipfs.io',
      path: '/ipfs/' + hash
    }, function(response) {
      response.on('data', function() {
      });
      response.on('end', function() {
        res()
      });
    });
  });*/
  return answer.toString();
}

/*exports.downloadObject = async function(hash) {
  const node = await ipfs;
  //const answers = await node.files.cat(hash);
  const answers = await node.files.get(hash);
  return answers[0];
}*/

exports.stop = async function() {
  const node = await ipfs;
  //console.log(node);
  await node.stop();
}
