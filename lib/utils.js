'use strict';

var utils = {};

// detect object type
utils.type = function(obj) {
  return Object.prototype.toString.call(obj).split(' ')[1].replace(']', '');
};

module.exports = utils;
