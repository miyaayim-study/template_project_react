import { dir } from "../config.mjs"; // ファイルパス格納
import gulp from 'gulp'; // gulpモジュールを読み込む
import plumber from "gulp-plumber"; // gulp-plumberモジュールを読み込む

import webpack from 'webpack';  // webpackのJavaScript APIを使用するためのライブラリ
import webpackStream from 'webpack-stream';  // webpackをgulpで使用するためのプラグイン
import webpackConfig from '../../webpack.config.mjs';  // webpackの設定ファイルの読み込み（作成したwebpack.configのコンフィグ情報を読み込む）

const bundleWebpack = (done) => { // "webpack"というgulpタスクを定義、 (done)はラストのdone()でタスク完了の合図を受け取るためのもの
  gulp.src(dir.src.javascripts + '*.jsx') // コンパイルするSassファイルを指定

    .pipe(
      plumber({
        errorHandler: (error) => {
        console.log(error.messageFormatted);
        },
      })
    )
    
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(dir.dist.javascripts)); // 出力先ディレクトリを指定して、バンドルしたJavaScriptファイルを出力
    done(); //done()でタスク完了の信号を出す
};

export default bundleWebpack;