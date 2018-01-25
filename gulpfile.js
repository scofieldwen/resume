var gulp = require('gulp');
var browserSync = require('browser-sync').create();

//设置browserSync
gulp.task('serve', function() {
	browserSync.init ({
		server: {
			baseDir: './'
		}
	});
	
	gulp.watch(['*.html', 'asset/css/**/*.css', 'asset/js/**/*.js']).on('change', browserSync.reload);
});