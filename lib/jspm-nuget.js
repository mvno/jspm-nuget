'use strict';

var path = require('path'),
_ = require('lodash'),
nugetExeMod = require('./nuget-exe'),
fs = require('fs'),
which = require('which'),
rimraf = require('rimraf'),
rsvp = require('rsvp'),
asPromise = rsvp.denodeify,
Promise = rsvp.Promise;

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
    return this.nugetExe.exec(['list', packageName, '-AllVersions'])
      .then(function (stdout) {
        var versionExtractRegex = new RegExp(`^${packageName} (.*)$`),
        listOfStdOut = stdout.split('\r\n').filter(function (item) {
          return item !== undefined && item.length > 0;
        }),
        listOfVersions = _.chain(listOfStdOut)
          .map(function (item) {
            var version = item.match(versionExtractRegex)[1];
            
            return [ version, { hash: version }];
          })
          .zipObject()
          .value();
        
        return { versions: listOfVersions };
      });
  },
  
  // Given a package name, download version into the specified directory
  // return value: Promise containing package.json content
  download: function (packageName, version, hash, meta, dir) {
    var tmpDownloadDir = path.join(this.tmpDir, packageName, version),
    args = [
      'install', packageName,
      '-Version', version,
      '-OutputDirectory', tmpDownloadDir,
      '-NonInteractive'
    ],
    packageInstallDir = path.join(tmpDownloadDir, `${packageName}.${version}`);
    
    return this.nugetExe.exec(args)
      .then(function () {
        return asPromise(rimraf)(dir);
      })
      .then(function () {
        return asPromise(fs.rename)(packageInstallDir, dir);
      })
      .then(function () {
        return readPackageJson(dir);
      });
  }
};

module.exports = JspmNuget;
