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

// start of manageSPA.js

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
    console.log(document.body);
}

function clearContentArea() {
    while (main.hasChildNodes()) {
        main.removeChild(main.lastChild);
    }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uLy4uL3NyYy9hcHAvc2NyaXB0cy9tYW5hZ2VTUEEuanMiXSwibmFtZXMiOlsiY3JlYXRlQWxlcnQiLCJnZXRBY3RpdmVVc2VyU3RhdGUiLCJnZXRBY3RpdmVVc2VyQWRkcmVzcyIsInJlbW92ZVNlY29uZEFsZXJ0IiwiYXV0aG9yaXplZFVzZXJzIiwicGFzc3dvcmQiLCJyb2xlIiwibG9nZ2VkSW4iLCJpbnB1dEFkciIsImlucHV0UFciLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsInNob3dXZWxjb21lUGFnZSIsImhpZGUiLCJoaWRlVXNlckNyZWRlbnRpYWxzIiwiY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJhbGVydFdyYXBwZXIiLCJhcHBlbmQiLCJ2YWwiLCJPYmplY3QiLCJrZXlzIiwiaW5jbHVkZXMiLCJzaG93VXNlckNyZWRlbnRpYWxzIiwiaHRtbCIsInNob3dMb2dvdXRCdXR0b24iLCJzaG93VmlldyIsInNob3ciLCJoaWRlTG9naW5GaWVsZHMiLCJhZGRDbGFzcyIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiYWxlcnQiLCJzaG93TG9naW5GaWVsZHMiLCJtZXNzYWdlIiwiYWxlcnRUeXBlIiwidmlld05hbWUiLCJldmVudCIsIkV2ZW50IiwiaG9tZUxpbmsiLCJnZXRFbGVtZW50QnlJZCIsImRpc3BhdGNoRXZlbnQiLCJ3ZWxjb21lTGluayIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibnVtT2ZBbGVydHMiLCJ3cmFwcGVyIiwicXVlcnlTZWxlY3RvciIsInJlbW92ZUNoaWxkIiwibGFzdENoaWxkIiwibWFpbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJuYXZMaW5rcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwiY2xhc3NOYW1lIiwicGFyZW50RWxlbWVudCIsImxvY2F0aW9uIiwiaGFzaCIsImdldEF0dHJpYnV0ZSIsInRyaW0iLCJzdWJzdHJpbmciLCJpbnNlcnRUZW1wbGF0ZSIsIndpbmRvdyIsInN0ckhhc2giLCJ0ZW1wbGF0ZUNvbnRlbnQiLCJjbGVhckNvbnRlbnRBcmVhIiwiY29udGVudCIsImFwcGVuZENoaWxkIiwiaW1wb3J0Tm9kZSIsImJvZHkiLCJoYXNDaGlsZE5vZGVzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUNXZ0JBLFcsR0FBQUEsVztRQXFEQUMsa0IsR0FBQUEsa0I7UUFJQUMsb0IsR0FBQUEsb0I7UUFJQUMsaUIsR0FBQUEsaUI7QUExSmhCO0FBQ0EsSUFBSUMsa0JBQWtCO0FBQ2xCLFdBQU8sRUFBQ0MsVUFBVSxRQUFYLEVBQXFCQyxNQUFNLFVBQTNCLEVBQXVDQyxVQUFVLEtBQWpELEVBRFc7QUFFbEIsa0RBQThDLEVBQUNGLFVBQVUsS0FBWCxFQUFr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QUNIO0FBQ0osQyIsImZpbGUiOiJtYW5hZ2VTUEEuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4uL3NyYy9hcHAvc2NyaXB0cy9tYW5hZ2VTUEEuanNcIik7XG4iLCIvLyBpbXBvcnQgd2ViM1Byb3ZpZGVyIGZyb20gJy4uLy4uL3Byb3ZpZGVyL3dlYjNQcm92aWRlcic7XHJcbnZhciBhdXRob3JpemVkVXNlcnMgPSB7XHJcbiAgICAnMHgwJzoge3Bhc3N3b3JkOiAnbWFzdGVyJywgcm9sZTogJ0FnbU93bmVyJywgbG9nZ2VkSW46IGZhbHNlfSxcclxuICAgICcweDcyY2NjREJDRmI0NjRhMjQwYzAyNTk2OWJiOUJiODFEYTAzOTJhOTAnOiB7cGFzc3dvcmQ6ICdwdzEnLCByb2xlOiAnU2hhcmVob2xkZXInLCBsb2dnZWRJbjogZmFsc2V9LFxyXG4gICAgJzB4NUUzNDA3RTQ0NzU2MzcxQjREM0RlODBFYjQzNzhiNzE1YzQ0NDYxOSc6IHtwYXNzd29yZDogJ3B3MicsIHJvbGU6ICdEaXJlY3RvcicsIGxvZ2dlZEluOiBmYWxzZX1cclxufTtcclxudmFyIGlucHV0QWRyLCBpbnB1dFBXO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgc2hvd1dlbGNvbWVQYWdlKCk7XHJcbiAgICAvLyBoaWRlIGxvZ291dCBidXR0b24sIHdlbGNvbWUgbGluayBpbiBzaWRlYmFyIGFuZCB1c2VyIGNyZWRlbnRpYWxzXHJcbiAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmhpZGUoKTtcclxuICAgICQoJyN3ZWxjb21lLWxpbmsnKS5oaWRlKCk7XHJcbiAgICAkKCcjc2V0dXAtbGluaycpLmhpZGUoKTtcclxuICAgIGhpZGVVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgIFxyXG5cclxuICAgICQoJyNsb2dpbi1idXR0b24nKS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBhbGVydFdyYXBwZXIgPSAkKCc8ZGl2IGlkPVwid3JhcHBlclwiPjwvZGl2PicpO1xyXG4gICAgICAgICQoJ2Zvb3RlcicpLmFwcGVuZChhbGVydFdyYXBwZXIpO1xyXG4gICAgICAgIGlucHV0QWRyID0gJCgnI3dhbGxldC1hZGRyZXNzJykudmFsKCk7XHJcbiAgICAgICAgaW5wdXRQVyA9ICQoJyNwYXNzd29yZCcpLnZhbCgpO1xyXG5cclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoYXV0aG9yaXplZFVzZXJzKS5pbmNsdWRlcyhpbnB1dEFkcikgXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucGFzc3dvcmQgPT09IGlucHV0UFdcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5yb2xlID09PSAnQWdtT3duZXInKSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiBhcyBBZ21Pd25lciEnKTtcclxuICAgICAgICAgICAgICAgIHNob3dVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyQWRkcmVzcycpLmh0bWwoJ1VzZXI6ICcgKyBpbnB1dEFkcik7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlclJvbGUnKS5odG1sKCdSb2xlOiBBZ21Pd25lcicpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0xvZ291dEJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1ZpZXcoJ2hvbWUtbGluaycpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3NldHVwLWxpbmsnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICBoaWRlTG9naW5GaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ubG9nZ2VkSW4gPSB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3Qua2V5cyhhdXRob3JpemVkVXNlcnMpLmluY2x1ZGVzKGlucHV0QWRyKSBcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5wYXNzd29yZCA9PT0gaW5wdXRQVyBcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5yb2xlID09PSAnU2hhcmVob2xkZXInKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWxlcnQoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4gYXMgU2hhcmVob2xkZXIhJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93VXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlckFkZHJlc3MnKS5odG1sKCdVc2VyOiAnICsgaW5wdXRBZHIpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJSb2xlJykuaHRtbCgnUm9sZTogU2hhcmVob2xkZXInKTtcclxuICAgICAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIHNob3dWaWV3KCdob21lLWxpbmsnKTtcclxuICAgICAgICAgICAgICAgIGhpZGVMb2dpbkZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5sb2dnZWRJbiA9IHRydWU7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMoYXV0aG9yaXplZFVzZXJzKS5pbmNsdWRlcyhpbnB1dEFkcilcclxuICAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vycy5pbnB1dEFkci5wYXNzd29yZCA9PT0gaW5wdXRQV1xyXG4gICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzLmlucHV0QWRyLnJvbGUgPT09ICdEaXJlY3RvcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiBhcyBEaXJlY3RvciEnKTtcclxuICAgICAgICAgICAgICAgIHNob3dVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyQWRkcmVzcycpLmh0bWwoJ1VzZXI6ICcgKyBpbnB1dEFkcik7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlclJvbGUnKS5odG1sKCdSb2xlOiBEaXJlY3RvcicpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0xvZ291dEJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1ZpZXcoJ2hvbWUtbGluaycpO1xyXG4gICAgICAgICAgICAgICAgaGlkZUxvZ2luRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI3dyYXBwZXInKS5hcHBlbmQoYDxkaXYgcm9sZT1cImFsZXJ0XCI+TG9naW4gZmFpbGVkITwvZGl2PmApXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FsZXJ0IGFsZXJ0LWRhbmdlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygkKCcjd3JhcHBlciBkaXYnKS5sZW5ndGgpO1xyXG4gICAgICAgIHJlbW92ZVNlY29uZEFsZXJ0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJCgnI3dyYXBwZXInKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coYXV0aG9yaXplZFVzZXJzKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyNsb2dvdXQtYnV0dG9uJykuaGlkZSgpO1xyXG4gICAgICAgICQoJyNsb2dpbi1idXR0b24nKS5zaG93KCk7XHJcbiAgICAgICAgc2hvd1dlbGNvbWVQYWdlKCk7XHJcbiAgICAgICAgaGlkZVVzZXJDcmVkZW50aWFscygpO1xyXG4gICAgICAgIHNob3dMb2dpbkZpZWxkcygpO1xyXG4gICAgICAgIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ubG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhhdXRob3JpemVkVXNlcnMpO1xyXG5cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWxlcnQobWVzc2FnZSwgYWxlcnRUeXBlID0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAkKCcjd3JhcHBlcicpLmFwcGVuZChgPGRpdiByb2xlPVwiYWxlcnRcIj4ke21lc3NhZ2V9PC9kaXY+YClcclxuICAgICAgICAuYWRkQ2xhc3MoYGFsZXJ0IGFsZXJ0LSR7YWxlcnRUeXBlfWApO1xyXG5cclxuICAgIC8qaWYgKGFsZXJ0VHlwZSA9PT0gJ2RhbmdlcicpIHtcclxuICAgICAgICBjb25zdCBhTGlua3MgPSAkKCdhJyk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhTGlua3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFMaW5rc1tpXS5hdHRyKCdjbGFzcycpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdhJylbaV0uYXR0cignY2xhc3MnLCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuICAgIC8vJCgnYVtocmVmPVwiI2hvbWVcIl0nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICBcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1VzZXJDcmVkZW50aWFscygpIHtcclxuICAgICQoJyN1c2VyQWRkcmVzcycpLnNob3coKTtcclxuICAgICQoJyN1c2VyUm9sZScpLnNob3coKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZVVzZXJDcmVkZW50aWFscygpIHtcclxuICAgICQoJyN1c2VyQWRkcmVzcycpLmhpZGUoKTtcclxuICAgICQoJyN1c2VyUm9sZScpLmhpZGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZUxvZ2luRmllbGRzKCkge1xyXG4gICAgJCgnI2FkZHJlc3MtbGFiZWwnKS5oaWRlKCk7XHJcbiAgICAkKCcjcGFzc3dvcmQtbGFiZWwnKS5oaWRlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dMb2dpbkZpZWxkcygpIHtcclxuICAgICQoJyNhZGRyZXNzLWxhYmVsJykuc2hvdygpO1xyXG4gICAgJCgnI3Bhc3N3b3JkLWxhYmVsJykuc2hvdygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93Vmlldyh2aWV3TmFtZSkge1xyXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ2NsaWNrJyk7XHJcbiAgICBjb25zdCBob21lTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZpZXdOYW1lKTtcclxuICAgIGhvbWVMaW5rLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93TG9nb3V0QnV0dG9uKCkge1xyXG4gICAgJCgnI2xvZ291dC1idXR0b24nKS5zaG93KCk7XHJcbiAgICAkKCcjbG9naW4tYnV0dG9uJykuaGlkZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93V2VsY29tZVBhZ2UoKSB7XHJcbiAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCgnY2xpY2snKTtcclxuICAgIGNvbnN0IHdlbGNvbWVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKVswXTtcclxuICAgIHdlbGNvbWVMaW5rLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlVXNlclN0YXRlKCkge1xyXG4gICAgcmV0dXJuIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0gfHwge2xvZ2dlZEluOiBmYWxzZX07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVVc2VyQWRkcmVzcygpIHtcclxuICAgIHJldHVybiBpbnB1dEFkcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVNlY29uZEFsZXJ0KCkge1xyXG4gICAgdmFyIG51bU9mQWxlcnRzID0gJCgnI3dyYXBwZXIgZGl2JykubGVuZ3RoO1xyXG4gICAgICAgIGlmIChudW1PZkFsZXJ0cyA+IDEpIHtcclxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cmFwcGVyJyk7IFxyXG4gICAgICAgICAgICB3cmFwcGVyLnJlbW92ZUNoaWxkKHdyYXBwZXIubGFzdENoaWxkKTtcclxuICAgICAgICB9XHJcbn1cclxuXHJcbi8vIHN0YXJ0IG9mIG1hbmFnZVNQQS5qcyIsImltcG9ydCB7Z2V0QWN0aXZlVXNlclN0YXRlLCByZW1vdmVTZWNvbmRBbGVydCwgY3JlYXRlQWxlcnR9IGZyb20gJy4vYXV0aGVudGljYXRpb24nO1xyXG5cclxudmFyIG1haW47XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3NpZGViYXIgYVwiKTtcclxuICAgIGNvbnNvbGUubG9nKG5hdkxpbmtzKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmF2TGlua3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBuYXZMaW5rc1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImxpLmFjdGl2ZVwiKS5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcclxuXHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSB0aGlzLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobG9jYXRpb24uaGFzaC50cmltKCkuc3Vic3RyaW5nKDEpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICBcclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XHJcbiAgICBpbnNlcnRUZW1wbGF0ZShsb2NhdGlvbi5oYXNoLnRyaW0oKS5zdWJzdHJpbmcoMSkpO1xyXG59KTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBmdW5jdGlvbigpIHtcclxuICAgIGluc2VydFRlbXBsYXRlKGxvY2F0aW9uLmhhc2gudHJpbSgpLnN1YnN0cmluZygxKSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gaW5zZXJ0VGVtcGxhdGUoc3RySGFzaCkge1xyXG4gICAgXHJcbiAgICBpZiAoIWdldEFjdGl2ZVVzZXJTdGF0ZSgpLmxvZ2dlZEluICYmIHN0ckhhc2ggIT09ICd3ZWxjb21lJykge1xyXG4gICAgICAgIGNvbnN0IGFsZXJ0V3JhcHBlciA9ICQoJzxkaXYgaWQ9XCJ3cmFwcGVyXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgJCgnZm9vdGVyJykuYXBwZW5kKGFsZXJ0V3JhcHBlcik7XHJcbiAgICAgICAgY3JlYXRlQWxlcnQoJ1BsZWFzZSBsb2cgaW4gZmlyc3QgdG8gYWNjZXNzIG90aGVyIEFHTSBmZWF0dXJlcycsICdkYW5nZXInKTtcclxuICAgICAgICByZW1vdmVTZWNvbmRBbGVydCgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgICAvLyQoXCJsaS5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCcnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHZhciB0ZW1wbGF0ZUNvbnRlbnQ7XHJcblxyXG4gICAgc3RySGFzaCA9IHN0ckhhc2ggfHwgXCJ3ZWxjb21lXCI7XHJcblxyXG4gICAgY2xlYXJDb250ZW50QXJlYSgpO1xyXG5cclxuICAgIHN3aXRjaCAoc3RySGFzaCkge1xyXG4gICAgICAgIGNhc2UgXCJ3ZWxjb21lXCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VsY29tZS10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiaG9tZVwiOlxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvbWUtdGVtcGxhdGVcIikuY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcInNldHVwXCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2V0dXAtdGVtcGxhdGVcIikuY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcInZvdGluZ1wiOlxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZvdGluZy10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiUSZBXCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUWFuZEEtdGVtcGxhdGVcIikuY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImxpc3RcIjpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRYW5kQS1saXN0LXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG9tZS10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBtYWluLmFwcGVuZENoaWxkKGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGVDb250ZW50LCB0cnVlKSk7XHJcbiAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5ib2R5KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJDb250ZW50QXJlYSgpIHtcclxuICAgIHdoaWxlIChtYWluLmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgIG1haW4ucmVtb3ZlQ2hpbGQobWFpbi5sYXN0Q2hpbGQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=