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
exports.getActiveUser = getActiveUser;
// import web3Provider from '../../provider/web3Provider';
var authorizedUsers = {
    '0x72cccDBCFb464a240c025969bb9Bb81Da0392a90': { password: 'pw1', role: 'Shareholder', loggedIn: false },
    '0x5E3407E44756371B4D3De80Eb4378b715c444619': { password: 'pw2', role: 'Director', loggedIn: false }
};
var inputAdr, inputPW;

$(document).ready(function () {

    showWelcomePage();
    var alertWrapper = $('<div id="wrapper"></div>');
    $('footer').append(alertWrapper);
    // hide logout button and welcome link in sidebar
    $('#logout-button').hide();
    $('#welcome-link').hide();
    var ownerAddress = '0x0' /*web3Provider.eth.accounts[0]*/;
    var masterPW = 'master';

    $('#login-button').click(function (e) {
        e.preventDefault();

        var alertWrapper = $('<div id="wrapper"></div>');
        $('footer').append(alertWrapper);
        inputAdr = $('#wallet-address').val();
        inputPW = $('#password').val();
        //console.log(inputAdr, inputPW);

        if (inputAdr === ownerAddress && inputPW === masterPW) {
            createAlert('You have successfully logged in as AgmOwner!', 'success');
            showUserCredentials('AgmOwner');
            showLogoutButton();
            location.hash = "#home";
            var event = new Event('click');
            var homeLink = document.getElementsByTagName('a')[1];
            homeLink.dispatchEvent(event);
        } else if (Object.keys(authorizedUsers).includes(inputAdr) && authorizedUsers[inputAdr].password === inputPW && authorizedUsers[inputAdr].role === 'Shareholder') {

            createAlert('You have successfully logged in as Shareholder!', 'success');
            showUserCredentials('Shareholder');
            showLogoutButton();
        } else if (Object.keys(authorizedUsers).includes(inputAdr) && authorizedUsers.inputAdr.password === inputPW && authorizedUsers.inputAdr.role === 'Director') {

            createAlert('You have successfully logged in as Director!', 'success');
            showUserCredentials('Director');
            showLogoutButton();
        } else {
            createAlert('Login failed', 'danger');
        }
    });

    $('#logout-button').click(function () {
        $('#logout-button').hide();
        $('#login-button').show();
        showWelcomePage();
    });
});

function createAlert(message, alertType) {
    $('#wrapper').append('<div role="alert">' + message + '</div>').addClass('alert alert-' + alertType);

    setTimeout(function () {
        $('.alert').alert('close');
    }, 3000);
    //$('a[href="#home"]').trigger('click');
}

