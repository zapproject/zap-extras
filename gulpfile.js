const gulp = require('gulp');
const postcss = require('gulp-postcss');
const url = require('postcss-url');
const modules = require('postcss-modules');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const modulesPlugin = modules({
  generateScopedName: 'zap-extras-[name]-[local]',
  getJSON: (() => {}),
});

gulp.task('css:shared-assets', () => {
  return gulp.src('src/ui/shared/**/*.svg')
    .pipe( gulp.dest('lib/ui/shared') )
});

gulp.task('css:shared', () => {
  const plugins = [
    modulesPlugin,
    // autoprefixer(),
    // cssnano(),
  ];
  return gulp.src('src/ui/shared/**/*.css', {base: 'src/ui/shared'})
    // .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib/ui/shared'))
});

gulp.task('css:webadmin', () => {
  const plugins = [
    modulesPlugin,
    url({
			url: 'copy',
    }),
    // autoprefixer(),
    // cssnano(),
  ];
  return gulp.src('src/ui/webadmin/**/*.css', {base: 'src/ui/webadmin'})
    // .pipe(sourcemaps.init())
    .pipe(postcss(plugins, {to: 'lib/ui/webadmin/webadmin.css'}))
    .pipe(concat('webadmin.css'))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib/ui/webadmin'))
});

exports.build = gulp.parallel('css:webadmin', 'css:shared', 'css:shared-assets');
