var fs = require('fs');
var path = require('path');
var program = require('commander');
var colors = require('colors');
var S = require('string');

var packageJSON = require('./package.json');

program.version(packageJSON.version);

exports.program = function() {
  return program;
};

exports.fail = function(msg) {
  if (typeof(msg) == 'object') throw msg;
  console.log("FAIL:".red, msg);
  process.exit(1);
};

exports.info = function(msg) {
  if (typeof(msg) == 'object') throw msg;
  console.log("INFO:".yellow, msg);
};

exports.ok = function(msg) {
  if (typeof(msg) == 'object') throw msg;
  console.log("OK:".green, msg);
};

exports.intro = function() {
  console.log("CORSAC".grey, packageJSON.version);
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

exports.intro();
