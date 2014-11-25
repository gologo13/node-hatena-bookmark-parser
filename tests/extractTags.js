"use strict";

var assert = require('assert');
var HSP = require('../');

describe('extractTags', function() {

  it('parse comment and extract tags', function() {
    var c;

    c = '';
    assert.deepEqual([], HSP.extractTags(c));

    c = '[cookpad][chanko]yes';
    assert.deepEqual(['cookpad', 'chanko'], HSP.extractTags(c));

    c = '[cookpad][chanko][hoge]';
    assert.deepEqual(['cookpad', 'chanko', 'hoge'], HSP.extractTags(c));

    c = 'yes';
    assert.deepEqual([], HSP.extractTags(c));
  });

});
