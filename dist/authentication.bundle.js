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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzIl0sIm5hbWVzIjpbImNyZWF0ZUFsZXJ0IiwiZ2V0QWN0aXZlVXNlciIsImF1dGhvcml6ZWRVc2VycyIsInBhc3N3b3JkIiwicm9sZSIsImxvZ2dlZEluIiwiaW5wdXRBZHIiLCJpbnB1dFBXIiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCJzaG93V2VsY29tZVBhZ2UiLCJhbGVydFdyYXBwZXIiLCJhcHBlbmQiLCJoaWRlIiwib3duZXJBZGRyZXNzIiwibWFzdGVyUFciLCJjbGljayIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInZhbCIsInNob3dVc2VyQ3JlZGVudGlhbHMiLCJzaG93TG9nb3V0QnV0dG9uIiwibG9jYXRpb24iLCJoYXNoIiwiZXZlbnQiLCJFdmVudCIsImhvbWVMaW5rIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJkaXNwYXRjaEV2ZW50IiwiT2JqZWN0Iiwia2V5cyIsImluY2x1ZGVzIiwic2hvdyIsIm1lc3NhZ2UiLCJhbGVydFR5cGUiLCJhZGRDbGFzcyIsInNldFRpbWVvdXQiLCJhbGVydCIsImh0bWwiLCJ3ZWxjb21lTGluayJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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LEtBTEQ7QUFPSCxDQTNERDs7QUE2RE8sU0FBU1gsV0FBVCxDQUFxQmtDLE9BQXJCLEVBQThCQyxTQUE5QixFQUF5QztBQUM1QzNCLE1BQUUsVUFBRixFQUFjSyxNQUFkLHdCQUEwQ3FCLE9BQTFDLGFBQ0tFLFFBREwsa0JBQzZCRCxTQUQ3Qjs7QUFHQUUsZUFBVyxZQUFZO0FBQ25CN0IsVUFBRSxRQUFGLEVBQVk4QixLQUFaLENBQWtCLE9BQWxCO0FBQ0gsS0FGRCxFQUVHLElBRkg7QUFHQTtBQUVIOztBQUVELFNBQVNqQixtQkFBVCxDQUE2QmpCLElBQTdCLEVBQW1DO0FBQy9CSSxNQUFFLGNBQUYsRUFBa0IrQixJQUFsQixDQUF1QixXQUFXakMsUUFBbEM7QUFDQUUsTUFBRSxXQUFGLEVBQWUrQixJQUFmLENBQW9CLFdBQVduQyxJQUEvQjtBQUNIOztBQUVELFNBQVNrQixnQkFBVCxHQUE0QjtBQUN4QmQsTUFBRSxnQkFBRixFQUFvQnlCLElBQXBCO0FBQ0F6QixNQUFFLGVBQUYsRUFBbUJNLElBQW5CO0FBQ0g7O0FBRUQsU0FBU0gsZUFBVCxHQUEyQjtBQUN2QixRQUFNYyxRQUFRLElBQUlDLEtBQUosQ0FBVSxPQUFWLENBQWQ7QUFDQSxRQUFNYyxjQUFjL0IsU0FBU21CLG9CQUFULENBQThCLEdBQTlCLEVBQW1DLENBQW5DLENBQXBCO0FBQ0FZLGdCQUFZWCxhQUFaLENBQTBCSixLQUExQjtBQUNIOztBQUVNLFNBQVN4QixhQUFULEdBQXlCO0FBQzVCLFdBQU9DLGdCQUFnQkksUUFBaEIsS0FBNkIsRUFBQ0QsVUFBVSxLQUFYLEVBQXBDO0FBQ0gsQyIsImZpbGUiOiJhdXRoZW50aWNhdGlvbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi4vc3JjL2FwcC9zY3JpcHRzL2F1dGhlbnRpY2F0aW9uLmpzXCIpO1xuIiwiLy8gaW1wb3J0IHdlYjNQcm92aWRlciBmcm9tICcuLi8uLi9wcm92aWRlci93ZWIzUHJvdmlkZXInO1xyXG52YXIgYXV0aG9yaXplZFVzZXJzID0ge1xyXG4gICAgJzB4NzJjY2NEQkNGYjQ2NGEyNDBjMDI1OTY5YmI5QmI4MURhMDM5MmE5MCc6IHtwYXNzd29yZDogJ3B3MScsIHJvbGU6ICdTaGFyZWhvbGRlcicsIGxvZ2dlZEluOiBmYWxzZX0sXHJcbiAgICAnMHg1RTM0MDdFNDQ3NTYzNzFCNEQzRGU4MEViNDM3OGI3MTVjNDQ0NjE5Jzoge3Bhc3N3b3JkOiAncHcyJywgcm9sZTogJ0RpcmVjdG9yJywgbG9nZ2VkSW46IGZhbHNlfVxyXG59O1xyXG52YXIgaW5wdXRBZHIsIGlucHV0UFc7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHJcbiAgICBzaG93V2VsY29tZVBhZ2UoKTtcclxuICAgIGNvbnN0IGFsZXJ0V3JhcHBlciA9ICQoJzxkaXYgaWQ9XCJ3cmFwcGVyXCI+PC9kaXY+Jyk7XHJcbiAgICAkKCdmb290ZXInKS5hcHBlbmQoYWxlcnRXcmFwcGVyKTtcclxuICAgIC8vIGhpZGUgbG9nb3V0IGJ1dHRvbiBhbmQgd2VsY29tZSBsaW5rIGluIHNpZGViYXJcclxuICAgICQoJyNsb2dvdXQtYnV0dG9uJykuaGlkZSgpO1xyXG4gICAgJCgnI3dlbGNvbWUtbGluaycpLmhpZGUoKTtcclxuICAgIGNvbnN0IG93bmVyQWRkcmVzcyA9ICcweDAnLyp3ZWIzUHJvdmlkZXIuZXRoLmFjY291bnRzWzBdKi87XHJcbiAgICBjb25zdCBtYXN0ZXJQVyA9ICdtYXN0ZXInO1xyXG4gICAgXHJcblxyXG4gICAgJCgnI2xvZ2luLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFsZXJ0V3JhcHBlciA9ICQoJzxkaXYgaWQ9XCJ3cmFwcGVyXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgJCgnZm9vdGVyJykuYXBwZW5kKGFsZXJ0V3JhcHBlcik7XHJcbiAgICAgICAgaW5wdXRBZHIgPSAkKCcjd2FsbGV0LWFkZHJlc3MnKS52YWwoKTtcclxuICAgICAgICBpbnB1dFBXID0gJCgnI3Bhc3N3b3JkJykudmFsKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhpbnB1dEFkciwgaW5wdXRQVyk7XHJcblxyXG4gICAgICAgIGlmIChpbnB1dEFkciA9PT0gb3duZXJBZGRyZXNzICYmIGlucHV0UFcgPT09IG1hc3RlclBXKSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUFsZXJ0KCdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgbG9nZ2VkIGluIGFzIEFnbU93bmVyIScsICdzdWNjZXNzJyk7XHJcbiAgICAgICAgICAgIHNob3dVc2VyQ3JlZGVudGlhbHMoJ0FnbU93bmVyJyk7XHJcbiAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiI2hvbWVcIjtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhvbWVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKVsxXTtcclxuICAgICAgICAgICAgaG9tZUxpbmsuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKGF1dGhvcml6ZWRVc2VycykuaW5jbHVkZXMoaW5wdXRBZHIpIFxyXG4gICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLnBhc3N3b3JkID09PSBpbnB1dFBXIFxyXG4gICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnNbaW5wdXRBZHJdLnJvbGUgPT09ICdTaGFyZWhvbGRlcicpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBbGVydCgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbiBhcyBTaGFyZWhvbGRlciEnLCAnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgc2hvd1VzZXJDcmVkZW50aWFscygnU2hhcmVob2xkZXInKTtcclxuICAgICAgICAgICAgICAgIHNob3dMb2dvdXRCdXR0b24oKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3Qua2V5cyhhdXRob3JpemVkVXNlcnMpLmluY2x1ZGVzKGlucHV0QWRyKVxyXG4gICAgICAgICAgICAgJiYgYXV0aG9yaXplZFVzZXJzLmlucHV0QWRyLnBhc3N3b3JkID09PSBpbnB1dFBXXHJcbiAgICAgICAgICAgICAmJiBhdXRob3JpemVkVXNlcnMuaW5wdXRBZHIucm9sZSA9PT0gJ0RpcmVjdG9yJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGNyZWF0ZUFsZXJ0KCdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgbG9nZ2VkIGluIGFzIERpcmVjdG9yIScsICdzdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgICBzaG93VXNlckNyZWRlbnRpYWxzKCdEaXJlY3RvcicpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0xvZ291dEJ1dHRvbigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjcmVhdGVBbGVydCgnTG9naW4gZmFpbGVkJywgJ2RhbmdlcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNsb2dvdXQtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI2xvZ291dC1idXR0b24nKS5oaWRlKCk7XHJcbiAgICAgICAgJCgnI2xvZ2luLWJ1dHRvbicpLnNob3coKTtcclxuICAgICAgICBzaG93V2VsY29tZVBhZ2UoKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFsZXJ0KG1lc3NhZ2UsIGFsZXJ0VHlwZSkge1xyXG4gICAgJCgnI3dyYXBwZXInKS5hcHBlbmQoYDxkaXYgcm9sZT1cImFsZXJ0XCI+JHttZXNzYWdlfTwvZGl2PmApXHJcbiAgICAgICAgLmFkZENsYXNzKGBhbGVydCBhbGVydC0ke2FsZXJ0VHlwZX1gKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcclxuICAgIH0sIDMwMDApO1xyXG4gICAgLy8kKCdhW2hyZWY9XCIjaG9tZVwiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgIFxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93VXNlckNyZWRlbnRpYWxzKHJvbGUpIHtcclxuICAgICQoJyN1c2VyQWRkcmVzcycpLmh0bWwoJ1VzZXI6ICcgKyBpbnB1dEFkcik7XHJcbiAgICAkKCcjdXNlclJvbGUnKS5odG1sKCdSb2xlOiAnICsgcm9sZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dMb2dvdXRCdXR0b24oKSB7XHJcbiAgICAkKCcjbG9nb3V0LWJ1dHRvbicpLnNob3coKTtcclxuICAgICQoJyNsb2dpbi1idXR0b24nKS5oaWRlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dXZWxjb21lUGFnZSgpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCdjbGljaycpO1xyXG4gICAgY29uc3Qgd2VsY29tZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpWzBdO1xyXG4gICAgd2VsY29tZUxpbmsuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVVc2VyKCkge1xyXG4gICAgcmV0dXJuIGF1dGhvcml6ZWRVc2Vyc1tpbnB1dEFkcl0gfHwge2xvZ2dlZEluOiBmYWxzZX07XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9