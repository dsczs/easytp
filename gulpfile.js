var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var sh = require('shelljs');
var bower = require('bower');

var paths = {
    public: 'public/',
    static: 'public/static/',
    sass: 'public/static/scss/*.scss',
    css: 'public/static/css/*.css',
    js: 'public/static/js/*.js'
};

var clear = {
    bower: [
        paths.static + 'bower'
    ],
    composer: [
        'vendor',
        'composer.lock'
    ],
    static: [
        paths.static + 'css/min',
        paths.static + 'css/style.css',
        paths.static + 'js/min'
    ]
};

gulp.task('sass', function (done) {
    gulp.src(paths.static + 'scss/style.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest(paths.static + 'css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        //.pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(paths.static + 'css/min/'))
        .on('end', done);
});

gulp.task('js', function () {
    gulp.src(paths.static + 'js/*.js')
        .pipe(gulp.dest(paths.static + 'js/'))
        //.pipe(rename({ extname: '.min.js' }))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(paths.static + 'js/min/'));
});

gulp.task('css', function () {
    gulp.src(paths.static + 'css/*.css')
        .pipe(gulp.dest(paths.static + 'css/'))
        .pipe(minifyCss({processImport:false}))
        //.pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(paths.static + 'css/min/'));
});

gulp.task('watch', function () {
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['js']);
});

gulp.task('clear.all', ['clear.static', 'clear.bower', 'clear.composer']);

gulp.task('clear.static', function () {
    gulp.src(clear.static)
        .pipe(clean());
});

gulp.task('clear.bower', function () {
    gulp.src(clear.bower)
        .pipe(clean());
});

gulp.task('clear.composer', function () {
    gulp.src(clear.composer)
        .pipe(clean());
});

gulp.task('install', ['check.git'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('check.git', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

gulp.task('default', ['sass', 'js', 'css']);