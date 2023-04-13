module.exports = {
  "extends": [
    'stylelint-config-recommended-scss', // 構文チェックSCSS（CSSもできる）
    'stylelint-config-recommended', // 構文チェックCSS
    "stylelint-config-recess-order" // プロパティ順序の規則、fixでの整列はここをみてるはず
  ]
};