function showUserCredentials(role) {
    $('#userAddress').html('User: ' + inputAdr);
    $('#userRole').html('Role: ' + role);
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

    if (!(0, _authentication.getActiveUser)().loggedIn) {
        (0, _authentication.createAlert)('Please log in first to access other AGM features', 'danger');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uLy4uL3NyYy9hcHAvc2NyaXB0cy9tYW5hZ2VTUEEuanMiXSwibmFtZXMiOlsiY3JlYXRlQWxlcnQiLCJnZXRBY3RpdmVVc2VyIiwiYXV0aG9yaXplZFVzZXJzIiwicGFzc3dvcmQiLCJyb2xlIiwibG9nZ2VkSW4iLCJpbnB1dEFkciIsImlucHV0UFciLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsInNob3dXZWxjb21lUGFnZSIsImFsZXJ0V3JhcHBlciIsImFwcGVuZCIsImhpZGUiLCJvd25lckFkZHJlc3MiLCJtYXN0ZXJQVyIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwidmFsIiwic2hvd1VzZXJDcmVkZW50aWFscyIsInNob3dMb2dvdXRCdXR0b24iLCJsb2NhdGlvbiIsImhhc2giLCJldmVudCIsIkV2ZW50IiwiaG9tZUxpbmsiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImRpc3BhdGNoRXZlbnQiLCJPYmplY3QiLCJrZXlzIiwiaW5jbHVkZXMiLCJzaG93IiwibWVzc2FnZSIsImFsZXJ0VHlwZSIsImFkZENsYXNzIiwic2V0VGltZW91dCIsImFsZXJ0IiwiaHRtbCIsIndlbGNvbWVMaW5rIiwibWFpbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJuYXZMaW5rcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjb25zb2xlIiwibG9nIiwiaSIsImxlbmd0aCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc05hbWUiLCJwYXJlbnRFbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwidHJpbSIsInN1YnN0cmluZyIsImluc2VydFRlbXBsYXRlIiwid2luZG93Iiwic3RySGFzaCIsInRlbXBsYXRlQ29udGVudCIsImNsZWFyQ29udGVudEFyZWEiLCJnZXRFbGVtZW50QnlJZCIsImNvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImltcG9ydE5vZGUiLCJoYXNDaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJsYXN0Q2hpbGQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQ2RnQkEsVyxHQUFBQSxXO1FBMkJBQyxhLEdBQUFBLGE7QUEvRmhCO0FBQ0EsSUFBSUMsa0JBQWtCO0FBQ2xCLGtEQUE4QyxFQUFDQyxVQUFVLEtBQVgsRUFBa0JDLE1BQU0sYUFBeEIsRUFBdUNDLFVBQVUsS0FBakQsRUFENUI7QUFFbEIsa0RBQThDLEVBQUNGLFVBQVUsS0FBWCxFQUFrQkMsTUFBTSxVQUF4QixFQUFvQ0MsVUFBVSxLQUE5QztBQUY1QixDQUF0QjtBQUlBLElBQUlDLFFBQUosRUFBY0MsT0FBZDs7QUFFQUMsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVc7O0FBRXpCQztBQUNBLFFBQU1DLGVBQWVKLEVBQUUsMEJBQUYsQ0FBckI7QUFDQUEsTUFBRSxRQUFGLEVBQVlLLE1BQVosQ0FBbUJELFlBQW5CO0FBQ0E7QUFDQUosTUFBRSxnQkFBRixFQUFvQk0sSUFBcEI7QUFDQU4sTUFBRSxlQUFGLEVBQW1CTSxJQUFuQjtBQUNBLFFBQU1DLGVBQWUsS0FBckIsQ0FBMEIsZ0NBQTFCO0FBQ0EsUUFBTUMsV0FBVyxRQUFqQjs7QUFHQVIsTUFBRSxlQUFGLEVBQW1CUyxLQUFuQixDQUF5QixVQUFTQyxDQUFULEVBQVk7QUFDakNBLFVBQUVDLGNBQUY7O0FBRUEsWUFBTVAsZUFBZUosRUFBRSwwQkFBRixDQUFyQjtBQUNBQSxVQUFFLFFBQUYsRUFBWUssTUFBWixDQUFtQkQsWUFBbkI7QUFDQU4sbUJBQVdFLEVBQUUsaUJBQUYsRUFBcUJZLEdBQXJCLEVBQVg7QUFDQWIsa0JBQVVDLEVBQUUsV0FBRixFQUFlWSxHQUFmLEVBQVY7QUFDQTs7QUFFQSxZQUFJZCxhQUFhUyxZQUFiLElBQTZCUixZQUFZUyxRQUE3QyxFQUF1RDtBQUNuRGhCLHdCQUFZLDhDQUFaLEVBQTRELFNBQTVEO0FBQ0FxQixnQ0FBb0IsVUFBcEI7QUFDQUM7QUFDQUMscUJBQVNDLElBQVQsR0FBZ0IsT0FBaEI7QUFDQSxnQkFBTUMsUUFBUSxJQUFJQyxLQUFKLENBQVUsT0FBVixDQUFkO0FBQ0EsZ0JBQU1DLFdBQVdsQixTQUFTbUIsb0JBQVQsQ0FBOEIsR0FBOUIsRUFBbUMsQ0FBbkMsQ0FBakI7QUFDQUQscUJBQVNFLGFBQVQsQ0FBdUJKLEtBQXZCO0FBR0gsU0FWRCxNQVVPLElBQUlLLE9BQU9DLElBQVAsQ0FBWTdCLGVBQVosRUFBNkI4QixRQUE3QixDQUFzQzFCLFFBQXRDLEtBQ0pKLGdCQUFnQkksUUFBaEIsRUFBMEJILFFBQTFCLEtBQXVDSSxPQURuQyxJQUVKTCxnQkFBZ0JJLFFBQWhCLEVBQTBCRixJQUExQixLQUFtQyxhQUZuQyxFQUVrRDs7QUFFakRKLHdCQUFZLGlEQUFaLEVBQStELFNBQS9EO0FBQ0FxQixnQ0FBb0IsYUFBcEI7QUFDQUM7QUFFUCxTQVJNLE1BUUEsSUFBSVEsT0FBT0MsSUFBUCxDQUFZN0IsZUFBWixFQUE2QjhCLFFBQTdCLENBQXNDMUIsUUFBdEMsS0FDSEosZ0JBQWdCSSxRQUFoQixDQUF5QkgsUUFBekIsS0FBc0NJLE9BRG5DLElBRUhMLGdCQUFnQkksUUFBaEIsQ0FBeUJGLElBQXpCLEtBQWtDLFVBRm5DLEVBRStDOztBQUU5Q0osd0JBQVksOENBQVosRUFBNEQsU0FBNUQ7QUFDQXFCLGdDQUFvQixVQUFwQjtBQUNBQztBQUVQLFNBUk0sTUFRQTtBQUNIdEIsd0JBQVksY0FBWixFQUE0QixRQUE1QjtBQUNIO0FBQ0osS0F0Q0Q7O0FBd0NBUSxNQUFFLGdCQUFGLEVBQW9CUyxLQUFwQixDQUEwQixZQUFXO0FBQ2pDVCxVQUFFLGdCQUFGLEVBQW9CTSxJQUFwQjtBQUNBTixVQUFFLGVBQUYsRUFBbUJ5QixJQUFuQjtBQUNBdEI7QUFFSCxLQUxEO0FBT0gsQ0EzREQ7O0FBNkRPLFNBQVNYLFdBQVQsQ0FBcUJrQyxPQUFyQixFQUE4QkMsU0FBOUIsRUFBeUM7QUFDNUMzQixNQUFFLFVBQUYsRUFBY0ssTUFBZCx3QkFBMENxQixPQUExQyxhQUNLRSxRQURMLGtCQUM2QkQsU0FEN0I7O0FBR0FFLGVBQVcsWUFBWTtBQUNuQjdCLFVBQUUsUUFBRixFQUFZOEIsS0FBWixDQUFrQixPQUFsQjtBQUNILEtBRkQsRUFFRyxJQUZIO0FBR0E7QUFFSDs7QUFFRCxTQUFTakIsbUJBQVQsQ0FBNkJqQixJQUE3QixFQUFtQztBQUMvQkksTUFBRSxjQUFGLEVBQWtCK0IsSUFBbEIsQ0FBdUIsV0FBV2pDLFFBQWxDO0FBQ0FFLE1BQUUsV0FBRixFQUFlK0IsSUFBZixDQUFvQixXQUFXbkMsSUFBL0I7QUFDSDs7QUFFRCxTQUFTa0IsZ0JBQVQsR0FBNEI7QUFDeEJkLE1BQUUsZ0JBQUYsRUFBb0J5QixJQUFwQjtBQUNBekIsTUFBRSxlQUFGLEVBQW1CTSxJQUFuQjtBQUNIOztBQUVELFNBQVNILGVBQVQsR0FBMkI7QUFDdkIsUUFBTWMsUUFBUSxJQUFJQyxLQUFKLENBQVUsT0FBVixDQUFkO0FBQ0EsUUFBTWMsY0FBYy9CLFNBQVNtQixvQkFBVCxDQUE4QixHQUE5QixFQUFtQyxDQUFuQyxDQUFwQjtBQUNBWSxnQkFBWVgsYUFBWixDQUEwQkosS0FBMUI7QUFDSDs7QUFFTSxTQUFTeEIsYUFBVCxHQUF5QjtBQUM1QixXQUFPQyxnQkFBZ0JJLFFBQWhCLEtBQTZCLEVBQUNELFVBQVUsS0FBWCxFQUFwQztBQUNILEM7Ozs7Ozs7Ozs7Ozs7O0FDakdEOztBQUVBLElBQUlvQyxJQUFKOztBQUVBaEMsU0FBU2lDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFZO0FBQ3RELFFBQUlDLFdBQVdsQyxTQUFTbUMsZ0JBQVQsQ0FBMEIsWUFBMUIsQ0FBZjtBQUNBQyxZQUFRQyxHQUFSLENBQVlILFFBQVo7QUFDQSxTQUFLLElBQUlJLElBQUksQ0FBYixFQUFnQkEsSUFBSUosU0FBU0ssTUFBN0IsRUFBcUNELEdBQXJDLEVBQTBDO0FBQ3RDSixpQkFBU0ksQ0FBVCxFQUFZTCxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxVQUFVeEIsQ0FBVixFQUFhO0FBQy9DQSxjQUFFQyxjQUFGOztBQUVBVixxQkFBU3dDLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0NDLFNBQXBDLEdBQWdELEVBQWhEO0FBQ0EsaUJBQUtDLGFBQUwsQ0FBbUJELFNBQW5CLEdBQStCLFFBQS9COztBQUVBM0IscUJBQVNDLElBQVQsR0FBZ0IsS0FBSzRCLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBaEI7QUFDQVAsb0JBQVFDLEdBQVIsQ0FBWSxLQUFLTSxZQUFMLENBQWtCLE1BQWxCLENBQVo7QUFDQVAsb0JBQVFDLEdBQVIsQ0FBWXZCLFNBQVNDLElBQVQsQ0FBYzZCLElBQWQsR0FBcUJDLFNBQXJCLENBQStCLENBQS9CLENBQVo7QUFDSCxTQVREO0FBVUg7QUFFSixDQWhCRDs7QUFrQkE3QyxTQUFTaUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFDdERELFdBQU9oQyxTQUFTd0MsYUFBVCxDQUF1QixNQUF2QixDQUFQO0FBQ0FNLG1CQUFlaEMsU0FBU0MsSUFBVCxDQUFjNkIsSUFBZCxHQUFxQkMsU0FBckIsQ0FBK0IsQ0FBL0IsQ0FBZjtBQUNILENBSEQ7O0FBS0FFLE9BQU9kLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDLFlBQVc7QUFDN0NhLG1CQUFlaEMsU0FBU0MsSUFBVCxDQUFjNkIsSUFBZCxHQUFxQkMsU0FBckIsQ0FBK0IsQ0FBL0IsQ0FBZjtBQUNILENBRkQ7O0FBSUEsU0FBU0MsY0FBVCxDQUF3QkUsT0FBeEIsRUFBaUM7O0FBRTdCLFFBQUksQ0FBQyxxQ0FBZ0JwRCxRQUFyQixFQUErQjtBQUMzQix5Q0FBWSxrREFBWixFQUFnRSxRQUFoRTtBQUNBO0FBQ0g7O0FBRUQsUUFBSXFELGVBQUo7O0FBRUFELGNBQVVBLFdBQVcsU0FBckI7O0FBRUFFOztBQUVBLFlBQVFGLE9BQVI7QUFDSSxhQUFLLFNBQUw7QUFDSUMsOEJBQWtCakQsU0FBU21ELGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDQyxPQUE5RDtBQUNBO0FBQ0osYUFBSyxNQUFMO0FBQ0lILDhCQUFrQmpELFNBQVNtRCxjQUFULENBQXdCLGVBQXhCLEVBQXlDQyxPQUEzRDtBQUNBO0FBQ0osYUFBSyxRQUFMO0FBQ0lILDhCQUFrQmpELFNBQVNtRCxjQUFULENBQXdCLGlCQUF4QixFQUEyQ0MsT0FBN0Q7QUFDQTtBQUNKLGFBQUssS0FBTDtBQUNJSCw4QkFBa0JqRCxTQUFTbUQsY0FBVCxDQUF3QixnQkFBeEIsRUFBMENDLE9BQTVEO0FBQ0E7QUFDSixhQUFLLE1BQUw7QUFDSUgsOEJBQWtCakQsU0FBU21ELGNBQVQsQ0FBd0IscUJBQXhCLEVBQStDQyxPQUFqRTtBQUNBO0FBQ0o7QUFDSUgsOEJBQWtCakQsU0FBU21ELGNBQVQsQ0FBd0IsZUFBeEIsRUFBeUNDLE9BQTNEO0FBQ0E7QUFsQlI7O0FBcUJBcEIsU0FBS3FCLFdBQUwsQ0FBaUJyRCxTQUFTc0QsVUFBVCxDQUFvQkwsZUFBcEIsRUFBcUMsSUFBckMsQ0FBakI7QUFDSDs7QUFFRCxTQUFTQyxnQkFBVCxHQUE0QjtBQUN4QixXQUFPbEIsS0FBS3VCLGFBQUwsRUFBUCxFQUE2QjtBQUN6QnZCLGFBQUt3QixXQUFMLENBQWlCeEIsS0FBS3lCLFNBQXRCO0FBQ0g7QUFDSixDIiwiZmlsZSI6Im1hbmFnZVNQQS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi4vc3JjL2FwcC9zY3JpcHRzL21hbmFnZVNQQS5qc1wiKTtcbiIsIi8vIGltcG9ydCB3ZWIzUHJvdmlkZXIgZnJvbSAnLi4vLi4vcHJvdmlkZXIvd2ViM1Byb3ZpZGVyJztcclxudmFyIGF1dGhvcml6ZWRVc2VycyA9IHtcclxuICAgICcweDcyY2NjREJDRmI0NjRhMjQwYzAyNTk2OWJiOUJiODFEYTAzOTJhOTAnOiB7cGFzc3dvcmQ6ICdwdzEnLCByb2xlOiAnU2hhcmVob2xkZXInLCBsb2dnZWRJbjogZmFsc2V9LFxyXG4gICAgJzB4NUUzNDA3RTQ0NzU2MzcxQjREM0RlODBFYjQzNzhiNzE1YzQ0NDYxOSc6IHtwYXNzd29yZDogJ3B3MicsIHJvbGU6ICdEaXJlY3RvcicsIGxvZ2dlZEluOiBmYWxzZX1cclxufTtcclxudmFyIGlucHV0QWRyLCBpbnB1dFBXO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgc2hvd1dlbGNvbWVQYWdlKCk7XHJcbiAgICBjb25zdCBhbGVydFdyYXBwZXIgPSAkKCc8ZGl2IGlkPVwid3JhcHBlclwiPjwvZGl2PicpO1xyXG4gICAgJCgnZm9vdGVyJykuYXBwZW5kKGFsZXJ0V3JhcHBlcik7XHJcbiAgICAvLyBoaWRlIGxvZ291dCBidXR0b24gYW5kIHdlbGNvbWUgbGluayBpbiBzaWRlYmFyXHJcbiAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmhpZGUoKTtcclxuICAgICQoJyN3ZWxjb21lLWxpbmsnKS5oaWRlKCk7XHJcbiAgICBjb25zdCBvd25lckFkZHJlc3MgPSAnMHgwJy8qd2ViM1Byb3ZpZGVyLmV0aC5hY2NvdW50c1swXSovO1xyXG4gICAgY29uc3QgbWFzdGVyUFcgPSAnbWFzdGVyJztcclxuICAgIFxyXG5cclxuICAgICQoJyNsb2dpbi1idXR0b24nKS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBhbGVydFdyYXBwZXIgPSAkKCc8ZGl2IGlkPVwid3JhcHBlclwiPjwvZGl2PicpO1xyXG4gICAgICAgICQoJ2Zvb3RlcicpLmFwcGVuZChhbGVydFdyYXBwZXIpO1xyXG4gICAgICAgIGlucHV0QWRyID0gJCgnI3dhbGxldC1hZGRyZXNzJykudmFsKCk7XHJcbiAgICAgICAgaW5wdXRQVyA9ICQoJyNwYXNzd29yZCcpLnZhbCgpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coaW5wdXRBZHIsIGlucHV0UFcpO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRBZHIgPT09IG93bmVyQWRkcmVzcyAmJiBpbnB1dFBXID09PSBtYXN0ZXJQVykge1xyXG4gICAgICAgICAgICBjcmVhdGVBbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiBhcyBBZ21Pd25lciEnLCAnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICBzaG93VXNlckNyZWRlbnRpYWxzKCdBZ21Pd25lcicpO1xyXG4gICAgICAgICAgICBzaG93TG9nb3V0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIiNob21lXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCdjbGljaycpO1xyXG4gICAgICAgICAgICBjb25zdCBob21lTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylbMV07XHJcbiAgICAgICAgICAgIGhvbWVMaW5rLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3Qua2V5cyhhdXRob3JpemVkVXNlcnMpLmluY2x1ZGVzKGlucHV0QWRyKSBcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5wYXNzd29yZCA9PT0gaW5wdXRQVyBcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5yb2xlID09PSAnU2hhcmVob2xkZXInKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWxlcnQoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4gYXMgU2hhcmVob2xkZXIhJywgJ3N1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICAgIHNob3dVc2VyQ3JlZGVudGlhbHMoJ1NoYXJlaG9sZGVyJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93TG9nb3V0QnV0dG9uKCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMoYXV0aG9yaXplZFVzZXJzKS5pbmNsdWRlcyhpbnB1dEFkcilcclxuICAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vycy5pbnB1dEFkci5wYXNzd29yZCA9PT0gaW5wdXRQV1xyXG4gICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzLmlucHV0QWRyLnJvbGUgPT09ICdEaXJlY3RvcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiBhcyBEaXJlY3RvciEnLCAnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1VzZXJDcmVkZW50aWFscygnRGlyZWN0b3InKTtcclxuICAgICAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3JlYXRlQWxlcnQoJ0xvZ2luIGZhaWxlZCcsICdkYW5nZXInKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyNsb2dvdXQtYnV0dG9uJykuaGlkZSgpO1xyXG4gICAgICAgICQoJyNsb2dpbi1idXR0b24nKS5zaG93KCk7XHJcbiAgICAgICAgc2hvd1dlbGNvbWVQYWdlKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBbGVydChtZXNzYWdlLCBhbGVydFR5cGUpIHtcclxuICAgICQoJyN3cmFwcGVyJykuYXBwZW5kKGA8ZGl2IHJvbGU9XCJhbGVydFwiPiR7bWVzc2FnZX08L2Rpdj5gKVxyXG4gICAgICAgIC5hZGRDbGFzcyhgYWxlcnQgYWxlcnQtJHthbGVydFR5cGV9YCk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XHJcbiAgICB9LCAzMDAwKTtcclxuICAgIC8vJCgnYVtocmVmPVwiI2hvbWVcIl0nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICBcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1VzZXJDcmVkZW50aWFscyhyb2xlKSB7XHJcbiAgICAkKCcjdXNlckFkZHJlc3MnKS5odG1sKCdVc2VyOiAnICsgaW5wdXRBZHIpO1xyXG4gICAgJCgnI3VzZXJSb2xlJykuaHRtbCgnUm9sZTogJyArIHJvbGUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93TG9nb3V0QnV0dG9uKCkge1xyXG4gICAgJCgnI2xvZ291dC1idXR0b24nKS5zaG93KCk7XHJcbiAgICAkKCcjbG9naW4tYnV0dG9uJykuaGlkZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93V2VsY29tZVBhZ2UoKSB7XHJcbiAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCgnY2xpY2snKTtcclxuICAgIGNvbnN0IHdlbGNvbWVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKVswXTtcclxuICAgIHdlbGNvbWVMaW5rLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlVXNlcigpIHtcclxuICAgIHJldHVybiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdIHx8IHtsb2dnZWRJbjogZmFsc2V9O1xyXG59IiwiaW1wb3J0IHsgZ2V0QWN0aXZlVXNlciwgY3JlYXRlQWxlcnQgfSBmcm9tICcuL2F1dGhlbnRpY2F0aW9uJztcclxuXHJcbnZhciBtYWluO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNzaWRlYmFyIGFcIik7XHJcbiAgICBjb25zb2xlLmxvZyhuYXZMaW5rcyk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hdkxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbmF2TGlua3NbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsaS5hY3RpdmVcIikuY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZSA9IFwiYWN0aXZlXCI7XHJcblxyXG4gICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdldEF0dHJpYnV0ZShcImhyZWZcIikpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY2F0aW9uLmhhc2gudHJpbSgpLnN1YnN0cmluZygxKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgXHJcbn0pO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xyXG4gICAgaW5zZXJ0VGVtcGxhdGUobG9jYXRpb24uaGFzaC50cmltKCkuc3Vic3RyaW5nKDEpKTtcclxufSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICBpbnNlcnRUZW1wbGF0ZShsb2NhdGlvbi5oYXNoLnRyaW0oKS5zdWJzdHJpbmcoMSkpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGluc2VydFRlbXBsYXRlKHN0ckhhc2gpIHtcclxuICAgIFxyXG4gICAgaWYgKCFnZXRBY3RpdmVVc2VyKCkubG9nZ2VkSW4pIHtcclxuICAgICAgICBjcmVhdGVBbGVydCgnUGxlYXNlIGxvZyBpbiBmaXJzdCB0byBhY2Nlc3Mgb3RoZXIgQUdNIGZlYXR1cmVzJywgJ2RhbmdlcicpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIHRlbXBsYXRlQ29udGVudDtcclxuXHJcbiAgICBzdHJIYXNoID0gc3RySGFzaCB8fCBcIndlbGNvbWVcIjtcclxuXHJcbiAgICBjbGVhckNvbnRlbnRBcmVhKCk7XHJcblxyXG4gICAgc3dpdGNoIChzdHJIYXNoKSB7XHJcbiAgICAgICAgY2FzZSBcIndlbGNvbWVcIjpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWxjb21lLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJob21lXCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG9tZS10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwidm90aW5nXCI6XHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidm90aW5nLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJRJkFcIjpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRYW5kQS10ZW1wbGF0ZVwiKS5jb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwibGlzdFwiOlxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlFhbmRBLWxpc3QtdGVtcGxhdGVcIikuY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob21lLXRlbXBsYXRlXCIpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIG1haW4uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZUNvbnRlbnQsIHRydWUpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJDb250ZW50QXJlYSgpIHtcclxuICAgIHdoaWxlIChtYWluLmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgIG1haW4ucmVtb3ZlQ2hpbGQobWFpbi5sYXN0Q2hpbGQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=