//import {initializeWeb3 as web3} from 'web3Provider.js';
//import ShareholderArtifact from 'artifacts/contracts/Shareholder.json';
//import {upload} from 'IPFSUploadProvider';
//const {downloadString} = require('./IPFSDownloadProvider.js'); 
//var artifactor = require("truffle-artifactor");
import ShareholderArtifact from '../artifacts/contracts/Shareholder.json';
//import {createNewProposal} from './ProposalProvider';
import {default as contract} from 'truffle-contract';

$(document).ready(function() {

    $('#login-button').click(function() {
      console.log(ShareholderArtifact);

      console.log('---------------');

      console.log(contract(ShareholderArtifact));

      //createNewProposal('name', 'description', 'options');
    });
});