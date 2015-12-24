
var path = require('path');
var should = require('should');
var gutil = require('gulp-util');
var gulpBanner = require('../lib/index');
var template = require('underscore.template');

var comment = '/* i am a comment */';

function createFakeFile(filename, contents) {
  return new gutil.File({
    cwd: process.cwd(),
    base: path.join(__dirname),
    path: path.join(__dirname, filename),
    contents: contents
  });
}

describe('gulp-banner', function() {
  it('works', function(done) {
    var str = 'function test(){}';
    var fakeFile = createFakeFile('normal.js', new Buffer(str));
    gulpBanner(comment).once('data', function(bundled) {
      should.exist(bundled.contents);
      bundled.contents.toString().should.equal(comment + str);
      done();
    }).end(fakeFile);
  });

  it('multi-line', function(done) {
    comment = '/* i am a comment */\n\n';
    var str = 'function test(){}\n\nvar abc=1';
    var fakeFile = createFakeFile('normal.js', new Buffer(str));
    gulpBanner(comment).once('data', function(bundled) {
      should.exist(bundled.contents);
      bundled.contents.toString().should.equal(comment + str);
      done();
    }).end(fakeFile);
  });
});

describe('template', function() {
  it('template single line', function() {
    comment = '/* i am a <%= pkg.name %> <%= content %> comment */';
    template(comment, {
      pkg: {
        name: 'awesome'
      },
      content: 'project'
    }).should.equal('/* i am a awesome project comment */');
  });

  it('template multiple line', function() {
    comment = '/*\n' +
        ' * <%= pkg.name %> <%= pkg.version %>\n' +
        ' * <%= pkg.name %> <%= pkg.version %>\n' +
        '*/\n\n';
    var res = '/*\n' +
        ' * awesome 0.1.2\n' +
        ' * awesome 0.1.2\n' +
        '*/\n\n';
    template(comment, {
      pkg: {
        name: 'awesome',
        version: '0.1.2'
      }
    }).should.equal(res);
  });
});