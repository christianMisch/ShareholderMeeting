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
/******/ 	return __webpack_require__(__webpack_require__.s = "../src/app/scripts/manageSPA.js");
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


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createAlert = createAlert;
exports.getActiveUserState = getActiveUserState;
exports.getActiveUserAddress = getActiveUserAddress;
exports.removeSecondAlert = removeSecondAlert;
//import web3Provider from '../../provider/web3Provider';

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
    $('#setup-link').hide();
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
            showView('home-link');
            $('#setup-link').show();
            hideLoginFields();
            authorizedUsers[inputAdr].loggedIn = true;
        } else if (Object.keys(authorizedUsers).includes(inputAdr) && authorizedUsers[inputAdr].password === inputPW && authorizedUsers[inputAdr].role === 'Shareholder') {

            createAlert('You have successfully logged in as Shareholder!');
            showUserCredentials();
            $('#userAddress').html('User: ' + inputAdr);
            $('#userRole').html('Role: Shareholder');
            showLogoutButton();
            showView('home-link');
            hideLoginFields();
            authorizedUsers[inputAdr].loggedIn = true;
        } else if (Object.keys(authorizedUsers).includes(inputAdr) && authorizedUsers.inputAdr.password === inputPW && authorizedUsers.inputAdr.role === 'Director') {

            createAlert('You have successfully logged in as Director!');
            showUserCredentials();
            $('#userAddress').html('User: ' + inputAdr);
            $('#userRole').html('Role: Director');
            showLogoutButton();
            showView('home-link');
            hideLoginFields();
            authorizedUsers[inputAdr].loggedIn = true;
        } else {
            $('#wrapper').append('<div role="alert">Login failed!</div>').addClass('alert alert-danger');
        }
        console.log($('#wrapper div').length);
        removeSecondAlert();
        console.log($('#wrapper'));

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
        showLoginFields();
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

function hideLoginFields() {
    $('#address-label').hide();
    $('#password-label').hide();
}

function showLoginFields() {
    $('#address-label').show();
    $('#password-label').show();
}

function showView(viewName) {
    var event = new Event('click');
    var homeLink = document.getElementById(viewName);
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

function getActiveUserState() {
    return authorizedUsers[inputAdr] || { loggedIn: false };
}

function getActiveUserAddress() {
    return inputAdr;
}

function removeSecondAlert() {
    var numOfAlerts = $('#wrapper div').length;
    if (numOfAlerts > 1) {
        var wrapper = document.querySelector('#wrapper');
        wrapper.removeChild(wrapper.lastChild);
    }
}

/***/ }),

