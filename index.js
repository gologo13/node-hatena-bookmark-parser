"use strict";

var http = require('http');

/**
 * Fetch and parse Hatena bookmark data for the specified hatena user.
 *
 * @param {String} hatenaId hatena ID
 * @param {Function} cb callback
 */
function fetch(hatenaId, cb) {
  var Url = 'http://b.hatena.ne.jp/' + hatenaId + '/search.data';
  http.get(Url, function(res) {
    var body = "";
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var error = null, result;
      if (res.statusCode === 403) {
        error = new Error('permission denied');
      } else if (res.statusCode === 404) {
        error = new Error('not found');
      } else {
        result = parse(body);
      }
      cb(error, result);
    });
  }).on('error', function(err) {
    cb(err);
  });
}

/**
 * Parse search.data string into object
 *
 * @param {String} searchData the string fetched from search.data
 * @return {Object} parsed result. the format follows
 *
 * ```
 * [
 *   {
 *      "title": "This is page title",                  // the title of this page
 *      "comment": "your comment.",                     // your bookmark comment. this maybe be null if you didn't comment
 *      "url": "http://www.yahoo.co.jp",                // the page url
 *      "count": 10,                                    // the count of bookmarks of this page
 *      "date": Tue May 14 2605 23:49:42 GMT+0900 (JST) // the date you bookmarked this page
 *   }
 * ]
 * ```
 */
function parse(searchData) {
  var result = [];

  var bs = searchData.split('\n');
  if (bs[bs.length-1] === '') {
    bs = bs.slice(0,-1);
  }
  var thresholdLinum = bs.length  / 4;

  while (result.length < bs.length) {
    var b = bs.slice(0, 3);
    result.push({
      title:   b[0],
      comment: b[1],
      url:     b[2],
      tags:    extractTags(b[1])
    });
    bs = bs.slice(3);
  }

  for (var i = 0; i < bs.length; ++i) {
    var elems = bs[i].split('\t');
    result[i].count = parseInt(elems[0]);
    var d = ((/^(\d\d\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/).exec(elems[1])||[]).slice(1);
    result[i].date  = new Date(d[0], d[1]-1, d[2], d[3], d[4], d[5]);
  }

  return result;
}

/**
 * extract tags from a bookmark comment
 *
 * @param {String} comment A bookmark comment
 * @return {Array} tags
 */
function extractTags(comment) {
  var tags = [], tag = '';
  var inBrace = false;
  for (var i=0; comment[i] !== undefined; ++i) {
    var c = comment[i];
    if (c !== '[' && !inBrace) continue;
    if (c === '[') { inBrace = true; continue; }
    if (c === ']' && inBrace) {
      inBrace = false;
      tags.push(tag);
      tag = '';
      continue;
    }
    if (inBrace) { tag += c; }
  }
  return tags;
}

module.exports = {
  fetch: fetch,
  parse: parse,
  extractTags: extractTags
};
