import { dir } from "../config.mjs"; // ファイルパス格納
import gulp from 'gulp'; // gulpモジュールを読み込む
import plumber from "gulp-plumber"; // gulp-plumberモジュールを読み込む
import notify from "gulp-notify"; // gulp-notifyモジュールを読み込む
import htmlbeautify from "gulp-html-beautify"; // "gulp-html-beautifyモジュールを読み込む
import htmlhint from 'gulp-htmlhint'; // gulp-htmlhintのプラグインの読み込み

const html = (done) => { // "html"というgulpタスクを定義
  gulp.src(dir.src.html + '*.html') // 構文チェックするファイルを指定
    .pipe(plumber({ // gulp-plumberでエラー検出時に監視タスクを中断しないようにする
      errorHandler: notify.onError("Error: <%= error.message %>") // gulp-notifyでエラー検出時にデスクトップ通知する
    }))
    .pipe(
      htmlbeautify({
        indent_size: 2, //インデントサイズ
        indent_char: " ", // インデントに使う文字列はスペース1こ
        max_preserve_newlines: 0, // 許容する連続改行数
        preserve_newlines: false, //コンパイル前のコードの改行
        indent_inner_html: false, //head,bodyをインデント
        extra_liners: [], // 終了タグの前に改行を入れるタグ。配列で指定。head,body,htmlにはデフォで改行を入れたくない場合は[]。
      })
    )
    .pipe(htmlhint('.htmlhintrc')) // htmlhintcの実行、設定内容は.htmlhintrcを参照する
    .pipe(htmlhint.reporter()) // 実行した結果をターミナルに表示
    .pipe(gulp.dest(dir.dist.html)) // 出力先ディレクトリを指定（ただの複製用）
    done();
};

export default html;