/***/ "../src/app/scripts/manageSPA.js":
/*!***************************************!*\
  !*** ../src/app/scripts/manageSPA.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _authentication = __webpack_require__(/*! ./authentication */ "../src/app/scripts/authentication.js");

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

    if (!(0, _authentication.getActiveUserState)().loggedIn && strHash !== 'welcome') {
        var alertWrapper = $('<div id="wrapper"></div>');
        $('footer').append(alertWrapper);
        (0, _authentication.createAlert)('Please log in first to access other AGM features', 'danger');
        (0, _authentication.removeSecondAlert)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uLy4uL3NyYy9hcHAvc2NyaXB0cy9tYW5hZ2VTUEEuanMiXSwibmFtZXMiOlsiY3JlYXRlQWxlcnQiLCJnZXRBY3RpdmVVc2VyU3RhdGUiLCJnZXRBY3RpdmVVc2VyQWRkcmVzcyIsInJlbW92ZVNlY29uZEFsZXJ0IiwiYXV0aG9yaXplZFVzZXJzIiwicGFzc3dvcmQiLCJyb2xlIiwibG9nZ2VkSW4iLCJpbnB1dEFkciIsImlucHV0UFciLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsInNob3dXZWxjb21lUGFnZSIsImhpZGUiLCJoaWRlVXNlckNyZWRlbnRpYWxzIiwiY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJhbGVydFdyYXBwZXIiLCJhcHBlbmQiLCJ2YWwiLCJPYmplY3QiLCJrZXlzIiwiaW5jbHVkZXMiLCJzaG93VXNlckNyZWRlbnRpYWxzIiwiaHRtbCIsInNob3dMb2dvdXRCdXR0b24iLCJzaG93VmlldyIsInNob3ciLCJoaWRlTG9naW5GaWVsZHMiLCJhZGRDbGFzcyIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiYWxlcnQiLCJzaG93TG9naW5GaWVsZHMiLCJtZXNzYWdlIiwiYWxlcnRUeXBlIiwidmlld05hbWUiLCJldmVudCIsIkV2ZW50IiwiaG9tZUxpbmsiLCJnZXRFbGVtZW50QnlJZCIsImRpc3BhdGNoRXZlbnQiLCJ3ZWxjb21lTGluayIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibnVtT2ZBbGVydHMiLCJ3cmFwcGVyIiwicXVlcnlTZWxlY3RvciIsInJlbW92ZUNoaWxkIiwibGFzdENoaWxkIiwibWFpbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJuYXZMaW5rcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwiY2xhc3NOYW1lIiwicGFyZW50RWxlbWVudCIsImxvY2F0aW9uIiwiaGFzaCIsImdldEF0dHJpYnV0ZSIsInRyaW0iLCJzdWJzdHJpbmciLCJpbnNlcnRUZW1wbGF0ZSIsIndpbmRvdyIsInN0ckhhc2giLCJ0ZW1wbGF0ZUNvbnRlbnQiLCJjbGVhckNvbnRlbnRBcmVhIiwiY29udGVudCIsImFwcGVuZENoaWxkIiwiaW1wb3J0Tm9kZSIsImhhc0NoaWxkTm9kZXMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQ1lnQkEsVyxHQUFBQSxXO1FBcURBQyxrQixHQUFBQSxrQjtRQUlBQyxvQixHQUFBQSxvQjtRQUlBQyxpQixHQUFBQSxpQjtBQTNKaEI7O0FBRUEsSUFBSUMsa0JBQWtCO0FBQ2xCLFdBQU8sRUFBQ0MsVUFBVSxRQUFYLEVBQXFCQyxNQUFNLFVBQTNCLEVBQXVDQyxVQUFVLEtBQWpELEVBRFc7QUFFbEIsa0RBQThDLEVBQUNGLFVBQVUsS0FBWCxFQUFrQkMsTUFB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bnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4uL3NyYy9hcHAvc2NyaXB0cy9tYW5hZ2VTUEEuanNcIik7XG4iLCIvL2ltcG9ydCB3ZWIzUHJvdmlkZXIgZnJvbSAnLi4vLi4vcHJvdmlkZXIvd2ViM1Byb3ZpZGVyJztcclxuXHJcbnZhciBhdXRob3JpemVkVXNlcnMgPSB7XHJcbiAgICAnMHgwJzoge3Bhc3N3b3JkOiAnbWFzdGVyJywgcm9sZTogJ0FnbU93bmVyJywgbG9nZ2VkSW46IGZhbHNlfSxcclxuICAgICcweDcyY2NjREJDRmI0NjRhMjQwYzAyNTk2OWJiOUJiODFEYTAzOTJhOTAnOiB7cGFzc3dvcmQ6ICdwdzEnLCByb2xlOiAnU2hhcmVob2xkZXInLCBsb2dnZWRJbjogZmFsc2V9LFxyXG4gICAgJzB4NUUzNDA3RTQ0NzU2MzcxQjREM0RlODBFYjQzNzhiNzE1YzQ0NDYxOSc6IHtwYXNzd29yZDogJ3B3MicsIHJvbGU6ICdEaXJlY3RvcicsIGxvZ2dlZEluOiBmYWxzZX1cclxufTtcclxudmFyIGlucHV0QWRyLCBpbnB1dFBXO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7IFxyXG5cclxuICAgIHNob3dXZWxjb21lUGFnZSgpO1xyXG4gICAgLy8gaGlkZSBsb2dvdXQgYnV0dG9uLCB3ZWxjb21lIGxpbmsgaW4gc2lkZWJhciBhbmQgdXNlciBjcmVkZW50aWFsc1xyXG4gICAgJCgnI2xvZ291dC1idXR0b24nKS5oaWRlKCk7XHJcbiAgICAkKCcjd2VsY29tZS1saW5rJykuaGlkZSgpO1xyXG4gICAgJCgnI3NldHVwLWxpbmsnKS5oaWRlKCk7XHJcbiAgICBoaWRlVXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICBcclxuXHJcbiAgICAkKCcjbG9naW4tYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgYWxlcnRXcmFwcGVyID0gJCgnPGRpdiBpZD1cIndyYXBwZXJcIj48L2Rpdj4nKTtcclxuICAgICAgICAkKCdmb290ZXInKS5hcHBlbmQoYWxlcnRXcmFwcGVyKTtcclxuICAgICAgICBpbnB1dEFkciA9ICQoJyN3YWxsZXQtYWRkcmVzcycpLnZhbCgpO1xyXG4gICAgICAgIGlucHV0UFcgPSAkKCcjcGFzc3dvcmQnKS52YWwoKTtcclxuXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGF1dGhvcml6ZWRVc2VycykuaW5jbHVkZXMoaW5wdXRBZHIpIFxyXG4gICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLnBhc3N3b3JkID09PSBpbnB1dFBXXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucm9sZSA9PT0gJ0FnbU93bmVyJykge1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWxlcnQoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4gYXMgQWdtT3duZXIhJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93VXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlckFkZHJlc3MnKS5odG1sKCdVc2VyOiAnICsgaW5wdXRBZHIpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJSb2xlJykuaHRtbCgnUm9sZTogQWdtT3duZXInKTtcclxuICAgICAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIHNob3dWaWV3KCdob21lLWxpbmsnKTtcclxuICAgICAgICAgICAgICAgICQoJyNzZXR1cC1saW5rJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgaGlkZUxvZ2luRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMoYXV0aG9yaXplZFVzZXJzKS5pbmNsdWRlcyhpbnB1dEFkcikgXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucGFzc3dvcmQgPT09IGlucHV0UFcgXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucm9sZSA9PT0gJ1NoYXJlaG9sZGVyJykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUFsZXJ0KCdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgbG9nZ2VkIGluIGFzIFNoYXJlaG9sZGVyIScpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1VzZXJDcmVkZW50aWFscygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJBZGRyZXNzJykuaHRtbCgnVXNlcjogJyArIGlucHV0QWRyKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyUm9sZScpLmh0bWwoJ1JvbGU6IFNoYXJlaG9sZGVyJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93TG9nb3V0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICBzaG93VmlldygnaG9tZS1saW5rJyk7XHJcbiAgICAgICAgICAgICAgICBoaWRlTG9naW5GaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ubG9nZ2VkSW4gPSB0cnVlO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKGF1dGhvcml6ZWRVc2VycykuaW5jbHVkZXMoaW5wdXRBZHIpXHJcbiAgICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnMuaW5wdXRBZHIucGFzc3dvcmQgPT09IGlucHV0UFdcclxuICAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vycy5pbnB1dEFkci5yb2xlID09PSAnRGlyZWN0b3InKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWxlcnQoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4gYXMgRGlyZWN0b3IhJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93VXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlckFkZHJlc3MnKS5odG1sKCdVc2VyOiAnICsgaW5wdXRBZHIpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJSb2xlJykuaHRtbCgnUm9sZTogRGlyZWN0b3InKTtcclxuICAgICAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIHNob3dWaWV3KCdob21lLWxpbmsnKTtcclxuICAgICAgICAgICAgICAgIGhpZGVMb2dpbkZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5sb2dnZWRJbiA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyN3cmFwcGVyJykuYXBwZW5kKGA8ZGl2IHJvbGU9XCJhbGVydFwiPkxvZ2luIGZhaWxlZCE8L2Rpdj5gKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhbGVydCBhbGVydC1kYW5nZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJCgnI3dyYXBwZXIgZGl2JykubGVuZ3RoKTtcclxuICAgICAgICByZW1vdmVTZWNvbmRBbGVydCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCQoJyN3cmFwcGVyJykpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGF1dGhvcml6ZWRVc2Vycyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2xvZ291dC1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmhpZGUoKTtcclxuICAgICAgICAkKCcjbG9naW4tYnV0dG9uJykuc2hvdygpO1xyXG4gICAgICAgIHNob3dXZWxjb21lUGFnZSgpO1xyXG4gICAgICAgIGhpZGVVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICBzaG93TG9naW5GaWVsZHMoKTtcclxuICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXV0aG9yaXplZFVzZXJzKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFsZXJ0KG1lc3NhZ2UsIGFsZXJ0VHlwZSA9ICdzdWNjZXNzJykge1xyXG4gICAgJCgnI3dyYXBwZXInKS5hcHBlbmQoYDxkaXYgcm9sZT1cImFsZXJ0XCI+JHttZXNzYWdlfTwvZGl2PmApXHJcbiAgICAgICAgLmFkZENsYXNzKGBhbGVydCBhbGVydC0ke2FsZXJ0VHlwZX1gKTtcclxuXHJcbiAgICAvKmlmIChhbGVydFR5cGUgPT09ICdkYW5nZXInKSB7XHJcbiAgICAgICAgY29uc3QgYUxpbmtzID0gJCgnYScpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYUxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhTGlua3NbaV0uYXR0cignY2xhc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgJCgnYScpW2ldLmF0dHIoJ2NsYXNzJywgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSovXHJcbiAgICAvLyQoJ2FbaHJlZj1cIiNob21lXCJdJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dVc2VyQ3JlZGVudGlhbHMoKSB7XHJcbiAgICAkKCcjdXNlckFkZHJlc3MnKS5zaG93KCk7XHJcbiAgICAkKCcjdXNlclJvbGUnKS5zaG93KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVVc2VyQ3JlZGVudGlhbHMoKSB7XHJcbiAgICAkKCcjdXNlckFkZHJlc3MnKS5oaWRlKCk7XHJcbiAgICAkKCcjdXNlclJvbGUnKS5oaWRlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVMb2dpbkZpZWxkcygpIHtcclxuICAgICQoJyNhZGRyZXNzLWxhYmVsJykuaGlkZSgpO1xyXG4gICAgJCgnI3Bhc3N3b3JkLWxhYmVsJykuaGlkZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93TG9naW5GaWVsZHMoKSB7XHJcbiAgICAkKCcjYWRkcmVzcy1sYWJlbCcpLnNob3coKTtcclxuICAgICQoJyNwYXNzd29yZC1sYWJlbCcpLnNob3coKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1ZpZXcodmlld05hbWUpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCdjbGljaycpO1xyXG4gICAgY29uc3QgaG9tZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWV3TmFtZSk7XHJcbiAgICBob21lTGluay5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0xvZ291dEJ1dHRvbigpIHtcclxuICAgICQoJyNsb2dvdXQtYnV0dG9uJykuc2hvdygpO1xyXG4gICAgJCgnI2xvZ2luLWJ1dHRvbicpLmhpZGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1dlbGNvbWVQYWdlKCkge1xyXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ2NsaWNrJyk7XHJcbiAgICBjb25zdCB3ZWxjb21lTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylbMF07XHJcbiAgICB3ZWxjb21lTGluay5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZVVzZXJTdGF0ZSgpIHtcclxuICAgIHJldHVybiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdIHx8IHtsb2dnZWRJbjogZmFsc2V9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlVXNlckFkZHJlc3MoKSB7XHJcbiAgICByZXR1cm4gaW5wdXRBZHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVTZWNvbmRBbGVydCgpIHtcclxuICAgIHZhciBudW1PZkFsZXJ0cyA9ICQoJyN3cmFwcGVyIGRpdicpLmxlbmd0aDtcclxuICAgICAgICBpZiAobnVtT2ZBbGVydHMgPiAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3JhcHBlcicpOyBcclxuICAgICAgICAgICAgd3JhcHBlci5yZW1vdmVDaGlsZCh3cmFwcGVyLmxhc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG59IiwiaW1wb3J0IHtnZXRBY3RpdmVVc2VyU3RhdGUsIHJlbW92ZVNlY29uZEFsZXJ0LCBjcmVhdGVBbGVydH0gZnJvbSAnLi9hdXRoZW50aWNhdGlvbic7XHJcblxyXG52YXIgbWFpbjtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjc2lkZWJhciBhXCIpO1xyXG4gICAgY29uc29sZS5sb2cobmF2TGlua3MpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYXZMaW5rcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG5hdkxpbmtzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibGkuYWN0aXZlXCIpLmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5jbGFzc05hbWUgPSBcImFjdGl2ZVwiO1xyXG5cclxuICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsb2NhdGlvbi5oYXNoLnRyaW0oKS5zdWJzdHJpbmcoMSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgIFxyXG59KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcclxuICAgIGluc2VydFRlbXBsYXRlKGxvY2F0aW9uLmhhc2gudHJpbSgpLnN1YnN0cmluZygxKSk7XHJcbn0pO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgaW5zZXJ0VGVtcGxhdGUobG9jYXRpb24uaGFzaC50cmltKCkuc3Vic3RyaW5nKDEpKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRUZW1wbGF0ZShzdHJIYXNoKSB7XHJcbiAgICBcclxuICAgIGlmICghZ2V0QWN0aXZlVXNlclN0YXRlKCkubG9nZ2VkSW4gJiYgc3RySGFzaCAhPT0gJ3dlbGNvbWUnKSB7XHJcbiAgICAgICAgY29uc3QgYWxlcnRXcmFwcGVyID0gJCgnPGRpdiBpZD1cIndyYXBwZXJcIj48L2Rpdj4nKTtcclxuICAgICAgICAkKCdmb290ZXInKS5hcHBlbmQoYWxlcnRXcmFwcGVyKTtcclxuICAgICAgICBjcmVhdGVBbGVydCgnUGxlYXNlIGxvZyBpbiBmaXJzdCB0byBhY2Nlc3Mgb3RoZXIgQUdNIGZlYXR1cmVzJywgJ2RhbmdlcicpO1xyXG4gICAgICAgIHJlbW92ZVNlY29uZEFsZXJ0KCk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgIC8vJChcImxpLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJycpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIHRlbXBsYXRlQ29udGVudDtcclxuXHJcbiAgICBzdHJIYXNoID0gc3RySGFzaCB8fCBcIndlbGNvbWVcIjtcclxuXHJcbiAgICBjbGVhckNvbnRlbnRBcmVhKCk7XHJcblxyXG4gICAgc3dpdGNoIChzdHJIYXNoKSB7XHJcbiAgICAgICAgY2FzZSBcIndlbGNvbWVcIjpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWxjb21lLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJob21lXCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG9tZS10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwic2V0dXBcIjpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZXR1cC10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwidm90aW5nXCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidm90aW5nLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJRJkFcIjpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRYW5kQS10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwibGlzdFwiOlxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlFhbmRBLWxpc3QtdGVtcGxhdGVcIikuY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob21lLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIG1haW4uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZUNvbnRlbnQsIHRydWUpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJDb250ZW50QXJlYSgpIHtcclxuICAgIHdoaWxlIChtYWluLmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgIG1haW4ucmVtb3ZlQ2hpbGQobWFpbi5sYXN0Q2hpbGQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=