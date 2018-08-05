//import {initializeWeb3 as web3} from 'web3Provider.js';
//import ShareholderArtifact from 'artifacts/contracts/Shareholder.json';
//import {upload} from 'IPFSUploadProvider';
//const {downloadString} = require('./IPFSDownloadProvider.js'); 
//var artifactor = require("truffle-artifactor");
import contract from '../artifacts/contracts/Shareholder';

$(document).ready(function() {

    $('#login-button').click(function() {
      console.log(contract);
    });
});