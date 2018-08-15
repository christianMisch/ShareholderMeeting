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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzIl0sIm5hbWVzIjpbImNyZWF0ZUFsZXJ0IiwiZ2V0QWN0aXZlVXNlclN0YXRlIiwiZ2V0QWN0aXZlVXNlckFkZHJlc3MiLCJyZW1vdmVTZWNvbmRBbGVydCIsImF1dGhvcml6ZWRVc2VycyIsInBhc3N3b3JkIiwicm9sZSIsImxvZ2dlZEluIiwiaW5wdXRBZHIiLCJpbnB1dFBXIiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCJzaG93V2VsY29tZVBhZ2UiLCJoaWRlIiwiaGlkZVVzZXJDcmVkZW50aWFscyIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwiYWxlcnRXcmFwcGVyIiwiYXBwZW5kIiwidmFsIiwiT2JqZWN0Iiwia2V5cyIsImluY2x1ZGVzIiwic2hvd1VzZXJDcmVkZW50aWFscyIsImh0bWwiLCJzaG93TG9nb3V0QnV0dG9uIiwic2hvd1ZpZXciLCJzaG93IiwiaGlkZUxvZ2luRmllbGRzIiwiYWRkQ2xhc3MiLCJjb25zb2xlIiwibG9nIiwibGVuZ3RoIiwic2V0VGltZW91dCIsImFsZXJ0Iiwic2hvd0xvZ2luRmllbGRzIiwibWVzc2FnZSIsImFsZXJ0VHlwZSIsInZpZXdOYW1lIiwiZXZlbnQiLCJFdmVudCIsImhvbWVMaW5rIiwiZ2V0RWxlbWVudEJ5SWQiLCJkaXNwYXRjaEV2ZW50Iiwid2VsY29tZUxpbmsiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIm51bU9mQWxlcnRzIiwid3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJyZW1vdmVDaGlsZCIsImxhc3RDaGlsZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7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QW1DLENBQW5DLENBQXBCO0FBQ0FELGdCQUFZRCxhQUFaLENBQTBCSixLQUExQjtBQUNIOztBQUVNLFNBQVN4QyxrQkFBVCxHQUE4QjtBQUNqQyxXQUFPRyxnQkFBZ0JJLFFBQWhCLEtBQTZCLEVBQUNELFVBQVUsS0FBWCxFQUFwQztBQUNIOztBQUVNLFNBQVNMLG9CQUFULEdBQWdDO0FBQ25DLFdBQU9NLFFBQVA7QUFDSDs7QUFFTSxTQUFTTCxpQkFBVCxHQUE2QjtBQUNoQyxRQUFJNkMsY0FBY3RDLEVBQUUsY0FBRixFQUFrQndCLE1BQXBDO0FBQ0ksUUFBSWMsY0FBYyxDQUFsQixFQUFxQjtBQUNqQixZQUFNQyxVQUFVdEMsU0FBU3VDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBaEI7QUFDQUQsZ0JBQVFFLFdBQVIsQ0FBb0JGLFFBQVFHLFNBQTVCO0FBQ0g7QUFDUixDIiwiZmlsZSI6ImF1dGhlbnRpY2F0aW9uLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuLi9zcmMvYXBwL3NjcmlwdHMvYXV0aGVudGljYXRpb24uanNcIik7XG4iLCIvL2ltcG9ydCB3ZWIzUHJvdmlkZXIgZnJvbSAnLi4vLi4vcHJvdmlkZXIvd2ViM1Byb3ZpZGVyJztcclxuXHJcbnZhciBhdXRob3JpemVkVXNlcnMgPSB7XHJcbiAgICAnMHgwJzoge3Bhc3N3b3JkOiAnbWFzdGVyJywgcm9sZTogJ0FnbU93bmVyJywgbG9nZ2VkSW46IGZhbHNlfSxcclxuICAgICcweDcyY2NjREJDRmI0NjRhMjQwYzAyNTk2OWJiOUJiODFEYTAzOTJhOTAnOiB7cGFzc3dvcmQ6ICdwdzEnLCByb2xlOiAnU2hhcmVob2xkZXInLCBsb2dnZWRJbjogZmFsc2V9LFxyXG4gICAgJzB4NUUzNDA3RTQ0NzU2MzcxQjREM0RlODBFYjQzNzhiNzE1YzQ0NDYxOSc6IHtwYXNzd29yZDogJ3B3MicsIHJvbGU6ICdEaXJlY3RvcicsIGxvZ2dlZEluOiBmYWxzZX1cclxufTtcclxudmFyIGlucHV0QWRyLCBpbnB1dFBXO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7IFxyXG5cclxuICAgIHNob3dXZWxjb21lUGFnZSgpO1xyXG4gICAgLy8gaGlkZSBsb2dvdXQgYnV0dG9uLCB3ZWxjb21lIGxpbmsgaW4gc2lkZWJhciBhbmQgdXNlciBjcmVkZW50aWFsc1xyXG4gICAgJCgnI2xvZ291dC1idXR0b24nKS5oaWRlKCk7XHJcbiAgICAkKCcjd2VsY29tZS1saW5rJykuaGlkZSgpO1xyXG4gICAgJCgnI3NldHVwLWxpbmsnKS5oaWRlKCk7XHJcbiAgICBoaWRlVXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICBcclxuXHJcbiAgICAkKCcjbG9naW4tYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgYWxlcnRXcmFwcGVyID0gJCgnPGRpdiBpZD1cIndyYXBwZXJcIj48L2Rpdj4nKTtcclxuICAgICAgICAkKCdmb290ZXInKS5hcHBlbmQoYWxlcnRXcmFwcGVyKTtcclxuICAgICAgICBpbnB1dEFkciA9ICQoJyN3YWxsZXQtYWRkcmVzcycpLnZhbCgpO1xyXG4gICAgICAgIGlucHV0UFcgPSAkKCcjcGFzc3dvcmQnKS52YWwoKTtcclxuXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGF1dGhvcml6ZWRVc2VycykuaW5jbHVkZXMoaW5wdXRBZHIpIFxyXG4gICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLnBhc3N3b3JkID09PSBpbnB1dFBXXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucm9sZSA9PT0gJ0FnbU93bmVyJykge1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWxlcnQoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4gYXMgQWdtT3duZXIhJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93VXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlckFkZHJlc3MnKS5odG1sKCdVc2VyOiAnICsgaW5wdXRBZHIpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJSb2xlJykuaHRtbCgnUm9sZTogQWdtT3duZXInKTtcclxuICAgICAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIHNob3dWaWV3KCdob21lLWxpbmsnKTtcclxuICAgICAgICAgICAgICAgICQoJyNzZXR1cC1saW5rJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgaGlkZUxvZ2luRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMoYXV0aG9yaXplZFVzZXJzKS5pbmNsdWRlcyhpbnB1dEFkcikgXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucGFzc3dvcmQgPT09IGlucHV0UFcgXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucm9sZSA9PT0gJ1NoYXJlaG9sZGVyJykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUFsZXJ0KCdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgbG9nZ2VkIGluIGFzIFNoYXJlaG9sZGVyIScpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1VzZXJDcmVkZW50aWFscygpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJBZGRyZXNzJykuaHRtbCgnVXNlcjogJyArIGlucHV0QWRyKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyUm9sZScpLmh0bWwoJ1JvbGU6IFNoYXJlaG9sZGVyJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93TG9nb3V0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICBzaG93VmlldygnaG9tZS1saW5rJyk7XHJcbiAgICAgICAgICAgICAgICBoaWRlTG9naW5GaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ubG9nZ2VkSW4gPSB0cnVlO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKGF1dGhvcml6ZWRVc2VycykuaW5jbHVkZXMoaW5wdXRBZHIpXHJcbiAgICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnMuaW5wdXRBZHIucGFzc3dvcmQgPT09IGlucHV0UFdcclxuICAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vycy5pbnB1dEFkci5yb2xlID09PSAnRGlyZWN0b3InKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWxlcnQoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4gYXMgRGlyZWN0b3IhJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93VXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlckFkZHJlc3MnKS5odG1sKCdVc2VyOiAnICsgaW5wdXRBZHIpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJSb2xlJykuaHRtbCgnUm9sZTogRGlyZWN0b3InKTtcclxuICAgICAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIHNob3dWaWV3KCdob21lLWxpbmsnKTtcclxuICAgICAgICAgICAgICAgIGhpZGVMb2dpbkZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5sb2dnZWRJbiA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyN3cmFwcGVyJykuYXBwZW5kKGA8ZGl2IHJvbGU9XCJhbGVydFwiPkxvZ2luIGZhaWxlZCE8L2Rpdj5gKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhbGVydCBhbGVydC1kYW5nZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJCgnI3dyYXBwZXIgZGl2JykubGVuZ3RoKTtcclxuICAgICAgICByZW1vdmVTZWNvbmRBbGVydCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCQoJyN3cmFwcGVyJykpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGF1dGhvcml6ZWRVc2Vycyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2xvZ291dC1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmhpZGUoKTtcclxuICAgICAgICAkKCcjbG9naW4tYnV0dG9uJykuc2hvdygpO1xyXG4gICAgICAgIHNob3dXZWxjb21lUGFnZSgpO1xyXG4gICAgICAgIGhpZGVVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICBzaG93TG9naW5GaWVsZHMoKTtcclxuICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXV0aG9yaXplZFVzZXJzKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFsZXJ0KG1lc3NhZ2UsIGFsZXJ0VHlwZSA9ICdzdWNjZXNzJykge1xyXG4gICAgJCgnI3dyYXBwZXInKS5hcHBlbmQoYDxkaXYgcm9sZT1cImFsZXJ0XCI+JHttZXNzYWdlfTwvZGl2PmApXHJcbiAgICAgICAgLmFkZENsYXNzKGBhbGVydCBhbGVydC0ke2FsZXJ0VHlwZX1gKTtcclxuXHJcbiAgICAvKmlmIChhbGVydFR5cGUgPT09ICdkYW5nZXInKSB7XHJcbiAgICAgICAgY29uc3QgYUxpbmtzID0gJCgnYScpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYUxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhTGlua3NbaV0uYXR0cignY2xhc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgJCgnYScpW2ldLmF0dHIoJ2NsYXNzJywgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSovXHJcbiAgICAvLyQoJ2FbaHJlZj1cIiNob21lXCJdJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dVc2VyQ3JlZGVudGlhbHMoKSB7XHJcbiAgICAkKCcjdXNlckFkZHJlc3MnKS5zaG93KCk7XHJcbiAgICAkKCcjdXNlclJvbGUnKS5zaG93KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVVc2VyQ3JlZGVudGlhbHMoKSB7XHJcbiAgICAkKCcjdXNlckFkZHJlc3MnKS5oaWRlKCk7XHJcbiAgICAkKCcjdXNlclJvbGUnKS5oaWRlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVMb2dpbkZpZWxkcygpIHtcclxuICAgICQoJyNhZGRyZXNzLWxhYmVsJykuaGlkZSgpO1xyXG4gICAgJCgnI3Bhc3N3b3JkLWxhYmVsJykuaGlkZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93TG9naW5GaWVsZHMoKSB7XHJcbiAgICAkKCcjYWRkcmVzcy1sYWJlbCcpLnNob3coKTtcclxuICAgICQoJyNwYXNzd29yZC1sYWJlbCcpLnNob3coKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1ZpZXcodmlld05hbWUpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCdjbGljaycpO1xyXG4gICAgY29uc3QgaG9tZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWV3TmFtZSk7XHJcbiAgICBob21lTGluay5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0xvZ291dEJ1dHRvbigpIHtcclxuICAgICQoJyNsb2dvdXQtYnV0dG9uJykuc2hvdygpO1xyXG4gICAgJCgnI2xvZ2luLWJ1dHRvbicpLmhpZGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1dlbGNvbWVQYWdlKCkge1xyXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ2NsaWNrJyk7XHJcbiAgICBjb25zdCB3ZWxjb21lTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylbMF07XHJcbiAgICB3ZWxjb21lTGluay5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZVVzZXJTdGF0ZSgpIHtcclxuICAgIHJldHVybiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdIHx8IHtsb2dnZWRJbjogZmFsc2V9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlVXNlckFkZHJlc3MoKSB7XHJcbiAgICByZXR1cm4gaW5wdXRBZHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVTZWNvbmRBbGVydCgpIHtcclxuICAgIHZhciBudW1PZkFsZXJ0cyA9ICQoJyN3cmFwcGVyIGRpdicpLmxlbmd0aDtcclxuICAgICAgICBpZiAobnVtT2ZBbGVydHMgPiAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3JhcHBlcicpOyBcclxuICAgICAgICAgICAgd3JhcHBlci5yZW1vdmVDaGlsZCh3cmFwcGVyLmxhc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==