var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cached = require('gulp-cached'),
    remember = require('gulp-remember'),
    filter = require('gulp-filter'),
    merge = require('merge-stream'),
    size = require('gulp-size'),
    del = require('del');


//设置browserSync
	gulp.task('serve', function() {
		browserSync.init ({
			server: {
				baseDir: './'
			}
		});
	
	gulp.watch(['src/*.html', 'src/css/**/*.css', 'src/js/**/*.js']).on('change', browserSync.reload);
	});

/* --------------------------
    Optimize the file
------------------------- */

    //为css下文件添加厂商前缀，从/src/css 到 dist/js输出两个文件 .min.css & .js
    gulp.task('styles', function() {
        return gulp.src('src/css/main.css')
            .pipe(autoprefixer('last 2 version'))
            .pipe(gulp.dest('dist/css'))
            .pipe(rename({suffix: '.min'}))
            .pipe(cleanCss())
            .pipe(gulp.dest('dist/css'))
            .pipe(notify({ message: 'Styles task complete' }));
    });

    //从src/js 到 dist/js输出两个文件.min.js & .js
    gulp.task('scripts', function() {
        //创建过滤器实例
        // var f = filter(['**', '!src/*min.js'], {restore: true});
        return gulp.src('src/js/*.js')
            .pipe(cached())
            .pipe(gulp.dest('dist/js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'))
            .pipe(notify({ message: 'Script task complete'}));
    });

    //以默认参数优化，从 src/images 到 dist/images
    gulp.task('images', function() {
        return gulp.src('src/images/**/*')
            .pipe(cached(imagemin({verbose: true})))
            .pipe(gulp.dest('dist/images'))
            .pipe(notify({ message: 'Images task complete'}));
    });
    
    //按html载入顺序合并.js文件，输出到 dist/vendor
    gulp.task('usemerger', function() {
        var s = size();
        
        return gulp.src('src/*.html')
        // .pipe(s)
        .pipe(useref())
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        //需要压缩，提取.js
        // .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest('dist/'));
    });
    
    //综合运行任务
    gulp.task('build', ['clean'], function() {
        gulp.start('styles', 'scripts', 'images', 'usemerger','copy');
    });

/* --------------------------
    Clean the file
------------------------- */

    //清理文件
    gulp.task('clean', function() {
        return del('dist/');
    });
    
/* --------------------------
        Move the file
------------------------- */

    //复制fonts/,pdf/,vendor/ -> dist/
    gulp.task('copy', function() {
        gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts/')),

        gulp.src('src/pdf/*')
        .pipe(gulp.dest('dist/pdf/'))

        gulp.src('src/vendor/**/*')
        .pipe(gulp.dest('dist/vendor'))
    })

    //提取插件文件从/node_modules 到 /vendor
    gulp.task('export', function() {
        return merge(
            gulp.src(['node_modules/bootstrap/dist/**/*', '!**/*theme.*', '!**/*.map', '!**/npm.js'])
            .pipe(gulp.dest('src/vendor/bootstrap')),
            
            gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
            .pipe(gulp.dest('src/vendor/jquery')),
            
            gulp.src('node_modules/jquery.localscroll/*.js')
            .pipe(gulp.dest('src/vendor/jquery.localscroll')),
            
            gulp.src('node_modules/jquery.scrollto/*.js')
            .pipe(gulp.dest('src/vendor/jquery.scrollto')),
            
            gulp.src('node_modules/scrollreveal/dist/*.js')
            .pipe(gulp.dest('src/vendor/scrollreveal')),
            
            gulp.src([
                'node_modules/devicons/**/*',
                '!node_modules/devicons/.npmignore',
                '!node_modules/devicons/*.md',
                '!node_modules/devicons/*.json'
            ])
            .pipe(gulp.dest('src/vendor/devicons'))
        );
    });