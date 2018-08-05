'use strict';

var _IPFSUploadProvider = require('IPFSUploadProvider');

var _IPFSDownloadProvider = require('IPFSDownloadProvider');

//var artifactor = require("truffle-artifactor");

//import {initializeWeb3 as web3} from 'web3Provider.js';
//import ShareholderArtifact from 'artifacts/contracts/Shareholder.json';
$(document).ready(function () {

  $('#login-button').click(function () {
    var hash = (0, _IPFSUploadProvider.upload)('hello');
    console.log((0, _IPFSDownloadProvider.downloadString)(hash));
  });
});