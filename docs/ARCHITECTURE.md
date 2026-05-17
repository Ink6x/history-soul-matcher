# アーキテクチャ詳細

> History Soul Matcher の設計思想・実装仕様のリファレンス。
> アプリ概要・セットアップ手順は [README](../README.md) を参照。

---

## 目次

- [設計原則](#設計原則)
- [3段パイプライン](#3段パイプライン)
- [スコアリングアルゴリズム](#スコアリングアルゴリズム)
- [データモデル](#データモデル)
- [セキュリティ・プライバシー設計](#セキュリティプライバシー設計)
- [パフォーマンス設計](#パフォーマンス設計)
- [ディレクトリ構成](#ディレクトリ構成)

---

## 設計原則

### 「LLM に判断と物語生成を一度にやらせない」

`POST /api/analyze` に「顔写真を見て歴史上の人物を一人選び、その理由を語れ」とそのまま投げると、以下の問題が構造的に発生する。

| 問題 | 原因 |
|------|------|
| 同じ人物ばかり返る（信長・アインシュタイン等） | LLM の人気バイアス |
| データセット外の人物が混入する | ハルシネーション |
| 結果がプロンプトのたびにブレる | 温度パラメータと確率的サンプリング |
| 「なぜ似ているか」の根拠が追跡できない | テキスト生成の不透明性 |

これらを**構造的に抑える**ために、処理を3段に分割し、LLM の介入を Stage 1（特徴抽出）と Stage 3（物語生成）だけに限定している。人物選定そのものは LLM に委ねない。

---

## 3段パイプライン

```
[クライアント]
    │ long edge 1024px / 3MB 以下にリサイズ（canvas.toBlob）
    │ FormData (multipart/form-data) で送信
    ▼
[POST /api/analyze]  runtime: nodejs / maxDuration: 30s
    │
    ├─ 入力バリデーション（MIME・サイズ・レート制限）
    │
    ├─ Stage 1: extractUserFeatures(imageBase64)
    │       Claude Vision + Tool Use
    │       出力: UserFacialProfile（8軸の enum 値 + 強度 + 印象タグ）
    │
    ├─ Stage 2: scoreFigures(userProfile, ALL_FIGURES)
    │       純関数（LLM不使用）
    │       出力: { figure, matchRate, breakdown }
    │
    └─ Stage 3: generateNarrative(figure, breakdown)
            Claude（別 Tool）
            出力: { reason, episode, quote }
    │
    ▼ AnalysisResultSchema.parse() で型を保証してから返却
[レスポンス JSON]
```

### Stage 1 — 特徴抽出（`src/lib/extract-features.ts`）

Claude Vision + Tool Use で写真を解析し、顔特徴を構造化データに変換する。

**要点：**

- Tool `extract_facial_features` の `input_schema` に `FACE_SHAPES`・`JAWLINES` 等の閉じた enum を渡す。Claude は enum 外の値を生成できないため、スキーマ違反が構造的に発生しない
- `tool_choice: { type: 'tool', name: 'extract_facial_features' }` で呼び出しを強制し、テキスト応答にフォールバックしない
- 各特徴に **intensity（1–10）** を付随させ、強度の強い特徴が表示に反映されるようにする
- `overallImpression` は自由記述に近いが、3〜5 タグの配列として抽出
- システムプロンプトは `cache_control: { type: 'ephemeral' }` でキャッシュ（後述）

**出力型（`UserFacialProfile`）：**

```typescript
type UserFacialProfile = {
  faceShape: FaceShape;       // 'oval' | 'round' | 'square' | ...（9種）
  jawline: Jawline;           // 'sharp' | 'soft' | 'square' | ...（8種）
  eyeShape: EyeShape;         // 'almond' | 'round' | 'narrow' | ...（9種）
  eyeSpacing: EyeSpacing;     // 'very-close' | 'close' | ... | 'very-wide'（7種）
  noseShape: NoseShape;       // 'straight' | 'aquiline' | ...（9種）
  browShape: BrowShape;       // 'arched' | 'straight' | ...（9種）
  lipFullness: LipFullness;   // 'very-thin' | 'thin' | ... | 'very-full'（7種）
  cheekbones: Cheekbones;     // 'high' | 'subtle' | ...（8種）
  overallImpression: string[];// 3〜5 タグ
} & Partial<Record<IntensityKey, number>>; // faceShapeIntensity 等（1–10）
```

### Stage 2 — スコアリング（`src/lib/scoring.ts`）

**LLM を使わない**純関数で、ユーザー特徴と全 200 名の特徴の重み付き類似度を計算し、最もスコアの高い人物を選出する。

```typescript
export function scoreFigures(user, figures) {
  // 各人物に scoreFigure() を適用し、rawScore が最大の人物を返す
}
```

詳細は後述の [スコアリングアルゴリズム](#スコアリングアルゴリズム) を参照。

### Stage 3 — ナラティブ生成（`src/lib/generate-narrative.ts`）

Stage 2 で確定した人物と、一致スコア上位の `breakdown` を渡して Claude に物語を生成させる。

**要点：**

- Tool `output_narrative` で `reason / episode / quote` の 3 フィールドを強制出力
- 人物の選定は Stage 2 で完了済みなので、「別の人物を返す」ことは構造的に起きない
- 物語生成の誤情報リスクはこの層に局所化される（人物名自体は正しいと保証済み）
- `temperature: 0.7` で適度な表現の多様性を持たせる

---

## スコアリングアルゴリズム

### 特徴と重み

8 軸の顔特徴 + 全体印象タグ、各 10 点、合計 90 点満点。

| 特徴キー | 日本語 | 重み |
|---------|--------|------|
| `faceShape` | 顔の輪郭 | 10 |
| `jawline` | 顎のライン | 10 |
| `eyeShape` | 目の形 | 10 |
| `eyeSpacing` | 目の間隔 | 10 |
| `noseShape` | 鼻筋 | 10 |
| `browShape` | 眉 | 10 |
| `lipFullness` | 唇の厚み | 10 |
| `cheekbones` | 頬骨 | 10 |
| `overallImpression` | 全体の印象 | 10 |

### 類似度行列

8 軸の各特徴には専用の類似度行列（`src/types/feature-similarity.ts`）がある。`exact` 一致（1.0）から `none`（0.0）まで連続値で定義し、例えば `oval` と `oblong` は完全一致ではないが近い値を持つ。

```typescript
// 例: FACE_SHAPE_SIMILARITY['oval']['oblong'] → 0.6
// 完全一致: 1.0 / 全く異なる: 0.0
```

### スコア計算式

```
各特徴の寄与 = round(weight × similarity(userValue, figureValue))
rawScore    = min(100, round(totalRaw / 90 × 100))
matchRate   = max(20, rawScore)   // 下限 20%（全外れでも 0% にしない）
```

### 強度補正（表示用）

`rawScore` は人物選定に使う。表示用の `displayContribution` には強度（intensity）補正を加え、ユーザーの特徴が強く出ている部分を視覚的に強調する。

```
cappedSim        = min(rawSimilarity, DISPLAY_BASE_CAP)
displaySim       = applyIntensityAdjustment(cappedSim, userIntensity)
displayContribution = round(displaySim × weight)
```

強度補正は人物の最終選定には影響せず、breakdown の表示レンダリングにのみ使われる。

### `overallImpression` のスコア

印象タグは自由文字列のため、Jaccard 類似度ベースの `impressionSimilarity()` （`src/lib/impression-similarity.ts`）で計算する。

---

## データモデル

### `HistoricalFigure`（`src/content/figures/_shared.ts`）

```typescript
type HistoricalFigure = {
  id: string;
  name: string;
  era: string;
  traits: string[];
  features: FacialFeatureProfile;  // 8軸の enum 値 + overallImpression
  portraitUrl: string;             // Wikimedia 固定 URL
};
```

### `AnalysisResult`（`src/types/analysis.ts`）

Route Handler の最終レスポンス。`AnalysisResultSchema.parse()` を通過した値のみ返却する。

```typescript
type AnalysisResult = {
  person: string;
  era: string;
  matchRate: number;           // 0–100
  reason: string;
  episode: string;
  quote: string;
  userPhotoDataUrl: string;
  portraitUrl: string;
  featureBreakdown: FeatureBreakdownItem[];
};
```

### `FeatureBreakdownItem`（`src/types/features.ts`）

```typescript
type FeatureBreakdownItem = {
  feature: FeatureKey;
  userValue: string;           // ローカライズ済み日本語
  figureValue: string;         // ローカライズ済み日本語
  matched: boolean;
  contribution: number;        // 人物選定に使った生スコア
  displayContribution: number; // 強度補正済み表示スコア
  similarity: number;          // 0.0–1.0
  maxContribution: number;     // = weight（10）
  matchLevel: MatchLevel;      // 'exact' | 'close' | 'partial' | 'weak' | 'none'
};
```

---

## セキュリティ・プライバシー設計

### 画像の処理フロー

```
クライアント: canvas でリサイズ → ArrayBuffer → FormData
サーバー: formData.get('image') → File → arrayBuffer() → base64（メモリ上のみ）
→ Claude API へ送信 → レスポンス後、変数がスコープから外れ GC へ
```

画像バイナリはファイルシステム・DB・Vercel Logs のいずれにも書き出されない。`console.error` 等のログにも base64 を出力しない。

### API キーの境界

```
process.env.ANTHROPIC_API_KEY
  └─ src/lib/claude.ts（サーバーサイドのみ）のみが参照
  └─ 'use client' ファイル・レスポンス JSON・ログへの露出を禁止
```

### 入力バリデーション

| 検証項目 | 実装箇所 | 失敗時 |
|---------|---------|--------|
| MIME タイプ | `route.ts` | 400 |
| ファイルサイズ（3MB 以下） | `route.ts` | 400 |
| Content-Length ガード | `route.ts` | 400 |
| API レスポンス型 | `AnalysisResultSchema.parse()` | 500 |
| レート制限（Upstash） | `src/lib/rate-limit.ts` | 429 |

### セキュリティヘッダー（`vercel.json`）

```json
"X-Content-Type-Options": "nosniff"
"Referrer-Policy": "strict-origin-when-cross-origin"
"Permissions-Policy": "camera=(), microphone=(), geolocation=()"
```

---

## パフォーマンス設計

### Prompt Caching

Stage 1・Stage 3 のシステムプロンプトは固定テキストなので `cache_control: { type: 'ephemeral' }` でキャッシュする。可変な画像入力とキャッシュ境界を分離することで、コストとレイテンシを低減する。

```typescript
system: [
  {
    type: 'text',
    text: EXTRACT_FEATURES_PROMPT,  // 固定テキスト
    cache_control: { type: 'ephemeral' },
  },
]
```

### Vercel Hobby プラン制約への対応

| 制約 | 対応 |
|------|------|
| 関数タイムアウト 30 秒 | `export const maxDuration = 30` を明示 |
| JSON リクエスト 4.5MB 上限 | 画像を JSON に乗せず FormData で送信 |
| Edge Runtime 非対応（Anthropic SDK） | `export const runtime = 'nodejs'` |

タイムアウトが頻発する場合は、環境変数 `CLAUDE_MODEL=claude-haiku-4-5` に切り替えることで高速化できる。コード変更は不要。

### 画像リサイズ（クライアント側）

```
long edge > 1024px  → canvas でリサイズ
ファイルサイズ > 3MB → canvas.toBlob で再圧縮
```

サーバー側の処理負荷を下げつつ、Anthropic Vision の入力コストも抑える。

---

## ディレクトリ構成

```
src/
├─ app/
│  ├─ layout.tsx                   ルートレイアウト + OGP メタデータ
│  ├─ page.tsx                     アップロード UI（Client Component）
│  ├─ result/
│  │  ├─ page.tsx                  結果ページ（Server Component、searchParams 受け取り）
│  │  └─ result-content.tsx        結果表示の Client サブツリー
│  └─ api/
│     ├─ analyze/route.ts          3段パイプラインのエントリ
│     └─ og/route.tsx              動的 OGP 画像（@vercel/og）
├─ lib/
│  ├─ claude.ts                    Anthropic クライアントと CLAUDE_CONFIG
│  ├─ extract-features.ts          Stage 1
│  ├─ scoring.ts                   Stage 2
│  ├─ generate-narrative.ts        Stage 3
│  ├─ impression-similarity.ts     印象タグの Jaccard 類似度
│  └─ rate-limit.ts                Upstash レート制限
├─ content/
│  ├─ historical-figures.ts        200名の再エクスポート
│  ├─ system-prompt.ts             Prompt Caching 対象の固定テキスト
│  └─ figures/
│     ├─ _shared.ts                HistoricalFigure 型・wikimedia ヘルパ
│     ├─ japanese.ts               日本史
│     ├─ western-political.ts      西洋政治
│     ├─ science.ts                科学
│     ├─ arts.ts                   芸術
│     ├─ religion-philosophy.ts    宗教・哲学
│     ├─ eastern.ts                東洋
│     ├─ fiction-myth.ts           神話・フィクション
│     └─ other-luminaries.ts       その他
└─ types/
   ├─ features.ts                  顔特徴 enum・型・重み・ローカライズ（Tool input_schema の単一真実の情報源）
   ├─ feature-similarity.ts        8軸の類似度行列と補正関数
   └─ analysis.ts                  AnalysisResult の Zod スキーマ
```
