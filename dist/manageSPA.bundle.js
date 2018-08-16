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
    '0': { password: '123', role: 'Shareholder', loggedIn: false, shares: 20 },
    '0x5E3407E44756371B4D3De80Eb4378b715c444619': { password: 'pw2', role: 'Director', loggedIn: false, shares: 0 }
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

exports.default = authorizedUsers;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uLy4uL3NyYy9hcHAvc2NyaXB0cy9tYW5hZ2VTUEEuanMiXSwibmFtZXMiOlsiY3JlYXRlQWxlcnQiLCJnZXRBY3RpdmVVc2VyU3RhdGUiLCJnZXRBY3RpdmVVc2VyQWRkcmVzcyIsInJlbW92ZVNlY29uZEFsZXJ0IiwiYXV0aG9yaXplZFVzZXJzIiwicGFzc3dvcmQiLCJyb2xlIiwibG9nZ2VkSW4iLCJzaGFyZXMiLCJpbnB1dEFkciIsImlucHV0UFciLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsInNob3dXZWxjb21lUGFnZSIsImhpZGUiLCJoaWRlVXNlckNyZWRlbnRpYWxzIiwiY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJhbGVydFdyYXBwZXIiLCJhcHBlbmQiLCJ2YWwiLCJPYmplY3QiLCJrZXlzIiwiaW5jbHVkZXMiLCJzaG93Iiwic2hvd1VzZXJDcmVkZW50aWFscyIsImh0bWwiLCJzaG93TG9nb3V0QnV0dG9uIiwic2hvd1ZpZXciLCJoaWRlTG9naW5GaWVsZHMiLCJhZGRDbGFzcyIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiYWxlcnQiLCJzaG93TG9naW5GaWVsZHMiLCJtZXNzYWdlIiwiYWxlcnRUeXBlIiwidmlld05hbWUiLCJldmVudCIsIkV2ZW50IiwiaG9tZUxpbmsiLCJnZXRFbGVtZW50QnlJZCIsImRpc3BhdGNoRXZlbnQiLCJ3ZWxjb21lTGluayIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibnVtT2ZBbGVydHMiLCJ3cmFwcGVyIiwicXVlcnlTZWxlY3RvciIsInJlbW92ZUNoaWxkIiwibGFzdENoaWxkIiwibWFpbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJuYXZMaW5rcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwiY2xhc3NOYW1lIiwicGFyZW50RWxlbWVudCIsImxvY2F0aW9uIiwiaGFzaCIsImdldEF0dHJpYnV0ZSIsInRyaW0iLCJzdWJzdHJpbmciLCJpbnNlcnRUZW1wbGF0ZSIsIndpbmRvdyIsInN0ckhhc2giLCJ0ZW1wbGF0ZUNvbnRlbnQiLCJjbGVhckNvbnRlbnRBcmVhIiwiY29udGVudCIsImFwcGVuZENoaWxkIiwiaW1wb3J0Tm9kZSIsImhhc0NoaWxkTm9kZXMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQzRCZ0JBLFcsR0FBQUEsVztRQXFEQUMsa0IsR0FBQUEsa0I7UUFJQUMsb0IsR0FBQUEsb0I7UUFJQUMsaUIsR0FBQUEsaUI7QUEzS2hCOztBQUVBLElBQUlDLGtCQUFrQjtBQUNsQixXQUFPLEVBQUNDLFVBQVUsUUFBWCxFQUFxQkMsTUFBTSxVQUEzQixFQUF1Q0MsVUFBVSxLQUFqRCxFQURXO0FBRWxCLFNBQUssRUFBQ0YsVUFBVSxLQUFYLEVB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QUFrQnpELFNBQVNpQyxjQUFULENBQXdCLGVBQXhCLEVBQXlDMEIsT0FBM0Q7QUFDQTtBQXJCUjs7QUF3QkFqQixTQUFLa0IsV0FBTCxDQUFpQjVELFNBQVM2RCxVQUFULENBQW9CSixlQUFwQixFQUFxQyxJQUFyQyxDQUFqQjtBQUNIOztBQUVELFNBQVNDLGdCQUFULEdBQTRCO0FBQ3hCLFdBQU9oQixLQUFLb0IsYUFBTCxFQUFQLEVBQTZCO0FBQ3pCcEIsYUFBS0YsV0FBTCxDQUFpQkUsS0FBS0QsU0FBdEI7QUFDSDtBQUNKLEMiLCJmaWxlIjoibWFuYWdlU1BBLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuLi9zcmMvYXBwL3NjcmlwdHMvbWFuYWdlU1BBLmpzXCIpO1xuIiwiLy9pbXBvcnQgd2ViM1Byb3ZpZGVyIGZyb20gJy4uLy4uL3Byb3ZpZGVyL3dlYjNQcm92aWRlcic7XHJcblxyXG52YXIgYXV0aG9yaXplZFVzZXJzID0ge1xyXG4gICAgJzB4MCc6IHtwYXNzd29yZDogJ21hc3RlcicsIHJvbGU6ICdBZ21Pd25lcicsIGxvZ2dlZEluOiBmYWxzZX0sXHJcbiAgICAnMCc6IHtwYXNzd29yZDogJzEyMycsIHJvbGU6ICdTaGFyZWhvbGRlcicsIGxvZ2dlZEluOiBmYWxzZSwgc2hhcmVzOiAyMH0sXHJcbiAgICAnMHg1RTM0MDdFNDQ3NTYzNzFCNEQzRGU4MEViNDM3OGI3MTVjNDQ0NjE5Jzoge3Bhc3N3b3JkOiAncHcyJywgcm9sZTogJ0RpcmVjdG9yJywgbG9nZ2VkSW46IGZhbHNlLCBzaGFyZXM6IDB9XHJcbn07XHJcbnZhciBpbnB1dEFkciwgaW5wdXRQVztcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkgeyBcclxuXHJcbiAgICBzaG93V2VsY29tZVBhZ2UoKTtcclxuICAgIC8vIGhpZGUgbG9nb3V0IGJ1dHRvbiwgd2VsY29tZSBsaW5rIGluIHNpZGViYXIgYW5kIHVzZXIgY3JlZGVudGlhbHNcclxuICAgICQoJyNsb2dvdXQtYnV0dG9uJykuaGlkZSgpO1xyXG4gICAgJCgnbmF2JykuaGlkZSgpO1xyXG4gICAgXHJcbiAgICAvKmNvbnN0IGxpbmtzID0gJCgndWxbY2xhc3M9XCJsaXN0LXVuc3R5bGVkIGNvbXBvbmVudHNcIl0gYScpO1xyXG4gICAgY29uc29sZS5sb2cobGlua3MpO1xyXG4gICAgJC5lYWNoKGxpbmtzLCBmdW5jdGlvbihpbmRleCwgdmFsKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXgsIHZhbCk7XHJcbiAgICAgICAgLy92YWwuaGlkZSgpO1xyXG4gICAgICAgIC8vJChgIyR7dmFsLmF0dHIoJ2lkJyl9YCkuaGlkZSgpO1xyXG4gICAgfSkqL1xyXG4gICAgaGlkZVVzZXJDcmVkZW50aWFscygpO1xyXG4gICAgXHJcblxyXG4gICAgJCgnI2xvZ2luLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFsZXJ0V3JhcHBlciA9ICQoJzxkaXYgaWQ9XCJ3cmFwcGVyXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgJCgnZm9vdGVyJykuYXBwZW5kKGFsZXJ0V3JhcHBlcik7XHJcbiAgICAgICAgaW5wdXRBZHIgPSAkKCcjd2FsbGV0LWFkZHJlc3MnKS52YWwoKTtcclxuICAgICAgICBpbnB1dFBXID0gJCgnI3Bhc3N3b3JkJykudmFsKCk7XHJcblxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhhdXRob3JpemVkVXNlcnMpLmluY2x1ZGVzKGlucHV0QWRyKSBcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5wYXNzd29yZCA9PT0gaW5wdXRQV1xyXG4gICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLnJvbGUgPT09ICdBZ21Pd25lcicpIHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUFsZXJ0KCdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgbG9nZ2VkIGluIGFzIEFnbU93bmVyIScpO1xyXG4gICAgICAgICAgICAgICAgJCgnbmF2Jykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3NldHVwLWxpbmsnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjd2VsY29tZS1saW5rJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3ZvdGluZy1saW5rJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3FhLWxpbmsnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBzaG93VXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlckFkZHJlc3MnKS5odG1sKCdVc2VyOiAnICsgaW5wdXRBZHIpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJSb2xlJykuaHRtbCgnUm9sZTogQWdtT3duZXInKTtcclxuICAgICAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIHNob3dWaWV3KCdob21lLWxpbmsnKTtcclxuICAgICAgICAgICAgICAgIGhpZGVMb2dpbkZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5sb2dnZWRJbiA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKGF1dGhvcml6ZWRVc2VycykuaW5jbHVkZXMoaW5wdXRBZHIpIFxyXG4gICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLnBhc3N3b3JkID09PSBpbnB1dFBXIFxyXG4gICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLnJvbGUgPT09ICdTaGFyZWhvbGRlcicpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiBhcyBTaGFyZWhvbGRlciEnKTtcclxuICAgICAgICAgICAgICAgICQoJ25hdicpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICQoJyN2b3RpbmctbGluaycpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICQoJyNzZXR1cC1saW5rJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3dlbGNvbWUtbGluaycpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIHNob3dVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyQWRkcmVzcycpLmh0bWwoJ1VzZXI6ICcgKyBpbnB1dEFkcik7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlclJvbGUnKS5odG1sKCdSb2xlOiBTaGFyZWhvbGRlcicpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0xvZ291dEJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1ZpZXcoJ2hvbWUtbGluaycpO1xyXG4gICAgICAgICAgICAgICAgaGlkZUxvZ2luRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3Qua2V5cyhhdXRob3JpemVkVXNlcnMpLmluY2x1ZGVzKGlucHV0QWRyKVxyXG4gICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzLmlucHV0QWRyLnBhc3N3b3JkID09PSBpbnB1dFBXXHJcbiAgICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnMuaW5wdXRBZHIucm9sZSA9PT0gJ0RpcmVjdG9yJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGNyZWF0ZUFsZXJ0KCdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgbG9nZ2VkIGluIGFzIERpcmVjdG9yIScpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1VzZXJDcmVkZW50aWFscygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJBZGRyZXNzJykuaHRtbCgnVXNlcjogJyArIGlucHV0QWRyKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyUm9sZScpLmh0bWwoJ1JvbGU6IERpcmVjdG9yJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93TG9nb3V0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICBzaG93VmlldygnaG9tZS1saW5rJyk7XHJcbiAgICAgICAgICAgICAgICBoaWRlTG9naW5GaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ubG9nZ2VkSW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjd3JhcHBlcicpLmFwcGVuZChgPGRpdiByb2xlPVwiYWxlcnRcIj5Mb2dpbiBmYWlsZWQhPC9kaXY+YClcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYWxlcnQgYWxlcnQtZGFuZ2VyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCQoJyN3cmFwcGVyIGRpdicpLmxlbmd0aCk7XHJcbiAgICAgICAgcmVtb3ZlU2Vjb25kQWxlcnQoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygkKCcjd3JhcHBlcicpKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhhdXRob3JpemVkVXNlcnMpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNsb2dvdXQtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnbmF2JykuaGlkZSgpO1xyXG4gICAgICAgICQoJyNsb2dvdXQtYnV0dG9uJykuaGlkZSgpO1xyXG4gICAgICAgICQoJyNsb2dpbi1idXR0b24nKS5zaG93KCk7XHJcbiAgICAgICAgc2hvd1dlbGNvbWVQYWdlKCk7XHJcbiAgICAgICAgaGlkZVVzZXJDcmVkZW50aWFscygpO1xyXG4gICAgICAgIHNob3dMb2dpbkZpZWxkcygpO1xyXG4gICAgICAgIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ubG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhhdXRob3JpemVkVXNlcnMpO1xyXG5cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWxlcnQobWVzc2FnZSwgYWxlcnRUeXBlID0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAkKCcjd3JhcHBlcicpLmFwcGVuZChgPGRpdiByb2xlPVwiYWxlcnRcIj4ke21lc3NhZ2V9PC9kaXY+YClcclxuICAgICAgICAuYWRkQ2xhc3MoYGFsZXJ0IGFsZXJ0LSR7YWxlcnRUeXBlfWApO1xyXG5cclxuICAgIC8qaWYgKGFsZXJ0VHlwZSA9PT0gJ2RhbmdlcicpIHtcclxuICAgICAgICBjb25zdCBhTGlua3MgPSAkKCdhJyk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhTGlua3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFMaW5rc1tpXS5hdHRyKCdjbGFzcycpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdhJylbaV0uYXR0cignY2xhc3MnLCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuICAgIC8vJCgnYVtocmVmPVwiI2hvbWVcIl0nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICBcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1VzZXJDcmVkZW50aWFscygpIHtcclxuICAgICQoJyN1c2VyQWRkcmVzcycpLnNob3coKTtcclxuICAgICQoJyN1c2VyUm9sZScpLnNob3coKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZVVzZXJDcmVkZW50aWFscygpIHtcclxuICAgICQoJyN1c2VyQWRkcmVzcycpLmhpZGUoKTtcclxuICAgICQoJyN1c2VyUm9sZScpLmhpZGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZUxvZ2luRmllbGRzKCkge1xyXG4gICAgJCgnI2FkZHJlc3MtbGFiZWwnKS5oaWRlKCk7XHJcbiAgICAkKCcjcGFzc3dvcmQtbGFiZWwnKS5oaWRlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dMb2dpbkZpZWxkcygpIHtcclxuICAgICQoJyNhZGRyZXNzLWxhYmVsJykuc2hvdygpO1xyXG4gICAgJCgnI3Bhc3N3b3JkLWxhYmVsJykuc2hvdygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93Vmlldyh2aWV3TmFtZSkge1xyXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ2NsaWNrJyk7XHJcbiAgICBjb25zdCBob21lTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZpZXdOYW1lKTtcclxuICAgIGhvbWVMaW5rLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93TG9nb3V0QnV0dG9uKCkge1xyXG4gICAgJCgnI2xvZ291dC1idXR0b24nKS5zaG93KCk7XHJcbiAgICAkKCcjbG9naW4tYnV0dG9uJykuaGlkZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93V2VsY29tZVBhZ2UoKSB7XHJcbiAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCgnY2xpY2snKTtcclxuICAgIGNvbnN0IHdlbGNvbWVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKVswXTtcclxuICAgIHdlbGNvbWVMaW5rLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlVXNlclN0YXRlKCkge1xyXG4gICAgcmV0dXJuIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0gfHwge2xvZ2dlZEluOiBmYWxzZX07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVVc2VyQWRkcmVzcygpIHtcclxuICAgIHJldHVybiBpbnB1dEFkcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVNlY29uZEFsZXJ0KCkge1xyXG4gICAgdmFyIG51bU9mQWxlcnRzID0gJCgnI3dyYXBwZXIgZGl2JykubGVuZ3RoO1xyXG4gICAgICAgIGlmIChudW1PZkFsZXJ0cyA+IDEpIHtcclxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cmFwcGVyJyk7IFxyXG4gICAgICAgICAgICB3cmFwcGVyLnJlbW92ZUNoaWxkKHdyYXBwZXIubGFzdENoaWxkKTtcclxuICAgICAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGF1dGhvcml6ZWRVc2VyczsiLCJpbXBvcnQge2dldEFjdGl2ZVVzZXJTdGF0ZSwgcmVtb3ZlU2Vjb25kQWxlcnQsIGNyZWF0ZUFsZXJ0fSBmcm9tICcuL2F1dGhlbnRpY2F0aW9uJztcclxuXHJcbnZhciBtYWluO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNzaWRlYmFyIGFcIik7XHJcbiAgICBjb25zb2xlLmxvZyhuYXZMaW5rcyk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hdkxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbmF2TGlua3NbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsaS5hY3RpdmVcIikuY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZSA9IFwiYWN0aXZlXCI7XHJcblxyXG4gICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdldEF0dHJpYnV0ZShcImhyZWZcIikpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY2F0aW9uLmhhc2gudHJpbSgpLnN1YnN0cmluZygxKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgXHJcbn0pO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xyXG4gICAgaW5zZXJ0VGVtcGxhdGUobG9jYXRpb24uaGFzaC50cmltKCkuc3Vic3RyaW5nKDEpKTtcclxufSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICBpbnNlcnRUZW1wbGF0ZShsb2NhdGlvbi5oYXNoLnRyaW0oKS5zdWJzdHJpbmcoMSkpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGluc2VydFRlbXBsYXRlKHN0ckhhc2gpIHtcclxuICAgIFxyXG4gICAgaWYgKCFnZXRBY3RpdmVVc2VyU3RhdGUoKS5sb2dnZWRJbiAmJiBzdHJIYXNoICE9PSAnd2VsY29tZScpIHtcclxuICAgICAgICBjb25zdCBhbGVydFdyYXBwZXIgPSAkKCc8ZGl2IGlkPVwid3JhcHBlclwiPjwvZGl2PicpO1xyXG4gICAgICAgICQoJ2Zvb3RlcicpLmFwcGVuZChhbGVydFdyYXBwZXIpO1xyXG4gICAgICAgIGNyZWF0ZUFsZXJ0KCdQbGVhc2UgbG9nIGluIGZpcnN0IHRvIGFjY2VzcyBvdGhlciBBR00gZmVhdHVyZXMnLCAnZGFuZ2VyJyk7XHJcbiAgICAgICAgcmVtb3ZlU2Vjb25kQWxlcnQoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAgICAgLy8kKFwibGkuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5hZGRDbGFzcygnJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2YXIgdGVtcGxhdGVDb250ZW50O1xyXG5cclxuICAgIHN0ckhhc2ggPSBzdHJIYXNoIHx8IFwid2VsY29tZVwiO1xyXG5cclxuICAgIGNsZWFyQ29udGVudEFyZWEoKTtcclxuXHJcbiAgICBzd2l0Y2ggKHN0ckhhc2gpIHtcclxuICAgICAgICBjYXNlIFwid2VsY29tZVwiOlxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlbGNvbWUtdGVtcGxhdGVcIikuY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImhvbWVcIjpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob21lLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJzZXR1cFwiOlxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNldHVwLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJ2b3RpbmdcIjpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2b3RpbmctdGVtcGxhdGVcIikuY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIlEmQVwiOlxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlFhbmRBLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJsaXN0XCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUWFuZEEtbGlzdC10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvbWUtdGVtcGxhdGVcIikuY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgbWFpbi5hcHBlbmRDaGlsZChkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlQ29udGVudCwgdHJ1ZSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckNvbnRlbnRBcmVhKCkge1xyXG4gICAgd2hpbGUgKG1haW4uaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICAgICAgbWFpbi5yZW1vdmVDaGlsZChtYWluLmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==