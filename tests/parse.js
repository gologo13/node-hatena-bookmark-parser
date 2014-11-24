"use strict";

var assert = require('power-assert');
var fs = require('fs');
var HSD = require('../');

describe('Parse', function() {
    describe('parse from the file path', function() {
        it('should return parsed object of search.data', function(done) {
          HSD.parse('dummy', process.cwd() + '/search.data', function(err, data) {
            assert([
                { title: 'Yahoo! JAPAN',
                  comment: ' ',
                  url: 'http://www.yahoo.co.jp',
                  count: 12354 },
                { title: 'Google',
                  comment: 'this is google',
                  url: 'http://www.google.com',
                  count: 10000 }],
                  data);
            done();
          });
        });
    });
    describe('parse from the URL', function() {
      it('should return error when private hatena account', function(done) {
        HSD.parse('hyu_mu', function(err, data) {
          assert('not found', err.message);
          done();
        });
      });
    });
});
