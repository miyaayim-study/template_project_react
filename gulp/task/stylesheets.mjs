import { dir } from "../config.mjs"; // ファイルパス格納
import gulp from 'gulp'; // gulpモジュールを読み込む
import plumber from "gulp-plumber"; // gulp-plumberモジュールを読み込む
import notify from "gulp-notify"; // gulp-notifyモジュールを読み込む

// sass 関連インポート
import gulpSass from "gulp-sass"; // gulp-sassパッケージのgulp-sassモジュールをインポートする
import sassCompiler from "sass"; // sassパッケージに含まれるSassコンパイラ本体のsassモジュールをインポートする
const sass = gulpSass(sassCompiler); // gulp-sassのコンストラクタ関数にsassコンパイラを渡して、コンパイラを使用するための定数sassを定義

// postcss 関連インポート
import postcss from 'gulp-postcss'; // gulp-postcssパッケージをインポートする
import postcssReporter from 'postcss-reporter'; // postcss-reporterパッケージをインポートする
import autoprefixer from 'autoprefixer'; // Autoprefixer（ベンダープレフィックス自動付与）のパッケージをインポートする
import stylelint from 'stylelint'; // stylelint（CSS構文チェック）パッケージをインポートする

// 開発用（いつか圧縮用も作成すること）
const compileSass = (done) => { // "compileSass"というgulpタスクを定義、 (done)はラストのdone()でタスク完了の合図を受け取るためのもの

  gulp.src(dir.src.stylesheets + 'style.scss') // コンパイルするSassファイルを指定

    .pipe(plumber({ // gulp-plumberでエラー検出時に監視タスクを中断しないようにする
      errorHandler: notify.onError({ // gulp-notifyでエラー検出時にデスクトップ通知する
        title: 'Sassコンパイル: <%= error.name %>', // デスクトップ通知時のタイトル
        message: '原因: <%= error.message %>' // デスクトップ通知時の本文
      })
    }))


    .pipe(sass({ // 定数sassを実行
        outputStyle: "expanded" // 出力されるCSSの書式を"expanded"（展開形式）に設定する
      })
    )

    .pipe(postcss([ // postcssを実行
      autoprefixer() // autoprefixerでベンダープレフィックス付与
    ]))

    .pipe(postcss([ // postcssを実行
      stylelint({ // stylelintで構文チェック
        configFile: ".stylelintrc.js", // .stylelintrc.jsファイルを参照
        fix: true, // 生成するファイルのプロパティ順序を自動修正する
      }),
      postcssReporter({clearMessages: true}) // エラーメッセージ表示
    ]))

    .pipe(gulp.dest(dir.dist.stylesheets)) // 出力先ディレクトリを指定
    done(); //done()でタスク完了の信号を出す
};

export default compileSass;