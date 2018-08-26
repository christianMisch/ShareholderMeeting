//import {createQuestion, test} from '../provider/ShareholderProvider';
//import { announceAGM } from '../../provider/AgmOwnerProvider';
import web3 from '../../provider/web3Provider';
import './agmSetup';
import './authentication';
import './manageSPA';
import './qAndA';
import './voting';

export class App {

    constructor(account, network) {
        this.account = account;
        this.network = network;
    }

    async start() {
        console.log('Start the app... ');
        /*var announcement = mappAnnouncement(await announceAGM());
        this.place = announcement.place;
        this.date = announcement.date;*/
        
    
    }
    

}

const networkId = web3.version.getNetwork(function(err, res) {
    if (!err) {
        return res;
    }
}); 
const app = new App(web3.eth.accounts[0], networkId);
app.start();

function mappAnnouncement(annArr) {
    return {
        date: annArr[0],
        place: annArr[1]
    }
}

export default web3;