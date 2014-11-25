"use strict";

var fs = require('fs');
var assert = require('assert');
var HSP = require('../');

describe('Parse', function() {
  it('should return parsed object of search.data', function(done) {

    var opt = {encoding:'utf8'};
    fs.readFile(__dirname+'/search.data', opt, function(err, data) {
      if (err) assert.fail(err.message);
      var obj = [
      { title: 'Yahoo! JAPAN',
        comment: ' ',
        url: 'http://www.yahoo.co.jp',
        count: 12354,
        tags: [],
        date: new Date(2005, 1, 10, 18, 29, 36)},
      { title: 'Google',
        comment: 'this is google',
        url: 'http://www.google.com',
        count: 10000,
        tags: [],
        date: new Date(2005, 1, 10, 18, 28, 47)},
      { title: 'Amazon',
        comment: '[amazon][shopping] nice site',
        url: 'https://www.amazon.com',
        count: 9999,
        tags: ['amazon', 'shopping'],
        date: new Date(2005, 1, 10, 18, 20, 0)}
      ];
      assert.deepEqual(obj, HSP.parse(data));
      done();
    });
  });
});
