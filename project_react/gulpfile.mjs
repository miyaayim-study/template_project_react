import { dir } from "./gulp/config.mjs"; // ファイルパス格納
import gulp from 'gulp'; // gulpモジュールを読み込む

import html from "./gulp/task/html.mjs"; // HTML構文チェック & HTML複製 関連
import compileSass from "./gulp/task/stylesheets.mjs"; // Sassコンパイル 関連
import bundleWebpack from "./gulp/task/javascripts.mjs"; // webpack 関連
import images from "./gulp/task/images.mjs"; // gulp-imagemin（画像圧縮） 関連
import { server, reload } from "./gulp/task/sever.mjs"; // Browsersync 関連

// 実行テスト用コマンド作成
export { html as htmlTest }; // HTML構文チェック & HTML複製 関連 
export { compileSass as sassTest }; // Sassコンパイル 関連
export { bundleWebpack as webpackTest }; // webpack 関連

// gulp-imagemin（画像圧縮） 関連
export {default as images } from "./gulp/task/images.mjs";

// ファイル監視 & ブラウザリロード
const watchFiles = (done) => { // "watchFiles"というgulpタスクを定義、 (done)はラストのdone()でタスク完了の合図を受け取るためのもの
  
  // 監視設定（監視対象に変化があったら、指示されたタスクを実行）
  gulp.watch(dir.src.html + "*.html", html); // htmlファイルの監視 ＆ HTML構文チェック & HTML複製
  gulp.watch(dir.src.stylesheets + "**/*.scss", compileSass); // scssファイルの監視 ＆ sassコンパイル & ベンダープレフィックス付与 & 構文チェック & プロパティ順序修正
  gulp.watch(dir.src.javascripts + "**/*.jsx", bundleWebpack); // jsxファイルの監視 ＆ webpackバンドル & 構文チェック
  gulp.watch([dir.dist.html + "*.html", dir.dist.stylesheets + "*.css", dir.dist.javascripts + "*.js"], reload); // ファイルに変更があれば同期しているブラウザをリロード

  done(); //done()でタスク完了の信号を出す
};

// npx gulp
export const run = gulp.parallel(html, compileSass, bundleWebpack, images); // npx gulp runでコマンドを実行とき、指定したタスクを同時に実行、`parallel`は並列実行のこと、実行するタスク同士が依存関係にない場合に有効。
export default gulp.series(run, server, watchFiles); // npx gulpでコマンドを実行した時、指定したタスクを左から順番に実行、「ファイル生成 → ブラウザ開く → ファイル監視」の順番でタスク実行している。`series`は並列実行のこと、実行するタスク同士が依存関係にある場合に有効。

// メモ
// 「gulp --tasks」コマンドで実行可能なタスクが見れる