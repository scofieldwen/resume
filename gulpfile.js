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

    //为css下文件添加厂商前缀，从/src/css 到 docs/js输出两个文件 .min.css & .js
    gulp.task('styles', function() {
        return gulp.src('src/css/main.css')
            .pipe(autoprefixer('last 2 version'))
            .pipe(gulp.dest('docs/css'))
            .pipe(rename({suffix: '.min'}))
            .pipe(cleanCss())
            .pipe(gulp.dest('docs/css'))
            .pipe(notify({ message: 'Styles task complete' }));
    });

    //从src/js 到 docs/js输出两个文件.min.js & .js
    gulp.task('scripts', function() {
        //创建过滤器实例
        // var f = filter(['**', '!src/*min.js'], {restore: true});
        return gulp.src('src/js/*.js')
            .pipe(cached())
            .pipe(gulp.dest('docs/js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('docs/js'))
            .pipe(notify({ message: 'Script task complete'}));
    });

    //以默认参数优化，从 src/images 到 docs/images
    gulp.task('images', function() {
        return gulp.src('src/images/**/*')
            .pipe(cached(imagemin({verbose: true})))
            .pipe(gulp.dest('docs/images'))
            .pipe(notify({ message: 'Images task complete'}));
    });
    
    //按html载入顺序合并.js文件，输出到 docs/vendor
    gulp.task('usemerger', function() {
        var s = size();
        
        return gulp.src('src/*.html')
        // .pipe(s)
        .pipe(useref())
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        //需要压缩，提取.js
        // .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest('docs/'));
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
        return del('docs/');
    });
    
/* --------------------------
        Move the file
------------------------- */

    //复制fonts/,pdf/,vendor/ -> docs/
    gulp.task('copy', function() {
        gulp.src('src/pdf/*')
        .pipe(gulp.dest('docs/pdf/'))

        gulp.src('src/vendor/**/*')
        .pipe(gulp.dest('docs/vendor'))
    })

    //提取插件文件从/node_modules 到 /vendor
    gulp.task('export', function() {
        return merge(
            gulp.src(['node_modules/bootstrap/docs/**/*', '!**/*theme.*', '!**/*.map', '!**/npm.js'])
            .pipe(gulp.dest('src/vendor/bootstrap')),
            
            gulp.src(['node_modules/jquery/docs/jquery.js', 'node_modules/jquery/docs/jquery.min.js'])
            .pipe(gulp.dest('src/vendor/jquery')),
            
            gulp.src('node_modules/jquery.localscroll/*.js')
            .pipe(gulp.dest('src/vendor/jquery.localscroll')),
            
            gulp.src('node_modules/jquery.scrollto/*.js')
            .pipe(gulp.dest('src/vendor/jquery.scrollto')),
            
            gulp.src('node_modules/scrollreveal/docs/*.js')
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