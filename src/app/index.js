//import {createQuestion, test} from '../provider/ShareholderProvider';
import {
    transferOwnership, 
    announceAGM, 
    addUser, 
    removeUser, 
    getNumOfUsers, 
    getUser, 
    finishAGM, 
    createProposal
} from '../provider/AgmOwnerProvider';
import web3Provider from '../provider/web3Provider';

export class App {

    constructor(account, network) {
        this.account = account;
        this.network = network;
    }

    start() {
        console.log('web3Provider accounts: ');
        web3Provider.eth.accounts.forEach(acc => console.log(acc));
        const owner = web3Provider.eth.accounts[0];
        $('#login-button').click(function() {
            //transferOwnership();
            //announceAGM();
            //addUser(web3Provider.eth.accounts[1], false, 2000);
            //removeUser(web3Provider.eth.accounts[1]);
            //getNumOfUsers();
            createProposal('name', 'description', 'options', owner);

        });
    
    }
    

}

const app = new App(null, null);
app.start();