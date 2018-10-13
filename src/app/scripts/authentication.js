import {
    getUser, getIsAnnounced, announceAGM, setAgenda, setMeetingEndTime, setMeetingName, setMeetingPlace, getUserPW,
    setMeetingStartTime, getMeetingEndTime, getMeetingStartTime, getAgenda, getMeetingName, getMeetingPlace, registerUser, getUserId
} from "../../provider/AgmOwnerProvider";
import {getQAInterval} from './qAndA';
import {getVotingInterval} from './voting';
import {setMinimumVotingQuorum} from '../../provider/ProposalProvider'
import ecies from 'eth-ecies';
import util from 'ethereumjs-util';
import web3 from '../../provider/web3Provider';

/**
 * @summary contains the logic for a role-based access to the AGM app using an authentication mechanism
 */

// the Ethereum address (!= public key) of the user who logged in 
var inputAdr;
// store the difference of days between the AGM and the announce date
var dayDiff;
// style all sections
var sectionStyleInterv;

$(document).ready(async function() {
    // show the login info page
    showWelcomePage();
    sectionStyleInterv = setInterval(function(){$('section').css('border', '1px dotted purple')}, 500);
    if (!(await getIsAnnounced())) {
        // announce-wrapper contains the place, start and end time of the AGM
        $('main #announce-wrapper').hide();
    }
    // retrieve the input address of the user who logged in => is stored for the whole browser session
    if ( (sessionStorage.getItem('address') && mapUser(await getUser(sessionStorage.getItem('address'))).isReg === true) 
            || sessionStorage.getItem('address') !== web3.eth.accounts[0]) {
        // only registered users can enter their password for login
        $('#secret-PW').show();
        $('#filler').show();
        $('#filler').attr('class', 'col-5');
    } else {
        $('#secret-PW').hide();
        $('#filler').show();
    }
    $('#logout-button').hide();
    $('nav').hide();
    setTimeout(function() {
        $('#secret-PW').hide();
        $('main #auth-modal').css('visibility', 'hidden');
        $('main #auth-modal').css('color', 'white');
    },100);
    hideUserCredentials();

    $('#login-button').click(async function(e) {
        e.preventDefault();
        $('#filler').show();
        $('#filler').attr('class', 'col-5');
        inputAdr = $('#wallet-address').val().toLowerCase();
        // store the input address of the user in the browser
        sessionStorage.setItem('address', inputAdr);
        var secrPassword = $('#secret-PW').val();
        computeDayDiff();
        $('#timer-link').hide();
        // forward the main administrator to the AGM setup page to set the params of the AGM
        if (inputAdr === web3.eth.accounts[0] && !(await getIsAnnounced())) {
            showView('timer-link');
            showLogoutButton();
        // a registered user and the main administrator can always login
        } else if (inputAdr === web3.eth.accounts[0] || 
            (mapUser(await getUser(inputAdr)).isReg === true 
            && await getUserPW(inputAdr) === secrPassword && secrPassword !== '0')) {
                showRoleBasedView();
        // a wrong entered password fails the login process
        } else if ( (mapUser(await getUser(inputAdr))).isReg === true 
            && await getUserPW(inputAdr) !== secrPassword ) {
                createAlert('Please type in also your password to authenticate yourself!', 'danger');
        // users cannot register in the app if the day difference is smaller than a week till the AGM
        } else if (mapUser(await getUser(inputAdr)).isReg === false && dayDiff < 6) {
            createAlert('You cannot login into the application anymore.', 'danger');
            $('#login-button').attr('class', 'btn btn-danger');
            $('#login-button').prop('disabled', true);
        } else {
            // trigger the registration modal
            $('main #auth-modal').trigger('click');
            $('button[data-step="1"]').prop('disabled', true);
        }
        if (await getIsAnnounced()) {
            $('#meeting-name').html(await getMeetingName());
            // sends an e-mail including the encrypted password to a user who shall participate in the AGM
            if (dayDiff === 14) {
                var encryptedData = encrypt(await generateRandomString());
                // if the e-mail was not received then use the encrData from the console for registration
                console.log('encrData: ' + encryptedData);
                var templateParams = {
                    from_name: 'AGM administrator',
                    to_name: 'Chris',
                    from_mail: 'service_AGM@gmail.com',
                    to_mail: 'mischok.christian@web.de',
                    message: encryptedData
                };
                emailjs.send('gmail', 'authentication_template', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
                console.log('EMAIL WAS SENT!!!');
            }
        }
    });

    $('#logout-button').click(function() {
        $('#filler').attr('class', 'col-5');
        $('nav').hide();
        $('#logout-button').hide();
        $('#login-button').show();
        $('main #auth-modal').css('color', 'white');
        if (inputAdr !== web3.eth.accounts[0]) {
            $('#secret-PW').show();
        }
        showWelcomePage();
        setTimeout(async function() {
            $('main #auth-modal').css('visibility', 'hidden');
            if (!(await getIsAnnounced())) {
                $('#announce-wrapper').hide();
            } else {
                // after announcement the params are shown in the welcome page
                var loc = await getMeetingPlace();
                var stTime = await getMeetingStartTime();
                var enTime = await getMeetingEndTime();
                $('main #announce-wrapper').show();
                $('main #place').html(loc);
                $('main #start').html(stTime.replace('T', ' '));
                $('main #end').html(enTime.replace('T', ' '));
            }
        }, 100);
        hideUserCredentials();
        showLoginFields();
        clearInterval(sectionStyleInterv);
        clearInterval(getQAInterval());
        clearInterval(getVotingInterval());
    });

    // params of the AGM were set and submitted by the main admin
    $('main').on('click', 'input[id = "time-submit-button"]', async function() {
        var startDate = $('main #agm-start').val();
        var endDate = $('main #agm-end').val();
        await setMeetingStartTime(startDate, getActiveUserAddress());
        await setMeetingEndTime(endDate, getActiveUserAddress());
        // validate the start and end date
        if (!(startDate.substring(0,10) === endDate.substring(0,10)) 
            || startDate.substring(11,13) > endDate.substring(11,13)) {
               createAlert('The AGM should start, end on the same date and the start time should be smaller than the end time!', 'danger');
               showView('timer-link');
        } else {
            await setMeetingPlace($('main #place').val(), getActiveUserAddress());
            var votingQuorum = parseInt($('main #voting-quorum').val());
            await setMinimumVotingQuorum(votingQuorum, getActiveUserAddress());
            await setAgenda($('main #agenda-content').val(), getActiveUserAddress());
            await setMeetingName($('main #agm-name').val(), getActiveUserAddress())
            computeDayDiff();
            if (dayDiff >= 30 && !(await getIsAnnounced()) )  {
                // can only be announced 30 or more days in prior of the AGM
                await announceAGM(inputAdr);
                showRoleBasedView();
            } else {
                createAlert('The AGM can only be announced at least 30 days in prior!', 'danger');
            }
        }
    });

    // during the registration process the user decrypts the encrypted pw with his private key
    $('main').on('click', '#decr-button', function() {
        var privateKey = $('#privateKey').val();
        var encrData = $('#encrPW').val();
        var decrData = decrypt(privateKey, encrData);
        $('#decrPW').html(decrData);
        $('button[data-step="1"]').prop('disabled', false); 
    });

    $('main').on('input', '#decPassword', function() {
        if ($('#decrPW').html() === $('#decPassword').val()) {
            $('#finish-button').attr('disabled', false);
        } else {
            createAlert('Please paste the decrypted PW in the input field again to finish the login', 'danger', 'div[class="modal-footer"]');
        }
    })

    // finish the registration process
    $('main').on('click', '#finish-button', async function() {
        var secPW = $('#decrPW').html();
        // the decrypted pw is stored in the user => pw mapping in the contract
        await registerUser(secPW, inputAdr);
        showRoleBasedView();
    });

    // shows the agenda of the AGM if was announced
    $('a[href="#material"]').click(async function() {
        if (await getIsAnnounced()) {
            setTimeout(async function() {
                var agendaStr = await getAgenda();
                var agendParts = agendaStr.split(',');
                for (var i = 0; i < agendParts.length; i++) {
                    $('main #agenda-list').append(
                        `
                        <li>${i+1}. ${agendParts[i].trim()}</li>
                        `
                    );
                }
            }, 100);
        }
    });
});

/**
 * @function createAlert creates an alert message
 * @param {string} message - the message content 
 * @param {string} alertType - to modify the alert color
 * @param {string} place - where the alert message should be appended in the dom 
 */
export function createAlert(message, alertType = 'success', place = 'footer') {
    $(place).append(`<div role="alert">${message}</div>`)
        .addClass(`alert alert-${alertType}`);
    setTimeout(function () {
        $('footer').empty();
        $('footer').removeAttr('class');
    }, 3000);
}

/**
 * @function showRoleBasedView show the correct view depending on the user (role) who logged in
 */
async function showRoleBasedView() {
    const user = mapUser(await getUser(inputAdr));
    // is an admin
    if (user && user.role === 0) {
        createAlert('You have successfully logged in as AgmOwner!');
        $('nav').show();
        $('#sidebar-position').css('padding', '0');
        $('#navbar-header').css('padding', '20px');
        $('#setup-link').show();
        $('#welcome-link').hide();
        $('#voting-link').hide();
        $('#qa-link').hide();
        showView('setup-link');
        showUserCredentials();
        $('#login-div p').css('margin', '0 1%');
        $('#userAddress').html('User: ' + inputAdr);
        $('#userRole').html('Role: AgmOwner');
        var strDate = computeDate();
        $('#date').html('Date: ' + strDate);
        showLogoutButton();
        hideLoginFields();
        console.log(inputAdr);
        //console.log('dayDiff: ' + dayDiff);
    // is a shareholder
    } else if (user && user.role === 2) {
        createAlert('You have successfully logged in as Shareholder!');
        $('nav').show();
        $('#sidebar-position').css('padding', '0');
        $('#navbar-header').css('padding', '20px');
        $('#voting-link').show();
        $('#setup-link').hide();
        $('#welcome-link').hide();
        showUserCredentials();
        $('#login-div p').css('margin', '0 1%');
        $('#userAddress').html('User: ' + inputAdr);
        $('#userRole').html('Role: Shareholder');
        $('#date').html('Date: ' + computeDate());
        showLogoutButton();
        showView('material-link');
        hideLoginFields();
        console.log(inputAdr);
    // is a director
    } else if (user && user.role === 1) {
        createAlert('You have successfully logged in as Director!');
        $('nav').show();
        $('#sidebar-position').css('padding', '0');
        $('#navbar-header').css('padding', '20px');
        $('#setup-link').hide();
        $('#welcome-link').hide();
        $('#voting-link').hide();
        showUserCredentials();
        $('#login-div p').css('margin', '0 1%');
        $('#userAddress').html('User: ' + inputAdr);
        $('#userRole').html('Role: Director');
        $('#date').html('Date: ' + computeDate());
        showLogoutButton();
        showView('material-link');
        hideLoginFields();
        console.log(inputAdr);
    } else {
        $('footer').append(`<div role="alert">Login failed!</div>`)
            .addClass('alert alert-danger');
    }
}

/**
 * @function computeDate compute the current date
 * @returns the current date encoded as YYYY-MM-DD
 */
function computeDate() {
    var date = new Date();
    var strDate = date.getFullYear() + "-" + ("0" + date.getMonth()).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    console.log(strDate);
    return strDate;
}

/**
 * @function computeDayDiff computes the day difference between the current date and the start date of the AGM
 */
async function computeDayDiff() {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    var date = new Date();
    var startDate = await getMeetingStartTime();
    //console.log(startDate.substring(0,4), startDate.substring(5,7), startDate.substring(8,10));
    var utc1 = Date.UTC(startDate.substring(0, 4), startDate.substring(5, 7), startDate.substring(8, 10));
    var utc2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    dayDiff = Math.floor((utc1 - utc2) / MS_PER_DAY) - 30;
    $('main #day-diff').html(dayDiff);
}

function showUserCredentials() {
    $('#user-data').show();
}

function hideUserCredentials() {
    $('#user-data').hide();
}

function hideLoginFields() {
    $('#wallet-div').hide();
    $('#wallet-address').hide();
    $('#secret-PW').hide();
    $('#address-label').hide();

}

function showLoginFields() {
    $('#wallet-div').show();
    $('#wallet-address').show();
    $('#secret-PW').show();
    $('#address-label').show();
}

export function showView(viewName) {
    // trigger the welcome page link
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
        role: userArr[1].toNumber(),
        isReg: userArr[2]
    }
}

