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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzIl0sIm5hbWVzIjpbImNyZWF0ZUFsZXJ0IiwiZ2V0QWN0aXZlVXNlclN0YXRlIiwiZ2V0QWN0aXZlVXNlckFkZHJlc3MiLCJyZW1vdmVTZWNvbmRBbGVydCIsImF1dGhvcml6ZWRVc2VycyIsInBhc3N3b3JkIiwicm9sZSIsImxvZ2dlZEluIiwiaW5wdXRBZHIiLCJpbnB1dFBXIiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCJzaG93V2VsY29tZVBhZ2UiLCJoaWRlIiwiaGlkZVVzZXJDcmVkZW50aWFscyIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwiYWxlcnRXcmFwcGVyIiwiYXBwZW5kIiwidmFsIiwiT2JqZWN0Iiwia2V5cyIsImluY2x1ZGVzIiwic2hvdyIsInNob3dVc2VyQ3JlZGVudGlhbHMiLCJodG1sIiwic2hvd0xvZ291dEJ1dHRvbiIsInNob3dWaWV3IiwiaGlkZUxvZ2luRmllbGRzIiwiYWRkQ2xhc3MiLCJjb25zb2xlIiwibG9nIiwibGVuZ3RoIiwic2V0VGltZW91dCIsImFsZXJ0Iiwic2hvd0xvZ2luRmllbGRzIiwibWVzc2FnZSIsImFsZXJ0VHlwZSIsInZpZXdOYW1lIiwiZXZlbnQiLCJFdmVudCIsImhvbWVMaW5rIiwiZ2V0RWxlbWVudEJ5SWQiLCJkaXNwYXRjaEV2ZW50Iiwid2VsY29tZUxpbmsiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIm51bU9mQWxlcnRzIiwid3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJyZW1vdmVDaGlsZCIsImxhc3RDaGlsZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FDNEJnQkEsVyxHQUFBQSxXO1FBcURBQyxrQixHQUFBQSxrQjtRQUlBQyxvQixHQUFBQSxvQjtRQUlBQyxpQixHQUFBQSxpQjtBQTNLaEI7O0FBRUEsSUFBSUMsa0JBQWtCO0FBQ2xCLFdBQU8sRUFBQ0MsVUFBVSxRQUFYLEVBQXFCQyxNQUFNLFVBQTNCLEVBQXVDQyxVQUFVLEtBQWpELEVBRFc7QUFFbEIsU0FBSyxFQUFDRixVQUFVLEtBQVgsRUFBa0JDLE1BQU0sYUFBeEIsRUFBdUNDLFVBQVUsS0FBakQsRUFGYTtBQUdsQixrREFBOEMsRUFBQ0YsVUFBVSxLQUFYLEVBQWtCQyxNQUFNLFVBQXhCLEVBQW9DQyxVQUFVLEtBQTlDO0FBSDVCLENBQXRCO0FBS0EsSUFBSUMsUUFBSixFQUFjQyxPQUFkOztBQUVBQyxFQUFFQyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVzs7QUFFekJDO0FBQ0E7QUFDQUgsTUFBRSxnQkFBRixFQUFvQkksSUFBcEI7QUFDQUosTUFBRSxLQUFGLEVBQVNJLElBQVQ7O0FBRUE7Ozs7Ozs7QUFPQUM7O0FBR0FMLE1BQUUsZUFBRixFQUFtQk0sS0FBbkIsQ0FBeUIsVUFBU0MsQ0FBVCxFQUFZO0FBQ2pDQSxVQUFFQyxjQUFGOztBQUVBLFlBQU1DLGVBQWVULEVBQUUsMEJBQUYsQ0FBckI7QUFDQUEsVUFBRSxRQUFGLEVBQVlVLE1BQVosQ0FBbUJELFlBQW5CO0FBQ0FYLG1CQUFXRSxFQUFFLGlCQUFGLEVBQXFCVyxHQUFyQixFQUFYO0FBQ0FaLGtCQUFVQyxFQUFFLFdBQUYsRUFBZVcsR0FBZixFQUFWOztBQUVBLFlBQUlDLE9BQU9DLElBQVAsQ0FBWW5CLGVBQVosRUFBNkJvQixRQUE3QixDQUFzQ2hCLFFBQXRDLEtBQ0dKLGdCQUFnQkksUUFBaEIsRUFBMEJILFFBQTFCLEtBQXVDSSxPQUQxQyxJQUVHTCxnQkFBZ0JJLFFBQWhCLEVBQTBCRixJQUExQixLQUFtQyxVQUYxQyxFQUVzRDtBQUM5Q04sd0JBQVksOENBQVo7QUFDQVUsY0FBRSxLQUFGLEVBQVNlLElBQVQ7QUFDQWYsY0FBRSxhQUFGLEVBQWlCZSxJQUFqQjtBQUNBZixjQUFFLGVBQUYsRUFBbUJJLElBQW5CO0FBQ0FKLGNBQUUsY0FBRixFQUFrQkksSUFBbEI7QUFDQUosY0FBRSxVQUFGLEVBQWNJLElBQWQ7QUFDQVk7QUFDQWhCLGNBQUUsY0FBRixFQUFrQmlCLElBQWxCLENBQXVCLFdBQVduQixRQUFsQztBQUNBRSxjQUFFLFdBQUYsRUFBZWlCLElBQWYsQ0FBb0IsZ0JBQXBCO0FBQ0FDO0FBQ0FDLHFCQUFTLFdBQVQ7QUFDQUM7QUFDQTFCLDRCQUFnQkksUUFBaEIsRUFBMEJELFFBQTFCLEdBQXFDLElBQXJDO0FBR1AsU0FsQkQsTUFrQk8sSUFBSWUsT0FBT0MsSUFBUCxDQUFZbkIsZUFBWixFQUE2Qm9CLFFBQTdCLENBQXNDaEIsUUFBdEMsS0FDSkosZ0JBQWdCSSxRQUFoQixFQUEwQkgsUUFBMUIsS0FBdUNJLE9BRG5DLElBRUpMLGdCQUFnQkksUUFBaEIsRUFBMEJGLElBQTFCLEtBQW1DLGFBRm5DLEVBRWtEOztBQUVqRE4sd0JBQVksaURBQVo7QUFDQVUsY0FBRSxLQUFGLEVBQVNlLElBQVQ7QUFDQWYsY0FBRSxjQUFGLEVBQWtCZSxJQUFsQjtBQUNBZixjQUFFLGFBQUYsRUFBaUJJLElBQWpCO0FBQ0FKLGNBQUUsZUFBRixFQUFtQkksSUFBbkI7QUFDQVk7QUFDQWhCLGNBQUUsY0FBRixFQUFrQmlCLElBQWxCLENBQXVCLFdBQVduQixRQUFsQztBQUNBRSxjQUFFLFdBQUYsRUFBZWlCLElBQWYsQ0FBb0IsbUJBQXBCO0FBQ0FDO0FBQ0FDLHFCQUFTLFdBQVQ7QUFDQUM7QUFDQTFCLDRCQUFnQkksUUFBaEIsRUFBMEJELFFBQTFCLEdBQXFDLElBQXJDO0FBRVAsU0FqQk0sTUFpQkEsSUFBSWUsT0FBT0MsSUFBUCxDQUFZbkIsZUFBWixFQUE2Qm9CLFFBQTdCLENBQXNDaEIsUUFBdEMsS0FDSEosZ0JBQWdCSSxRQUFoQixDQUF5QkgsUUFBekIsS0FBc0NJLE9BRG5DLElBRUhMLGdCQUFnQkksUUFBaEIsQ0FBeUJGLElBQXpCLEtBQWtDLFVBRm5DLEVBRStDOztBQUU5Q04sd0JBQVksOENBQVo7QUFDQTBCO0FBQ0FoQixjQUFFLGNBQUYsRUFBa0JpQixJQUFsQixDQUF1QixXQUFXbkIsUUFBbEM7QUFDQUUsY0FBRSxXQUFGLEVBQWVpQixJQUFmLENBQW9CLGdCQUFwQjtBQUNBQztBQUNBQyxxQkFBUyxXQUFUO0FBQ0FDO0FBQ0ExQiw0QkFBZ0JJLFFBQWhCLEVBQTBCRCxRQUExQixHQUFxQyxJQUFyQztBQUVQLFNBYk0sTUFhQTtBQUNIRyxjQUFFLFVBQUYsRUFBY1UsTUFBZCwwQ0FDS1csUUFETCxDQUNjLG9CQURkO0FBRUg7QUFDREMsZ0JBQVFDLEdBQVIsQ0FBWXZCLEVBQUUsY0FBRixFQUFrQndCLE1BQTlCO0FBQ0EvQjtBQUNBNkIsZ0JBQVFDLEdBQVIsQ0FBWXZCLEVBQUUsVUFBRixDQUFaOztBQUVBc0IsZ0JBQVFDLEdBQVIsQ0FBWTdCLGVBQVo7QUFDQStCLG1CQUFXLFlBQVk7QUFDbkJ6QixjQUFFLFFBQUYsRUFBWTBCLEtBQVosQ0FBa0IsT0FBbEI7QUFDSCxTQUZELEVBRUcsSUFGSDtBQUdILEtBcEVEOztBQXNFQTFCLE1BQUUsZ0JBQUYsRUFBb0JNLEtBQXBCLENBQTBCLFlBQVc7QUFDakNOLFVBQUUsS0FBRixFQUFTSSxJQUFUO0FBQ0FKLFVBQUUsZ0JBQUYsRUFBb0JJLElBQXBCO0FBQ0FKLFVBQUUsZUFBRixFQUFtQmUsSUFBbkI7QUFDQVo7QUFDQUU7QUFDQXNCO0FBQ0FqQyx3QkFBZ0JJLFFBQWhCLEVBQTBCRCxRQUExQixHQUFxQyxLQUFyQztBQUNBeUIsZ0JBQVFDLEdBQVIsQ0FBWTdCLGVBQVo7QUFFSCxLQVZEO0FBWUgsQ0FuR0Q7O0FBcUdPLFNBQVNKLFdBQVQsQ0FBcUJzQyxPQUFyQixFQUFxRDtBQUFBLFFBQXZCQyxTQUF1Qix1RUFBWCxTQUFXOztBQUN4RDdCLE1BQUUsVUFBRixFQUFjVSxNQUFkLHdCQUEwQ2tCLE9BQTFDLGFBQ0tQLFFBREwsa0JBQzZCUSxTQUQ3Qjs7QUFHQTs7Ozs7Ozs7QUFRQTtBQUVIOztBQUVELFNBQVNiLG1CQUFULEdBQStCO0FBQzNCaEIsTUFBRSxjQUFGLEVBQWtCZSxJQUFsQjtBQUNBZixNQUFFLFdBQUYsRUFBZWUsSUFBZjtBQUNIOztBQUVELFNBQVNWLG1CQUFULEdBQStCO0FBQzNCTCxNQUFFLGNBQUYsRUFBa0JJLElBQWxCO0FBQ0FKLE1BQUUsV0FBRixFQUFlSSxJQUFmO0FBQ0g7O0FBRUQsU0FBU2dCLGVBQVQsR0FBMkI7QUFDdkJwQixNQUFFLGdCQUFGLEVBQW9CSSxJQUFwQjtBQUNBSixNQUFFLGlCQUFGLEVBQXFCSSxJQUFyQjtBQUNIOztBQUVELFNBQVN1QixlQUFULEdBQTJCO0FBQ3ZCM0IsTUFBRSxnQkFBRixFQUFvQmUsSUFBcEI7QUFDQWYsTUFBRSxpQkFBRixFQUFxQmUsSUFBckI7QUFDSDs7QUFFRCxTQUFTSSxRQUFULENBQWtCVyxRQUFsQixFQUE0QjtBQUN4QixRQUFNQyxRQUFRLElBQUlDLEtBQUosQ0FBVSxPQUFWLENBQWQ7QUFDQSxRQUFNQyxXQUFXaEMsU0FBU2lDLGNBQVQsQ0FBd0JKLFFBQXhCLENBQWpCO0FBQ0FHLGFBQVNFLGFBQVQsQ0FBdUJKLEtBQXZCO0FBQ0g7O0FBRUQsU0FBU2IsZ0JBQVQsR0FBNEI7QUFDeEJsQixNQUFFLGdCQUFGLEVBQW9CZSxJQUFwQjtBQUNBZixNQUFFLGVBQUYsRUFBbUJJLElBQW5CO0FBQ0g7O0FBRUQsU0FBU0QsZUFBVCxHQUEyQjtBQUN2QixRQUFNNEIsUUFBUSxJQUFJQyxLQUFKLENBQVUsT0FBVixDQUFkO0FBQ0EsUUFBTUksY0FBY25DLFNBQVNvQyxvQkFBVCxDQUE4QixHQUE5QixFQUFtQyxDQUFuQyxDQUFwQjtBQUNBRCxnQkFBWUQsYUFBWixDQUEwQkosS0FBMUI7QUFDSDs7QUFFTSxTQUFTeEMsa0JBQVQsR0FBOEI7QUFDakMsV0FBT0csZ0JBQWdCSSxRQUFoQixLQUE2QixFQUFDRCxVQUFVLEtBQVgsRUFBcEM7QUFDSDs7QUFFTSxTQUFTTCxvQkFBVCxHQUFnQztBQUNuQyxXQUFPTSxRQUFQO0FBQ0g7O0FBRU0sU0FBU0wsaUJBQVQsR0FBNkI7QUFDaEMsUUFBSTZDLGNBQWN0QyxFQUFFLGNBQUYsRUFBa0J3QixNQUFwQztBQUNJLFFBQUljLGNBQWMsQ0FBbEIsRUFBcUI7QUFDakIsWUFBTUMsVUFBVXRDLFNBQVN1QyxhQUFULENBQXVCLFVBQXZCLENBQWhCO0FBQ0FELGdCQUFRRSxXQUFSLENBQW9CRixRQUFRRyxTQUE1QjtBQUNIO0FBQ1IsQyIsImZpbGUiOiJhdXRoZW50aWNhdGlvbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzXCIpO1xuIiwiLy9pbXBvcnQgd2ViM1Byb3ZpZGVyIGZyb20gJy4uLy4uL3Byb3ZpZGVyL3dlYjNQcm92aWRlcic7XHJcblxyXG52YXIgYXV0aG9yaXplZFVzZXJzID0ge1xyXG4gICAgJzB4MCc6IHtwYXNzd29yZDogJ21hc3RlcicsIHJvbGU6ICdBZ21Pd25lcicsIGxvZ2dlZEluOiBmYWxzZX0sXHJcbiAgICAnMCc6IHtwYXNzd29yZDogJzEyMycsIHJvbGU6ICdTaGFyZWhvbGRlcicsIGxvZ2dlZEluOiBmYWxzZX0sXHJcbiAgICAnMHg1RTM0MDdFNDQ3NTYzNzFCNEQzRGU4MEViNDM3OGI3MTVjNDQ0NjE5Jzoge3Bhc3N3b3JkOiAncHcyJywgcm9sZTogJ0RpcmVjdG9yJywgbG9nZ2VkSW46IGZhbHNlfVxyXG59O1xyXG52YXIgaW5wdXRBZHIsIGlucHV0UFc7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHsgXHJcblxyXG4gICAgc2hvd1dlbGNvbWVQYWdlKCk7XHJcbiAgICAvLyBoaWRlIGxvZ291dCBidXR0b24sIHdlbGNvbWUgbGluayBpbiBzaWRlYmFyIGFuZCB1c2VyIGNyZWRlbnRpYWxzXHJcbiAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmhpZGUoKTtcclxuICAgICQoJ25hdicpLmhpZGUoKTtcclxuICAgIFxyXG4gICAgLypjb25zdCBsaW5rcyA9ICQoJ3VsW2NsYXNzPVwibGlzdC11bnN0eWxlZCBjb21wb25lbnRzXCJdIGEnKTtcclxuICAgIGNvbnNvbGUubG9nKGxpbmtzKTtcclxuICAgICQuZWFjaChsaW5rcywgZnVuY3Rpb24oaW5kZXgsIHZhbCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4LCB2YWwpO1xyXG4gICAgICAgIC8vdmFsLmhpZGUoKTtcclxuICAgICAgICAvLyQoYCMke3ZhbC5hdHRyKCdpZCcpfWApLmhpZGUoKTtcclxuICAgIH0pKi9cclxuICAgIGhpZGVVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgIFxyXG5cclxuICAgICQoJyNsb2dpbi1idXR0b24nKS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBhbGVydFdyYXBwZXIgPSAkKCc8ZGl2IGlkPVwid3JhcHBlclwiPjwvZGl2PicpO1xyXG4gICAgICAgICQoJ2Zvb3RlcicpLmFwcGVuZChhbGVydFdyYXBwZXIpO1xyXG4gICAgICAgIGlucHV0QWRyID0gJCgnI3dhbGxldC1hZGRyZXNzJykudmFsKCk7XHJcbiAgICAgICAgaW5wdXRQVyA9ICQoJyNwYXNzd29yZCcpLnZhbCgpO1xyXG5cclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoYXV0aG9yaXplZFVzZXJzKS5pbmNsdWRlcyhpbnB1dEFkcikgXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucGFzc3dvcmQgPT09IGlucHV0UFdcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5yb2xlID09PSAnQWdtT3duZXInKSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiBhcyBBZ21Pd25lciEnKTtcclxuICAgICAgICAgICAgICAgICQoJ25hdicpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICQoJyNzZXR1cC1saW5rJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3dlbGNvbWUtbGluaycpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQoJyN2b3RpbmctbGluaycpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQoJyNxYS1saW5rJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1VzZXJDcmVkZW50aWFscygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJBZGRyZXNzJykuaHRtbCgnVXNlcjogJyArIGlucHV0QWRyKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyUm9sZScpLmh0bWwoJ1JvbGU6IEFnbU93bmVyJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93TG9nb3V0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICBzaG93VmlldygnaG9tZS1saW5rJyk7XHJcbiAgICAgICAgICAgICAgICBoaWRlTG9naW5GaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ubG9nZ2VkSW4gPSB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3Qua2V5cyhhdXRob3JpemVkVXNlcnMpLmluY2x1ZGVzKGlucHV0QWRyKSBcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5wYXNzd29yZCA9PT0gaW5wdXRQVyBcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5yb2xlID09PSAnU2hhcmVob2xkZXInKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWxlcnQoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4gYXMgU2hhcmVob2xkZXIhJyk7XHJcbiAgICAgICAgICAgICAgICAkKCduYXYnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdm90aW5nLWxpbmsnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjc2V0dXAtbGluaycpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQoJyN3ZWxjb21lLWxpbmsnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBzaG93VXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlckFkZHJlc3MnKS5odG1sKCdVc2VyOiAnICsgaW5wdXRBZHIpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJSb2xlJykuaHRtbCgnUm9sZTogU2hhcmVob2xkZXInKTtcclxuICAgICAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIHNob3dWaWV3KCdob21lLWxpbmsnKTtcclxuICAgICAgICAgICAgICAgIGhpZGVMb2dpbkZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5sb2dnZWRJbiA9IHRydWU7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMoYXV0aG9yaXplZFVzZXJzKS5pbmNsdWRlcyhpbnB1dEFkcilcclxuICAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vycy5pbnB1dEFkci5wYXNzd29yZCA9PT0gaW5wdXRQV1xyXG4gICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzLmlucHV0QWRyLnJvbGUgPT09ICdEaXJlY3RvcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiBhcyBEaXJlY3RvciEnKTtcclxuICAgICAgICAgICAgICAgIHNob3dVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyQWRkcmVzcycpLmh0bWwoJ1VzZXI6ICcgKyBpbnB1dEFkcik7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlclJvbGUnKS5odG1sKCdSb2xlOiBEaXJlY3RvcicpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0xvZ291dEJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1ZpZXcoJ2hvbWUtbGluaycpO1xyXG4gICAgICAgICAgICAgICAgaGlkZUxvZ2luRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI3dyYXBwZXInKS5hcHBlbmQoYDxkaXYgcm9sZT1cImFsZXJ0XCI+TG9naW4gZmFpbGVkITwvZGl2PmApXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FsZXJ0IGFsZXJ0LWRhbmdlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygkKCcjd3JhcHBlciBkaXYnKS5sZW5ndGgpO1xyXG4gICAgICAgIHJlbW92ZVNlY29uZEFsZXJ0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJCgnI3dyYXBwZXInKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coYXV0aG9yaXplZFVzZXJzKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJ25hdicpLmhpZGUoKTtcclxuICAgICAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmhpZGUoKTtcclxuICAgICAgICAkKCcjbG9naW4tYnV0dG9uJykuc2hvdygpO1xyXG4gICAgICAgIHNob3dXZWxjb21lUGFnZSgpO1xyXG4gICAgICAgIGhpZGVVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICBzaG93TG9naW5GaWVsZHMoKTtcclxuICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXV0aG9yaXplZFVzZXJzKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFsZXJ0KG1lc3NhZ2UsIGFsZXJ0VHlwZSA9ICdzdWNjZXNzJykge1xyXG4gICAgJCgnI3dyYXBwZXInKS5hcHBlbmQoYDxkaXYgcm9sZT1cImFsZXJ0XCI+JHttZXNzYWdlfTwvZGl2PmApXHJcbiAgICAgICAgLmFkZENsYXNzKGBhbGVydCBhbGVydC0ke2FsZXJ0VHlwZX1gKTtcclxuXHJcbiAgICAvKmlmIChhbGVydFR5cGUgPT09ICdkYW5nZXInKSB7XHJcbiAgICAgICAgY29uc3QgYUxpbmtzID0gJCgnYScpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYUxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhTGlua3NbaV0uYXR0cignY2xhc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgJCgnYScpW2ldLmF0dHIoJ2NsYXNzJywgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSovXHJcbiAgICAvLyQoJ2FbaHJlZj1cIiNob21lXCJdJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dVc2VyQ3JlZGVudGlhbHMoKSB7XHJcbiAgICAkKCcjdXNlckFkZHJlc3MnKS5zaG93KCk7XHJcbiAgICAkKCcjdXNlclJvbGUnKS5zaG93KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVVc2VyQ3JlZGVudGlhbHMoKSB7XHJcbiAgICAkKCcjdXNlckFkZHJlc3MnKS5oaWRlKCk7XHJcbiAgICAkKCcjdXNlclJvbGUnKS5oaWRlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVMb2dpbkZpZWxkcygpIHtcclxuICAgICQoJyNhZGRyZXNzLWxhYmVsJykuaGlkZSgpO1xyXG4gICAgJCgnI3Bhc3N3b3JkLWxhYmVsJykuaGlkZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93TG9naW5GaWVsZHMoKSB7XHJcbiAgICAkKCcjYWRkcmVzcy1sYWJlbCcpLnNob3coKTtcclxuICAgICQoJyNwYXNzd29yZC1sYWJlbCcpLnNob3coKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1ZpZXcodmlld05hbWUpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCdjbGljaycpO1xyXG4gICAgY29uc3QgaG9tZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWV3TmFtZSk7XHJcbiAgICBob21lTGluay5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0xvZ291dEJ1dHRvbigpIHtcclxuICAgICQoJyNsb2dvdXQtYnV0dG9uJykuc2hvdygpO1xyXG4gICAgJCgnI2xvZ2luLWJ1dHRvbicpLmhpZGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1dlbGNvbWVQYWdlKCkge1xyXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ2NsaWNrJyk7XHJcbiAgICBjb25zdCB3ZWxjb21lTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylbMF07XHJcbiAgICB3ZWxjb21lTGluay5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZVVzZXJTdGF0ZSgpIHtcclxuICAgIHJldHVybiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdIHx8IHtsb2dnZWRJbjogZmFsc2V9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlVXNlckFkZHJlc3MoKSB7XHJcbiAgICByZXR1cm4gaW5wdXRBZHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVTZWNvbmRBbGVydCgpIHtcclxuICAgIHZhciBudW1PZkFsZXJ0cyA9ICQoJyN3cmFwcGVyIGRpdicpLmxlbmd0aDtcclxuICAgICAgICBpZiAobnVtT2ZBbGVydHMgPiAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3JhcHBlcicpOyBcclxuICAgICAgICAgICAgd3JhcHBlci5yZW1vdmVDaGlsZCh3cmFwcGVyLmxhc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==