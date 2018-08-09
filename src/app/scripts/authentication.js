// import web3Provider from '../../provider/web3Provider';
var authorizedUsers = {
    '0x72cccDBCFb464a240c025969bb9Bb81Da0392a90': {password: 'pw1', role: 'Shareholder', loggedIn: false},
    '0x5E3407E44756371B4D3De80Eb4378b715c444619': {password: 'pw2', role: 'Director', loggedIn: false}
};
var inputAdr, inputPW;

$(document).ready(function() {

    showWelcomePage();
    const alertWrapper = $('<div id="wrapper"></div>');
    $('footer').append(alertWrapper);
    // hide logout button and welcome link in sidebar
    $('#logout-button').hide();
    $('#welcome-link').hide();
    const ownerAddress = '0x0'/*web3Provider.eth.accounts[0]*/;
    const masterPW = 'master';
    

    $('#login-button').click(function(e) {
        e.preventDefault();

        const alertWrapper = $('<div id="wrapper"></div>');
        $('footer').append(alertWrapper);
        inputAdr = $('#wallet-address').val();
        inputPW = $('#password').val();
        //console.log(inputAdr, inputPW);

        if (inputAdr === ownerAddress && inputPW === masterPW) {
            createAlert('You have successfully logged in as AgmOwner!', 'success');
            showUserCredentials('AgmOwner');
            showLogoutButton();
            location.hash = "#home";
            const event = new Event('click');
            const homeLink = document.getElementsByTagName('a')[1];
            homeLink.dispatchEvent(event);


        } else if (Object.keys(authorizedUsers).includes(inputAdr) 
            && authorizedUsers[inputAdr].password === inputPW 
            && authorizedUsers[inputAdr].role === 'Shareholder') {
            
                createAlert('You have successfully logged in as Shareholder!', 'success');
                showUserCredentials('Shareholder');
                showLogoutButton();

        } else if (Object.keys(authorizedUsers).includes(inputAdr)
             && authorizedUsers.inputAdr.password === inputPW
             && authorizedUsers.inputAdr.role === 'Director') {

                createAlert('You have successfully logged in as Director!', 'success');
                showUserCredentials('Director');
                showLogoutButton();
            
        } else {
            createAlert('Login failed', 'danger');
        }
    });

    $('#logout-button').click(function() {
        $('#logout-button').hide();
        $('#login-button').show();
        showWelcomePage();

    });

});

export function createAlert(message, alertType) {
    $('#wrapper').append(`<div role="alert">${message}</div>`)
        .addClass(`alert alert-${alertType}`);

    setTimeout(function () {
        $('.alert').alert('close');
    }, 3000);
    //$('a[href="#home"]').trigger('click');
   
}

function showUserCredentials(role) {
    $('#userAddress').html('User: ' + inputAdr);
    $('#userRole').html('Role: ' + role);
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

export function getActiveUser() {
    return authorizedUsers[inputAdr] || {loggedIn: false};
}