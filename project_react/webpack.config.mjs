import path from 'path'; // Node.jsのpathモジュールをインポートして、path.resolve()メソッドを使用できるようにしている。

export default {
  mode: "development", // 開発モード（"development"）で動作するように設定（ソースマップ有効でJSファイルが出力される、本番環境では"production"に設定すると最適化された状態で出力される）
  entry: `./src/jsx/index.jsx`, // エントリーポイント（メインとなる処理を行うJavaScriptファイル）の指定
  module: {
    rules: [ // モジュールに対するルールを定義する
      {
        test: /\.(js|jsx|ts|tsx)$/, // test = loaderを使う特定の拡張子を指定、今回は複数の拡張子に対応できるようにしてみた
        use: [ // use = testで指定した拡張子にloaderを使いwebpackが読み込めるようにする
          {
            loader: "babel-loader", // Babelを使ってJSXなどの新JS文法を旧JS文法に変換する

            // babel-loader のオプションを指定する
            options: {
              presets: [
                "@babel/preset-env",// ES5に変換
                "@babel/react" // ReactのJSXを解釈
              ]
            }
          }
        ]
      }
    ]
  },
  target: ["web", "es5"], // ES5(IE11等)向けの指定（webpack 5以上で必要）
  output: { // ファイルの出力設定
    path: path.resolve("./dist"), //  出力ファイルのディレクトリ名
    filename: "main.js", // 出力ファイル名
  },
  resolve: { // モジュールを解決するためのオプション
    extensions: [".js", ".jsx", ".ts", ".tsx"]  // importやrequireで指定する際に、拡張子を省略できるようにする
  },
};