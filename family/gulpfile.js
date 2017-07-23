const gulp = require( 'gulp' );
const vulcanize = require( 'gulp-vulcanize' );
const babel = require( 'gulp-babel' );
const crisper = require( 'gulp-crisper' );
const uglify = require( 'gulp-uglify' );
const del = require( 'del' );
const debug = require( 'gulp-debug' );
const minifyInline = require( 'gulp-minify-inline' );
const htmlmin = require( 'gulp-htmlmin' );

gulp.task( 'clean', () => {
  return del( [' build' ] );
} );

gulp.task( 'copy:server', [ 'clean' ], () => {
  return gulp.src( [ '.htaccess', 'favicon.*', 'apple-touch-*', 'index.html', 'CNAME' ] )
    // .pipe( debug( { "title": "copy:server" } ) )
    .pipe( gulp.dest( 'build/' ) );
});

gulp.task( 'copy:node:x10', [ 'copy:server' ], () => {
  return gulp.src( 'node_modules/x10.js/**/*' )
    // .pipe( debug( { "title": "copy:node" } ) )
    .pipe( gulp.dest( 'build/node_modules/x10.js/' ) )
  ;
} );

gulp.task( 'copy:node:defiant', [ 'copy:node:x10' ], () => {
  return gulp.src( 'node_modules/defiant.js/**/*' )
    // .pipe( debug( { "title": "copy:node" } ) )
    .pipe( gulp.dest( 'build/node_modules/defiant.js/' ) )
  ;
} );

gulp.task( 'copy:bower', [ 'copy:node:defiant' ], () => {
  return gulp.src( 'bower_components/**/*' )
    // .pipe( debug( { "title": "copy:bower" } ) )
    .pipe( gulp.dest( 'build/bower_components/' ) )
  ;
} );

gulp.task( 'copy:images', [ 'copy:bower' ], () => {
  return gulp.src( 'images/**/*' )
    // .pipe( debug( { "title": "copy:images" } ) )
    .pipe( gulp.dest( 'build/images/' ) )
  ;
} );

gulp.task( 'copy:app', [ 'copy:images' ], () => {
  return gulp.src( 'src/**/*' )
    // .pipe( debug( { "title": "copy:app" } ) )
    .pipe( gulp.dest( 'build/src/' ) )
  ;
} );

gulp.task( 'copy', [ 'copy:app' ] );

gulp.task( 'minify:index', [ 'copy' ], () => {
  return gulp.src( 'build/index.html' )
    .pipe( htmlmin( {
      "collapseWhitespace": true,
      "removeComments": true
    } ) )
    .pipe( minifyInline() )
    .pipe( gulp.dest( 'build/' ) )
  ;
});

gulp.task( 'minify:src', [ 'minify:index' ], () => {
  return gulp.src( 'build/src/**/*.html' )
    .pipe( htmlmin( {
      "collapseWhitespace": true,
      "removeComments": true
    } ) )
    .pipe( minifyInline() )
    .pipe( gulp.dest( 'build/src/' ) )
  ;
} );

gulp.task( 'minify:bower', [ 'minify:src' ], () => {
  return gulp.src( 'build/bower_components/**/*.html' )
    .pipe( htmlmin( {
      "collapseWhitespace": true,
      "removeComments": true
    } ) )
    .pipe( minifyInline() )
    .pipe( gulp.dest( 'build/bower_components/' ) )
  ;
} );

gulp.task( 'default', [ 'minify:bower' ] );