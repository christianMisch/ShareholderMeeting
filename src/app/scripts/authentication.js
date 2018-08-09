// import web3Provider from '../../provider/web3Provider';
var authorizedUsers = {
    '0x0': {password: 'master', role: 'AgmOwner', loggedIn: false},
    '0x72cccDBCFb464a240c025969bb9Bb81Da0392a90': {password: 'pw1', role: 'Shareholder', loggedIn: false},
    '0x5E3407E44756371B4D3De80Eb4378b715c444619': {password: 'pw2', role: 'Director', loggedIn: false}
};
var inputAdr, inputPW;

$(document).ready(function() {

    showWelcomePage();
    // hide logout button, welcome link in sidebar and user credentials
    $('#logout-button').hide();
    $('#welcome-link').hide();
    hideUserCredentials();
    

    $('#login-button').click(function(e) {
        e.preventDefault();

        const alertWrapper = $('<div id="wrapper"></div>');
        $('footer').append(alertWrapper);
        inputAdr = $('#wallet-address').val();
        inputPW = $('#password').val();

        if (Object.keys(authorizedUsers).includes(inputAdr) 
            && authorizedUsers[inputAdr].password === inputPW
            && authorizedUsers[inputAdr].role === 'AgmOwner') {
                createAlert('You have successfully logged in as AgmOwner!');
                showUserCredentials();
                $('#userAddress').html('User: ' + inputAdr);
                $('#userRole').html('Role: AgmOwner');
                showLogoutButton();
                showHome();
                authorizedUsers[inputAdr].loggedIn = true;


        } else if (Object.keys(authorizedUsers).includes(inputAdr) 
            && authorizedUsers[inputAdr].password === inputPW 
            && authorizedUsers[inputAdr].role === 'Shareholder') {
            
                createAlert('You have successfully logged in as Shareholder!');
                showUserCredentials();
                $('#userAddress').html('User: ' + inputAdr);
                $('#userRole').html('Role: Shareholder');
                showLogoutButton();
                showHome();
                authorizedUsers[inputAdr].loggedIn = true;

        } else if (Object.keys(authorizedUsers).includes(inputAdr)
             && authorizedUsers.inputAdr.password === inputPW
             && authorizedUsers.inputAdr.role === 'Director') {

                createAlert('You have successfully logged in as Director!');
                showUserCredentials();
                $('#userAddress').html('User: ' + inputAdr);
                $('#userRole').html('Role: Director');
                showLogoutButton();
                showHome();
                authorizedUsers[inputAdr].loggedIn = true;
            
        } else {
            $('#wrapper').append(`<div role="alert">Login failed!</div>`)
                .addClass('alert alert-danger');
        }
        console.log($('#wrapper div').length);
        console.log(authorizedUsers);
        setTimeout(function () {
            $('.alert').alert('close');
        }, 3000);
    });

    $('#logout-button').click(function() {
        $('#logout-button').hide();
        $('#login-button').show();
        showWelcomePage();
        hideUserCredentials();
        authorizedUsers[inputAdr].loggedIn = false;
        console.log(authorizedUsers);

    });

});

function createAlert(message, alertType = 'success') {
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

function showHome() {
    const event = new Event('click');
    const homeLink = document.getElementsByTagName('a')[1];
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

function getActiveUser() {
    return authorizedUsers[inputAdr] || {loggedIn: false};
}

// start of manageSPA.js

var main;

document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll("#sidebar a");
    console.log(navLinks);
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function (e) {
            e.preventDefault();
            
            document.querySelector("li.active").className = "";
            this.parentElement.className = "active";

            location.hash = this.getAttribute("href");
            console.log(this.getAttribute("href"))
            console.log(location.hash.trim().substring(1));
        })
    }
   
});

document.addEventListener("DOMContentLoaded", function () {
    main = document.querySelector("main");
    insertTemplate(location.hash.trim().substring(1));
});

window.addEventListener("hashchange", function() {
    insertTemplate(location.hash.trim().substring(1));
});

function insertTemplate(strHash) {
    
    if (!getActiveUser().loggedIn && strHash !== 'welcome') {
        const alertWrapper = $('<div id="wrapper"></div>');
        $('footer').append(alertWrapper);
        createAlert('Please log in first to access other AGM features', 'danger');
        setTimeout(function () {
            $('.alert').alert('close');
        }, 3000);
        //$("li.active").removeClass('active').addClass('');
        return;
    }
    
    var templateContent;

    strHash = strHash || "welcome";

    clearContentArea();

    switch (strHash) {
        case "welcome":
            templateContent = document.getElementById("welcome-template").content;
            break;
        case "home":
            templateContent = document.getElementById("home-template").content;
            break;
        case "voting":
            templateContent = document.getElementById("voting-template").content;
            break;
        case "Q&A":
            templateContent = document.getElementById("QandA-template").content;
            break;
        case "list":
            templateContent = document.getElementById("QandA-list-template").content;
            break;
        default:
            templateContent = document.getElementById("home-template").content;
            break;
    }

    main.appendChild(document.importNode(templateContent, true));
}

function clearContentArea() {
    while (main.hasChildNodes()) {
        main.removeChild(main.lastChild);
    }
}