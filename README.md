# Pay History

支出管理ツール

## URL

[https://pay-history.kanaru.jp](https://pay-history.kanaru.jp)

## Description

高機能な家計簿アプリは、連携しているクレジットカードの支払いデータが反映されるまでに 1 週間以上の時間差があり、今月あといくら使っていいのかが分かりにくい。という課題があったため、支出するたびに金額を入力して残りいくら使えるのかを確認できるという web アプリを作りました。既存の高機能な家計簿アプリと併用して使うことを想定しているため、できるだけ機能を絞ってシンプルに。支出するたびに入力するので、できるだけ簡単に入力できるように制作しています。

![screenshot](public/img/screenshot.png)

## How To Use

1. 月の予算を入力する
2. 支払いしたらアプリで金額を入力
3. 完了!

## Technology Used

- Firebase
- NextJS
- TypeScript
- TailwindCSS

## Firestore Data Model

- users
  - 'docId-01'
    - atCreated: timestamp
    - atUpdated: timestamp
    - budget: number (ユーザーが前回設定した予算)
    - monthlyData: sub collectionn (月次データ)
      - '2022-8'
        - atCreated: timestamp
        - atUpdated: timestamp
        - budget: number (その月固有のの予算)
        - payments: array (支払いデータの配列)
          - 0
            - atCreated: timestamp
            - atUpdated: timestamp
            - atPaied: timestamp (支払日)
            - price: number (支払金額)

支払いデータ(payments)を sub collection ではなく、array にすることで、ドキュメントの読み取り回数を減らし、コストを最適化しています。
