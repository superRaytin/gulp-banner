'use strict';

var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var through = require('through2');
var template = require('underscore.template');
var utils = require('./utils');

var PLUGIN_NAME = 'gulp-banner';

function gulpBanner(comment, options) {

  if (options && utils.type(options) === 'Object') {
    comment = template(comment, options);
  }

  function transform(file, enc, cb) {
    var self = this;

    if (file.isNull()) {
      self.push(file);
      cb();
    }

    if (file.isStream()) {
      self.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return cb();
    }

    var content = file.contents.toString();

    file.contents = new Buffer(comment + '' + content);
    self.push(file);

    cb();
  }

  return through.obj(transform);
}

module.exports = gulpBanner;