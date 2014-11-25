hatena-bookmark-parser - Hatena Bookmark Parser Library
==================

[![Build Status](https://travis-ci.org/gologo13/node-hatena-bookmark-parser.svg?branch=master)](https://travis-ci.org/gologo13/node-hatena-bookmark-parser.svg?branch=master)

[![NPM](https://nodei.co/npm/hatena-bookmark-parser.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/hatena-bookmark-parser/)

## Introduction

The ```hatena-bookmark-parser``` npm module enables you to fetch  and parse [Hatena Bookmark](http://b.hatena.ne.jp) data.
It may take some time to fetch data according to the size of bookmarks. At this time, only public Hatena ID is available to fetch data.

## Installation

```shell
$ npm install hatena-bookmark-parser
```

## Usage

### fetch and parse Hatena bookmarks

Pass a Hatena ID whose bookmarks you want to download to ```fetch``` method.

```javascript
var HSP = require('hatena-bookmark-parser');
HSP.fetch('gologo13', function(err, data) {
  if (err) return console.log(err);
  console.log(data);
});
```

You can get the following console output.

```
[
 {
    // the title of this page
    "title": "This is page title",

    // bookmark comment. this maybe be empty if you didn't any comment
    "comment": "your comment.",

    // tags in your comment. this maybe empty array if you didn't add any tag
    "tags": [],

    // the page url
    "url": "http://www.yahoo.co.jp",

    // the count of bookmarks of this page
    "count": 10,

    // the date when this page was bookmarked
    "date": Tue May 14 2005 23:49:42 GMT+0900 (JST)
  }
]
```

### parse from a local file

First, download the search.data file directly.

```javascript
$ curl http://b.hatena.ne.jp/gologo13/search.data > ~/search.data
```

Second, use ```parse``` method after finish reading data.

```javascript
var fs = require('fs');
var HSP = require('hatena-bookmark-parser');

fs.readFile('~/search.data', {encoding:'utf8'}, function(err, data) {
  if (err) return console.log(err);
  console.log(HSP.parse(data));
});
```

## License

MIT License. Please see the [LICENSE](LICENSE) file for details.
