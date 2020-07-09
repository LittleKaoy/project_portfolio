// Подключение пакетов

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const less = require("gulp-less");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const pug = require("gulp-pug");
const del = require("del");

// Задачи для Gulp

gulp.task("pug", function () {
  return gulp
    .src("./src/pug/pages/**/*.pug")
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "Pug",
            message: err.message,
          };
        }),
      })
    )
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("./build"))
    .pipe(browserSync.stream());
});

gulp.task("less", function () {
  return gulp
    .src("./src/less/main.less")
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "Styles",
            message: err.message,
          };
        }),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 3 versions"],
        cascade: false,
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/css/"))
    .pipe(browserSync.stream());
});

gulp.task("sass", function () {
  return gulp
    .src("./src/scss/main.scss")
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "Styles",
            message: err.message,
          };
        }),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 3 versions"],
        cascade: false,
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/css/"))
    .pipe(browserSync.stream());
});

gulp.task("copy:js", function () {
  return gulp
    .src("src/js/**/*.*")
    .pipe(gulp.dest("./build/js"))
    .pipe(browserSync.stream());
});

gulp.task("copy:libs", function () {
  return gulp
    .src("src/libs/**/*.*")
    .pipe(gulp.dest("./build/libs"))
    .pipe(browserSync.stream());
});

gulp.task("copy:img", function () {
  return gulp
    .src("src/img/**/*.*")
    .pipe(gulp.dest("./build/img"))
    .pipe(browserSync.stream());
});

gulp.task("copy:fonts", function () {
  return gulp
    .src("src/fonts/**/*.*")
    .pipe(gulp.dest("./build/fonts"))
    .pipe(browserSync.stream());
});

gulp.task("clean:build", function () {
  return del("./build");
});

gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: "./build/",
    },
  });

  gulp.watch("./src/pug/**/*.*").on("change", gulp.series("pug"));
  gulp.watch("./src/less/**/*.less").on("change", gulp.series("less"));
  // gulp.watch("./src/scss/**/*.scss").on("change", gulp.series("sass"));
  gulp.watch("src/js/**/*.js").on("change", gulp.series("copy:js"));
  gulp.watch("src/libs/**/*.*").on("change", gulp.series("copy:libs"));
  gulp.watch("src/libs/**/*.*").on("add", gulp.series("copy:libs"));
  gulp.watch("src/img/**/*.*").on("change", gulp.series("copy:img"));
  gulp.watch("src/img/**/*.*").on("add", gulp.series("copy:img"));
  gulp.watch("src/fonts/**/*.*").on("change", gulp.series("copy:fonts"));
  gulp.watch("src/fonts/**/*.*").on("add", gulp.series("copy:fonts"));
});

gulp.task(
  "default",
  gulp.series(
    "clean:build",
    gulp.parallel(
      "copy:js",
      "copy:libs",
      "copy:img",
      "copy:fonts",
      "less",
      "pug"
    ),
    "server"
  )
);
