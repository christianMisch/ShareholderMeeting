/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../src/app/scripts/authentication.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/app/scripts/authentication.js":
/*!********************************************!*\
  !*** ../src/app/scripts/authentication.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import web3Provider from '../../provider/web3Provider';
var authorizedUsers = {
    '0x0': { password: 'master', role: 'AgmOwner', loggedIn: false },
    '0x72cccDBCFb464a240c025969bb9Bb81Da0392a90': { password: 'pw1', role: 'Shareholder', loggedIn: false },
    '0x5E3407E44756371B4D3De80Eb4378b715c444619': { password: 'pw2', role: 'Director', loggedIn: false }
};
var inputAdr, inputPW;

$(document).ready(function () {

    showWelcomePage();
    // hide logout button, welcome link in sidebar and user credentials
    $('#logout-button').hide();
    $('#welcome-link').hide();
    hideUserCredentials();

    $('#login-button').click(function (e) {
        e.preventDefault();

        var alertWrapper = $('<div id="wrapper"></div>');
        $('footer').append(alertWrapper);
        inputAdr = $('#wallet-address').val();
        inputPW = $('#password').val();

        if (Object.keys(authorizedUsers).includes(inputAdr) && authorizedUsers[inputAdr].password === inputPW && authorizedUsers[inputAdr].role === 'AgmOwner') {
            createAlert('You have successfully logged in as AgmOwner!');
            showUserCredentials();
            $('#userAddress').html('User: ' + inputAdr);
            $('#userRole').html('Role: AgmOwner');
            showLogoutButton();
            showHome();
            authorizedUsers[inputAdr].loggedIn = true;
        } else if (Object.keys(authorizedUsers).includes(inputAdr) && authorizedUsers[inputAdr].password === inputPW && authorizedUsers[inputAdr].role === 'Shareholder') {

            createAlert('You have successfully logged in as Shareholder!');
            showUserCredentials();
            $('#userAddress').html('User: ' + inputAdr);
            $('#userRole').html('Role: Shareholder');
            showLogoutButton();
            showHome();
            authorizedUsers[inputAdr].loggedIn = true;
        } else if (Object.keys(authorizedUsers).includes(inputAdr) && authorizedUsers.inputAdr.password === inputPW && authorizedUsers.inputAdr.role === 'Director') {

            createAlert('You have successfully logged in as Director!');
            showUserCredentials();
            $('#userAddress').html('User: ' + inputAdr);
            $('#userRole').html('Role: Director');
            showLogoutButton();
            showHome();
            authorizedUsers[inputAdr].loggedIn = true;
        } else {
            $('#wrapper').append('<div role="alert">Login failed!</div>').addClass('alert alert-danger');
        }
        console.log($('#wrapper div').length);
        console.log(authorizedUsers);
        setTimeout(function () {
            $('.alert').alert('close');
        }, 3000);
    });

    $('#logout-button').click(function () {
        $('#logout-button').hide();
        $('#login-button').show();
        showWelcomePage();
        hideUserCredentials();
        authorizedUsers[inputAdr].loggedIn = false;
        console.log(authorizedUsers);
    });
});

function createAlert(message) {
    var alertType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';

    $('#wrapper').append('<div role="alert">' + message + '</div>').addClass('alert alert-' + alertType);

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
    var event = new Event('click');
    var homeLink = document.getElementsByTagName('a')[1];
    homeLink.dispatchEvent(event);
}

function showLogoutButton() {
    $('#logout-button').show();
    $('#login-button').hide();
}

function showWelcomePage() {
    var event = new Event('click');
    var welcomeLink = document.getElementsByTagName('a')[0];
    welcomeLink.dispatchEvent(event);
}

function getActiveUser() {
    return authorizedUsers[inputAdr] || { loggedIn: false };
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
            console.log(this.getAttribute("href"));
            console.log(location.hash.trim().substring(1));
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    main = document.querySelector("main");
    insertTemplate(location.hash.trim().substring(1));
});

window.addEventListener("hashchange", function () {
    insertTemplate(location.hash.trim().substring(1));
});

function insertTemplate(strHash) {

    if (!getActiveUser().loggedIn && strHash !== 'welcome') {
        var alertWrapper = $('<div id="wrapper"></div>');
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzIl0sIm5hbWVzIjpbImF1dGhvcml6ZWRVc2VycyIsInBhc3N3b3JkIiwicm9sZSIsImxvZ2dlZEluIiwiaW5wdXRBZHIiLCJpbnB1dFBXIiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCJzaG93V2VsY29tZVBhZ2UiLCJoaWRlIiwiaGlkZVVzZXJDcmVkZW50aWFscyIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwiYWxlcnRXcmFwcGVyIiwiYXBwZW5kIiwidmFsIiwiT2JqZWN0Iiwia2V5cyIsImluY2x1ZGVzIiwiY3JlYXRlQWxlcnQiLCJzaG93VXNlckNyZWRlbnRpYWxzIiwiaHRtbCIsInNob3dMb2dvdXRCdXR0b24iLCJzaG93SG9tZSIsImFkZENsYXNzIiwiY29uc29sZSIsImxvZyIsImxlbmd0aCIsInNldFRpbWVvdXQiLCJhbGVydCIsInNob3ciLCJtZXNzYWdlIiwiYWxlcnRUeXBlIiwiZXZlbnQiLCJFdmVudCIsImhvbWVMaW5rIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJkaXNwYXRjaEV2ZW50Iiwid2VsY29tZUxpbmsiLCJnZXRBY3RpdmVVc2VyIiwibWFpbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJuYXZMaW5rcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTmFtZSIsInBhcmVudEVsZW1lbnQiLCJsb2NhdGlvbiIsImhhc2giLCJnZXRBdHRyaWJ1dGUiLCJ0cmltIiwic3Vic3RyaW5nIiwiaW5zZXJ0VGVtcGxhdGUiLCJ3aW5kb3ciLCJzdHJIYXNoIiwidGVtcGxhdGVDb250ZW50IiwiY2xlYXJDb250ZW50QXJlYSIsImdldEVsZW1lbnRCeUlkIiwiY29udGVudCIsImFwcGVuZENoaWxkIiwiaW1wb3J0Tm9kZSIsImhhc0NoaWxkTm9kZXMiLCJyZW1v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dWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzXCIpO1xuIiwiLy8gaW1wb3J0IHdlYjNQcm92aWRlciBmcm9tICcuLi8uLi9wcm92aWRlci93ZWIzUHJvdmlkZXInO1xyXG52YXIgYXV0aG9yaXplZFVzZXJzID0ge1xyXG4gICAgJzB4MCc6IHtwYXNzd29yZDogJ21hc3RlcicsIHJvbGU6ICdBZ21Pd25lcicsIGxvZ2dlZEluOiBmYWxzZX0sXHJcbiAgICAnMHg3MmNjY0RCQ0ZiNDY0YTI0MGMwMjU5NjliYjlCYjgxRGEwMzkyYTkwJzoge3Bhc3N3b3JkOiAncHcxJywgcm9sZTogJ1NoYXJlaG9sZGVyJywgbG9nZ2VkSW46IGZhbHNlfSxcclxuICAgICcweDVFMzQwN0U0NDc1NjM3MUI0RDNEZTgwRWI0Mzc4YjcxNWM0NDQ2MTknOiB7cGFzc3dvcmQ6ICdwdzInLCByb2xlOiAnRGlyZWN0b3InLCBsb2dnZWRJbjogZmFsc2V9XHJcbn07XHJcbnZhciBpbnB1dEFkciwgaW5wdXRQVztcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHNob3dXZWxjb21lUGFnZSgpO1xyXG4gICAgLy8gaGlkZSBsb2dvdXQgYnV0dG9uLCB3ZWxjb21lIGxpbmsgaW4gc2lkZWJhciBhbmQgdXNlciBjcmVkZW50aWFsc1xyXG4gICAgJCgnI2xvZ291dC1idXR0b24nKS5oaWRlKCk7XHJcbiAgICAkKCcjd2VsY29tZS1saW5rJykuaGlkZSgpO1xyXG4gICAgaGlkZVVzZXJDcmVkZW50aWFscygpO1xyXG4gICAgXHJcblxyXG4gICAgJCgnI2xvZ2luLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFsZXJ0V3JhcHBlciA9ICQoJzxkaXYgaWQ9XCJ3cmFwcGVyXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgJCgnZm9vdGVyJykuYXBwZW5kKGFsZXJ0V3JhcHBlcik7XHJcbiAgICAgICAgaW5wdXRBZHIgPSAkKCcjd2FsbGV0LWFkZHJlc3MnKS52YWwoKTtcclxuICAgICAgICBpbnB1dFBXID0gJCgnI3Bhc3N3b3JkJykudmFsKCk7XHJcblxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhhdXRob3JpemVkVXNlcnMpLmluY2x1ZGVzKGlucHV0QWRyKSBcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5wYXNzd29yZCA9PT0gaW5wdXRQV1xyXG4gICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLnJvbGUgPT09ICdBZ21Pd25lcicpIHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUFsZXJ0KCdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgbG9nZ2VkIGluIGFzIEFnbU93bmVyIScpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1VzZXJDcmVkZW50aWFscygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJBZGRyZXNzJykuaHRtbCgnVXNlcjogJyArIGlucHV0QWRyKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyUm9sZScpLmh0bWwoJ1JvbGU6IEFnbU93bmVyJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93TG9nb3V0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICBzaG93SG9tZSgpO1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5sb2dnZWRJbiA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKGF1dGhvcml6ZWRVc2VycykuaW5jbHVkZXMoaW5wdXRBZHIpIFxyXG4gICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLnBhc3N3b3JkID09PSBpbnB1dFBXIFxyXG4gICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLnJvbGUgPT09ICdTaGFyZWhvbGRlcicpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiBhcyBTaGFyZWhvbGRlciEnKTtcclxuICAgICAgICAgICAgICAgIHNob3dVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyQWRkcmVzcycpLmh0bWwoJ1VzZXI6ICcgKyBpbnB1dEFkcik7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlclJvbGUnKS5odG1sKCdSb2xlOiBTaGFyZWhvbGRlcicpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0xvZ291dEJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0hvbWUoKTtcclxuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ubG9nZ2VkSW4gPSB0cnVlO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKGF1dGhvcml6ZWRVc2VycykuaW5jbHVkZXMoaW5wdXRBZHIpXHJcbiAgICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnMuaW5wdXRBZHIucGFzc3dvcmQgPT09IGlucHV0UFdcclxuICAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vycy5pbnB1dEFkci5yb2xlID09PSAnRGlyZWN0b3InKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWxlcnQoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4gYXMgRGlyZWN0b3IhJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93VXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlckFkZHJlc3MnKS5odG1sKCdVc2VyOiAnICsgaW5wdXRBZHIpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJSb2xlJykuaHRtbCgnUm9sZTogRGlyZWN0b3InKTtcclxuICAgICAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIHNob3dIb21lKCk7XHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI3dyYXBwZXInKS5hcHBlbmQoYDxkaXYgcm9sZT1cImFsZXJ0XCI+TG9naW4gZmFpbGVkITwvZGl2PmApXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FsZXJ0IGFsZXJ0LWRhbmdlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygkKCcjd3JhcHBlciBkaXYnKS5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGF1dGhvcml6ZWRVc2Vycyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2xvZ291dC1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmhpZGUoKTtcclxuICAgICAgICAkKCcjbG9naW4tYnV0dG9uJykuc2hvdygpO1xyXG4gICAgICAgIHNob3dXZWxjb21lUGFnZSgpO1xyXG4gICAgICAgIGhpZGVVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXV0aG9yaXplZFVzZXJzKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQWxlcnQobWVzc2FnZSwgYWxlcnRUeXBlID0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAkKCcjd3JhcHBlcicpLmFwcGVuZChgPGRpdiByb2xlPVwiYWxlcnRcIj4ke21lc3NhZ2V9PC9kaXY+YClcclxuICAgICAgICAuYWRkQ2xhc3MoYGFsZXJ0IGFsZXJ0LSR7YWxlcnRUeXBlfWApO1xyXG5cclxuICAgIC8qaWYgKGFsZXJ0VHlwZSA9PT0gJ2RhbmdlcicpIHtcclxuICAgICAgICBjb25zdCBhTGlua3MgPSAkKCdhJyk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhTGlua3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFMaW5rc1tpXS5hdHRyKCdjbGFzcycpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdhJylbaV0uYXR0cignY2xhc3MnLCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuICAgIC8vJCgnYVtocmVmPVwiI2hvbWVcIl0nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICBcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1VzZXJDcmVkZW50aWFscygpIHtcclxuICAgICQoJyN1c2VyQWRkcmVzcycpLnNob3coKTtcclxuICAgICQoJyN1c2VyUm9sZScpLnNob3coKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZVVzZXJDcmVkZW50aWFscygpIHtcclxuICAgICQoJyN1c2VyQWRkcmVzcycpLmhpZGUoKTtcclxuICAgICQoJyN1c2VyUm9sZScpLmhpZGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0hvbWUoKSB7XHJcbiAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCgnY2xpY2snKTtcclxuICAgIGNvbnN0IGhvbWVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKVsxXTtcclxuICAgIGhvbWVMaW5rLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93TG9nb3V0QnV0dG9uKCkge1xyXG4gICAgJCgnI2xvZ291dC1idXR0b24nKS5zaG93KCk7XHJcbiAgICAkKCcjbG9naW4tYnV0dG9uJykuaGlkZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93V2VsY29tZVBhZ2UoKSB7XHJcbiAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCgnY2xpY2snKTtcclxuICAgIGNvbnN0IHdlbGNvbWVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKVswXTtcclxuICAgIHdlbGNvbWVMaW5rLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBY3RpdmVVc2VyKCkge1xyXG4gICAgcmV0dXJuIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0gfHwge2xvZ2dlZEluOiBmYWxzZX07XHJcbn1cclxuXHJcbi8vIHN0YXJ0IG9mIG1hbmFnZVNQQS5qc1xyXG5cclxudmFyIG1haW47XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3NpZGViYXIgYVwiKTtcclxuICAgIGNvbnNvbGUubG9nKG5hdkxpbmtzKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmF2TGlua3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBuYXZMaW5rc1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImxpLmFjdGl2ZVwiKS5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcclxuXHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSB0aGlzLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobG9jYXRpb24uaGFzaC50cmltKCkuc3Vic3RyaW5nKDEpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICBcclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XHJcbiAgICBpbnNlcnRUZW1wbGF0ZShsb2NhdGlvbi5oYXNoLnRyaW0oKS5zdWJzdHJpbmcoMSkpO1xyXG59KTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBmdW5jdGlvbigpIHtcclxuICAgIGluc2VydFRlbXBsYXRlKGxvY2F0aW9uLmhhc2gudHJpbSgpLnN1YnN0cmluZygxKSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gaW5zZXJ0VGVtcGxhdGUoc3RySGFzaCkge1xyXG4gICAgXHJcbiAgICBpZiAoIWdldEFjdGl2ZVVzZXIoKS5sb2dnZWRJbiAmJiBzdHJIYXNoICE9PSAnd2VsY29tZScpIHtcclxuICAgICAgICBjb25zdCBhbGVydFdyYXBwZXIgPSAkKCc8ZGl2IGlkPVwid3JhcHBlclwiPjwvZGl2PicpO1xyXG4gICAgICAgICQoJ2Zvb3RlcicpLmFwcGVuZChhbGVydFdyYXBwZXIpO1xyXG4gICAgICAgIGNyZWF0ZUFsZXJ0KCdQbGVhc2UgbG9nIGluIGZpcnN0IHRvIGFjY2VzcyBvdGhlciBBR00gZmVhdHVyZXMnLCAnZGFuZ2VyJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgIC8vJChcImxpLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJycpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIHRlbXBsYXRlQ29udGVudDtcclxuXHJcbiAgICBzdHJIYXNoID0gc3RySGFzaCB8fCBcIndlbGNvbWVcIjtcclxuXHJcbiAgICBjbGVhckNvbnRlbnRBcmVhKCk7XHJcblxyXG4gICAgc3dpdGNoIChzdHJIYXNoKSB7XHJcbiAgICAgICAgY2FzZSBcIndlbGNvbWVcIjpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWxjb21lLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJob21lXCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG9tZS10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwidm90aW5nXCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidm90aW5nLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJRJkFcIjpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRYW5kQS10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwibGlzdFwiOlxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlFhbmRBLWxpc3QtdGVtcGxhdGVcIikuY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob21lLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIG1haW4uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZUNvbnRlbnQsIHRydWUpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJDb250ZW50QXJlYSgpIHtcclxuICAgIHdoaWxlIChtYWluLmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgIG1haW4ucmVtb3ZlQ2hpbGQobWFpbi5sYXN0Q2hpbGQpO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==