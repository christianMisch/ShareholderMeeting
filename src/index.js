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

        if (!window.localStorage) {
            window.localStorage = {
              getItem: function (sKey) {
                if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
                return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
              },
              setItem: function (sKey, sValue) {
                if(!sKey) { return; }
                document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
                this.length = document.cookie.match(/\=/g).length;
              },
              length: 0,
            };
            window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
          }
    }
}

const app = new App(web3.eth.accounts[0], web3.version.network);
app.start();