var gulp = require('gulp'),
    uglify = require('gulp-uglify'),//压缩js文件
    concat = require('gulp-concat'),//合并js文件
    sass = require('gulp-sass');// 获取 gulp-sass 模块
    imagemin   = require('gulp-imagemin'),//图片压缩
    minifycss  = require('gulp-minify-css'),//css压缩
    clean      = require('gulp-clean'),//清空文件夹
    browserSync = require('browser-sync').create(),//实时浏览
    autoprefixer = require('gulp-autoprefixer'),//自动添加浏览器私有前缀
    reload      = browserSync.reload;
//js压缩
gulp.task('js', function () {
    var mainSrc = './src/js/*.js',
        mainDst = './dist/js/',
        pubSrc = './src/js/libs/*.js',
        pubDst = './dist/js/libs/',
        modSrc = './src/js/module/*.js',
        modDst = './dist/js/module/';
    gulp.src(mainSrc)
        .pipe(uglify())
        .pipe(gulp.dest(mainDst));
    gulp.src(modSrc)
        .pipe(uglify())
        .pipe(gulp.dest(modDst));
    gulp.src(pubSrc)
        .pipe(uglify())
        .pipe(gulp.dest(pubDst));
});
// 编译sass
// 在命令行输入 gulp sass 启动此任务
gulp.task('sass', function () {
  return gulp.src('./src/sass/style.scss')
    .pipe(sass({
                outputStyle: 'compact',
                includePaths: ['./src/sass']
              }).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions'],cascade: false}))//添加浏览器前缀
    .pipe(gulp.dest('./src/css'));
});
//实时监听
gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});
// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/',
        mainSrc = './src/page/*.html',
        mainDst = './dist/page/';
    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst));
    gulp.src(mainSrc)
        .pipe(gulp.dest(mainDst));
});
 //处理字体文件
gulp.task('font', function(){   
    var fontSrc = 'src/fonts/*',
        fontDst = './dist/fonts';
    gulp.src(fontSrc)
        .pipe(gulp.dest(fontDst));
});
//css压缩处理
gulp.task('css', function(done) {
  gulp.src('./src/css/*.css')
    .pipe(minifycss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./dist/css/'))
    .on('end', done);
});
// 图片压缩处理
gulp.task('images', function(){
    gulp.src('./dist/images', {read: false})
        .pipe(clean());
    var imgSrc = ['./src/images/*','./src/images/**/*'],
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});
//实时更新页面
gulp.task('browser-sync', function() {
  var files = [
    './*.html',
    '**/*.css',
    '**/*.js',
    'images/*'
  ];
  browserSync.init(files,{
    server: {
      baseDir: "./src",//设置根目录
      index: "index.html"//设置服务器显示的文件
    }
  });
  gulp.watch('./src/pages/*.html').on('change', reload);
  gulp.watch('./src/newpages/*.html').on('change', reload);
  gulp.watch('./src/*.html').on('change', reload);//监听html文件
  gulp.watch('./src/css/*.css').on('change', reload);//监听css文件
  gulp.watch('./src/js/*.js').on('change', reload);//监听js文件
  gulp.watch('./src/images/*').on('change', reload);//监听图片文件
});
gulp.task('default', function(){  //默认任务
    gulp.run('browser-sync');
    gulp.run('sass');
    gulp.run('sass:watch');
});
gulp.task('clean', function() {    // 清空dist文件夹内的图片、样式、js
    return gulp.src(['./dist'], {read: false})
        .pipe(clean());
});
gulp.task('build', ['clean'],function(){  //提交项目任务
    gulp.run('html');
    gulp.run('font');
    gulp.run('js');
    gulp.run('css');
    gulp.run('images');
});