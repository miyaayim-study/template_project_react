import gulp from 'gulp'; // gulpモジュールを読み込む

// Sass関連---------------------------------------------
import gulpSass from "gulp-sass"; // gulp-sassパッケージのgulp-sassモジュールをインポートする
import sassCompiler from "sass"; // sassパッケージに含まれるSassコンパイラ本体のsassモジュールをインポートする
const sass = gulpSass(sassCompiler); // gulp-sassのコンストラクタ関数にsassコンパイラを渡して、コンパイラを使用するための定数sassを定義

// postcss関連
import postcss from 'gulp-postcss'; // gulp-postcssパッケージをインポートする
import autoprefixer from 'autoprefixer'; // Autoprefixer（ベンダープレフィックス自動付与）のパッケージをインポートする
import stylelint from 'stylelint'; // stylelint（CSS構文チェック）パッケージをインポートする
import postcssReporter from 'postcss-reporter'; // postcss-reporterパッケージをインポートする


const compileSass = (done) => { // "compileSass"というgulpタスクを定義、 (done)はラストのdone()でタスク完了の合図を受け取るためのもの

  gulp.src("src/sass/style.scss") // コンパイルするSassファイルを指定

    .pipe(
      sass({ // 定数sassを実行
        outputStyle: "expanded" // 出力されるCSSの書式を"expanded"（展開形式）に設定する
      })
    )

    .pipe(postcss([autoprefixer()])) // autoprefixerでベンダープレフィックス付与
    .pipe(postcss([
      stylelint({ // stylelintで構文チェック
        configFile: ".stylelintrc.js", // .stylelintrc.jsファイルを参照
        fix: true, // 生成するファイルのプロパティ順序を自動修正する
      }),
      postcssReporter({clearMessages: true}) // エラーメッセージ表示
    ]))
    
    .pipe(gulp.dest("./dist")) // 出力先ディレクトリを指定
    done(); //done()でタスク完了の信号を出す
};

export { compileSass };


// webpack関連---------------------------------------------
import webpack from 'webpack';  // webpackのJavaScript APIを使用するためのライブラリ
import webpackStream from 'webpack-stream';  // webpackをgulpで使用するためのプラグイン
import webpackConfig from './webpack.config.mjs';  // webpackの設定ファイルの読み込み（さきほど作成したwebpack.config.jsのコンフィグ情報を読み込む）

const bundleWebpack = (done) => { // "webpack"というgulpタスクを定義、 (done)はラストのdone()でタスク完了の合図を受け取るためのもの
  webpackStream(webpackConfig, webpack) // webpackStreamを使用して、webpackを実行します。webpackConfigは設定ファイル、webpackはwebpackの実行ファイルを指定します。
    .pipe(gulp.dest("dist")); // 出力先ディレクトリを指定して、バンドルしたJavaScriptファイルを出力
    done(); //done()でタスク完了の信号を出す
};

export { bundleWebpack };


// Browsersync関連---------------------------------------------
import browserSync from 'browser-sync'; // browser-syncのプラグインの読み込み

// リロード設定
const browserReload = (done) => { // "browserReload"というgulpタスクを定義、 (done)はラストのdone()でタスク完了の合図を受け取るためのもの
  browserSync.reload(); // 同期しているブラウザをリロード
  done(); //done()でタスク完了の信号を出す
};

// Browsersync起動して監視
const watchFiles = (done) => { // "watchFiles"というgulpタスクを定義、 (done)はラストのdone()でタスク完了の合図を受け取るためのもの
  browserSync({ // BrowserSyncライブラリを初期化するメソッドらしい
    server : {
        baseDir : './', // ルートとなるディレクトリを指定
        index : './src/index.html', // 読み込むHTMLファイル
    },
  });

  // 監視設定（監視対象に変化があったら、指示されたタスクを実行）
  gulp.watch("./src/sass/**/*.scss", compileSass); // scssファイルの監視 ＆ sassコンパイル
  gulp.watch("./src/jsx/**/*.jsx", bundleWebpack); // jsxファイルの監視 ＆ webpackバンドル
  gulp.watch(["./src/*.html", "./dist/*.css", "./dist/*.js"], browserReload); // ファイルに変更があれば同期しているブラウザをリロード

  done(); //done()でタスク完了の信号を出す
};

export default watchFiles; // npx gulpというコマンドを実行した時、watchSassFilesが実行されるようにします


// gulp-imagemin（画像圧縮）関連---------------------------------------------
import imagemin from 'gulp-imagemin'; // gulp-imageminのプラグインの読み込み

const img = () => ( // "img"というgulpタスクを定義
	gulp.src('src/images/**/*') // 圧縮するファイルを指定
		.pipe(imagemin()) // インポートしたimageminを実行
		.pipe(gulp.dest('dist/images')) // 出力先ディレクトリを指定
);

export { img };


// gulp-htmlhint（HTML構文チェック）関連---------------------------------------------
import htmlhint from 'gulp-htmlhint'; // gulp-htmlhintのプラグインの読み込み

const html = (done) => { // "html"というgulpタスクを定義
  gulp.src('src/html/*.html') // 構文チェックするファイルを指定
    .pipe(htmlhint('.htmlhintrc')) // htmlhintcの実行、設定内容は.htmlhintrcを参照する
    .pipe(htmlhint.reporter()); // 実行した結果をターミナルに表示
    done();
};

export { html };