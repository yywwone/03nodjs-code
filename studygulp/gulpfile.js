
var gulp = require('gulp');

var less = require('gulp-less');

var concat = require('gulp-concat');

// 可以将压缩CSS做为一个任务
// 也可将 LESS 转成 CSS 当成一个任务
// 也可以将 JS 进行合并当成一个任务

// 将LESS转成CSS
gulp.task('less2css', function () {
    // 只要将任务执行
    console.log('css 转换成功！');

    // 通过 gulp.src 指定需要将哪些资源进行转换（路径）

    // 通过模块 gulp-less 来实现真正的转换
    gulp.src('./less/*.less').pipe(less()).pipe(gulp.dest('./css'));
})

// 合并JS
gulp.task('hebing', function () {

    // 通过 gulp.src 指定需要合并的资源（路径）
    
    // 通过模块 gulp-concat 可以实现 js 的合并
    gulp.src('./libs/*.js').pipe(concat('a.js')).pipe(gulp.dest('./js'));

});

// 通过全局安装的 gulp 来执行任务
