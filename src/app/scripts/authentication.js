import { getUserList, getNumOfUsers, getUser } from "../../provider/AgmOwnerProvider";
import {getQAInterval} from './qAndA';
import {getVotingInterval} from './voting';
import web3Provider from '../../provider/web3Provider';
import ecies from 'eth-ecies';
import util from 'ethereumjs-util';
import web3 from '../../provider/web3Provider';

//console.log('web3 accounts: ');
//console.log(web3Provider.eth.accounts);

var inputAdr;
var timersAreDefined = false;
var place;
var startDate;
var endDate;
var dayDiff = 14;
var dayDiffInterval;
var announceInterval;
var votingQuorum;

$(document).ready(async function() {

    announceInterval = setInterval(function() {
        // has to be enabled in production
        //computeDayDiff();
        if (dayDiff < 6) {
            setTimeout(function() {
                console.log('dayDiff is lower than 6');
                createAlert('You cannot login into the application anymore.', 'danger');
                console.log($('#login-button').length);
                $('#login-button').attr('class', 'btn btn-danger');
                $('#login-button').prop('disabled', true);
            }, 100);
        } else if (dayDiff === 14) {
            console.log('encrypt data...');
            var encryptedData = encrypt(inputAdr, generateRandomString());
            console.log('encrData: ' + encryptedData);
            /*var decryptedData = decrypt('', encryptedData);
            console.log('decrData: ' + decryptedData);*/
            var templateParams = {
                from_name: 'AGM administrator',
                to_name: 'Chris',
                from_mail: 'service_AGM@gmail.com',
                to_mail: 'mischok.christian@web.de',
                message: encryptedData
            };
            /*emailjs.send('gmail', 'authentication_template', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                    console.log('FAILED...', error);
                });*/
            console.log('EMAIL WAS SENT!!!');
        }
    }, 1000);
    
    showWelcomePage();
    // hide logout button, welcome link in sidebar and user credentials
    if (!timersAreDefined) {
        $('main #announce-wrapper').hide();
    }
    
    $('#logout-button').hide();
    $('#date').hide();
    $('nav').hide();
    $('main #auth-modal').css('visibility', 'hidden');
    hideUserCredentials();

    /*const links = $('ul[class="list-unstyled components"] a');
    console.log(links);
    $.each(links, function(index, val) {
        console.log(index, val);
        //val.hide();
        //$(`#${val.attr('id')}`).hide();
    })*/

    $('#login-button').click(async function(e) {
        e.preventDefault();

        inputAdr = $('#wallet-address').val().toLowerCase();
        const user = mapUser(await getUser(inputAdr));
        $('#timer-link').hide();
        //console.log('activeUser: ');
        //console.log(user);
        if (inputAdr === web3Provider.eth.accounts[0] && !timersAreDefined) {
            console.log('test');
            timersAreDefined = true;
            showView('timer-link');
        } else {
            $('main #auth-modal').trigger('click');
        }
         
    });

    $('#logout-button').click(function() {
        $('nav').hide();
        $('#logout-button').hide();
        $('#login-button').show();
        
        showWelcomePage();
        hideUserCredentials();
        showLoginFields();
        clearInterval(dayDiffInterval);
        clearInterval(announceInterval);
        clearInterval(getQAInterval());
        clearInterval(getVotingInterval());

    });

    $('main').on('click', 'input[id = "time-submit-button"]', function() {
        place = $('main #place').val();
        startDate = $('main #agm-start').val();
        endDate = $('main #agm-end').val();
        votingQuorum = $('main #voting-quorum').val();
        console.log(place, startDate, endDate, votingQuorum);
        
        console.log('should display place and date');
        setTimeout(function() {
            computeDayDiff();
            if (dayDiff >= 30) {
                $('main #announce-wrapper').show();
                $('main #place').html(place);
                $('main #start').html(startDate.replace('T', ' '));
                $('main #end').html(endDate.replace('T', ' '));
            } else {
                createAlert('The AGM can only be announced at least 30 days in prior!', 'danger');
            }
            
            
            dayDiffInterval = setInterval(function() {
                computeDayDiff();
            }, 86400000);
            //console.log('day diff interval escaped...');
            
        }, 100); 
        showView('login-button');
    });

    $('main').on('click', '#decr-button', function() {
        var privateKey = $('#privateKey').val();
        console.log('privateKey: ' + privateKey);
        var encrData = $('#encrPW').val();
        console.log('encrData: ' + encrData);
        var decrData = decrypt(privateKey, encrData);
        $('#decrPW').html(decrData);

        
    });

    $('main').on('click', '#finish-button', function() {
        const user = mapUser(await getUser(inputAdr));
        
        if (user && user.role === 0) {
            createAlert('You have successfully logged in as AgmOwner!');
            /*console.log('web3 acc: ' + web3Provider.eth.accounts[0]);
            console.log('user acc:' + inputAdr);
            console.log('set time diff...');*/
            $('nav').show();
            $('#setup-link').show();
            $('#welcome-link').hide();
            $('#voting-link').hide();
            $('#qa-link').hide();

            showView('setup-link');

            setDayDiff(14);

            setTimeout(function () {
                //setDayDiff(5);
                console.log(dayDiff);
            }, 1000);

            showUserCredentials();
            $('#userAddress').html('User: ' + inputAdr);
            $('#userRole').html('Role: AgmOwner');
            var strDate = computeDate();
            $('#date').html('Date: ' + strDate);
            showLogoutButton();
            hideLoginFields();

            console.log(inputAdr);
            console.log('loggedIn as Owner');
            console.log('dayDiff: ' + dayDiff);
                    
        } else if (user && user.role === 2) {
            createAlert('You have successfully logged in as Shareholder!');
            $('nav').show();
            $('#voting-link').show();
            $('#setup-link').hide();
            $('#welcome-link').hide();
            showUserCredentials();
            $('#userAddress').html('User: ' + inputAdr);
            $('#userRole').html('Role: Shareholder');
            $('#date').html('Date: ' + computeDate());
            showLogoutButton();
            showView('material-link');
            hideLoginFields();

            console.log(inputAdr);
            console.log('loggedIn as Shareholder');
        
        } else if (user && user.role === 1) {

            createAlert('You have successfully logged in as Director!');
            $('nav').show();
            $('#setup-link').hide();
            $('#welcome-link').hide();
            $('#voting-link').hide();
            showUserCredentials();
            $('#userAddress').html('User: ' + inputAdr);
            $('#userRole').html('Role: Director');
            $('#date').html('Date: ' + computeDate());
            showLogoutButton();
            showView('material-link');
            hideLoginFields();
            
            console.log(inputAdr);
            console.log('loggedIn as Director');

        } else {
            $('footer').append(`<div role="alert">Login failed!</div>`)
                .addClass('alert alert-danger');
        }
    })

});

