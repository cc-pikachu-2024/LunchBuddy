# Developer Document
## セットアップ
```bash
# aws-amplify/cliをインストール
$ npm i -g @aws-amplify/cli

# package.json をインストール
$ npm i

# /src/* のフロントエンドを静的ファイル（/build）に出力
$ npm run build

# バックエンドとフロントエンドをデプロイするとき
$ amplify publish
# フロントエンドのみデプロイするとき
$ amplify hosting push
# バックエンドのみデプロイするとき
$ amplify function push
$ amplify api push
```
※ publishしてもフロントの変更内容が更新されないときは、Cloudfrontのキャッシュを削除する

## ディレクトリ構成
```bash
project-root/
├── amplify/                       # Amplify CLIによるバックエンド管理ディレクトリ
│   ├── backend/                   # バックエンドリソースの定義
│   │   ├── api/                   # REST API の設定
│   │   ├── hosting/               # フロントエンドのホスティングの設定
│   │   └── function/              # Lambda関数
│   │   　   └── /lunchBuddyBackednApi
│   │           └── src/           # Lambda関数のコード（ロジック）
│   ├── #current-cloud-backend/    # 現在のクラウド状態
│   └── team-provider-info.json    # チーム環境ごとの設定情報
├── src/                           # フロントエンドのコード（React）
├── build/                         # Reactの静的ファイル
├── package.json                   # フロントエンドの依存関係
└── README.md                      # プロジェクト概要
```


# 利用方法
アプリ：https://d2u2m5k0sq6pri.cloudfront.net/
API：https://q1vmi7h4m4.execute-api.us-east-1.amazonaws.com