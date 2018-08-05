//import {initializeWeb3 as web3} from 'web3Provider.js';
//import ShareholderArtifact from 'artifacts/contracts/Shareholder.json';
import {upload} from 'IPFSUploadProvider';
import {downloadString} from 'IPFSDownloadProvider'; 
//var artifactor = require("truffle-artifactor");

$(document).ready(function() {

    $('#login-button').click(function() {
      const hash = upload('hello');
      console.log(downloadString(hash));
    });
});