export function createAlert(message, alertType = 'success') {
    $('footer').append(`<div role="alert">${message}</div>`)
        .addClass(`alert alert-${alertType}`);
    console.log(document.body);
    setTimeout(function () {
        $('footer').empty();
        $('footer').removeAttr('class');
        //$('.alert').alert('close');
    }, 3000);
}

function computeDate() {
    var date = new Date();
    var strDate = date.getFullYear() + "-" + ("0" + date.getMonth()).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    console.log(strDate);
    return strDate;
}

function computeDayDiff() {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    var date = new Date();
    //console.log(startDate.substring(0,4), startDate.substring(5,7), startDate.substring(8,10));
    var utc1 = Date.UTC(startDate.substring(0, 4), startDate.substring(5, 7), startDate.substring(8, 10));
    var utc2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    dayDiff = Math.floor((utc1 - utc2) / MS_PER_DAY) - 30;
    $('main #day-diff').html(dayDiff);
}

function setDayDiff(diff) {
    dayDiff = diff;
    $('main #day-diff').html(dayDiff);
}

function showUserCredentials() {
    $('#userAddress').show();
    $('#userRole').show();
    $('#date').show();
}

function hideUserCredentials() {
    $('#userAddress').hide();
    $('#userRole').hide();
}

function hideLoginFields() {
    $('#wallet-div').hide();
    $('#wallet-address').hide();
    $('#address-label').hide();

}

function showLoginFields() {
    $('#wallet-div').show();
    $('#wallet-address').show();
    $('#address-label').show();
}

function showView(viewName) {
    const event = new Event('click');
    const homeLink = document.getElementById(viewName);
    homeLink.dispatchEvent(event);
}

function showLogoutButton() {
    $('#logout-button').show();
    $('#login-button').hide();
}

function showWelcomePage() {
    const event = new Event('click');
    const welcomeLink = document.getElementsByTagName('a')[0];
    welcomeLink.dispatchEvent(event);
}

export function getActiveUserAddress() {
    return inputAdr.toLowerCase();
}

export function mapUser(userArr) {
    return {
        userAddress: userArr[0],
        role: userArr[1].toNumber()
    }
}

async function isAuthenticated(address) {
    const userList = await getUserList();
    console.log('userList: ');
    console.log(userList);
    for (var i = 0; i < userList; i++) {
        if (userList[i].userAddress === address) {
            return true;
        }
    }
    return false;
}

function setDayDiff(newDiff) {
    dayDiff = newDiff;
}

function generateRandomString() {
    return Math.random().toString(36).slice(-10);
}

function encrypt(data) {
    //var ethAddress = pubToAddress(new Buffer(publicKey));
    //console.log('ethAddress: ' + ethAddress);
    const msg = new Buffer('msgToRetrieveThePublicKey');
    const sig = web3.eth.sign(getActiveUserAddress(), '0x' + msg.toString('hex'));
    const res = util.fromRpcSig(sig);

    const prefix = new Buffer("\x19Ethereum Signed Message:\n");
    const prefixedMsg = util.sha3(
        Buffer.concat([prefix, new Buffer(String(msg.length)), msg])
    );

    const pubKey  = util.ecrecover(prefixedMsg, res.v, res.r, res.s);
    console.log('pubKey: ' + pubKey);
    let userPublicKey = new Buffer(pubKey, 'hex');
    let bufferData = new Buffer('c361a95Ac86AAbf6baF4D97BA161132f456c08g4');

    let encryptedData = ecies.encrypt(userPublicKey, bufferData);

    return encryptedData.toString('base64')
}

function decrypt(privateKey, encryptedData) {
    let userPrivateKey = new Buffer(privateKey, 'hex');
    let bufferEncryptedData = new Buffer(encryptedData, 'base64');

    let decryptedData = ecies.decrypt(userPrivateKey, bufferEncryptedData);
    
    return decryptedData.toString('utf8');
}

