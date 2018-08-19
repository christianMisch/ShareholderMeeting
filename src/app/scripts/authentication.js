import { getUserList } from "../../provider/AgmOwnerProvider";

import web3Provider from '../../provider/web3Provider';

console.log('web3 accounts: ');
console.log(web3Provider.eth.accounts);

var authorizedUsers = {
    '0x0': {role: 'AgmOwner', loggedIn: false},
    '0': {role: 'Shareholder', loggedIn: false, shares: 20},
    '0x628FBd5a122103e8171BbB2dC70C265f9F775466': {role: 'Shareholder', loggedIn: false, shares: 30},
    '0xc179a95Ac86AAbf6baF4D97BA161152fE0cc0655': {role: 'Shareholder', loggedIn: false, shares: 45},
    '0xB78E4A88e140b9ceeC48D569d6ae0ED4F419eFb1': {role: 'Shareholder', loggedIn: false, shares: 12},
    '0x1': {role: 'Director', loggedIn: false, shares: 0}
};
var inputAdr, inputPW;

$(document).ready(async function() {

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

    $('#login-button').click(function(e) {
        e.preventDefault();

        const alertWrapper = $('<div id="wrapper"></div>');
        $('footer').append(alertWrapper);
        inputAdr = $('#wallet-address').val();
        inputPW = $('#password').val();

        if (Object.keys(authorizedUsers).includes(inputAdr)
            && authorizedUsers[inputAdr].role === 'AgmOwner') {
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
                authorizedUsers[inputAdr].loggedIn = true;


        } else if (Object.keys(authorizedUsers).includes(inputAdr)
            && authorizedUsers[inputAdr].role === 'Shareholder') {

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
                authorizedUsers[inputAdr].loggedIn = true;

        } else if (Object.keys(authorizedUsers).includes(inputAdr)
             && authorizedUsers[inputAdr].role === 'Director') {

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
                authorizedUsers[inputAdr].loggedIn = true;

        } else {
            $('#wrapper').append(`<div role="alert">Login failed!</div>`)
                .addClass('alert alert-danger');
        }
        //console.log($('#wrapper div').length);
        removeSecondAlert();
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
        authorizedUsers[inputAdr].loggedIn = false;
        //console.log(authorizedUsers);

    });

});

export function createAlert(message, alertType = 'success') {
    $('#wrapper').append(`<div role="alert">${message}</div>`)
        .addClass(`alert alert-${alertType}`);

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
    $('#address-label').hide();
    $('#password-label').hide();
}

function showLoginFields() {
    $('#address-label').show();
    $('#password-label').show();
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

export function getActiveUserState() {
    return authorizedUsers[inputAdr] || {loggedIn: false};
}

export function getActiveUserAddress() {
    return inputAdr;
}

export function removeSecondAlert() {
    var numOfAlerts = $('#wrapper div').length;
        if (numOfAlerts > 1) {
            const wrapper = document.querySelector('#wrapper');
            wrapper.removeChild(wrapper.lastChild);
        }
}

export function getAuthorizedUsers() {
  return authorizedUsers;
}

export function setAuthorizedUsers(key, value) {
  authorizedUsers[key].shares = value;
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
