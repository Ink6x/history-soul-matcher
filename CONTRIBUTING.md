# Contributing to History Soul Matcher

バグ報告・機能提案・プルリクエストを歓迎します。

## 開発環境のセットアップ

```bash
git clone https://github.com/Ink6x/history-soul-matcher.git
cd history-soul-matcher
npm install
cp .env.example .env.local
# .env.local に ANTHROPIC_API_KEY を設定
npm run dev
```

Node.js 20 以上が必要です（`.nvmrc` 参照）。

## ブランチ命名規約

| プレフィックス | 用途 |
|--------------|------|
| `feat/` | 新機能 |
| `fix/` | バグ修正 |
| `refactor/` | リファクタリング |
| `docs/` | ドキュメント |
| `chore/` | メンテナンス |
| `ci/` | CI/CD |
| `test/` | テスト |

## コミット規約

[Conventional Commits](https://www.conventionalcommits.org/) に従ってください。

```
feat: add new historical figure category
fix: correct scoring weight for jawline axis
docs: update ARCHITECTURE.md
```

## 3段パイプラインの不変条件

このプロジェクトの中核にある設計原則を**壊さないでください**。

| Stage | 責務 | LLM 使用 |
|-------|------|---------|
| 1. `extractUserFeatures` | 画像 → 8軸の構造化特徴 | Yes |
| 2. `scoreFigures` | 特徴 ⇄ データセットの重み付き距離 | **No（純関数）** |
| 3. `generateNarrative` | 上位特徴 + 人物 → ナラティブ | Yes |

- **Stage 2 に LLM を追加しない**
- **Stage 3 で人物を選び直さない**
- `src/types/features.ts` の enum を変更する場合は `input_schema` と表示ラベルを同時に更新する

設計判断の詳細は [`docs/adr/`](docs/adr/) を参照してください。

## PR を送る前のチェックリスト

```bash
npm run lint       # エラーがないこと
npm run typecheck  # 型エラーがないこと
npm test           # テストが全て通ること
npm run build      # ビルドが通ること
```

## テスト要件

- 新しいロジックには必ずテストを追加してください
- `src/lib/scoring.ts` を変更する場合は `scoring.test.ts` も更新してください
- カバレッジが下がる変更は原則マージしません

## 行動規範

[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) を参照してください。
