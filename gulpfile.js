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

gulp.task( 'split', [ 'clean' ], () => {
  // del( [ 'split' ] );

  return gulp.src( 'src/**/*.html' )
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
    .pipe( gulp.dest( 'build' ) )
  ;
} );

gulp.task( 'babel', [ 'split' ], () => {
  // del( [ 'build' ] );

  return gulp.src( 'build/**/*.js' )
    .pipe( babel( {
      presets: [ 'es2015' ]
    } ) )
    .pipe( gulp.dest( 'build' ) );
  ;
} );

gulp.task( 'default', [ 'babel' ] );