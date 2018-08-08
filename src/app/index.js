import {createQuestion, test} from '../provider/ShareholderProvider';
import {transferOwnership, announceAGM} from '../provider/AgmOwnerProvider';

export class App {

    constructor(account, network) {
        this.account = account;
        this.network = network;
    }

    start() {
        
        $('#login-button').click(function() {
            transferOwnership();
            announceAGM();
        });
    
    }
    

}

const app = new App(null, null);
app.start();