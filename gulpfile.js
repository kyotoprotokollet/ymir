//-----------------------------------------------------
// ### REQUIREMENTS
//-------------------
var gulp      = require('gulp'),
    jade 			= require('gulp-jade'),
    sass 			= require('gulp-sass');

//-----------------------------------------------------
// ### Build Jade templates
// `gulp templates`
//-------------------
gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('./src/templates/*.jade')
    .pipe(jade({
    	pretty: true,
      	locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./compiled/templates/'));
});

//-----------------------------------------------------
// ### Compile SCSS
// `gulp compile-css`
//-------------------
gulp.task('compile-scss', function () {
  gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./compiled/css'));
});

//-----------------------------------------------------
// ### Build
// `gulp build` - Do a complete build
//-------------------
gulp.task('build', ['templates', 'compile-scss'], function() {
});
