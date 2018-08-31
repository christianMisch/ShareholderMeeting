//import {createQuestion, test} from '../provider/ShareholderProvider';
import web3 from '../../provider/web3Provider';
import {announceAGM} from '../../provider/AgmOwnerProvider';
import { upload } from '../../provider/IPFSUploadProvider';
import { downloadString } from '../../provider/IPFSDownloadProvider';
import './agmSetup';
import {getActiveUserAddress} from './authentication';
import './manageSPA';
import './qAndA';
import './voting';

var place;
var date;

export class App {

    constructor(account, network) {
        this.account = account;
        this.network = network;
    }

    async start() {
        console.log(`Start the app with networkId=${this.network} and default account =${this.account}`);
        var announcement = mappAnnouncement(await announceAGM());
        console.log(announcement);
        place = announcement.place;
        date = announcement.date;
        
        $('a[href="#home"]').click(function() {
            setTimeout(function() {
                $('main #place').html(place);
                $('main #date').html(date);  
            }, 100);
        });
        
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
