/** Includes **/
var gulp = require('gulp');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var babel = require('gulp-babel');
var del = require('del');
var runSequence = require('run-sequence');


/** Individual tasks **/
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js',babel()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('clean:dist', function() {
  return del.sync('dist');
})


/** Combined tasks **/
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/*.scss', ['sass']); 
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/*.js', browserSync.reload); 
});

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref'],
    callback
  )
})