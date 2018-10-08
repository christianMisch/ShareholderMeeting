//import {createQuestion, test} from '../provider/ShareholderProvider';
import web3 from '../../provider/web3Provider';
import {announceAGM} from '../../provider/AgmOwnerProvider';
import { upload } from '../../provider/IPFSUploadProvider';
import {downloadString} from '../../provider/IPFSDownloadProvider';
//const IPFSDownload = require('../../provider/IPFSDownloadProvider.js');
import './agmSetup';
import {getActiveUserAddress} from './authentication';
import './manageSPA';
import './qAndA';
import './voting';
// minimum 14 days before for shareholders to register
export class App {

    constructor(account, network) {
        this.account = account;
        this.network = network;
    }

    async start() {
        console.log(`Start the app with networkId=${this.network} and owner account =${this.account}`);
        /*var announcement = mappAnnouncement(await announceAGM());
        console.log(announcement);
        place = announcement.place;
        date = announcement.date;
        
        $('a[href="#home"]').click(function() {
            setTimeout(function() {
                $('main #place').html(place);
                $('main #date').html(date);  
            }, 100);
        });*/
        //console.log('before');
        //const hash = await upload('hey this is an example string');
        //console.log('ipfs-content: ' + await downloadString('QmQ6ZVFzcg6JKNwwL98iSpDaHxgx9HbPDHKCCTctS2r5oM'));
        //console.log('after');
        
        /*var templateParams = {
            name: 'James',
            notes: 'Check this out!'
        };
        emailjs.send('gmail', 'template_hQCxCp47', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });
        console.log('EMAIL WAS SENT!!!');*/
        console.log('upload data');
        var hash = await upload('example');
        console.log('downloadString');
        //console.log(await downloadString(hash));
        //console.log(await callIPFSHash(hash));

    }
}

const app = new App(web3.eth.accounts[0], web3.version.network);
app.start();

function mappAnnouncement(annArr) {
    return {
        date: annArr[0],
        place: annArr[1]
    }
}
