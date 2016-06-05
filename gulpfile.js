var gulp     = require('gulp'),
    header   = require('gulp-header'),
    uglify   = require('gulp-uglify'),
    rename   = require('gulp-rename'),
    package  = require('./package.json'),
    banner;

banner = [
  '/*! ',
    '<%= package.name %> ',
    'v<%= package.version %> | ',
    '(c) ' + new Date().getFullYear() + ' <%= package.author %> |',
    ' <%= package.homepage %>',
  ' */',
  '\n'
].join('');

gulp.task('compress:js', function() {
  return gulp.src('src/minigram.js')
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
    gulp.watch('src/minigram.js', ['compress:js']);
});

gulp.task('default', ['compress:js']);