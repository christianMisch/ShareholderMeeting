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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uLy4uL3NyYy9hcHAvc2NyaXB0cy9tYW5hZ2VTUEEuanMiXSwibmFtZXMiOlsiY3JlYXRlQWxlcnQiLCJnZXRBY3RpdmVVc2VyU3RhdGUiLCJnZXRBY3RpdmVVc2VyQWRkcmVzcyIsInJlbW92ZVNlY29uZEFsZXJ0IiwiYXV0aG9yaXplZFVzZXJzIiwicGFzc3dvcmQiLCJyb2xlIiwibG9nZ2VkSW4iLCJpbnB1dEFkciIsImlucHV0UFciLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsInNob3dXZWxjb21lUGFnZSIsImhpZGUiLCJoaWRlVXNlckNyZWRlbnRpYWxzIiwiY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJhbGVydFdyYXBwZXIiLCJhcHBlbmQiLCJ2YWwiLCJPYmplY3QiLCJrZXlzIiwiaW5jbHVkZXMiLCJzaG93Iiwic2hvd1VzZXJDcmVkZW50aWFscyIsImh0bWwiLCJzaG93TG9nb3V0QnV0dG9uIiwic2hvd1ZpZXciLCJoaWRlTG9naW5GaWVsZHMiLCJhZGRDbGFzcyIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiYWxlcnQiLCJzaG93TG9naW5GaWVsZHMiLCJtZXNzYWdlIiwiYWxlcnRUeXBlIiwidmlld05hbWUiLCJldmVudCIsIkV2ZW50IiwiaG9tZUxpbmsiLCJnZXRFbGVtZW50QnlJZCIsImRpc3BhdGNoRXZlbnQiLCJ3ZWxjb21lTGluayIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibnVtT2ZBbGVydHMiLCJ3cmFwcGVyIiwicXVlcnlTZWxlY3RvciIsInJlbW92ZUNoaWxkIiwibGFzdENoaWxkIiwibWFpbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJuYXZMaW5rcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwiY2xhc3NOYW1lIiwicGFyZW50RWxlbWVudCIsImxvY2F0aW9uIiwiaGFzaCIsImdldEF0dHJpYnV0ZSIsInRyaW0iLCJzdWJzdHJpbmciLCJpbnNlcnRUZW1wbGF0ZSIsIndpbmRvdyIsInN0ckhhc2giLCJ0ZW1wbGF0ZUNvbnRlbnQiLCJjbGVhckNvbnRlbnRBcmVhIiwiY29udGVudCIsImFwcGVuZENoaWxkIiwiaW1wb3J0Tm9kZSIsImhhc0NoaWxkTm9kZXMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQzJCZ0JBLFcsR0FBQUEsVztRQXFEQUMsa0IsR0FBQUEsa0I7UUFJQUMsb0IsR0FBQUEsb0I7UUFJQUMsaUIsR0FBQUEsaUI7QUExS2hCOztBQUVBLElBQUlDLGtCQUFrQjtBQUNsQixXQUFPLEVBQUNDLFVBQVUsUUFBWCxFQUFxQkMsTUFBTSxVQUEzQixFQUF1Q0MsVUFBVSxLQUFqRCxFQURXO0FBRWxCLGtEQUE4QyxFQUFDRixVQUFVLEtBQVgsRUFBa0JDLE1B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RCxTQUFTNkQsVUFBVCxDQUFvQkosZUFBcEIsRUFBcUMsSUFBckMsQ0FBakI7QUFDSDs7QUFFRCxTQUFTQyxnQkFBVCxHQUE0QjtBQUN4QixXQUFPaEIsS0FBS29CLGFBQUwsRUFBUCxFQUE2QjtBQUN6QnBCLGFBQUtGLFdBQUwsQ0FBaUJFLEtBQUtELFNBQXRCO0FBQ0g7QUFDSixDIiwiZmlsZSI6Im1hbmFnZVNQQS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi4vc3JjL2FwcC9zY3JpcHRzL21hbmFnZVNQQS5qc1wiKTtcbiIsIi8vaW1wb3J0IHdlYjNQcm92aWRlciBmcm9tICcuLi8uLi9wcm92aWRlci93ZWIzUHJvdmlkZXInO1xyXG5cclxudmFyIGF1dGhvcml6ZWRVc2VycyA9IHtcclxuICAgICcweDAnOiB7cGFzc3dvcmQ6ICdtYXN0ZXInLCByb2xlOiAnQWdtT3duZXInLCBsb2dnZWRJbjogZmFsc2V9LFxyXG4gICAgJzB4NzJjY2NEQkNGYjQ2NGEyNDBjMDI1OTY5YmI5QmI4MURhMDM5MmE5MCc6IHtwYXNzd29yZDogJ3B3MScsIHJvbGU6ICdTaGFyZWhvbGRlcicsIGxvZ2dlZEluOiBmYWxzZX0sXHJcbiAgICAnMHg1RTM0MDdFNDQ3NTYzNzFCNEQzRGU4MEViNDM3OGI3MTVjNDQ0NjE5Jzoge3Bhc3N3b3JkOiAncHcyJywgcm9sZTogJ0RpcmVjdG9yJywgbG9nZ2VkSW46IGZhbHNlfVxyXG59O1xyXG52YXIgaW5wdXRBZHIsIGlucHV0UFc7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHsgXHJcblxyXG4gICAgc2hvd1dlbGNvbWVQYWdlKCk7XHJcbiAgICAvLyBoaWRlIGxvZ291dCBidXR0b24sIHdlbGNvbWUgbGluayBpbiBzaWRlYmFyIGFuZCB1c2VyIGNyZWRlbnRpYWxzXHJcbiAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmhpZGUoKTtcclxuICAgICQoJ25hdicpLmhpZGUoKTtcclxuICAgIFxyXG4gICAgLypjb25zdCBsaW5rcyA9ICQoJ3VsW2NsYXNzPVwibGlzdC11bnN0eWxlZCBjb21wb25lbnRzXCJdIGEnKTtcclxuICAgIGNvbnNvbGUubG9nKGxpbmtzKTtcclxuICAgICQuZWFjaChsaW5rcywgZnVuY3Rpb24oaW5kZXgsIHZhbCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4LCB2YWwpO1xyXG4gICAgICAgIC8vdmFsLmhpZGUoKTtcclxuICAgICAgICAvLyQoYCMke3ZhbC5hdHRyKCdpZCcpfWApLmhpZGUoKTtcclxuICAgIH0pKi9cclxuICAgIGhpZGVVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgIFxyXG5cclxuICAgICQoJyNsb2dpbi1idXR0b24nKS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBhbGVydFdyYXBwZXIgPSAkKCc8ZGl2IGlkPVwid3JhcHBlclwiPjwvZGl2PicpO1xyXG4gICAgICAgICQoJ2Zvb3RlcicpLmFwcGVuZChhbGVydFdyYXBwZXIpO1xyXG4gICAgICAgIGlucHV0QWRyID0gJCgnI3dhbGxldC1hZGRyZXNzJykudmFsKCk7XHJcbiAgICAgICAgaW5wdXRQVyA9ICQoJyNwYXNzd29yZCcpLnZhbCgpO1xyXG5cclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoYXV0aG9yaXplZFVzZXJzKS5pbmNsdWRlcyhpbnB1dEFkcikgXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucGFzc3dvcmQgPT09IGlucHV0UFdcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5yb2xlID09PSAnQWdtT3duZXInKSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiBhcyBBZ21Pd25lciEnKTtcclxuICAgICAgICAgICAgICAgICQoJ25hdicpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICQoJyN3ZWxjb21lLWxpbmsnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdm90aW5nLWxpbmsnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjcWEtbGluaycpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIHNob3dVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyQWRkcmVzcycpLmh0bWwoJ1VzZXI6ICcgKyBpbnB1dEFkcik7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlclJvbGUnKS5odG1sKCdSb2xlOiBBZ21Pd25lcicpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0xvZ291dEJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1ZpZXcoJ2hvbWUtbGluaycpO1xyXG4gICAgICAgICAgICAgICAgaGlkZUxvZ2luRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMoYXV0aG9yaXplZFVzZXJzKS5pbmNsdWRlcyhpbnB1dEFkcikgXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucGFzc3dvcmQgPT09IGlucHV0UFcgXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucm9sZSA9PT0gJ1NoYXJlaG9sZGVyJykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUFsZXJ0KCdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgbG9nZ2VkIGluIGFzIFNoYXJlaG9sZGVyIScpO1xyXG4gICAgICAgICAgICAgICAgJCgnbmF2Jykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3ZvdGluZy1saW5rJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3NldHVwLWxpbmsnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjd2VsY29tZS1saW5rJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1VzZXJDcmVkZW50aWFscygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJBZGRyZXNzJykuaHRtbCgnVXNlcjogJyArIGlucHV0QWRyKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyUm9sZScpLmh0bWwoJ1JvbGU6IFNoYXJlaG9sZGVyJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93TG9nb3V0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICBzaG93VmlldygnaG9tZS1saW5rJyk7XHJcbiAgICAgICAgICAgICAgICBoaWRlTG9naW5GaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ubG9nZ2VkSW4gPSB0cnVlO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKGF1dGhvcml6ZWRVc2VycykuaW5jbHVkZXMoaW5wdXRBZHIpXHJcbiAgICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnMuaW5wdXRBZHIucGFzc3dvcmQgPT09IGlucHV0UFdcclxuICAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vycy5pbnB1dEFkci5yb2xlID09PSAnRGlyZWN0b3InKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWxlcnQoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4gYXMgRGlyZWN0b3IhJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93VXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlckFkZHJlc3MnKS5odG1sKCdVc2VyOiAnICsgaW5wdXRBZHIpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJSb2xlJykuaHRtbCgnUm9sZTogRGlyZWN0b3InKTtcclxuICAgICAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIHNob3dWaWV3KCdob21lLWxpbmsnKTtcclxuICAgICAgICAgICAgICAgIGhpZGVMb2dpbkZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5sb2dnZWRJbiA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyN3cmFwcGVyJykuYXBwZW5kKGA8ZGl2IHJvbGU9XCJhbGVydFwiPkxvZ2luIGZhaWxlZCE8L2Rpdj5gKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhbGVydCBhbGVydC1kYW5nZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJCgnI3dyYXBwZXIgZGl2JykubGVuZ3RoKTtcclxuICAgICAgICByZW1vdmVTZWNvbmRBbGVydCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCQoJyN3cmFwcGVyJykpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGF1dGhvcml6ZWRVc2Vycyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2xvZ291dC1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCduYXYnKS5oaWRlKCk7XHJcbiAgICAgICAgJCgnI2xvZ291dC1idXR0b24nKS5oaWRlKCk7XHJcbiAgICAgICAgJCgnI2xvZ2luLWJ1dHRvbicpLnNob3coKTtcclxuICAgICAgICBzaG93V2VsY29tZVBhZ2UoKTtcclxuICAgICAgICBoaWRlVXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgc2hvd0xvZ2luRmllbGRzKCk7XHJcbiAgICAgICAgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5sb2dnZWRJbiA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGF1dGhvcml6ZWRVc2Vycyk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBbGVydChtZXNzYWdlLCBhbGVydFR5cGUgPSAnc3VjY2VzcycpIHtcclxuICAgICQoJyN3cmFwcGVyJykuYXBwZW5kKGA8ZGl2IHJvbGU9XCJhbGVydFwiPiR7bWVzc2FnZX08L2Rpdj5gKVxyXG4gICAgICAgIC5hZGRDbGFzcyhgYWxlcnQgYWxlcnQtJHthbGVydFR5cGV9YCk7XHJcblxyXG4gICAgLyppZiAoYWxlcnRUeXBlID09PSAnZGFuZ2VyJykge1xyXG4gICAgICAgIGNvbnN0IGFMaW5rcyA9ICQoJ2EnKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFMaW5rcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYUxpbmtzW2ldLmF0dHIoJ2NsYXNzJykpIHtcclxuICAgICAgICAgICAgICAgICQoJ2EnKVtpXS5hdHRyKCdjbGFzcycsICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG4gICAgLy8kKCdhW2hyZWY9XCIjaG9tZVwiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgIFxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93VXNlckNyZWRlbnRpYWxzKCkge1xyXG4gICAgJCgnI3VzZXJBZGRyZXNzJykuc2hvdygpO1xyXG4gICAgJCgnI3VzZXJSb2xlJykuc2hvdygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlVXNlckNyZWRlbnRpYWxzKCkge1xyXG4gICAgJCgnI3VzZXJBZGRyZXNzJykuaGlkZSgpO1xyXG4gICAgJCgnI3VzZXJSb2xlJykuaGlkZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlTG9naW5GaWVsZHMoKSB7XHJcbiAgICAkKCcjYWRkcmVzcy1sYWJlbCcpLmhpZGUoKTtcclxuICAgICQoJyNwYXNzd29yZC1sYWJlbCcpLmhpZGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0xvZ2luRmllbGRzKCkge1xyXG4gICAgJCgnI2FkZHJlc3MtbGFiZWwnKS5zaG93KCk7XHJcbiAgICAkKCcjcGFzc3dvcmQtbGFiZWwnKS5zaG93KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dWaWV3KHZpZXdOYW1lKSB7XHJcbiAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCgnY2xpY2snKTtcclxuICAgIGNvbnN0IGhvbWVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmlld05hbWUpO1xyXG4gICAgaG9tZUxpbmsuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dMb2dvdXRCdXR0b24oKSB7XHJcbiAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLnNob3coKTtcclxuICAgICQoJyNsb2dpbi1idXR0b24nKS5oaWRlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dXZWxjb21lUGFnZSgpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCdjbGljaycpO1xyXG4gICAgY29uc3Qgd2VsY29tZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpWzBdO1xyXG4gICAgd2VsY29tZUxpbmsuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVVc2VyU3RhdGUoKSB7XHJcbiAgICByZXR1cm4gYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXSB8fCB7bG9nZ2VkSW46IGZhbHNlfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZVVzZXJBZGRyZXNzKCkge1xyXG4gICAgcmV0dXJuIGlucHV0QWRyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlU2Vjb25kQWxlcnQoKSB7XHJcbiAgICB2YXIgbnVtT2ZBbGVydHMgPSAkKCcjd3JhcHBlciBkaXYnKS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKG51bU9mQWxlcnRzID4gMSkge1xyXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyYXBwZXInKTsgXHJcbiAgICAgICAgICAgIHdyYXBwZXIucmVtb3ZlQ2hpbGQod3JhcHBlci5sYXN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxufSIsImltcG9ydCB7Z2V0QWN0aXZlVXNlclN0YXRlLCByZW1vdmVTZWNvbmRBbGVydCwgY3JlYXRlQWxlcnR9IGZyb20gJy4vYXV0aGVudGljYXRpb24nO1xyXG5cclxudmFyIG1haW47XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3NpZGViYXIgYVwiKTtcclxuICAgIGNvbnNvbGUubG9nKG5hdkxpbmtzKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmF2TGlua3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBuYXZMaW5rc1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImxpLmFjdGl2ZVwiKS5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcclxuXHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSB0aGlzLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobG9jYXRpb24uaGFzaC50cmltKCkuc3Vic3RyaW5nKDEpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICBcclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XHJcbiAgICBpbnNlcnRUZW1wbGF0ZShsb2NhdGlvbi5oYXNoLnRyaW0oKS5zdWJzdHJpbmcoMSkpO1xyXG59KTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBmdW5jdGlvbigpIHtcclxuICAgIGluc2VydFRlbXBsYXRlKGxvY2F0aW9uLmhhc2gudHJpbSgpLnN1YnN0cmluZygxKSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gaW5zZXJ0VGVtcGxhdGUoc3RySGFzaCkge1xyXG4gICAgXHJcbiAgICBpZiAoIWdldEFjdGl2ZVVzZXJTdGF0ZSgpLmxvZ2dlZEluICYmIHN0ckhhc2ggIT09ICd3ZWxjb21lJykge1xyXG4gICAgICAgIGNvbnN0IGFsZXJ0V3JhcHBlciA9ICQoJzxkaXYgaWQ9XCJ3cmFwcGVyXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgJCgnZm9vdGVyJykuYXBwZW5kKGFsZXJ0V3JhcHBlcik7XHJcbiAgICAgICAgY3JlYXRlQWxlcnQoJ1BsZWFzZSBsb2cgaW4gZmlyc3QgdG8gYWNjZXNzIG90aGVyIEFHTSBmZWF0dXJlcycsICdkYW5nZXInKTtcclxuICAgICAgICByZW1vdmVTZWNvbmRBbGVydCgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgICAvLyQoXCJsaS5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCcnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHZhciB0ZW1wbGF0ZUNvbnRlbnQ7XHJcblxyXG4gICAgc3RySGFzaCA9IHN0ckhhc2ggfHwgXCJ3ZWxjb21lXCI7XHJcblxyXG4gICAgY2xlYXJDb250ZW50QXJlYSgpO1xyXG5cclxuICAgIHN3aXRjaCAoc3RySGFzaCkge1xyXG4gICAgICAgIGNhc2UgXCJ3ZWxjb21lXCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VsY29tZS10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiaG9tZVwiOlxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvbWUtdGVtcGxhdGVcIikuY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcInNldHVwXCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2V0dXAtdGVtcGxhdGVcIikuY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcInZvdGluZ1wiOlxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZvdGluZy10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiUSZBXCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUWFuZEEtdGVtcGxhdGVcIikuY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImxpc3RcIjpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRYW5kQS1saXN0LXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG9tZS10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBtYWluLmFwcGVuZENoaWxkKGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGVDb250ZW50LCB0cnVlKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyQ29udGVudEFyZWEoKSB7XHJcbiAgICB3aGlsZSAobWFpbi5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgICAgICBtYWluLnJlbW92ZUNoaWxkKG1haW4ubGFzdENoaWxkKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9