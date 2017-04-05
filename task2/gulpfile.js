const gulp = require('gulp');
const Server = require('karma').Server;
const eslint = require('gulp-eslint');
 
gulp.task('lint', () => {
  return gulp.src(['src/*.js', '!node_modules/**'])
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', function (done) {
  new Server({
  configFile: __dirname + '/karma.conf.js',
  singleRun: true,
  }, done).start();
});

gulp.task('testwatch', function (done) {
  new Server({
  configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('default', ['lint', 'test']);