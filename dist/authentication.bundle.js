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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzIl0sIm5hbWVzIjpbImNyZWF0ZUFsZXJ0IiwiZ2V0QWN0aXZlVXNlclN0YXRlIiwiZ2V0QWN0aXZlVXNlckFkZHJlc3MiLCJyZW1vdmVTZWNvbmRBbGVydCIsImF1dGhvcml6ZWRVc2VycyIsInBhc3N3b3JkIiwicm9sZSIsImxvZ2dlZEluIiwiaW5wdXRBZHIiLCJpbnB1dFBXIiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCJzaG93V2VsY29tZVBhZ2UiLCJoaWRlIiwiaGlkZVVzZXJDcmVkZW50aWFscyIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwiYWxlcnRXcmFwcGVyIiwiYXBwZW5kIiwidmFsIiwiT2JqZWN0Iiwia2V5cyIsImluY2x1ZGVzIiwic2hvd1VzZXJDcmVkZW50aWFscyIsImh0bWwiLCJzaG93TG9nb3V0QnV0dG9uIiwic2hvd1ZpZXciLCJzaG93IiwiaGlkZUxvZ2luRmllbGRzIiwiYWRkQ2xhc3MiLCJjb25zb2xlIiwibG9nIiwibGVuZ3RoIiwic2V0VGltZW91dCIsImFsZXJ0Iiwic2hvd0xvZ2luRmllbGRzIiwibWVzc2FnZSIsImFsZXJ0VHlwZSIsInZpZXdOYW1lIiwiZXZlbnQiLCJFdmVudCIsImhvbWVMaW5rIiwiZ2V0RWxlbWVudEJ5SWQiLCJkaXNwYXRjaEV2ZW50Iiwid2VsY29tZUxpbmsiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIm51bU9mQWxlcnRzIiwid3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJyZW1vdmVDaGlsZCIsImxhc3RDaGlsZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7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bUMsQ0FBbkMsQ0FBcEI7QUFDQUQsZ0JBQVlELGFBQVosQ0FBMEJKLEtBQTFCO0FBQ0g7O0FBRU0sU0FBU3hDLGtCQUFULEdBQThCO0FBQ2pDLFdBQU9HLGdCQUFnQkksUUFBaEIsS0FBNkIsRUFBQ0QsVUFBVSxLQUFYLEVBQXBDO0FBQ0g7O0FBRU0sU0FBU0wsb0JBQVQsR0FBZ0M7QUFDbkMsV0FBT00sUUFBUDtBQUNIOztBQUVNLFNBQVNMLGlCQUFULEdBQTZCO0FBQ2hDLFFBQUk2QyxjQUFjdEMsRUFBRSxjQUFGLEVBQWtCd0IsTUFBcEM7QUFDSSxRQUFJYyxjQUFjLENBQWxCLEVBQXFCO0FBQ2pCLFlBQU1DLFVBQVV0QyxTQUFTdUMsYUFBVCxDQUF1QixVQUF2QixDQUFoQjtBQUNBRCxnQkFBUUUsV0FBUixDQUFvQkYsUUFBUUcsU0FBNUI7QUFDSDtBQUNSOztBQUVELHdCIiwiZmlsZSI6ImF1dGhlbnRpY2F0aW9uLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuLi9zcmMvYXBwL3NjcmlwdHMvYXV0aGVudGljYXRpb24uanNcIik7XG4iLCIvLyBpbXBvcnQgd2ViM1Byb3ZpZGVyIGZyb20gJy4uLy4uL3Byb3ZpZGVyL3dlYjNQcm92aWRlcic7XHJcbnZhciBhdXRob3JpemVkVXNlcnMgPSB7XHJcbiAgICAnMHgwJzoge3Bhc3N3b3JkOiAnbWFzdGVyJywgcm9sZTogJ0FnbU93bmVyJywgbG9nZ2VkSW46IGZhbHNlfSxcclxuICAgICcweDcyY2NjREJDRmI0NjRhMjQwYzAyNTk2OWJiOUJiODFEYTAzOTJhOTAnOiB7cGFzc3dvcmQ6ICdwdzEnLCByb2xlOiAnU2hhcmVob2xkZXInLCBsb2dnZWRJbjogZmFsc2V9LFxyXG4gICAgJzB4NUUzNDA3RTQ0NzU2MzcxQjREM0RlODBFYjQzNzhiNzE1YzQ0NDYxOSc6IHtwYXNzd29yZDogJ3B3MicsIHJvbGU6ICdEaXJlY3RvcicsIGxvZ2dlZEluOiBmYWxzZX1cclxufTtcclxudmFyIGlucHV0QWRyLCBpbnB1dFBXO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgc2hvd1dlbGNvbWVQYWdlKCk7XHJcbiAgICAvLyBoaWRlIGxvZ291dCBidXR0b24sIHdlbGNvbWUgbGluayBpbiBzaWRlYmFyIGFuZCB1c2VyIGNyZWRlbnRpYWxzXHJcbiAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmhpZGUoKTtcclxuICAgICQoJyN3ZWxjb21lLWxpbmsnKS5oaWRlKCk7XHJcbiAgICAkKCcjc2V0dXAtbGluaycpLmhpZGUoKTtcclxuICAgIGhpZGVVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgIFxyXG5cclxuICAgICQoJyNsb2dpbi1idXR0b24nKS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBhbGVydFdyYXBwZXIgPSAkKCc8ZGl2IGlkPVwid3JhcHBlclwiPjwvZGl2PicpO1xyXG4gICAgICAgICQoJ2Zvb3RlcicpLmFwcGVuZChhbGVydFdyYXBwZXIpO1xyXG4gICAgICAgIGlucHV0QWRyID0gJCgnI3dhbGxldC1hZGRyZXNzJykudmFsKCk7XHJcbiAgICAgICAgaW5wdXRQVyA9ICQoJyNwYXNzd29yZCcpLnZhbCgpO1xyXG5cclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoYXV0aG9yaXplZFVzZXJzKS5pbmNsdWRlcyhpbnB1dEFkcikgXHJcbiAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ucGFzc3dvcmQgPT09IGlucHV0UFdcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5yb2xlID09PSAnQWdtT3duZXInKSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiBhcyBBZ21Pd25lciEnKTtcclxuICAgICAgICAgICAgICAgIHNob3dVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyQWRkcmVzcycpLmh0bWwoJ1VzZXI6ICcgKyBpbnB1dEFkcik7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlclJvbGUnKS5odG1sKCdSb2xlOiBBZ21Pd25lcicpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0xvZ291dEJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1ZpZXcoJ2hvbWUtbGluaycpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3NldHVwLWxpbmsnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICBoaWRlTG9naW5GaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ubG9nZ2VkSW4gPSB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3Qua2V5cyhhdXRob3JpemVkVXNlcnMpLmluY2x1ZGVzKGlucHV0QWRyKSBcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5wYXNzd29yZCA9PT0gaW5wdXRQVyBcclxuICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5yb2xlID09PSAnU2hhcmVob2xkZXInKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWxlcnQoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBsb2dnZWQgaW4gYXMgU2hhcmVob2xkZXIhJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93VXNlckNyZWRlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlckFkZHJlc3MnKS5odG1sKCdVc2VyOiAnICsgaW5wdXRBZHIpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3VzZXJSb2xlJykuaHRtbCgnUm9sZTogU2hhcmVob2xkZXInKTtcclxuICAgICAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIHNob3dWaWV3KCdob21lLWxpbmsnKTtcclxuICAgICAgICAgICAgICAgIGhpZGVMb2dpbkZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZFVzZXJzW2lucHV0QWRyXS5sb2dnZWRJbiA9IHRydWU7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMoYXV0aG9yaXplZFVzZXJzKS5pbmNsdWRlcyhpbnB1dEFkcilcclxuICAgICAgICAgICAgICYmIGF1dGhvcml6ZWRVc2Vycy5pbnB1dEFkci5wYXNzd29yZCA9PT0gaW5wdXRQV1xyXG4gICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzLmlucHV0QWRyLnJvbGUgPT09ICdEaXJlY3RvcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiBhcyBEaXJlY3RvciEnKTtcclxuICAgICAgICAgICAgICAgIHNob3dVc2VyQ3JlZGVudGlhbHMoKTtcclxuICAgICAgICAgICAgICAgICQoJyN1c2VyQWRkcmVzcycpLmh0bWwoJ1VzZXI6ICcgKyBpbnB1dEFkcik7XHJcbiAgICAgICAgICAgICAgICAkKCcjdXNlclJvbGUnKS5odG1sKCdSb2xlOiBEaXJlY3RvcicpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0xvZ291dEJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1ZpZXcoJ2hvbWUtbGluaycpO1xyXG4gICAgICAgICAgICAgICAgaGlkZUxvZ2luRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLmxvZ2dlZEluID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI3dyYXBwZXInKS5hcHBlbmQoYDxkaXYgcm9sZT1cImFsZXJ0XCI+TG9naW4gZmFpbGVkITwvZGl2PmApXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FsZXJ0IGFsZXJ0LWRhbmdlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygkKCcjd3JhcHBlciBkaXYnKS5sZW5ndGgpO1xyXG4gICAgICAgIHJlbW92ZVNlY29uZEFsZXJ0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJCgnI3dyYXBwZXInKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coYXV0aG9yaXplZFVzZXJzKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyNsb2dvdXQtYnV0dG9uJykuaGlkZSgpO1xyXG4gICAgICAgICQoJyNsb2dpbi1idXR0b24nKS5zaG93KCk7XHJcbiAgICAgICAgc2hvd1dlbGNvbWVQYWdlKCk7XHJcbiAgICAgICAgaGlkZVVzZXJDcmVkZW50aWFscygpO1xyXG4gICAgICAgIHNob3dMb2dpbkZpZWxkcygpO1xyXG4gICAgICAgIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0ubG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhhdXRob3JpemVkVXNlcnMpO1xyXG5cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWxlcnQobWVzc2FnZSwgYWxlcnRUeXBlID0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAkKCcjd3JhcHBlcicpLmFwcGVuZChgPGRpdiByb2xlPVwiYWxlcnRcIj4ke21lc3NhZ2V9PC9kaXY+YClcclxuICAgICAgICAuYWRkQ2xhc3MoYGFsZXJ0IGFsZXJ0LSR7YWxlcnRUeXBlfWApO1xyXG5cclxuICAgIC8qaWYgKGFsZXJ0VHlwZSA9PT0gJ2RhbmdlcicpIHtcclxuICAgICAgICBjb25zdCBhTGlua3MgPSAkKCdhJyk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhTGlua3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFMaW5rc1tpXS5hdHRyKCdjbGFzcycpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdhJylbaV0uYXR0cignY2xhc3MnLCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuICAgIC8vJCgnYVtocmVmPVwiI2hvbWVcIl0nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICBcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1VzZXJDcmVkZW50aWFscygpIHtcclxuICAgICQoJyN1c2VyQWRkcmVzcycpLnNob3coKTtcclxuICAgICQoJyN1c2VyUm9sZScpLnNob3coKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZVVzZXJDcmVkZW50aWFscygpIHtcclxuICAgICQoJyN1c2VyQWRkcmVzcycpLmhpZGUoKTtcclxuICAgICQoJyN1c2VyUm9sZScpLmhpZGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZUxvZ2luRmllbGRzKCkge1xyXG4gICAgJCgnI2FkZHJlc3MtbGFiZWwnKS5oaWRlKCk7XHJcbiAgICAkKCcjcGFzc3dvcmQtbGFiZWwnKS5oaWRlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dMb2dpbkZpZWxkcygpIHtcclxuICAgICQoJyNhZGRyZXNzLWxhYmVsJykuc2hvdygpO1xyXG4gICAgJCgnI3Bhc3N3b3JkLWxhYmVsJykuc2hvdygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93Vmlldyh2aWV3TmFtZSkge1xyXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ2NsaWNrJyk7XHJcbiAgICBjb25zdCBob21lTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZpZXdOYW1lKTtcclxuICAgIGhvbWVMaW5rLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93TG9nb3V0QnV0dG9uKCkge1xyXG4gICAgJCgnI2xvZ291dC1idXR0b24nKS5zaG93KCk7XHJcbiAgICAkKCcjbG9naW4tYnV0dG9uJykuaGlkZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93V2VsY29tZVBhZ2UoKSB7XHJcbiAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCgnY2xpY2snKTtcclxuICAgIGNvbnN0IHdlbGNvbWVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKVswXTtcclxuICAgIHdlbGNvbWVMaW5rLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlVXNlclN0YXRlKCkge1xyXG4gICAgcmV0dXJuIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0gfHwge2xvZ2dlZEluOiBmYWxzZX07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVVc2VyQWRkcmVzcygpIHtcclxuICAgIHJldHVybiBpbnB1dEFkcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVNlY29uZEFsZXJ0KCkge1xyXG4gICAgdmFyIG51bU9mQWxlcnRzID0gJCgnI3dyYXBwZXIgZGl2JykubGVuZ3RoO1xyXG4gICAgICAgIGlmIChudW1PZkFsZXJ0cyA+IDEpIHtcclxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cmFwcGVyJyk7IFxyXG4gICAgICAgICAgICB3cmFwcGVyLnJlbW92ZUNoaWxkKHdyYXBwZXIubGFzdENoaWxkKTtcclxuICAgICAgICB9XHJcbn1cclxuXHJcbi8vIHN0YXJ0IG9mIG1hbmFnZVNQQS5qcyJdLCJzb3VyY2VSb290IjoiIn0=