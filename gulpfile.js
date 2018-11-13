"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var mqpacker = require("css-mqpacker");
var cssminify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var run = require("run-sequence");
var del = require("del");
var jade = require('gulp-jade');
//npm i --save-dev gulp-concat
gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "image/**",
    "public/**",
    "js/**",
   // "*.html"
  ], {
    base: "."
  })
    .pipe(gulp.dest("build"));
});

gulp.task("style", function() {
  gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(cssminify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});


//Сборка Jade
gulp.task('jade', function () {
    console.log('Компиляция Jade');
    return gulp.src(['*.jade'])
        
        .pipe(jade({
            pretty: true
        }))        
        .pipe(gulp.dest("build/"));
});
/*
//  gulp jade с минификацией html
gulp.task('jade', function() {
    return gulp.src("index.jade")
        .pipe(jade({
      jade: jade,
      pretty: true
    })) 
        .pipe(gulp.dest('build/')); // указываем gulp куда положить скомпилированные HTML файлы
}); */
 

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html:copy", function() {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
  server.reload();
  done();
});
gulp.task("js:copy", function() {
  return gulp.src("js/**/*.js")
    .pipe(gulp.dest("build/js/"));
});
gulp.task("js:update", ["js:copy"], function(done) {
  server.reload();
  done();
});
 gulp.task("style:update",  function(done) {
    gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(cssminify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
  server.reload();
  done();
});
gulp.task('watch:jade', ["jade"], function(done) {
  server.reload();
  done();
});
gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  // gulp.watch("/*.html", ["html:update"]); 
  gulp.watch("*.html", ["html:update"]); 
  gulp.watch("less/**/*.less", ["style:update"]); 
 gulp.watch("js/**/*.js", ["js:update"]);    
  gulp.watch(["*.jade", "jade/**/*.jade"], ["watch:jade"]);
});

gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "style",
    "html:copy",
    //"images",
	// "jade",
	"serve",
    done
  );
});
