const gulp = require('gulp');
const browserify = require('browserify');
const glob = require('glob');
const source = require('vinyl-source-stream');

const $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('clean', function () {
    
    return gulp.src('./public/bundle.js', {read: false})
        .pipe($.clean());
});

gulp.task('build', ['clean'], function() {
    
    log('Bundling js files into bundle.js');
    
	let files = glob.sync('./public/**/*.js');

    return browserify({entries: files})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/'));
});

function log (msg) {
    
    if(typeof(msg) === 'object') {
        for(var item in msg) {
            if(msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    }
    else {
        $.util.log($.util.colors.blue(msg));
    }
}
