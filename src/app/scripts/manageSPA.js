/**
 * @summary contains the routing logic to load the specific template (view) depending on a hashchange
 */

// stores the html main element
var main;

// adds an event listener to all anchor tags to change the hash in the URL
document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll("#sidebar a");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector("li.active").className = "";
            this.parentElement.className = "active";
            location.hash = this.getAttribute("href");
        });
    }
});

// trigger an initial hashchange event
document.addEventListener("DOMContentLoaded", function () {
    main = document.querySelector("main");
    insertTemplate(location.hash.trim().substring(1));
});

// listen on hashchange events
window.addEventListener("hashchange", function() {
    insertTemplate(location.hash.trim().substring(1));
});

/**
 * 
 * @param {string} strHash hash of the clicked link element = '#' + href property  
 */
function insertTemplate(strHash) {
    // stores the template content of the specific template
    var templateContent;
    strHash = strHash || "welcome";
    // clear the previous template
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
            templateContent = document.getElementById("statistics-template").content;
            break;
        default:
            templateContent = document.getElementById("welcome-template").content;
            break;
    }
    // instantiate the template and add it to the DOM
    main.appendChild(document.importNode(templateContent, true));
}

/**
 * @function clearContentArea delete the old template which was appended to the DOM
 */
function clearContentArea() {
    while (main.hasChildNodes()) {
        main.removeChild(main.lastChild);
    }
}