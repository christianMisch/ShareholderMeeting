//import {getActiveUserState, removeSecondAlert, createAlert} from './authentication';

var main;

document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll("#sidebar a");
    //console.log(navLinks);
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function (e) {
            e.preventDefault();
            
            document.querySelector("li.active").className = "";
            this.parentElement.className = "active";

            location.hash = this.getAttribute("href");
            //console.log(this.getAttribute("href"))
            //console.log(location.hash.trim().substring(1));
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
    
    /*if (!getActiveUserState().loggedIn && strHash !== 'welcome') {
        const alertWrapper = $('<div id="wrapper"></div>');
        $('footer').append(alertWrapper);
        createAlert('Please log in first to access other AGM features', 'danger');
        removeSecondAlert();
        setTimeout(function () {
            $('.alert').alert('close');
        }, 3000);
        //$("li.active").removeClass('active').addClass('');
        return;
    }*/
    
    var templateContent;

    strHash = strHash || "welcome";

    clearContentArea();

    switch (strHash) {
        case "welcome":
            templateContent = document.getElementById("welcome-template").content;
            break;
        case "timer":
            templateContent = document.getElementById("timer-template").content;
            break;
        case "material":
            templateContent = document.getElementById("material-template").content;
            break;
        case "setup":
            templateContent = document.getElementById("setup-template").content;
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
        case "statistics":
            console.log('show the statistics template...');
            templateContent = document.getElementById("statistics-template").content;
            break;
        default:
            templateContent = document.getElementById("welcome-template").content;
            break;
    }

    main.appendChild(document.importNode(templateContent, true));
}

function clearContentArea() {
    while (main.hasChildNodes()) {
        main.removeChild(main.lastChild);
    }
}