/**
 * @function generateRandomString generates a random string which shall be encrypted and is sent via e-mail
 * @returns a random string concatenating the attached user id of the logged in user
 */
async function generateRandomString() {
    var str = Math.random().toString(36).slice(-10) + `${(await getUserId(getActiveUserAddress())).toNumber()}`;
    console.log('str: ' + str);
    return str;
}

/**
 * @function encrypt derives the Ethereum public key from the Ethereum address to use the public key for encryption
 * @param {string} data - which shall be encrypted 
 * @returns the encrypted data as a 64bit hash
 */
function encrypt(data) {
    const msg = new Buffer('publicKeyToRetrieve');
    const sig = web3.eth.sign(getActiveUserAddress(), '0x' + msg.toString('hex'));
    const res = util.fromRpcSig(sig);
    const prefix = new Buffer("\x19Ethereum Signed Message:\n");
    const prefixedMsg = util.sha3(
        Buffer.concat([prefix, new Buffer(String(msg.length)), msg])
    );
    const pubKey  = util.ecrecover(prefixedMsg, res.v, res.r, res.s);
    let userPublicKey = new Buffer(pubKey, 'hex');
    let bufferData = new Buffer(data);
    let encryptedData = ecies.encrypt(userPublicKey, bufferData);
    return encryptedData.toString('base64')
}

/**
 * @function decrypt based on the private key of the user the encrypted password is decrypted
 * @param {string} privateKey - the private key of the user who wants to register in the app
 * @param {string} encryptedData - the encrypted data which was sent via e-mail
 * @returns the decrypted randomly generated string
 */
function decrypt(privateKey, encryptedData) {
    let userPrivateKey = new Buffer(privateKey, 'hex');
    let bufferEncryptedData = new Buffer(encryptedData, 'base64');
    let decryptedData = ecies.decrypt(userPrivateKey, bufferEncryptedData);
    return decryptedData.toString('utf-8');
}