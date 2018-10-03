import { getUserList, getNumOfUsers, getUser, getIsAnnounced, getIsFinished, announceAGM } from "../../provider/AgmOwnerProvider";
import {getQAInterval} from './qAndA';
import {getVotingInterval} from './voting';
import {setMinimumVotingQuorum, appendVotingOption} from '../../provider/ProposalProvider'
import ecies from 'eth-ecies';
import util from 'ethereumjs-util';
import web3 from '../../provider/web3Provider';

var addrDecrPwMapping = [];

var inputAdr;
var timersAreDefined = false;
var place;
var startDate;
var endDate;
var dayDiff = 14;
var dayDiffInterval;
var announceInterval;
var votingQuorum;
var annReport;
var guide;

$(document).ready(async function() {
    
    console.log('isAnnounced: ' + await getIsAnnounced());
    showWelcomePage();
    // hide logout button, welcome link in sidebar and user credentials
    if (!timersAreDefined) {
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
        
        $('#timer-link').hide();
        $('#statistics-link').hide();
        //const user = mapUser(await getUser(inputAdr));
        //console.log('activeUser: ');
        //console.log(user);

        announceInterval = setInterval(function() {
            // has to be enabled in production
            //computeDayDiff();
            if (dayDiff < 6) {
                setTimeout(async function() {
                    console.log('dayDiff is lower than 6');
                    if (mapUser(await getUser(inputAdr)).userAddress === '') {
                        createAlert('You cannot login into the application anymore.', 'danger');
                        $('#login-button').attr('class', 'btn btn-danger');
                        $('#login-button').prop('disabled', true);   
                    }
                }, 100);
            } else if (dayDiff === 14) {
                //console.log('encrypt data...');
                var encryptedData = encrypt(inputAdr, generateRandomString());
                //console.log('encrData: ' + encryptedData);
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
                //console.log('EMAIL WAS SENT!!!');
            }
        }, 1000);

        console.log(dayDiff);
        console.log(addrDecrPwMapping);
        if (inputAdr === web3.eth.accounts[0] && !timersAreDefined) {
            await appendVotingOption('abstain', inputAdr);
            console.log('test');
            showView('timer-link');
            showLogoutButton();
        } else if (inputAdr === web3.eth.accounts[0] || addrDecrPwMapping.includes(inputAdr)) {
            showRoleBasedView();
        } else if (!addrDecrPwMapping.includes(inputAdr) && dayDiff < 6) {
            console.log('not allowed to login');
            createAlert('You cannot login into the application anymore.', 'danger');
            //$('#login-button').attr('class', 'btn btn-danger');
            //$('#login-button').prop('disabled', true);
        } else {
            $('main #auth-modal').trigger('click');
            $('button[data-step="1"]').prop('disabled', true);
        } 
    });

    $('#logout-button').click(function() {
        $('nav').hide();
        $('#logout-button').hide();
        $('#login-button').show();
        $('main #auth-modal').css('color', 'white');
        
        showWelcomePage();
        setTimeout(function() {
            if ($('#place').html() === '' && $('#start').html() === '' && $('#end').html() === '') {
                $('#announce-wrapper').hide();
                $('main #auth-modal').css('visibility', 'hidden');
            }
        },100);
        
        hideUserCredentials();
        showLoginFields();

        if (inputAdr === web3.eth.accounts[0]) {
            setTimeout(async function() {
                //computeDayDiff();
                if (dayDiff >= 30 && !(await getIsAnnounced()) )  {
                    $('main #announce-wrapper').show();
                    $('main #place').html(place);
                    $('main #start').html(startDate.replace('T', ' '));
                    $('main #end').html(endDate.replace('T', ' '));
                    //console.log(document.body);
                } else if (!await getIsAnnounced()) {
                    createAlert('The AGM can only be announced at least 30 days in prior!', 'danger');
                }
                
                
                dayDiffInterval = setInterval(function() {
                    computeDayDiff();
                }, 86400000);
                //console.log('day diff interval escaped...');
                
            }, 100);
        }
         
        clearInterval(dayDiffInterval);
        clearInterval(announceInterval);
        clearInterval(getQAInterval());
        clearInterval(getVotingInterval());

    });

    $('main').on('click', 'input[id = "time-submit-button"]', async function() {
        place = $('main #place').val();
        startDate = $('main #agm-start').val();
        endDate = $('main #agm-end').val();
        if (!(startDate.substring(0,10) === endDate.substring(0,10)) 
            || startDate.substring(11,13) > endDate.substring(11,13)) {
               createAlert('The AGM should start, end on the same date and the start time should be smaller than the end time!', 'danger');
               showView('timer-link');
        } else {
            votingQuorum = parseInt($('main #voting-quorum').val());
            await setMinimumVotingQuorum(votingQuorum);
            /*var f = new File('[example test]', 'example.txt');
            var fileReader = new FileReader();
            var fileWriter = new FileWriter(f);
            
            fileReader.onload = function(e) {
                fileWriter.write(e.target.result);
            }
            
            annReport = $('#annual-report')[0].files[0];
            guide = $('#guide')[0].files[0];
            

            fileReader.readAsText(annReport);*/
            
            timersAreDefined = true;
            console.log(annReport, guide);
            await announceAGM(inputAdr);
            showRoleBasedView();

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

    $('main').on('click', '#finish-button', function() {
        //console.log($('#decrPW').html());
        //console.log($('#decPassword').val());
        addrDecrPwMapping.push(inputAdr);
        showRoleBasedView();
    })

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
    $('#statistics-link').hide();
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

