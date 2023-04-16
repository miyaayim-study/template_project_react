import { dir } from "../config.mjs"; // ファイルパス格納
import gulp from 'gulp'; // gulpモジュールを読み込む
import imagemin from 'gulp-imagemin'; // gulp-imageminのプラグインの読み込み

const images = (done) => { // "images"というgulpタスクを定義 、(done)はラストのdone()でタスク完了の合図を受け取るためのもの
	gulp.src(dir.src.images + '**/*') // 圧縮するファイルを指定
		.pipe(imagemin()) // インポートしたimageminを実行
		.pipe(gulp.dest(dir.dist.images)) // 出力先ディレクトリを指定
		done(); //done()でタスク完了の信号を出す
};

export default images;