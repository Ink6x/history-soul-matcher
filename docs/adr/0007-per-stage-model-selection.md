# ADR-0007: Stage ごとに異なるモデルを選択

## ステータス

採用済

## コンテキスト

このアプリは2回の Claude API 呼び出しを行う。各 Stage の要求品質とコストのトレードオフが異なるため、モデル選択を Stage ごとに独立させる必要があった。

`claude.ts` の `CLAUDE_CONFIG` でモデルを一元管理しており、環境変数で個別に上書き可能。

## 決定

```typescript
// src/lib/claude.ts
export const CLAUDE_CONFIG = {
  extractModel: process.env.CLAUDE_EXTRACT_MODEL
    ?? process.env.CLAUDE_MODEL
    ?? 'claude-haiku-4-5-20251001',
  narrativeModel: process.env.CLAUDE_NARRATIVE_MODEL
    ?? process.env.CLAUDE_MODEL
    ?? 'claude-sonnet-4-6',
  ...
} as const;
```

| Stage | モデル（デフォルト）| 理由 |
|-------|-------------------|------|
| Stage 1（特徴抽出）| `claude-haiku-4-5-20251001` | 閉じた enum への分類タスク。品質より速度とコストを優先 |
| Stage 3（ナラティブ）| `claude-sonnet-4-6` | ユーザーに見せる文章生成。品質を優先 |

## 理由

- **Stage 1 は分類タスク**: 8軸の enum 値を選ぶだけであり、高度な推論は不要。Haiku は Sonnet より約5倍安く、約2倍速い
- **Stage 3 はクリエイティブ生成**: ユーザーが目にする文章（理由・エピソード・名言）は品質が直接 UX に影響する。Sonnet の語彙力・文脈理解を活用する
- **フォールバック設計**: `CLAUDE_MODEL` 環境変数を設定すれば両 Stage を同じモデルに統一できる（タイムアウト退避時に `claude-haiku-4-5` に切り替える用途）
- **Vercel Hobby の `maxDuration: 30`**: Stage 1 を Haiku にすることで全体のレイテンシを短縮し、30秒制限に余裕を持てる

## 結果・トレードオフ

**良い点:**
- Stage 1 を Haiku にすることで Stage 全体のコストが削減される
- モデル ID がコード内にハードコードされておらず、環境変数のみで変更できる
- `CLAUDE_EXTRACT_MODEL` / `CLAUDE_NARRATIVE_MODEL` で Stage 別の細かい制御が可能

**トレードオフ:**
- 環境変数が増えてセットアップの説明が若干複雑になる（`.env.example` に記載済み）
- Stage 1 に Haiku を使う場合、enum の境界的なケース（「卵形か丸顔か微妙な顔」等）でSonnetより判断が荒くなる可能性がある

## 検討した代替案

| 案 | 却下理由 |
|----|---------|
| 全 Stage を Sonnet に統一 | Stage 1 の分類タスクにはオーバースペックでコストが高い |
| 全 Stage を Haiku に統一 | Stage 3 のナラティブ品質が低下しユーザー体験に悪影響 |
| Opus を Stage 3 に使用 | Vercel Hobby の 30 秒制限内に収まらないリスクがある |
