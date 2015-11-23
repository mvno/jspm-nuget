'use strict';

var JspmNuget = function (options, ui) {
  
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
