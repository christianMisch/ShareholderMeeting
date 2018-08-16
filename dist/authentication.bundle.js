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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzIl0sIm5hbWVzIjpbImNyZWF0ZUFsZXJ0IiwiZ2V0QWN0aXZlVXNlclN0YXRlIiwiZ2V0QWN0aXZlVXNlckFkZHJlc3MiLCJyZW1vdmVTZWNvbmRBbGVydCIsImF1dGhvcml6ZWRVc2VycyIsInBhc3N3b3JkIiwicm9sZSIsImxvZ2dlZEluIiwic2hhcmVzIiwiaW5wdXRBZHIiLCJpbnB1dFBXIiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCJzaG93V2VsY29tZVBhZ2UiLCJoaWRlIiwiaGlkZVVzZXJDcmVkZW50aWFscyIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwiYWxlcnRXcmFwcGVyIiwiYXBwZW5kIiwidmFsIiwiT2JqZWN0Iiwia2V5cyIsImluY2x1ZGVzIiwic2hvdyIsInNob3dVc2VyQ3JlZGVudGlhbHMiLCJodG1sIiwic2hvd0xvZ291dEJ1dHRvbiIsInNob3dWaWV3IiwiaGlkZUxvZ2luRmllbGRzIiwiYWRkQ2xhc3MiLCJjb25zb2xlIiwibG9nIiwibGVuZ3RoIiwic2V0VGltZW91dCIsImFsZXJ0Iiwic2hvd0xvZ2luRmllbGRzIiwibWVzc2FnZSIsImFsZXJ0VHlwZSIsInZpZXdOYW1lIiwiZXZlbnQiLCJFdmVudCIsImhvbWVMaW5rIiwiZ2V0RWxlbWVudEJ5SWQiLCJkaXNwYXRjaEV2ZW50Iiwid2VsY29tZUxpbmsiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIm51bU9mQWxlcnRzIiwid3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJyZW1vdmVDaGlsZCIsImxhc3RDaGlsZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FDNEJnQkEsVyxHQUFBQSxXO1FBcURBQyxrQixHQUFBQSxrQjtRQUlBQyxvQixHQUFBQSxvQjtRQUlBQyxpQixHQUFBQSxpQjtBQTNLaEI7O0FBRUEsSUFBSUMsa0JBQWtCO0FBQ2xCLFdBQU8sRUFBQ0MsVUFBVSxRQUFYLEVBQXFCQyxNQUFNLFVBQTNCLEVBQXVDQyxVQUFVLEtBQWpELEVBRFc7QUFFbEIsU0FBSyxFQUFDRixVQUFVLEtBQVgsRUFBa0JDLE1BQU0sYUFBeEIsRUFBdUNDLFVBQVUsS0FBakQsRUFBd0RDLFFBQVEsRUFBaEUsRUFGYTtBQUdsQixrREFBOEMsRUFBQ0gsVUFBVSxLQUFYLEVBQWtCQyxNQUFNLFVBQXhCLEVBQW9DQyxVQUFVLEtBQTlDLEVBQXFEQyxRQUFRLENBQTdEO0FBSDVCLENBQXRCO0FBS0EsSUFBSUMsUUFBSixFQUFjQyxPQUFkOztBQUVBQyxFQUFFQyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVzs7QUFFekJDO0FBQ0E7QUFDQUgsTUFBRSxnQkFBRixFQUFvQkksSUFBcEI7QUFDQUosTUFBRSxLQUFGLEVBQVNJLElBQVQ7O0FBRUE7Ozs7Ozs7QUFPQUM7O0FBR0FMLE1BQUUsZUFBRixFQUFtQk0sS0FBbkIsQ0FBeUIsVUFBU0MsQ0FBVCxFQUFZO0FBQ2pDQSxVQUFFQyxjQUFGOztBQUVBLFlBQU1DLGVBQWVULEVBQUUsMEJBQUYsQ0FBckI7QUFDQUEsVUFBRSxRQUFGLEVBQVlVLE1BQVosQ0FBbUJELFlBQW5CO0FBQ0FYLG1CQUFXRSxFQUFFLGlCQUFGLEVBQXFCVyxHQUFyQixFQUFYO0FBQ0FaLGtCQUFVQyxFQUFFLFdBQUYsRUFBZVcsR0FBZixFQUFWOztBQUVBLFlBQUlDLE9BQU9DLElBQVAsQ0FBWXBCLGVBQVosRUFBNkJxQixRQUE3QixDQUFzQ2hCLFFBQXRDLEtBQ0dMLGdCQUFnQkssUUFBaEIsRUFBMEJKLFFBQTFCLEtBQXVDSyxPQUQxQyxJQUVHTixnQkFBZ0JLLFFBQWhCLEVBQTBCSCxJQUExQixLQUFtQyxVQUYxQyxFQUVzRDtBQUM5Q04sd0JBQVksOENBQVo7QUFDQVcsY0FBRSxLQUFGLEVBQVNlLElBQVQ7QUFDQWYsY0FBRSxhQUFGLEVBQWlCZSxJQUFqQjtBQUNBZixjQUFFLGVBQUYsRUFBbUJJLElBQW5CO0FBQ0FKLGNBQUUsY0FBRixFQUFrQkksSUFBbEI7QUFDQUosY0FBRSxVQUFGLEVBQWNJLElBQWQ7QUFDQVk7QUFDQWhCLGNBQUUsY0FBRixFQUFrQmlCLElBQWxCLENBQXVCLFdBQVduQixRQUFsQztBQUNBRSxjQUFFLFdBQUYsRUFBZWlCLElBQWYsQ0FBb0IsZ0JBQXBCO0FBQ0FDO0FBQ0FDLHFCQUFTLFdBQVQ7QUFDQUM7QUFDQTNCLDRCQUFnQkssUUFBaEIsRUFBMEJGLFFBQTFCLEdBQXFDLElBQXJDO0FBR1AsU0FsQkQsTUFrQk8sSUFBSWdCLE9BQU9DLElBQVAsQ0FBWXBCLGVBQVosRUFBNkJxQixRQUE3QixDQUFzQ2hCLFFBQXRDLEtBQ0pMLGdCQUFnQkssUUFBaEIsRUFBMEJKLFFBQTFCLEtBQXVDSyxPQURuQyxJQUVKTixnQkFBZ0JLLFFBQWhCLEVBQTBCSCxJQUExQixLQUFtQyxhQUZuQyxFQUVrRDs7QUFFakROLHdCQUFZLGlEQUFaO0FBQ0FXLGNBQUUsS0FBRixFQUFTZSxJQUFUO0FBQ0FmLGNBQUUsY0FBRixFQUFrQmUsSUFBbEI7QUFDQWYsY0FBRSxhQUFGLEVBQWlCSSxJQUFqQjtBQUNBSixjQUFFLGVBQUYsRUFBbUJJLElBQW5CO0FBQ0FZO0FBQ0FoQixjQUFFLGNBQUYsRUFBa0JpQixJQUFsQixDQUF1QixXQUFXbkIsUUFBbEM7QUFDQUUsY0FBRSxXQUFGLEVBQWVpQixJQUFmLENBQW9CLG1CQUFwQjtBQUNBQztBQUNBQyxxQkFBUyxXQUFUO0FBQ0FDO0FBQ0EzQiw0QkFBZ0JLLFFBQWhCLEVBQTBCRixRQUExQixHQUFxQyxJQUFyQztBQUVQLFNBakJNLE1BaUJBLElBQUlnQixPQUFPQyxJQUFQLENBQVlwQixlQUFaLEVBQTZCcUIsUUFBN0IsQ0FBc0NoQixRQUF0QyxLQUNITCxnQkFBZ0JLLFFBQWhCLENBQXlCSixRQUF6QixLQUFzQ0ssT0FEbkMsSUFFSE4sZ0JBQWdCSyxRQUFoQixDQUF5QkgsSUFBekIsS0FBa0MsVUFGbkMsRUFFK0M7O0FBRTlDTix3QkFBWSw4Q0FBWjtBQUNBMkI7QUFDQWhCLGNBQUUsY0FBRixFQUFrQmlCLElBQWxCLENBQXVCLFdBQVduQixRQUFsQztBQUNBRSxjQUFFLFdBQUYsRUFBZWlCLElBQWYsQ0FBb0IsZ0JBQXBCO0FBQ0FDO0FBQ0FDLHFCQUFTLFdBQVQ7QUFDQUM7QUFDQTNCLDRCQUFnQkssUUFBaEIsRUFBMEJGLFFBQTFCLEdBQXFDLElBQXJDO0FBRVAsU0FiTSxNQWFBO0FBQ0hJLGNBQUUsVUFBRixFQUFjVSxNQUFkLDBDQUNLVyxRQURMLENBQ2Msb0JBRGQ7QUFFSDtBQUNEQyxnQkFBUUMsR0FBUixDQUFZdkIsRUFBRSxjQUFGLEVBQWtCd0IsTUFBOUI7QUFDQWhDO0FBQ0E4QixnQkFBUUMsR0FBUixDQUFZdkIsRUFBRSxVQUFGLENBQVo7O0FBRUFzQixnQkFBUUMsR0FBUixDQUFZOUIsZUFBWjtBQUNBZ0MsbUJBQVcsWUFBWTtBQUNuQnpCLGNBQUUsUUFBRixFQUFZMEIsS0FBWixDQUFrQixPQUFsQjtBQUNILFNBRkQsRUFFRyxJQUZIO0FBR0gsS0FwRUQ7O0FBc0VBMUIsTUFBRSxnQkFBRixFQUFvQk0sS0FBcEIsQ0FBMEIsWUFBVztBQUNqQ04sVUFBRSxLQUFGLEVBQVNJLElBQVQ7QUFDQUosVUFBRSxnQkFBRixFQUFvQkksSUFBcEI7QUFDQUosVUFBRSxlQUFGLEVBQW1CZSxJQUFuQjtBQUNBWjtBQUNBRTtBQUNBc0I7QUFDQWxDLHdCQUFnQkssUUFBaEIsRUFBMEJGLFFBQTFCLEdBQXFDLEtBQXJDO0FBQ0EwQixnQkFBUUMsR0FBUixDQUFZOUIsZUFBWjtBQUVILEtBVkQ7QUFZSCxDQW5HRDs7QUFxR08sU0FBU0osV0FBVCxDQUFxQnVDLE9BQXJCLEVBQXFEO0FBQUEsUUFBdkJDLFNBQXVCLHVFQUFYLFNBQVc7O0FBQ3hEN0IsTUFBRSxVQUFGLEVBQWNVLE1BQWQsd0JBQTBDa0IsT0FBMUMsYUFDS1AsUUFETCxrQkFDNkJRLFNBRDdCOztBQUdBOzs7Ozs7OztBQVFBO0FBRUg7O0FBRUQsU0FBU2IsbUJBQVQsR0FBK0I7QUFDM0JoQixNQUFFLGNBQUYsRUFBa0JlLElBQWxCO0FBQ0FmLE1BQUUsV0FBRixFQUFlZSxJQUFmO0FBQ0g7O0FBRUQsU0FBU1YsbUJBQVQsR0FBK0I7QUFDM0JMLE1BQUUsY0FBRixFQUFrQkksSUFBbEI7QUFDQUosTUFBRSxXQUFGLEVBQWVJLElBQWY7QUFDSDs7QUFFRCxTQUFTZ0IsZUFBVCxHQUEyQjtBQUN2QnBCLE1BQUUsZ0JBQUYsRUFBb0JJLElBQXBCO0FBQ0FKLE1BQUUsaUJBQUYsRUFBcUJJLElBQXJCO0FBQ0g7O0FBRUQsU0FBU3VCLGVBQVQsR0FBMkI7QUFDdkIzQixNQUFFLGdCQUFGLEVBQW9CZSxJQUFwQjtBQUNBZixNQUFFLGlCQUFGLEVBQXFCZSxJQUFyQjtBQUNIOztBQUVELFNBQVNJLFFBQVQsQ0FBa0JXLFFBQWxCLEVBQTRCO0FBQ3hCLFFBQU1DLFFBQVEsSUFBSUMsS0FBSixDQUFVLE9BQVYsQ0FBZDtBQUNBLFFBQU1DLFdBQVdoQyxTQUFTaUMsY0FBVCxDQUF3QkosUUFBeEIsQ0FBakI7QUFDQUcsYUFBU0UsYUFBVCxDQUF1QkosS0FBdkI7QUFDSDs7QUFFRCxTQUFTYixnQkFBVCxHQUE0QjtBQUN4QmxCLE1BQUUsZ0JBQUYsRUFBb0JlLElBQXBCO0FBQ0FmLE1BQUUsZUFBRixFQUFtQkksSUFBbkI7QUFDSDs7QUFFRCxTQUFTRCxlQUFULEdBQTJCO0FBQ3ZCLFFBQU00QixRQUFRLElBQUlDLEtBQUosQ0FBVSxPQUFWLENBQWQ7QUFDQSxRQUFNSSxjQUFjbkMsU0FBU29DLG9CQUFULENBQThCLEdBQTlCLEVBQW1DLENBQW5DLENBQXBCO0FBQ0FELGdCQUFZRCxhQUFaLENBQTBCSixLQUExQjtBQUNIOztBQUVNLFNBQVN6QyxrQkFBVCxHQUE4QjtBQUNqQyxXQUFPRyxnQkFBZ0JLLFFBQWhCLEtBQTZCLEVBQUNGLFVBQVUsS0FBWCxFQUFwQztBQUNIOztBQUVNLFNBQVNMLG9CQUFULEdBQWdDO0FBQ25DLFdBQU9PLFFBQVA7QUFDSDs7QUFFTSxTQUFTTixpQkFBVCxHQUE2QjtBQUNoQyxRQUFJOEMsY0FBY3RDLEVBQUUsY0FBRixFQUFrQndCLE1BQXBDO0FBQ0ksUUFBSWMsY0FBYyxDQUFsQixFQUFxQjtBQUNqQixZQUFNQyxVQUFVdEMsU0FBU3VDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBaEI7QUFDQUQsZ0JBQVFFLFdBQVIsQ0FBb0JGLFFBQVFHLFNBQTVCO0FBQ0g7QUFDUjs7a0JBRWNqRCxlIiwiZmlsZSI6ImF1dGhlbnRpY2F0aW9uLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuLi9zcmMvYXBwL3NjcmlwdHMvYXV0aGVudGljYXRpb24uanNcIik7XG4iLCIvL2ltcG9ydCB3ZWIzUHJvdmlkZXIgZnJvbSAnLi4vLi4vcHJvdmlkZXIvd2ViM1Byb3ZpZGVyJztcclxuXHJcbnZhciBhdXRob3JpemVkVXNlcnMgPSB7XHJcbiAgICAnMHgwJzoge3Bhc3N3b3JkOiAnbWFzdGVyJywgcm9sZTogJ0FnbU93bmVyJywgbG9nZ2VkSW46IGZhbHNlfSxcclxuICAgICcwJzoge3Bhc3N3b3JkOiAnMTIzJywgcm9sZTogJ1NoYXJlaG9sZGVyJywgbG9nZ2VkSW46IGZhbHNlLCBzaGFyZXM6IDIwfSxcclxuICAgICcweDVFMzQwN0U0NDc1NjM3MUI0RDNEZTgwRWI0Mzc4YjcxNWM0NDQ2MTknOiB7cGFzc3dvcmQ6ICdwdzInLCByb2xlOiAnRGlyZWN0b3InLCBsb2dnZWRJbjogZmFsc2UsIHNoYXJlczogMH1cclxufTtcclxudmFyIGlucHV0QWRyLCBpbnB1dFBXO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7IFxyXG5cclxuICAgIHNob3dXZWxjb21lUGFnZSgpO1xyXG4gICAgLy8gaGlkZSBsb2dvdXQgYnV0dG9uLCB3ZWxjb21lIGxpbmsgaW4gc2lkZWJhciBhbmQgdXNlciBjcmVkZW50aWFsc1xyXG4gICAgJCgnI2xvZ291dC1idXR0b24nKS5oaWRlKCk7XHJcbiAgICAkKCduYXYnKS5oaWRlKCk7XHJcbiAgICBcclxuICAgIC8qY29uc3QgbGlua3MgPSAkKCd1bFtjbGFzcz1cImxpc3QtdW5zdHlsZWQgY29tcG9uZW50c1wiXSBhJyk7XHJcbiAgICBjb25zb2xlLmxvZyhsaW5rcyk7XHJcbiAgICAkLmVhY2gobGlua3MsIGZ1bmN0aW9uKGluZGV4LCB2YWwpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpbmRleCwgdmFsKTtcclxuICAgICAgICAvL3ZhbC5oaWRlKCk7XHJcbiAgICAgICAgLy8kKGAjJHt2YWwuYXR0cignaWQnKX1gKS5oaWRlKCk7XHJcbiAgICB9KSovXHJcbiAgICBoaWRlVXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICBcclxuXHJcbiAgICAkKCcjbG9naW4tYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgYWxlcnRXcmFwcGVyID0gJCgnPGRpdiBpZD1cIndyYXBwZXJcIj48L2Rpdj4nKTtcclxuICAgICAgICAkKCdmb290ZXInKS5hcHBlbmQoYWxlcnRXcmFwcGVyKTtcclxuICAgICAgICBpbnB1dEFkciA9ICQoJyN3YWxsZXQtYWRkcmVzcycpLnZhbCgpO1xyXG4gICAgICAgIGlucHV0UFcgPSAkKCcjcGFzc3dvcmQnKS52YWwoKTtcclxuXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGF1dGhvcml6ZWRVc2VycykuaW5jbHVkZXMoaW5wdXRBZHIpIFxyXG4gICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLnBhc3N3b3JkID09PSBpbnB1dFBXXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucm9sZSA9PT0gJ0FnbU93bmVyJykge1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWxlcnQoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4gYXMgQWdtT3duZXIhJyk7XHJcbiAgICAgICAgICAgICAgICAkKCduYXYnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjc2V0dXAtbGluaycpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICQoJyN3ZWxjb21lLWxpbmsnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdm90aW5nLWxpbmsnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjcWEtbGluaycpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIHNob3dVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyQWRkcmVzcycpLmh0bWwoJ1VzZXI6ICcgKyBpbnB1dEFkcik7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlclJvbGUnKS5odG1sKCdSb2xlOiBBZ21Pd25lcicpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0xvZ291dEJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1ZpZXcoJ2hvbWUtbGluaycpO1xyXG4gICAgICAgICAgICAgICAgaGlkZUxvZ2luRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMoYXV0aG9yaXplZFVzZXJzKS5pbmNsdWRlcyhpbnB1dEFkcikgXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucGFzc3dvcmQgPT09IGlucHV0UFcgXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucm9sZSA9PT0gJ1NoYXJlaG9sZGVyJykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUFsZXJ0KCdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgbG9nZ2VkIGluIGFzIFNoYXJlaG9sZGVyIScpO1xyXG4gICAgICAgICAgICAgICAgJCgnbmF2Jykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3ZvdGluZy1saW5rJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3NldHVwLWxpbmsnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjd2VsY29tZS1saW5rJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1VzZXJDcmVkZW50aWFscygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJBZGRyZXNzJykuaHRtbCgnVXNlcjogJyArIGlucHV0QWRyKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyUm9sZScpLmh0bWwoJ1JvbGU6IFNoYXJlaG9sZGVyJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93TG9nb3V0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICBzaG93VmlldygnaG9tZS1saW5rJyk7XHJcbiAgICAgICAgICAgICAgICBoaWRlTG9naW5GaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ubG9nZ2VkSW4gPSB0cnVlO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKGF1dGhvcml6ZWRVc2VycykuaW5jbHVkZXMoaW5wdXRBZHIpXHJcbiAgICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnMuaW5wdXRBZHIucGFzc3dvcmQgPT09IGlucHV0UFdcclxuICAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vycy5pbnB1dEFkci5yb2xlID09PSAnRGlyZWN0b3InKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWxlcnQoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4gYXMgRGlyZWN0b3IhJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93VXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlckFkZHJlc3MnKS5odG1sKCdVc2VyOiAnICsgaW5wdXRBZHIpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJSb2xlJykuaHRtbCgnUm9sZTogRGlyZWN0b3InKTtcclxuICAgICAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIHNob3dWaWV3KCdob21lLWxpbmsnKTtcclxuICAgICAgICAgICAgICAgIGhpZGVMb2dpbkZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5sb2dnZWRJbiA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyN3cmFwcGVyJykuYXBwZW5kKGA8ZGl2IHJvbGU9XCJhbGVydFwiPkxvZ2luIGZhaWxlZCE8L2Rpdj5gKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhbGVydCBhbGVydC1kYW5nZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJCgnI3dyYXBwZXIgZGl2JykubGVuZ3RoKTtcclxuICAgICAgICByZW1vdmVTZWNvbmRBbGVydCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCQoJyN3cmFwcGVyJykpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGF1dGhvcml6ZWRVc2Vycyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2xvZ291dC1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCduYXYnKS5oaWRlKCk7XHJcbiAgICAgICAgJCgnI2xvZ291dC1idXR0b24nKS5oaWRlKCk7XHJcbiAgICAgICAgJCgnI2xvZ2luLWJ1dHRvbicpLnNob3coKTtcclxuICAgICAgICBzaG93V2VsY29tZVBhZ2UoKTtcclxuICAgICAgICBoaWRlVXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgc2hvd0xvZ2luRmllbGRzKCk7XHJcbiAgICAgICAgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5sb2dnZWRJbiA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGF1dGhvcml6ZWRVc2Vycyk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBbGVydChtZXNzYWdlLCBhbGVydFR5cGUgPSAnc3VjY2VzcycpIHtcclxuICAgICQoJyN3cmFwcGVyJykuYXBwZW5kKGA8ZGl2IHJvbGU9XCJhbGVydFwiPiR7bWVzc2FnZX08L2Rpdj5gKVxyXG4gICAgICAgIC5hZGRDbGFzcyhgYWxlcnQgYWxlcnQtJHthbGVydFR5cGV9YCk7XHJcblxyXG4gICAgLyppZiAoYWxlcnRUeXBlID09PSAnZGFuZ2VyJykge1xyXG4gICAgICAgIGNvbnN0IGFMaW5rcyA9ICQoJ2EnKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFMaW5rcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYUxpbmtzW2ldLmF0dHIoJ2NsYXNzJykpIHtcclxuICAgICAgICAgICAgICAgICQoJ2EnKVtpXS5hdHRyKCdjbGFzcycsICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG4gICAgLy8kKCdhW2hyZWY9XCIjaG9tZVwiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgIFxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93VXNlckNyZWRlbnRpYWxzKCkge1xyXG4gICAgJCgnI3VzZXJBZGRyZXNzJykuc2hvdygpO1xyXG4gICAgJCgnI3VzZXJSb2xlJykuc2hvdygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlVXNlckNyZWRlbnRpYWxzKCkge1xyXG4gICAgJCgnI3VzZXJBZGRyZXNzJykuaGlkZSgpO1xyXG4gICAgJCgnI3VzZXJSb2xlJykuaGlkZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlTG9naW5GaWVsZHMoKSB7XHJcbiAgICAkKCcjYWRkcmVzcy1sYWJlbCcpLmhpZGUoKTtcclxuICAgICQoJyNwYXNzd29yZC1sYWJlbCcpLmhpZGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0xvZ2luRmllbGRzKCkge1xyXG4gICAgJCgnI2FkZHJlc3MtbGFiZWwnKS5zaG93KCk7XHJcbiAgICAkKCcjcGFzc3dvcmQtbGFiZWwnKS5zaG93KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dWaWV3KHZpZXdOYW1lKSB7XHJcbiAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCgnY2xpY2snKTtcclxuICAgIGNvbnN0IGhvbWVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmlld05hbWUpO1xyXG4gICAgaG9tZUxpbmsuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dMb2dvdXRCdXR0b24oKSB7XHJcbiAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLnNob3coKTtcclxuICAgICQoJyNsb2dpbi1idXR0b24nKS5oaWRlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dXZWxjb21lUGFnZSgpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCdjbGljaycpO1xyXG4gICAgY29uc3Qgd2VsY29tZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpWzBdO1xyXG4gICAgd2VsY29tZUxpbmsuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVVc2VyU3RhdGUoKSB7XHJcbiAgICByZXR1cm4gYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXSB8fCB7bG9nZ2VkSW46IGZhbHNlfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZVVzZXJBZGRyZXNzKCkge1xyXG4gICAgcmV0dXJuIGlucHV0QWRyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlU2Vjb25kQWxlcnQoKSB7XHJcbiAgICB2YXIgbnVtT2ZBbGVydHMgPSAkKCcjd3JhcHBlciBkaXYnKS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKG51bU9mQWxlcnRzID4gMSkge1xyXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dyYXBwZXInKTsgXHJcbiAgICAgICAgICAgIHdyYXBwZXIucmVtb3ZlQ2hpbGQod3JhcHBlci5sYXN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXV0aG9yaXplZFVzZXJzOyJdLCJzb3VyY2VSb290IjoiIn0=