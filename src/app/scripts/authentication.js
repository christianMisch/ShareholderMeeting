import { 
    getUserList, 
    getUser, 
    getIsAnnounced, 
    getIsFinished, 
    announceAGM, 
    setAgenda, 
    setMeetingEndTime, 
    setMeetingName, 
    setMeetingPlace, 
    setMeetingStartTime,
    getMeetingEndTime,
    getMeetingStartTime,
    getAgenda,
    getMeetingName,
    getMeetingPlace,
    registerUser
} from "../../provider/AgmOwnerProvider";
import {getQAInterval} from './qAndA';
import {getVotingInterval} from './voting';
import {setMinimumVotingQuorum} from '../../provider/ProposalProvider'
import ecies from 'eth-ecies';
import util from 'ethereumjs-util';
import web3 from '../../provider/web3Provider';
// delete all finish buttons
var inputAdr;
//var place;
//var startDate;
//var endDate;
var dayDiff = 14;
//var votingQuorum;
//var annReport;
//var guide;
//var agenda;

$(document).ready(async function() {
    
    console.log('isAnnounced: ' + await getIsAnnounced());
    showWelcomePage();
    // hide logout button, welcome link in sidebar and user credentials
    if (!(await getIsAnnounced())) {
        $('main #announce-wrapper').hide();
    }
    
    $('#logout-button').hide();
    $('#date').hide();
    $('nav').hide();
    setTimeout(function() {
        $('main #auth-modal').css('visibility', 'hidden');
        $('main #auth-modal').css('color', 'white');
    },100);
    
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
        console.log('inputAdr: ' + inputAdr);
        // turn on
        //computeDayDiff();
        $('#timer-link').hide();
        const user = mapUser(await getUser(inputAdr));
        console.log('activeUser: ');
        console.log(user);

        console.log('dayDiff: ' + dayDiff);
        if (inputAdr === web3.eth.accounts[0] && !(await getIsAnnounced())) {
            showView('timer-link');
            showLogoutButton();
        } else if (inputAdr === web3.eth.accounts[0] || mapUser(await getUser(inputAdr)).isReg === true) {
            showRoleBasedView();
        } else if (mapUser(await getUser(inputAdr)).isReg === false && dayDiff < 6) {
            createAlert('You cannot login into the application anymore.', 'danger');
            $('#login-button').attr('class', 'btn btn-danger');
            $('#login-button').prop('disabled', true);
        } else {
            $('main #auth-modal').trigger('click');
            $('button[data-step="1"]').prop('disabled', true);
        }

        if (await getIsAnnounced()) {
            $('#meeting-name').html(await getMeetingName());
            if (dayDiff === 14) {
                //console.log('encrypt data...');
                var encryptedData = encrypt(inputAdr, generateRandomString());
                console.log('encrData: ' + encryptedData);
                //var decryptedData = decrypt('', encryptedData);
                //console.log('decrData: ' + decryptedData);
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
                //console.log('EMAIL WAS SENT!!!');
            }
        }
    });

    $('#logout-button').click(function() {
        $('nav').hide();
        $('#logout-button').hide();
        $('#login-button').show();
        $('main #auth-modal').css('color', 'white');
        
        showWelcomePage();
        setTimeout(async function() {
            $('main #auth-modal').css('visibility', 'hidden');
            if (!(await getIsAnnounced())) {
                $('#announce-wrapper').hide();
            } else {
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
         
        //clearInterval(dayDiffInterval);
        //clearInterval(announceInterval);
        clearInterval(getQAInterval());
        clearInterval(getVotingInterval());

    });

    $('main').on('click', 'input[id = "time-submit-button"]', async function() {
        var startDate = $('main #agm-start').val();
        var endDate = $('main #agm-end').val();
        await setMeetingStartTime(startDate, getActiveUserAddress());
        await setMeetingEndTime(endDate, getActiveUserAddress());
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
            
            //timersAreDefined = true;
            // turn on
            computeDayDiff();
            if (dayDiff >= 30 && !(await getIsAnnounced()) )  {
                await announceAGM(inputAdr);
                showRoleBasedView();
            } else {
                createAlert('The AGM can only be announced at least 30 days in prior!', 'danger');
            }
        }
        
    });

    $('main').on('click', '#decr-button', function() {
        var privateKey = $('#privateKey').val();
        console.log('privateKey: ' + privateKey);
        var encrData = $('#encrPW').val();
        console.log('encrData: ' + encrData);
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

    $('main').on('click', '#finish-button', async function() {
        //console.log($('#decrPW').html());
        //console.log($('#decPassword').val());
        //addrDecrPwMapping.push(inputAdr);
        await registerUser(inputAdr);
        showRoleBasedView();
    });

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

export function createAlert(message, alertType = 'success', place = 'footer') {
    $(place).append(`<div role="alert">${message}</div>`)
        .addClass(`alert alert-${alertType}`);
    //console.log(document.body);
    setTimeout(function () {
        $('footer').empty();
        $('footer').removeAttr('class');
        //$('.alert').alert('close');
    }, 3000);
}

async function showRoleBasedView() {
    //$('#statistics-link').hide();
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

        /*setDayDiff(14);

        setTimeout(function () {
            setDayDiff(5);
            console.log('dayDiff: ' + dayDiff);
        }, 100);*/

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
}

function computeDate() {
    var date = new Date();
    var strDate = date.getFullYear() + "-" + ("0" + date.getMonth()).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    console.log(strDate);
    return strDate;
}

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

export function showView(viewName) {
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
    const msg = new Buffer(data);
    const sig = web3.eth.sign(getActiveUserAddress(), '0x' + msg.toString('hex'));
    const res = util.fromRpcSig(sig);

    const prefix = new Buffer("\x19Ethereum Signed Message:\n");
    const prefixedMsg = util.sha3(
        Buffer.concat([prefix, new Buffer(String(msg.length)), msg])
    );

    const pubKey  = util.ecrecover(prefixedMsg, res.v, res.r, res.s);
    //console.log('pubKey: ' + pubKey);
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

