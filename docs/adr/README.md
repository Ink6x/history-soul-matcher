# Architecture Decision Records

このディレクトリには、プロジェクトの重要な設計判断を記録した ADR（Architecture Decision Records）を格納しています。

## ADR とは

ADR は「なぜそうした設計にしたか」を記録するドキュメントです。コードの *what* はコードを読めばわかりますが、*why* は時間が経つと失われます。ADR はその「なぜ」を永続的に残します。

## 一覧

| ADR | タイトル | ステータス |
|-----|---------|----------|
| [0001](0001-three-stage-pipeline.md) | 3段パイプラインの採用 | 採用済 |
| [0002](0002-tool-use-closed-enums.md) | Tool Use + 閉じた enum による出力強制 | 採用済 |
| [0003](0003-deterministic-scoring.md) | Stage 2 を純関数にして LLM を排除 | 採用済 |
| [0004](0004-route-handler-over-server-action.md) | Server Action ではなく Route Handler を採用 | 採用済 |
| [0005](0005-formdata-image-upload.md) | JSON base64 ではなく FormData で画像送信 | 採用済 |
| [0006](0006-prompt-caching.md) | system prompt に Prompt Caching を適用 | 採用済 |
| [0007](0007-per-stage-model-selection.md) | Stage ごとに異なるモデルを選択 | 採用済 |

## フォーマット

各 ADR は以下の構成で記述します。

```
# ADR-XXXX: タイトル

## ステータス
採用済 / 廃止 / 上書き (→ ADR-YYYY)

## コンテキスト
なぜこの判断が必要だったか

## 決定
何を選んだか

## 理由
なぜそれを選んだか

## 結果・トレードオフ
この判断による影響・副作用

## 検討した代替案
採用しなかった選択肢とその理由
```
