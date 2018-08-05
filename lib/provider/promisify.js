"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (inner) {
  return new Promise(function (resolve, reject) {
    return inner(function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};