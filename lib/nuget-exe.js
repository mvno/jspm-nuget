'use strict';

var childProcess = require('child_process'),
Promise = require('rsvp').Promise;

module.exports = function (nugetExe) {
  return {
    exec: function (args) {
      return new Promise(function (resolve, reject) {
        var options = {};
        childProcess.execFile(nugetExe, args, options, function (err, stdout, stderr) {
          if (err) {
            reject(err);
          } else {
            resolve(stdout);
          }
        });
      });
    }
  };
};
