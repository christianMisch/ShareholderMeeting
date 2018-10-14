import web3 from './provider/web3Provider';
import './provider/ShareholderProvider';
import './provider/AgmOwnerProvider';
import './provider/IPFSUploadProvider';
import './provider/IPFSDownloadProvider';
import './app/scripts/agmSetup';
import './app/scripts/authentication';
import './app/scripts/manageSPA';
import './app/scripts/qAndA';
import './app/scripts/voting';

/**
 * @classdesc main entry point for the webpack config 
 *            stores the main admin account and the used network to connect with the ganache client
 */
class App {

    constructor(account, network) {
        this.account = account;
        this.network = network;
    }

    async start() {
        console.log(`Start the app with networkId=${this.network} and owner account =${this.account}`);
    }
}

const app = new App(web3.eth.accounts[0], web3.version.network);
app.start();