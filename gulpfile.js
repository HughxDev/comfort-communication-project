const gulp = require( 'gulp' );
const vulcanize = require( 'gulp-vulcanize' );
const babel = require( 'gulp-babel' );
const crisper = require( 'gulp-crisper' );
const del = require( 'del' );

/*
gulp.task('default', () => {
    return gulp.src('src/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});
*/

gulp.task( 'clean', () => {
  return del( [' build' ] );
} );

gulp.task( 'copy:server', [ 'clean' ], () => {
  return gulp.src( [ '.htaccess', 'favicon.*', 'apple-touch-*', 'index.html', 'CNAME' ] )
    .pipe( gulp.dest( 'build/' ) );
});

gulp.task( 'copy:dependencies', [ 'copy:server' ], () => {
  return gulp.src( [ 'bower_components/**', 'node_modules/**' ] )
    .pipe( gulp.dest( 'build/' ) )
  ;
} );

gulp.task( 'copy:app', [ 'copy:dependencies' ], () => {
  return gulp.src( [ 'src/**', 'images/**' ] )
    .pipe( gulp.dest( 'build/' ) )
  ;
} );

gulp.task( 'split', [ 'copy:app' ], () => {
  // del( [ 'split' ] );

  return gulp.src( 'build/src/**/*.html' )
    // .pipe( vulcanize( {
    //   abspath: '',
    //   excludes: [],
    //   stripExcludes: false,
    //   inlineScripts: false
    // } ) )
    .pipe( crisper( {
      scriptInHead: true, // true is default 
      onlySplit: false
    } ) )
    .pipe( gulp.dest( 'build/src/' ) )
  ;
} );

gulp.task( 'babel', [ 'split' ], () => {
  // del( [ 'build' ] );

  return gulp.src( 'build/src/**/*.js' )
    .pipe( babel( {
      presets: [ 'es2015' ]
    } ) )
    .pipe( gulp.dest( 'build/src/' ) );
  ;
} );

gulp.task( 'default', [ 'babel' ] );