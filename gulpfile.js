const gulp = require("gulp");
const open = require("gulp-open");
const plumber = require("gulp-plumber");
const os = require("os");
const webpack = require("webpack-stream");
const webpackConfig = require("./source/webpack.config.js");
const getServer = require("./server/app");
const browser =
  os.platform() === "linux"
    ? "google-chrome"
    : os.platform() === "darwin"
      ? "Microsoft Edge"
      : os.platform() === "win32"
        ? "msedge"
        : "chrome";

// mac: "google chrome"

//本地服务
gulp.task("server", function () {
  let port = 8084;
  getServer(port);
  let options = {
    uri: "http://localhost:" + port,
    app: browser,
  };
  gulp.src(__filename).pipe(open(options));
});

//前端开发构建
gulp.task("dev", function () {
  return gulp
    .src(__filename)
    .pipe(plumber())
    .pipe(webpack(webpackConfig("dev")))
    .pipe(gulp.dest("source/dist/"));
});

// 监听修改 自动构建
gulp.task("watch", gulp.series('dev', 'server'), function () {
  // gulp.run(["dev", "server"]);
  gulp.watch(["source/src/**/*.js", "source/src/**/*.css"], ['dev']);
});
