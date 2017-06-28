const gulp = require( 'gulp' );
const vulcanize = require( 'gulp-vulcanize' );
const babel = require( 'gulp-babel' );
const crisper = require( 'gulp-crisper' );

/*
gulp.task('default', () => {
    return gulp.src('src/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});
*/

gulp.task( 'default', function () {
  return gulp.src( 'src/**/*.html' )
    .pipe( vulcanize( {
      abspath: '',
      excludes: [],
      stripExcludes: false,
      inlineScripts: false
    } ) )
    .pipe( crisper( {
      scriptInHead: false, // true is default 
      onlySplit: false
    } ) )
    .pipe( gulp.dest( 'dest' ) )
  ;
} );