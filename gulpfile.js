var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    gulpSequence = require('gulp-sequence'),
    clean = require('gulp-clean'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-ruby-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    notify = require("gulp-notify"),
    inject = require('gulp-inject'),
    webpack = require('gulp-webpack');

var buildUtils = require('./buildUtils');

var ROOT_DIR = './src',
    ROOT_DIR_SASS = ROOT_DIR + '/sass',
    ROOT_DIR_JS = ROOT_DIR + '/js',
    ROOT_ASSETS_DIR = './assets',
    ROOT_ASSETS_DIR_CSS = ROOT_ASSETS_DIR + '/css',
    ROOT_ASSETS_DIR_JS = ROOT_ASSETS_DIR + '/js',
    ROOT_TARGET_DIR = './';

// gulp build = prod
// gulp watch = dev
var isDev = false;
gulp.task('set-dev-configs', function () {
    isDev = true;
});

// Delete all files in target
gulp.task('clean', function () {
    return gulp.src(ROOT_ASSETS_DIR, {read: false}).pipe(clean());
});

// Styles
gulp.task('build-styles', function () {
    return sass(ROOT_DIR_SASS + '/main.scss', {style: 'expanded', sourcemap: isDev})
        .pipe(gulpif(isDev, rename({basename: 'app'})))
        .pipe(gulpif(!isDev, rename({basename: 'app-' + buildUtils.hashCode(new Date())})))
        .pipe(gulpif(isDev, sourcemaps.write('./maps')))
        .pipe(gulpif(!isDev, cssnano({zindex: false})))
        .pipe(gulp.dest(ROOT_ASSETS_DIR_CSS))
        .pipe(notify({message: 'Styles task complete'}));
});

// JS
var buildJsProd = function () {
    return gulp.src(ROOT_DIR_JS + '/main.js')
        .pipe(webpack(require('./webpack.prod.config.js')))
        .pipe(gulp.dest(ROOT_ASSETS_DIR_JS))
        .pipe(notify({message: 'JS are built'}));
};
gulp.task('build-js-prod', buildJsProd);

var buildJsDev = function () {
    return gulp.src(ROOT_DIR_JS + '/main.js')
        .pipe(webpack(require('./webpack.dev.config.js')))
        .pipe(gulp.dest(ROOT_ASSETS_DIR_JS))
        .pipe(notify(injectResources))
        .pipe(notify({message: 'JS are built'}));
};
gulp.task('build-js-dev', buildJsDev);

// Resource injections
var injectResources = function () {
    return gulp.src(ROOT_DIR + '/*html.tmpl')
        .pipe(inject(gulp.src(
            [
                './node_modules/bootstrap/dist/css/bootstrap.css',
                ROOT_ASSETS_DIR_CSS + '/app*.css'
            ], {read: false}), {
            name: 'app'
        }))
        .pipe(inject(gulp.src(ROOT_ASSETS_DIR_JS + '/app*.js', {read: false}), {
            name: 'app'
        }))
        .pipe(rename({basename: 'index', extname: '.html'}))
        .pipe(gulp.dest(ROOT_TARGET_DIR));
};
gulp.task('inject-resources', injectResources);

// Watchers
gulp.task('watch-handler', function () {
    gulp.watch(ROOT_DIR_SASS + '/**/*.scss', ['build-styles']);
    gulp.watch(ROOT_DIR + '/*.html.tmpl', ['inject-resources']);

    return buildJsDev();
});

gulp.task('build', gulpSequence('clean', 'build-styles', 'build-js-prod', 'inject-resources'));
gulp.task('watch', gulpSequence('clean', 'set-dev-configs', 'build-styles', 'watch-handler'));