var request = require('request');
var Promise = require('bluebird');
var url = 'https://www.inkpad.io/pads';
var _ = require('lodash');

module.exports = function() {
  var ids;
  var args = [].slice.call(arguments, 0);
  var lastArg = _.last(args);
  var options = {
    accept: 'text/x-markdown'
  };

  if (typeof lastArg !== 'string') {
    _.assign(options, lastArg);
    ids = args.slice(0, -1);
  } else {
    ids = args;
  }

  return new Promise(function(resolve, reject) {
    request({
      url: url,
      qs: { ids: ids },
      json: true,
      headers: {
        'Accept': options.accept,
      },
    }, function(error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    })
  });
};
