# README

## メモ

emotion の keyframe はテンプレートリテラルでラップしないとエラーを吐く

## ディレクトリ構成

- common
  - 汎用的なもののうちリアクトに関係するもの(hook,hoc,context,component)をexportするもの
- lib
  - 汎用的なもののうちリアクトに関係しないものをexportするもの
- pagesLib
  - ページに関する定義
    - 中身はtype別にディレクトリを作って階層構造でまとめる
    - type = components, hooks, contexts, hocs, lib, constants
