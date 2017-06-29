const gulp = require( 'gulp' );
const vulcanize = require( 'gulp-vulcanize' );
const babel = require( 'gulp-babel' );
const crisper = require( 'gulp-crisper' );
const del = require( 'del' );
const debug = require('gulp-debug');

gulp.task( 'clean', () => {
  return del( [' build' ] );
} );

gulp.task( 'copy:server', [ 'clean' ], () => {
  return gulp.src( [ '.htaccess', 'favicon.*', 'apple-touch-*', 'index.html', 'CNAME' ] )
    // .pipe( debug( { "title": "copy:server" } ) )
    .pipe( gulp.dest( 'build/' ) );
});

gulp.task( 'copy:node', [ 'copy:server' ], () => {
  return gulp.src( 'node_modules/**/*' )
    // .pipe( debug( { "title": "copy:node" } ) )
    .pipe( gulp.dest( 'build/node_modules/' ) )
  ;
} );

gulp.task( 'copy:bower', [ 'copy:node' ], () => {
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

gulp.task( 'split:src', [ 'copy' ], () => {
  // del( [ 'split' ] );

  return gulp.src( 'build/src/**/*.html' )
    // .pipe( vulcanize( {} ) )
    // .pipe( debug( { "title": "split" } ) )
    .pipe( crisper( {
      scriptInHead: true, // true is default 
      onlySplit: false
    } ) )
    .pipe( gulp.dest( 'build/src/' ) )
  ;
} );

gulp.task( 'split:bower', [ 'split:src' ], () => {
  // del( [ 'split' ] );

  return gulp.src( 'bower_components/**/*.html' )
    // .pipe( vulcanize( {} ) )
    // .pipe( debug( { "title": "split:bower" } ) )
    .pipe( crisper( {
      scriptInHead: true, // true is default 
      onlySplit: false
    } ) )
    .pipe( gulp.dest( 'bower_components/' ) )
  ;
} );

// gulp.task( 'split:polymer', [ 'split:src' ], );

// gulp.task( 'babel:bower', [ 'split' ], () => {
//   return gulp.src( 'build/bower_components/**/*.js' )
//     // .pipe( debug( { "title": "babel:bower" } ) )
//     .pipe( babel( {
//       presets: [ 'es2015-nostrict' ]
//     } ) )
//     .pipe( gulp.dest( 'build/bower_components/' ) );
//   ;
// } );

// gulp.task( 'babel:x10', [ 'babel:bower' ], () => {
//   return gulp.src( 'build/node_modules/x10.js/**/*.js' )
//     .pipe( debug( { "title": "babel:x10" } ) )
//     .pipe( babel( {
//       presets: [ 'es2015-nostrict' ]
//     } ) )
//     .pipe( gulp.dest( 'build/node_modules/x10.js/' ) );
//   ;
// } );

// gulp.task( 'babel:defiant', [ 'babel:bower' ], () => {
//   return gulp.src( 'build/node_modules/defiant/dist/**/*.js' )
//     .pipe( babel( {
//       presets: [ 'es2015-nostrict' ]
//     } ) )
//     .pipe( gulp.dest( 'build/node_modules/defiant/dist/' ) );
//   ;
// } );

gulp.task( 'babel:src', [ 'split:src' ], () => {
  // del( [ 'build' ] );

  return gulp.src( 'build/src/**/*.js' )
    .pipe( babel( {
      presets: [ 'es2015-nostrict' ]
    } ) )
    .pipe( gulp.dest( 'build/src/' ) );
  ;
} );

gulp.task( 'babel:bower', [ 'split:bower' ], () => {
  // del( [ 'build' ] );

  return gulp.src( [ 'bower_components/**/*.js', '!bower_components/web-component-tester/**/*.js' ] )
    .pipe( babel( {
      presets: [ 'es2015-nostrict' ]
    } ) )
    .pipe( gulp.dest( 'bower_components/' ) );
  ;
} );

gulp.task( 'babel', [ 'babel:src', 'babel:bower' ] );

gulp.task( 'default', [ 'babel' ] );