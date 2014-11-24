"use strict";

var http = require('http');
var fs   = require('fs');

/**
 * Fetch Hatena bookmarks data for the specified hatena user.
 *
 * @param {String} hatenaId hatena ID
 * @param {Function} cb callback
 */
function fetch(hatenaId, source, cb) {
  if (Object.prototype.toString.call(source) === '[object Function]') {
    cb = source;
  }

  if (Object.prototype.toString.call(source) === '[object String]') {
    return fetchFromFilePath(source, cb);
  } else {
    var Url = 'http://b.hatena.ne.jp/' + hatenaId + '/search.data';
    return fetchFromWeb(Url, cb);
  }
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
      url:     b[2]
    });
    bs = bs.slice(3);
  }

  for (var i = 0; i < bs.length; ++i) {
    var elems = bs[i].split('\t');
    result[i].count = parseInt(elems[0]);
    result[i].date  = new Date(parseInt(elems[1]));
  }

  return result;
}

/**
 * fetch bookmark data from URL
 *
 * @param {String} filePath file path where search.data is located
 * @param {Function} cb callback
 */
function fetchFromFilePath(filePath, cb) {
  fs.readFile(filePath, { encoding:'utf8' }, function(err, data) {
    if (err) return cb(err);
    cb(null, parse(data));
  });
}

/**
 * fetch bookmark data from URL
 *
 * @param {String} Url search.data URL
 * @param {Function} cb callback
 */
function fetchFromWeb(Url, cb) {
  http.get(Url, function(res) {
    var body = "";

    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      cb(null, parse(body));
    });
  }).on('error', function(err) {
    cb(err);
  });
}

module.exports = {
  fetch: fetch
};
