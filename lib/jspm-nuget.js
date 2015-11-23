'use strict';

var path = require('path'),
nugetExeMod = require('./nuget-exe'),
fs = require('fs'),
which = require('which'),
Promise = require('rsvp').Promise;

var readPackageJson = function (dir) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path.join(dir, 'package.json'), 'utf8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      }
    });
  });
};

var JspmNuget = function (options, ui) {
  this.tmpDir = options.tmpDir;

  if (!this.tmpDir) {
    throw 'No tmpDir supplied';
  }

  try {
    var nugetExeLocation = which.sync('NuGet.exe');
    this.nugetExe = nugetExeMod(nugetExeLocation);
  } catch(ex) {
    throw 'NuGet.exe is not in path. Please download it from https://www.nuget.org/nuget.exe and place it in PATH.';
  }
};

// static configuration function
JspmNuget.configure = function(config, ui) {
  
};

// regular expression to verify package names
JspmNuget.packageFormat = /^[^\/]+\/[^\/]+/;

JspmNuget.prototype = {
  // Given a package name, return a list of versions of the looked up package name
  // return values
  // { versions: versions: {
  //     '1.2.3': { hash: 'asdf' },
  //     'branch-name': { hash: '8j3mjw8fwef7a', stable: false, meta: { custom: 'lookup data' } }
  // } }
  // OR
  // { notfound: true }
  lookup: function (packageName) {

  },
  
  // Given a package name, download version into the specified directory
  // return value: Promise containing package.json content
  download: function (packageName, version, hash, meta, dir) {
    
  }
};

module.exports = JspmNuget;
