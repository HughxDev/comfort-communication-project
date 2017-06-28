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

gulp.task( 'split', () => {
  del( [ 'dest' ] );

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
    .pipe( gulp.dest( 'dest' ) )
  ;
} );

gulp.task( 'babel', [ 'split' ], () => {

  return gulp.src( 'dest/**/*.js' )
    .pipe(  babel( {
      presets: [ 'es2015' ]
    } ) )
    .pipe( gulp.dest( 'dest' ) );
  ;
} );

gulp.task( 'default', [ 'babel' ] );