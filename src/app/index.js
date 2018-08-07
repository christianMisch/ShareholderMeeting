import {web3Init} from '../provider/web3Provider';
import {createQuestion, test} from '../provider/ShareholderProvider';

$(document).ready(async function() {

    const web3 = await web3Init();
    web3.eth.defaultAccount = '0x011Fc7b12E5EEd718680db16a125378a25ac4b2F';    
    //const account = await web3.eth.accounts[0];
    //console.log(account);

    $('#login-button').click(async function() {
        console.log(await test(web3));
    });
});