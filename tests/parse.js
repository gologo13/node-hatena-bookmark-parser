"use strict";

var fs = require('fs');
var assert = require('assert');
var HSP = require('../');

describe('Parse', function() {
  describe('parse from the file path', function() {

    it('should return parsed object of search.data', function(done) {
      fs.readFile(__dirname+'/search.data', {encoding:'utf8'}, function(err, data) {
        if (err) assert.fail(err.message);
        var obj = [
        { title: 'Yahoo! JAPAN',
          comment: ' ',
          url: 'http://www.yahoo.co.jp',
          count: 12354,
          date: new Date(2005, 1, 10, 18, 29, 36)},
        { title: 'Google',
          comment: 'this is google',
          url: 'http://www.google.com',
          count: 10000,
          date: new Date(2005, 1, 10, 18, 28, 47)}
        ];
        assert.deepEqual(obj, HSP.parse(data));
        done();
      });
    });
  });

});
