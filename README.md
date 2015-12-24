# gulp-banner
> A gulp plugin to insert a comment (or other string) at the top of the file.

[![Build Status](https://travis-ci.org/superRaytin/gulp-banner.svg?branch=master)](https://travis-ci.org/superRaytin/gulp-banner)
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

[![gulp-banner](https://nodei.co/npm/gulp-banner.png)](https://npmjs.org/package/gulp-banner)

[npm-url]: https://npmjs.org/package/gulp-banner
[downloads-image]: http://img.shields.io/npm/dm/gulp-banner.svg
[npm-image]: http://img.shields.io/npm/v/gulp-banner.svg

# Installation

```
npm install gulp gulp-banner --save-dev
```

# Quick Start

```js
var gulp = require('gulp');
var banner = require('gulp-banner');
var pkg = require('./package.json');

var comment = '/*\n' +
    ' * <%= pkg.name %> <%= pkg.version %>\n' +
    ' * <%= pkg.description %>\n' +
    ' * <%= pkg.homepage %>\n' +
    ' *\n' +
    ' * Copyright 2015, <%= pkg.author %>\n' +
    ' * Released under the <%= pkg.license %> license.\n' +
    '*/\n\n';

gulp.task('taskName', function() {
    gulp.src('path/to/example.js')
        .pipe(banner(comment, {
            pkg: pkg
        }))
        .pipe(gulp.dest('dist'));
});
```

# Testing

```
npm test
```

# License

MIT, see the [LICENSE](/LICENSE) file for detail.