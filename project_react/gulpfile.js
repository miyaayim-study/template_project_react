
const { src, dest, watch } = require("gulp"); // gulpモジュールを読み込む

// Sass関連---------------------------------------------
const sass = require("gulp-sass")(require("sass")); // gulp-sassモジュールを読み込み、Sassコンパイラを設定する

const compileSass = (done) => { // "compileSass"というgulpタスクを定義、 (done)はラストのdone()でタスク完了の合図を受け取るためのもの
  src("src/sass/style.scss") // コンパイルするSassファイルを指定
    .pipe(
      sass({
        outputStyle: "expanded" // 出力されるCSSの書式を"expanded"（展開形式）に設定する
      })
    )
    .pipe(dest("./dist")) // 出力先ディレクトリを指定
    done(); //done()でタスク完了の信号を出す
};

exports.sassTest = compileSass;

// webpack関連---------------------------------------------
const webpack = require("webpack"); // webpackのJavaScript APIを使用するためのライブラリ
const webpackStream = require('webpack-stream'); // webpackをgulpで使用するためのプラグイン
const webpackConfig = require("./webpack.config"); // webpackの設定ファイルの読み込み（さきほど作成したwebpack.config.jsのコンフィグ情報を読み込む）

const bundleWebpack = (done) => { // "webpack"というgulpタスクを定義、 (done)はラストのdone()でタスク完了の合図を受け取るためのもの
  webpackStream(webpackConfig, webpack) // webpackStreamを使用して、webpackを実行します。webpackConfigは設定ファイル、webpackはwebpackの実行ファイルを指定します。
    .pipe(dest("dist")); // 出力先ディレクトリを指定して、バンドルしたJavaScriptファイルを出力
    done(); //done()でタスク完了の信号を出す
};

exports.bundleTest = bundleWebpack;

// Browsersync関連---------------------------------------------
const browserSync = require("browser-sync"); // browser-syncのプラグインの読み込み

// リロード設定
const browserReload = (done) => { // "browserReload"というgulpタスクを定義 (done)はラストのdone()でタスク完了の合図を受け取るためのもの
  browserSync.reload(); // 同期しているブラウザをリロード
  done(); //done()でタスク完了の信号を出す
};

// Browsersync起動して監視
const watchFiles = (done) => { // "watchFiles"というgulpタスクを定義 (done)はラストのdone()でタスク完了の合図を受け取るためのもの
  browserSync({ // BrowserSyncライブラリを初期化するメソッドらしい
    server : {
        baseDir : './', // ルートとなるディレクトリを指定
        index : './src/index.html', // 読み込むHTMLファイル
    },
  });

  // 監視設定（監視対象に変化があったら、指示されたタスクを実行）
  watch("./src/sass/**/*.scss", compileSass); // scssファイルの監視 ＆ sassコンパイル
  watch("./src/jsx/**/*.jsx", bundleWebpack); // jsxファイルの監視 ＆ webpackバンドル
  watch(["./src/*.html", "./dist/*.css", "./dist/*.js"], browserReload); // ファイルに変更があれば同期しているブラウザをリロード

  done(); //done()でタスク完了の信号を出す
};

exports.default = watchFiles; // npx gulpというコマンドを実行した時、watchSassFilesが実行されるようにします

// gulp-imagemin（画像圧縮）関連---------------------------------------------
const imagemin = require('gulp-imagemin'); // gulp-imageminのプラグインの読み込み

const ImgImagemin = (done) => { // "ImgImagemin"というgulpタスクを定義
  src('src/images/**/*') // 圧縮するファイルを指定
    .pipe(imagemin())
    .pipe(dest('dist/images')) // 出力先ディレクトリを指定
    done();
};

exports.img = ImgImagemin;