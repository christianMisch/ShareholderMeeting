var main;

document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll("#sidebar a");
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
    var templateContent;

    strHash = strHash || "home";

    clearContentArea();

    switch (strHash) {
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



