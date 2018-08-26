import { getUserList, getNumOfUsers, getUser } from "../../provider/AgmOwnerProvider";
import {getDate, getPlace} from './index';

//import web3Provider from '../../provider/web3Provider';
//console.log('web3 accounts: ');
//console.log(web3Provider.eth.accounts);

/*var authorizedUsers = {
    '0x011Fc7b12E5EEd718680db16a125378a25ac4b2F': {role: 'AgmOwner', loggedIn: false},
    '0xd02Dc75c5D17021a71060DeE44b12958fBa069FB': {role: 'AgmOwner', loggedIn: false},
    '0': {role: 'Shareholder', loggedIn: false, shares: 20},
    '0x628FBd5a122103e8171BbB2dC70C265f9F775466': {role: 'Shareholder', loggedIn: false, shares: 30},
    '0xc179a95Ac86AAbf6baF4D97BA161152fE0cc0655': {role: 'Shareholder', loggedIn: false, shares: 45},
    '0xB78E4A88e140b9ceeC48D569d6ae0ED4F419eFb1': {role: 'Shareholder', loggedIn: false, shares: 12},
    '0x5E3407E44756371B4D3De80Eb4378b715c444619': {role: 'Shareholder', loggedIn: false, shares: 34},
    '0x88D7d45b3eBD3Fd8b202D8BF1Ec8e2CC2006692D': {role: 'Director', loggedIn: false}
};*/

var inputAdr;

$(document).ready(async function() {
    //authorizedUsers[`${web3Provider.eth.accounts[0].toLowerCase()}`] = {role: 'AgmOwner', loggedIn: false, shares: 0};
    //console.log('Num of users should be 5: ' + await getNumOfUsers());
    showWelcomePage();
    // hide logout button, welcome link in sidebar and user credentials
    $('#logout-button').hide();
    $('nav').hide();

    /*console.log('isAuthenticated');
    isAuthenticated('0xbB0487c8aFdAcC15017201e3002dCC60DdDF9C67').then(function(result) {
        console.log(result.logs);
    });*/

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

        const alertWrapper = $('<div id="wrapper"></div>');
        $('footer').append(alertWrapper);
        inputAdr = $('#wallet-address').val().toLowerCase();
        const user = mapUser(await getUser(inputAdr));
        console.log('activeUser: ');
        console.log(user); 
        if (user && user.role === 0) {
                createAlert('You have successfully logged in as AgmOwner!');
                $('nav').show();
                $('#setup-link').show();
                $('#welcome-link').hide();
                $('#voting-link').hide();
                $('#qa-link').hide();
                showUserCredentials();
                $('#userAddress').html('User: ' + inputAdr);
                $('#userRole').html('Role: AgmOwner');
                showLogoutButton();
                showView('home-link');
                hideLoginFields();
                setInterval(function() {
                    $('main #place').html(getPlace());
                    $('main #date').html(getDate());
                }, 100);
                
                console.log(inputAdr);
                console.log('loggedIn as Owner');


        } else if (user && user.role === 2) {

                createAlert('You have successfully logged in as Shareholder!');
                $('nav').show();
                $('#voting-link').show();
                $('#setup-link').hide();
                $('#welcome-link').hide();
                showUserCredentials();
                $('#userAddress').html('User: ' + inputAdr);
                $('#userRole').html('Role: Shareholder');
                showLogoutButton();
                showView('home-link');
                hideLoginFields();
                setInterval(function() {
                    $('main #place').html(getPlace());
                    $('main #date').html(getDate());
                }, 100);
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
                showLogoutButton();
                showView('home-link');
                hideLoginFields();
                setInterval(function() {
                    $('main #place').html(getPlace());
                    $('main #date').html(getDate());
                }, 100);
                console.log(inputAdr);
                console.log('loggedIn as Director');

        } else {
            $('#wrapper').append(`<div role="alert">Login failed!</div>`)
                .addClass('alert alert-danger');
        }
        //console.log($('#wrapper div').length);
        //removeSecondAlert();
        //console.log($('#wrapper'));

        //console.log(authorizedUsers);
        setTimeout(function () {
            $('.alert').alert('close');
        }, 3000);
    });

    $('#logout-button').click(function() {
        $('nav').hide();
        $('#logout-button').hide();
        $('#login-button').show();
        showWelcomePage();
        hideUserCredentials();
        showLoginFields();
        //authorizedUsers[inputAdr].loggedIn = false;
        //console.log(authorizedUsers);

    });

});

export function createAlert(message, alertType = 'success') {
    $('#wrapper').append(`<div role="alert">${message}</div>`)
        .addClass(`alert alert-${alertType}`);
    setTimeout(function () {
        $('.alert').alert('close');
    }, 3000);
    /*if (alertType === 'danger') {
        const aLinks = $('a');
        for (var i = 0; i < aLinks.length; i++) {
            if (aLinks[i].attr('class')) {
                $('a')[i].attr('class', '');
            }
        }
    }*/
    //$('a[href="#home"]').trigger('click');
}


function showUserCredentials() {
    $('#userAddress').show();
    $('#userRole').show();
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

/*export function getActiveUserState() {
    return authorizedUsers[inputAdr] || {loggedIn: false};
}*/

export function getActiveUserAddress() {
    return inputAdr.toLowerCase();
}

export function removeSecondAlert() {
    var numOfAlerts = $('#wrapper div').length;
        if (numOfAlerts > 1) {
            const wrapper = document.querySelector('#wrapper');
            wrapper.removeChild(wrapper.lastChild);
        }
}

/*export function getAuthorizedUsers() {
  return authorizedUsers;
}*/

/*export function setUserShares(key, shares) {
  authorizedUsers[key].shares = shares;
}*/

/*export function setAuthorizedUsers(adr, val) {
    authorizedUsers[adr] = val;
}*/

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

