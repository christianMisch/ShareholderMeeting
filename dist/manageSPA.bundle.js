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
    '0': { password: '123', role: 'Shareholder', loggedIn: false },
    '0x5E3407E44756371B4D3De80Eb4378b715c444619': { password: 'pw2', role: 'Director', loggedIn: false }
};
var inputAdr, inputPW;

$(document).ready(function () {

    showWelcomePage();
    // hide logout button, welcome link in sidebar and user credentials
    $('#logout-button').hide();
    $('nav').hide();

    /*const links = $('ul[class="list-unstyled components"] a');
    console.log(links);
    $.each(links, function(index, val) {
        console.log(index, val);
        //val.hide();
        //$(`#${val.attr('id')}`).hide();
    })*/
    hideUserCredentials();

    $('#login-button').click(function (e) {
        e.preventDefault();

        var alertWrapper = $('<div id="wrapper"></div>');
        $('footer').append(alertWrapper);
        inputAdr = $('#wallet-address').val();
        inputPW = $('#password').val();

        if (Object.keys(authorizedUsers).includes(inputAdr) && authorizedUsers[inputAdr].password === inputPW && authorizedUsers[inputAdr].role === 'AgmOwner') {
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
        } else if (Object.keys(authorizedUsers).includes(inputAdr) && authorizedUsers[inputAdr].password === inputPW && authorizedUsers[inputAdr].role === 'Shareholder') {

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
        $('nav').hide();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uLy4uL3NyYy9hcHAvc2NyaXB0cy9tYW5hZ2VTUEEuanMiXSwibmFtZXMiOlsiY3JlYXRlQWxlcnQiLCJnZXRBY3RpdmVVc2VyU3RhdGUiLCJnZXRBY3RpdmVVc2VyQWRkcmVzcyIsInJlbW92ZVNlY29uZEFsZXJ0IiwiYXV0aG9yaXplZFVzZXJzIiwicGFzc3dvcmQiLCJyb2xlIiwibG9nZ2VkSW4iLCJpbnB1dEFkciIsImlucHV0UFciLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsInNob3dXZWxjb21lUGFnZSIsImhpZGUiLCJoaWRlVXNlckNyZWRlbnRpYWxzIiwiY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJhbGVydFdyYXBwZXIiLCJhcHBlbmQiLCJ2YWwiLCJPYmplY3QiLCJrZXlzIiwiaW5jbHVkZXMiLCJzaG93Iiwic2hvd1VzZXJDcmVkZW50aWFscyIsImh0bWwiLCJzaG93TG9nb3V0QnV0dG9uIiwic2hvd1ZpZXciLCJoaWRlTG9naW5GaWVsZHMiLCJhZGRDbGFzcyIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiYWxlcnQiLCJzaG93TG9naW5GaWVsZHMiLCJtZXNzYWdlIiwiYWxlcnRUeXBlIiwidmlld05hbWUiLCJldmVudCIsIkV2ZW50IiwiaG9tZUxpbmsiLCJnZXRFbGVtZW50QnlJZCIsImRpc3BhdGNoRXZlbnQiLCJ3ZWxjb21lTGluayIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibnVtT2ZBbGVydHMiLCJ3cmFwcGVyIiwicXVlcnlTZWxlY3RvciIsInJlbW92ZUNoaWxkIiwibGFzdENoaWxkIiwibWFpbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJuYXZMaW5rcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwiY2xhc3NOYW1lIiwicGFyZW50RWxlbWVudCIsImxvY2F0aW9uIiwiaGFzaCIsImdldEF0dHJpYnV0ZSIsInRyaW0iLCJzdWJzdHJpbmciLCJpbnNlcnRUZW1wbGF0ZSIsIndpbmRvdyIsInN0ckhhc2giLCJ0ZW1wbGF0ZUNvbnRlbnQiLCJjbGVhckNvbnRlbnRBcmVhIiwiY29udGVudCIsImFwcGVuZENoaWxkIiwiaW1wb3J0Tm9kZSIsImhhc0NoaWxkTm9kZXMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQzRCZ0JBLFcsR0FBQUEsVztRQXFEQUMsa0IsR0FBQUEsa0I7UUFJQUMsb0IsR0FBQUEsb0I7UUFJQUMsaUIsR0FBQUEsaUI7QUEzS2hCOztBQUVBLElBQUlDLGtCQUFrQjtBQUNsQixXQUFPLEVBQUNDLFVBQVUsUUFBWCxFQUFxQkMsTUFBTSxVQUEzQixFQUF1Q0MsVUFBVSxLQUFqRCxFQURXO0FBRWxCLFNBQUssRUFBQ0YsVUFBVSxLQUFYLEVBQWtCQyxNQUFN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QUF3QkFqQixTQUFLa0IsV0FBTCxDQUFpQjVELFNBQVM2RCxVQUFULENBQW9CSixlQUFwQixFQUFxQyxJQUFyQyxDQUFqQjtBQUNIOztBQUVELFNBQVNDLGdCQUFULEdBQTRCO0FBQ3hCLFdBQU9oQixLQUFLb0IsYUFBTCxFQUFQLEVBQTZCO0FBQ3pCcEIsYUFBS0YsV0FBTCxDQUFpQkUsS0FBS0QsU0FBdEI7QUFDSDtBQUNKLEMiLCJmaWxlIjoibWFuYWdlU1BBLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuLi9zcmMvYXBwL3NjcmlwdHMvbWFuYWdlU1BBLmpzXCIpO1xuIiwiLy9pbXBvcnQgd2ViM1Byb3ZpZGVyIGZyb20gJy4uLy4uL3Byb3ZpZGVyL3dlYjNQcm92aWRlcic7XHJcblxyXG52YXIgYXV0aG9yaXplZFVzZXJzID0ge1xyXG4gICAgJzB4MCc6IHtwYXNzd29yZDogJ21hc3RlcicsIHJvbGU6ICdBZ21Pd25lcicsIGxvZ2dlZEluOiBmYWxzZX0sXHJcbiAgICAnMCc6IHtwYXNzd29yZDogJzEyMycsIHJvbGU6ICdTaGFyZWhvbGRlcicsIGxvZ2dlZEluOiBmYWxzZX0sXHJcbiAgICAnMHg1RTM0MDdFNDQ3NTYzNzFCNEQzRGU4MEViNDM3OGI3MTVjNDQ0NjE5Jzoge3Bhc3N3b3JkOiAncHcyJywgcm9sZTogJ0RpcmVjdG9yJywgbG9nZ2VkSW46IGZhbHNlfVxyXG59O1xyXG52YXIgaW5wdXRBZHIsIGlucHV0UFc7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHsgXHJcblxyXG4gICAgc2hvd1dlbGNvbWVQYWdlKCk7XHJcbiAgICAvLyBoaWRlIGxvZ291dCBidXR0b24sIHdlbGNvbWUgbGluayBpbiBzaWRlYmFyIGFuZCB1c2VyIGNyZWRlbnRpYWxzXHJcbiAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmhpZGUoKTtcclxuICAgICQoJ25hdicpLmhpZGUoKTtcclxuICAgIFxyXG4gICAgLypjb25zdCBsaW5rcyA9ICQoJ3VsW2NsYXNzPVwibGlzdC11bnN0eWxlZCBjb21wb25lbnRzXCJdIGEnKTtcclxuICAgIGNvbnNvbGUubG9nKGxpbmtzKTtcclxuICAgICQuZWFjaChsaW5rcywgZnVuY3Rpb24oaW5kZXgsIHZhbCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4LCB2YWwpO1xyXG4gICAgICAgIC8vdmFsLmhpZGUoKTtcclxuICAgICAgICAvLyQoYCMke3ZhbC5hdHRyKCdpZCcpfWApLmhpZGUoKTtcclxuICAgIH0pKi9cclxuICAgIGhpZGVVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgIFxyXG5cclxuICAgICQoJyNsb2dpbi1idXR0b24nKS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBhbGVydFdyYXBwZXIgPSAkKCc8ZGl2IGlkPVwid3JhcHBlclwiPjwvZGl2PicpO1xyXG4gICAgICAgICQoJ2Zvb3RlcicpLmFwcGVuZChhbGVydFdyYXBwZXIpO1xyXG4gICAgICAgIGlucHV0QWRyID0gJCgnI3dhbGxldC1hZGRyZXNzJykudmFsKCk7XHJcbiAgICAgICAgaW5wdXRQVyA9ICQoJyNwYXNzd29yZCcpLnZhbCgpO1xyXG5cclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoYXV0aG9yaXplZFVzZXJzKS5pbmNsdWRlcyhpbnB1dEFkcikgXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucGFzc3dvcmQgPT09IGlucHV0UFdcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5yb2xlID09PSAnQWdtT3duZXInKSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiBhcyBBZ21Pd25lciEnKTtcclxuICAgICAgICAgICAgICAgICQoJ25hdicpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICQoJyNzZXR1cC1saW5rJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3dlbGNvbWUtbGluaycpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQoJyN2b3RpbmctbGluaycpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQoJyNxYS1saW5rJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1VzZXJDcmVkZW50aWFscygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJBZGRyZXNzJykuaHRtbCgnVXNlcjogJyArIGlucHV0QWRyKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyUm9sZScpLmh0bWwoJ1JvbGU6IEFnbU93bmVyJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93TG9nb3V0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICBzaG93VmlldygnaG9tZS1saW5rJyk7XHJcbiAgICAgICAgICAgICAgICBoaWRlTG9naW5GaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ubG9nZ2VkSW4gPSB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3Qua2V5cyhhdXRob3JpemVkVXNlcnMpLmluY2x1ZGVzKGlucHV0QWRyKSBcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5wYXNzd29yZCA9PT0gaW5wdXRQVyBcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5yb2xlID09PSAnU2hhcmVob2xkZXInKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWxlcnQoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4gYXMgU2hhcmVob2xkZXIhJyk7XHJcbiAgICAgICAgICAgICAgICAkKCduYXYnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdm90aW5nLWxpbmsnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjc2V0dXAtbGluaycpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQoJyN3ZWxjb21lLWxpbmsnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBzaG93VXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlckFkZHJlc3MnKS5odG1sKCdVc2VyOiAnICsgaW5wdXRBZHIpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJSb2xlJykuaHRtbCgnUm9sZTogU2hhcmVob2xkZXInKTtcclxuICAgICAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIHNob3dWaWV3KCdob21lLWxpbmsnKTtcclxuICAgICAgICAgICAgICAgIGhpZGVMb2dpbkZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5sb2dnZWRJbiA9IHRydWU7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMoYXV0aG9yaXplZFVzZXJzKS5pbmNsdWRlcyhpbnB1dEFkcilcclxuICAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vycy5pbnB1dEFkci5wYXNzd29yZCA9PT0gaW5wdXRQV1xyXG4gICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzLmlucHV0QWRyLnJvbGUgPT09ICdEaXJlY3RvcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiBhcyBEaXJlY3RvciEnKTtcclxuICAgICAgICAgICAgICAgIHNob3dVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyQWRkcmVzcycpLmh0bWwoJ1VzZXI6ICcgKyBpbnB1dEFkcik7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlclJvbGUnKS5odG1sKCdSb2xlOiBEaXJlY3RvcicpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0xvZ291dEJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1ZpZXcoJ2hvbWUtbGluaycpO1xyXG4gICAgICAgICAgICAgICAgaGlkZUxvZ2luRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI3dyYXBwZXInKS5hcHBlbmQoYDxkaXYgcm9sZT1cImFsZXJ0XCI+TG9naW4gZmFpbGVkITwvZGl2PmApXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FsZXJ0IGFsZXJ0LWRhbmdlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygkKCcjd3JhcHBlciBkaXYnKS5sZW5ndGgpO1xyXG4gICAgICAgIHJlbW92ZVNlY29uZEFsZXJ0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJCgnI3dyYXBwZXInKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coYXV0aG9yaXplZFVzZXJzKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJ25hdicpLmhpZGUoKTtcclxuICAgICAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmhpZGUoKTtcclxuICAgICAgICAkKCcjbG9naW4tYnV0dG9uJykuc2hvdygpO1xyXG4gICAgICAgIHNob3dXZWxjb21lUGFnZSgpO1xyXG4gICAgICAgIGhpZGVVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICBzaG93TG9naW5GaWVsZHMoKTtcclxuICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXV0aG9yaXplZFVzZXJzKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFsZXJ0KG1lc3NhZ2UsIGFsZXJ0VHlwZSA9ICdzdWNjZXNzJykge1xyXG4gICAgJCgnI3dyYXBwZXInKS5hcHBlbmQoYDxkaXYgcm9sZT1cImFsZXJ0XCI+JHttZXNzYWdlfTwvZGl2PmApXHJcbiAgICAgICAgLmFkZENsYXNzKGBhbGVydCBhbGVydC0ke2FsZXJ0VHlwZX1gKTtcclxuXHJcbiAgICAvKmlmIChhbGVydFR5cGUgPT09ICdkYW5nZXInKSB7XHJcbiAgICAgICAgY29uc3QgYUxpbmtzID0gJCgnYScpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYUxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhTGlua3NbaV0uYXR0cignY2xhc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgJCgnYScpW2ldLmF0dHIoJ2NsYXNzJywgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSovXHJcbiAgICAvLyQoJ2FbaHJlZj1cIiNob21lXCJdJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dVc2VyQ3JlZGVudGlhbHMoKSB7XHJcbiAgICAkKCcjdXNlckFkZHJlc3MnKS5zaG93KCk7XHJcbiAgICAkKCcjdXNlclJvbGUnKS5zaG93KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVVc2VyQ3JlZGVudGlhbHMoKSB7XHJcbiAgICAkKCcjdXNlckFkZHJlc3MnKS5oaWRlKCk7XHJcbiAgICAkKCcjdXNlclJvbGUnKS5oaWRlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVMb2dpbkZpZWxkcygpIHtcclxuICAgICQoJyNhZGRyZXNzLWxhYmVsJykuaGlkZSgpO1xyXG4gICAgJCgnI3Bhc3N3b3JkLWxhYmVsJykuaGlkZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93TG9naW5GaWVsZHMoKSB7XHJcbiAgICAkKCcjYWRkcmVzcy1sYWJlbCcpLnNob3coKTtcclxuICAgICQoJyNwYXNzd29yZC1sYWJlbCcpLnNob3coKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1ZpZXcodmlld05hbWUpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCdjbGljaycpO1xyXG4gICAgY29uc3QgaG9tZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWV3TmFtZSk7XHJcbiAgICBob21lTGluay5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0xvZ291dEJ1dHRvbigpIHtcclxuICAgICQoJyNsb2dvdXQtYnV0dG9uJykuc2hvdygpO1xyXG4gICAgJCgnI2xvZ2luLWJ1dHRvbicpLmhpZGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1dlbGNvbWVQYWdlKCkge1xyXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ2NsaWNrJyk7XHJcbiAgICBjb25zdCB3ZWxjb21lTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylbMF07XHJcbiAgICB3ZWxjb21lTGluay5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZVVzZXJTdGF0ZSgpIHtcclxuICAgIHJldHVybiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdIHx8IHtsb2dnZWRJbjogZmFsc2V9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlVXNlckFkZHJlc3MoKSB7XHJcbiAgICByZXR1cm4gaW5wdXRBZHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVTZWNvbmRBbGVydCgpIHtcclxuICAgIHZhciBudW1PZkFsZXJ0cyA9ICQoJyN3cmFwcGVyIGRpdicpLmxlbmd0aDtcclxuICAgICAgICBpZiAobnVtT2ZBbGVydHMgPiAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3JhcHBlcicpOyBcclxuICAgICAgICAgICAgd3JhcHBlci5yZW1vdmVDaGlsZCh3cmFwcGVyLmxhc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG59IiwiaW1wb3J0IHtnZXRBY3RpdmVVc2VyU3RhdGUsIHJlbW92ZVNlY29uZEFsZXJ0LCBjcmVhdGVBbGVydH0gZnJvbSAnLi9hdXRoZW50aWNhdGlvbic7XHJcblxyXG52YXIgbWFpbjtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjc2lkZWJhciBhXCIpO1xyXG4gICAgY29uc29sZS5sb2cobmF2TGlua3MpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYXZMaW5rcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG5hdkxpbmtzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibGkuYWN0aXZlXCIpLmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5jbGFzc05hbWUgPSBcImFjdGl2ZVwiO1xyXG5cclxuICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsb2NhdGlvbi5oYXNoLnRyaW0oKS5zdWJzdHJpbmcoMSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgIFxyXG59KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcclxuICAgIGluc2VydFRlbXBsYXRlKGxvY2F0aW9uLmhhc2gudHJpbSgpLnN1YnN0cmluZygxKSk7XHJcbn0pO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgaW5zZXJ0VGVtcGxhdGUobG9jYXRpb24uaGFzaC50cmltKCkuc3Vic3RyaW5nKDEpKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRUZW1wbGF0ZShzdHJIYXNoKSB7XHJcbiAgICBcclxuICAgIGlmICghZ2V0QWN0aXZlVXNlclN0YXRlKCkubG9nZ2VkSW4gJiYgc3RySGFzaCAhPT0gJ3dlbGNvbWUnKSB7XHJcbiAgICAgICAgY29uc3QgYWxlcnRXcmFwcGVyID0gJCgnPGRpdiBpZD1cIndyYXBwZXJcIj48L2Rpdj4nKTtcclxuICAgICAgICAkKCdmb290ZXInKS5hcHBlbmQoYWxlcnRXcmFwcGVyKTtcclxuICAgICAgICBjcmVhdGVBbGVydCgnUGxlYXNlIGxvZyBpbiBmaXJzdCB0byBhY2Nlc3Mgb3RoZXIgQUdNIGZlYXR1cmVzJywgJ2RhbmdlcicpO1xyXG4gICAgICAgIHJlbW92ZVNlY29uZEFsZXJ0KCk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgIC8vJChcImxpLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJycpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIHRlbXBsYXRlQ29udGVudDtcclxuXHJcbiAgICBzdHJIYXNoID0gc3RySGFzaCB8fCBcIndlbGNvbWVcIjtcclxuXHJcbiAgICBjbGVhckNvbnRlbnRBcmVhKCk7XHJcblxyXG4gICAgc3dpdGNoIChzdHJIYXNoKSB7XHJcbiAgICAgICAgY2FzZSBcIndlbGNvbWVcIjpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWxjb21lLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJob21lXCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG9tZS10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwic2V0dXBcIjpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZXR1cC10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwidm90aW5nXCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidm90aW5nLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJRJkFcIjpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRYW5kQS10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwibGlzdFwiOlxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlFhbmRBLWxpc3QtdGVtcGxhdGVcIikuY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob21lLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIG1haW4uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZUNvbnRlbnQsIHRydWUpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJDb250ZW50QXJlYSgpIHtcclxuICAgIHdoaWxlIChtYWluLmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgIG1haW4ucmVtb3ZlQ2hpbGQobWFpbi5sYXN0Q2hpbGQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=