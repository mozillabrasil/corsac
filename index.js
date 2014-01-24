var fs = require('fs');
var path = require('path');
var program = require('commander');
var colors = require('colors');
var ncp = require('ncp');
var S = require('string');

var packageJSON = require('./package.json');

exports.program = function() {
  return program.version(packageJSON.version);
};

exports.fail = function(msg) {
  if (typeof(msg) == 'object') throw msg;
  console.log("FAIL:".red, msg);
  process.exit(1);
};

exports.templatize = function(filename, values, cb) {
  fs.readFile(filename, {encoding: 'utf-8'}, function(err, data) {
    if (err) return cb(err);

    data = S(data).template(values, '${', '}').toString();
    fs.writeFile(filename, data, cb);
  });
};

exports.copyTemplate = function(options, cb) {
  ncp(__dirname + '/template', options.dirname, {
    clobber: true
  }, function(err) {
    if (err) return cb(err);

    exports.templatize(options.dirname + '/component.html', options, cb);
  });
};

exports.resolve = function(pathname) {
  return path.resolve(__dirname, pathname);
};