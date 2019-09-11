const gulp = require('gulp');
const postcss = require('gulp-postcss');
const url = require('postcss-url');
const copy = require('postcss-copy');
const modules = require('postcss-modules');
const concat = require('gulp-concat');

gulp.task('css:shared', () => {
  const plugins = [
    modules({
      generateScopedName: 'zap-extras-[name]-[local]',
      getJSON: (() => {}),
    }),
    copy({
      basePath: ['src/ui/shared'],
      preservePath: true,
      dest: 'lib',
      template: '[name].[ext]',
    }),
  ];
  return gulp.src('./src/ui/shared/**/*.css', {base: './src'})
    .pipe( postcss(plugins) )
    .pipe( gulp.dest('./lib/ui/shared') )
});

gulp.task('css:webadmin', () => {
  const plugins = [
    modules({
      generateScopedName: 'zap-extras-[name]-[local]',
      getJSON: (() => {}),
    }),
    copy({
      basePath: ['src/ui/webadmin'],
      preservePath: true,
      dest: 'lib',
      template: '[name].[ext]',
    }),
  ];
  return gulp.src('./src/ui/webadmin/**/*.css', {base: './src'})
    .pipe( postcss(plugins) )
    .pipe( concat('webadmin.css') )
    .pipe( gulp.dest('./lib/ui/webadmin') )
});

exports.build = gulp.parallel('css:webadmin', 'css:shared');
