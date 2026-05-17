# ADR-0006: system prompt に Prompt Caching を適用

## ステータス

採用済

## コンテキスト

このアプリはリクエストごとに Anthropic API を2回呼び出す（Stage 1 + Stage 3）。各呼び出しには固定の system prompt が含まれる。

- `EXTRACT_FEATURES_PROMPT`: Stage 1 用の観察者ペルソナ + 制約 + 強度スコアの説明（約400トークン）
- `NARRATIVE_PROMPT`: Stage 3 用の語り部ペルソナ + 制約（約150トークン）

これらは全リクエストで同一のテキストであり、キャッシュの対象として適している。

## 決定

system prompt の最後のブロックに `cache_control: { type: 'ephemeral' }` を付与する。

```typescript
// src/lib/extract-features.ts および generate-narrative.ts
system: [
  {
    type: 'text',
    text: EXTRACT_FEATURES_PROMPT,
    cache_control: { type: 'ephemeral' },
  },
],
```

Tool 定義にも同様に `cache_control` を付与している。

## 理由

- **コスト削減**: キャッシュヒット時は入力トークンが約90%割引される（Anthropic Prompt Caching の料金体系）
- **レイテンシ削減**: キャッシュヒット時は system prompt の処理をスキップするため、応答が速くなる
- **Vercel Hobby の `maxDuration: 30`**: 2回のAPI呼び出しを30秒以内に収めるため、レイテンシの削減は重要
- **変更が不要**: system prompt は固定テキストのため、`ephemeral` キャッシュ（5分 TTL）で十分

## 結果・トレードオフ

**良い点:**
- キャッシュヒット時は Stage 1 + Stage 3 それぞれで数百トークン分のコストが節約される
- 実装の変更は `cache_control` フィールドを追加するだけで済み、既存のロジックに影響しない

**トレードオフ:**
- `ephemeral` キャッシュの TTL は5分。低トラフィック時（5分以上リクエストが来ない場合）はキャッシュミスが発生する
- キャッシュは同一モデル・同一 system prompt の組み合わせに対してのみ有効。モデルを切り替えた場合はキャッシュがリセットされる
- 画像データやユーザーメッセージはリクエストごとにユニークなため、キャッシュ対象外（これは設計通り）

## 検討した代替案

| 案 | 却下理由 |
|----|---------|
| キャッシュなし | コストとレイテンシが不必要に高くなる |
| アプリケーション層でのキャッシュ（Redis 等）| Anthropic が提供するキャッシュ機構を使う方が実装コストが低く、API の変更に追従しやすい |
| system prompt を短くして省略 | ペルソナ・制約・強度スコアの説明は出力品質に寄与しており、削減はしない |
