'use strict';

var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');
var gulpif = require('gulp-if');
var print = require('gulp-print');
var rename = require('gulp-rename');
var wiredep = require('wiredep').stream;
var symlink = require('gulp-symlink');
var rimraf = require('gulp-rimraf');
var uglify = require('gulp-uglify');
var webkitAssign = require('webkit-assign/gulp');
var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('inject', ['partials', 'styles', 'config', 'webkitFix'], function () {
  var injectStyles = gulp.src([
    paths.src + '/assets/css/incrowd-custom-theme.css',
    paths.src + '/assets/css/*.css',
    paths.src + '/components/**/*.css',
    '!' + paths.tmp + '/serve/app/vendor.css'
  ], {read: false});

  var injectScripts = gulp.src([
    paths.src + '/{app,components}/**/*.js',
    '!' + paths.src + '/angular.js',
    '!' + paths.src + '/settings.js',
    '!' + paths.src + '/app/js/config.js',
    '!' + paths.src + '/{app,components}/**/*.spec.js',
    '!' + paths.src + '/{app,components}/**/*.mock.js'
  ]).pipe($.angularFilesort());

  var injectOptions = {
    ignorePath: [paths.src],
    addRootSlash: false
  };

  var wiredepOptions = {
    directory: 'src/lib',
    exclude: [/bootstrap\.css/, /foundation\.css/, 'src/lib/angular/angular.js']
  };

  return gulp.src(paths.src + '/*.html')
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    // Use relative here so it gets picked up a findable file in assets() in
    // 'html'.
    .pipe($.inject(gulp.src(paths.src + '/cache/templateCacheHtml.js',
      {read: false}), {name: 'cache', addRootSlash: false, relative: true}))
    .pipe($.inject(gulp.src(paths.src + '/app/js/config.js',
      {read: false}), {name: 'config', addRootSlash: false, relative: true}))
    .pipe(print())
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(paths.tmp + '/serve'));

});

gulp.task('webkitFix', function () {
  return gulp.src(paths.src + '/angular.js')
    .pipe(print())
    .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('partials', ['markups'], function () {
  return gulp.src([
    paths.src + '/*/*.html',
    paths.src + '/{app,components}/**/*.html',
    paths.tmp + '/{app,components}/**/*.html'
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('/cache/templateCacheHtml.js', {
      module: 'incrowd'
    }))
    .pipe(gulp.dest(paths.src + '/'));
});

gulp.task('html', ['inject'], function () {

  var assets;
  return gulp.src(paths.tmp + '/serve/*.html', {base: paths.src})
    .pipe(assets = $.useref.assets())
    .pipe(assets.restore())
    .pipe(print(function (filepath) {
      return "assets: " + filepath;
    }))
    .pipe($.rev())
    .pipe(gulpif('*.js', $.ngAnnotate()))
    //.pipe(gulpif('angular.js', webkitAssign()))
    //.pipe(gulpif('*.js', $.uglify({preserveComments: $.uglifySaveLicense})))
    //.pipe(gulpif('*.css', $.csso()))
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulpif('*.html', $.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    })))
    // Temporary fix for serving from S3 instead of cloudfront
    .pipe(gulpif('*.html', rename('index.html')))
    .pipe(gulp.dest(paths.dist + '/'))
    //.pipe(gulpif('*.html', symlink(paths.dist + '/index.html', {force: true})))
    .pipe($.size({title: paths.dist + '/', showFiles: true}));
});

gulp.task('images', function () {
  return gulp.src(paths.src + '/assets/images/**/*')
    .pipe(gulp.dest(paths.dist + '/assets/images/'));
});

gulp.task('fonts', function () {
  return gulp.src(paths.src + '/assets/fonts/*')
    .pipe($.filter('*.{eot,svg,ttf,woff}'))
    .pipe(print())
    .pipe(gulp.dest(paths.dist + '/fonts/'));
});

gulp.task('favicons', function () {
  return gulp.src(paths.src + '/assets/favicons/*')
    .pipe($.filter('*.{png,ico}'))
    .pipe(print())
    .pipe(gulp.dest(paths.dist + '/assets/favicons/'))
    // Also save to document root for backwards compat reasons
    .pipe(gulp.dest(paths.dist));
});

gulp.task('config', function () {
  //console.log('config')
  gulp.src(paths.src + '/app/js/config.json')
    .pipe(ngConstant({
      name: 'config'
    }))
    .pipe(gulp.dest(paths.src + '/app/js/'));
});

gulp.task('misc', function () {
  return gulp.src(paths.src + '/**/*.ico')
    .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('clean', function (done) {
  return gulp.src([paths.dist + '/', paths.tmp + '/'], {read: false})
    .pipe(rimraf({force: true}));
});


gulp.task('build', ['html', 'images', 'fonts', 'favicons', 'misc']);
