const { dest, watch, parallel, src } = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");

const browserSync = require("browser-sync").create();

const scss = () => {
  return src("src/scss/*.scss")
    .pipe(sass())
    .pipe(dest("src/css/"))
    .pipe(browserSync.stream());
};

const images = () => {
  return src("images/*.png")
    .pipe(dest("src/images/"))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src("scripts/*.js")
    .pipe(dest("src/scripts/"))
    .pipe(browserSync.stream());
};

const browsersync = () => {
  browserSync.init({
    server: { baseDir: "src/", online: true, notify: false },
  });

  watch("src/scss/*.scss", scss);
  watch("images/*.png", images);
  watch("src/*.html").on("change", browserSync.reload);
};

exports.browsersync = browsersync;
exports.scss = scss;
exports.default = parallel(scss, scripts, images, browsersync);
