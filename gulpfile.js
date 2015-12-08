//-----------------------------------------------------
// ### REQUIREMENTS
//-------------------
var gulp          = require('gulp'),
    jade 			    = require('gulp-jade'),
    sass 			    = require('gulp-sass'),
    del           = require('del'),
    emailBuilder  = require('gulp-email-builder'),
    runSequence   = require('gulp-run-sequence');

//-----------------------------------------------------
// ### Clean
// `gulp clean`
//-------------------
// Clean our compiled folder before we generate new content into it
gulp.task('clean', function (cb) {
    del([
        // here we use a globbing pattern to match everything inside the `compiled` folder, except our gitkeep file
        'compiled/**/*',
        ], { dot: true },
    cb);
});


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
// ### Inline CSS, send tests
// `gulp compile-css`
//-------------------
 gulp.task('emailBuilder', function() {
    return gulp.src(['./compiled/templates/*.html'])
      .pipe(emailBuilder())
      .pipe(gulp.dest('./compiled/templates/'));
  });

//-----------------------------------------------------
// ### Build
// `gulp build` - Clean up the builds directory and do a complete build.
//-------------------
gulp.task('build', function(callback) {
  runSequence(
    'clean',
    'compile-scss',
    'templates',
    'emailBuilder',
  callback);
});