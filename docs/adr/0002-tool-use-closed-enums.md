# ADR-0002: Tool Use + 閉じた enum による出力強制

## ステータス

採用済

## コンテキスト

Stage 1 では Claude Vision に顔特徴を8軸で抽出させる必要があり、その出力を後続の Stage 2（純関数スコアリング）が確実に処理できる形式にしなければならない。

Stage 2 は `FACE_SHAPE_SIMILARITY`、`JAWLINE_SIMILARITY` 等の類似度行列を使って特徴を数値化するが、この行列は `src/types/features.ts` に定義された固定 enum 値のみをキーとして持つ。LLM が enum 外の値（例: `'oval-ish'`、`'almost round'`）を返すと、行列のルックアップが `undefined` になりスコアが0になる。

## 決定

`tool_choice: { type: 'tool', name: 'extract_facial_features' }` で Tool Use を強制し、`input_schema` の `enum` フィールドに `FACE_SHAPES`、`JAWLINES` 等の配列をそのまま渡す。

```typescript
// src/lib/extract-features.ts
faceShape: { type: 'string', enum: [...FACE_SHAPES] },
```

`FACE_SHAPES` は `src/types/features.ts` から import しており、型定義・スキーマ・表示ラベルの**単一の情報源**となっている。

## 理由

- Tool Use + `enum` の組み合わせでは、Anthropic のモデルが enum 外の値を返すことが構造的にできない（スキーマ違反はモデルが表現不可能）
- `tool_choice: { type: 'tool', name: ... }` により、モデルが Tool を呼ばずにテキストで返すことも防ぐ
- `FACE_SHAPES` を型定義とスキーマで共有するため、値を追加したときに型エラーで変更漏れを検知できる

## 結果・トレードオフ

**良い点:**
- enum 外の値が Stage 2 に到達することが構造的にない
- TypeScript の `as const` と Anthropic SDK の `input_schema` が同じソースから生成されるため、ずれが生じない
- `temperature: 0` を Stage 1 に設定し、特徴抽出の一貫性を高めている

**トレードオフ:**
- enum の粒度が粗いため、表現できない中間的な特徴がある（例: 「オーバルと丸の中間」）
- 表現力の限界は設計上の意図的な制約であり、あいまいな場合は最も近い値を選ぶようプロンプトで指示している

## 検討した代替案

| 案 | 却下理由 |
|----|---------|
| JSON mode（`response_format: { type: 'json_object' }`）| Claude API は JSON mode をサポートしていない（OpenAI 固有の機能） |
| 自由記述 → Zod バリデーション | enum 外の値が来た時点で Stage 2 がクラッシュするリスクが残る |
| Structured Outputs（OpenAI）| Anthropic SDK には同等の機能がなく、Tool Use が代替手段 |
| プロンプトのみで制約 | LLM はプロンプトの enum 制約を100%遵守しない。スキーマ強制より信頼性が低い |
