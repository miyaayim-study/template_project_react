module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react", // Reactのプラグイン
        "react-hooks" // React Hooksのプラグイン
    ],
    "rules": {
    },
    "settings": {
        "react": {
            "version": "18.2.0" // 使用中のReactのバージョンを指定、これがないと動かない
        }
    }
};
