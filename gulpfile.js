var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('compress', function() {
  gulp.src('src/url-match.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
});
