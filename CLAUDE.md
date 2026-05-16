# CLAUDE.md — history-soul-matcher

## プロジェクト概要

自撮り写真をアップロードすると、最も「魂が似ている」歴史人物を提示する Web アプリ。
Claude Vision で顔特徴を構造化抽出し、決定論的にスコアリング、上位特徴を根拠としたナラティブを生成する 3 段パイプラインで構築する。

**デプロイ先:** Vercel Hobby（独立アプリ）
**公開URL:** 未定（デプロイ後に追記）

---

## 3 段パイプラインの不変条件（壊さないこと）

このアプリの設計の中核は「LLM に判断と物語生成を一度にやらせない」原則。改修するときは Stage 境界を必ず保つ。

| Stage | 責務 | LLM 使用 | 根拠 |
|---|---|---|---|
| 1. `extractUserFeatures` | 画像 → 8軸の構造化特徴 | Yes（Tool Use + 閉じた enum） | スキーマ違反を表現できない |
| 2. `scoreFigures` | 構造化特徴 ⇄ 200 人データセットの重み付き距離 | **No（純関数）** | 人物選定にハルシネーション不発生 |
| 3. `generateNarrative` | 上位特徴 + 人物 → 理由・エピソード・引用 | Yes（別 Tool） | 誤情報のリスクをナラティブ層に閉じ込める |

- **Stage 2 に LLM を入れない**。スコア式の調整はコード差分でレビューできる形を保つ。
- **Stage 1 の enum** (`src/types/features.ts`) は `input_schema` と画面表示ラベルの両方の真実の情報源。値を増やすときは両方を同時に更新する。
- **Stage 3 で人物を選び直さない**。`matchedFigure` は Stage 2 の出力をそのまま渡す。

---

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| フレームワーク | Next.js 16.2（App Router） / React 19.2 |
| 言語 | TypeScript 5（strict mode） |
| AI | Anthropic Claude（Vision + Tool Use、モデルは環境変数で管理） / `@anthropic-ai/sdk` 0.95 |
| スキーマ検証 | Zod 4 |
| OGP | `@vercel/og` 0.11 |
| スタイリング | Tailwind CSS 4 |
| デプロイ | Vercel |

---

## ディレクトリ構成

```
history-soul-matcher/
  src/
    app/
      layout.tsx                  # ルートレイアウト + OGP メタデータ
      page.tsx                    # アップロード UI（Client Component）
      result/
        page.tsx                  # 結果ページ（Server Component）
        result-content.tsx        # 結果表示の Client サブツリー
      api/
        analyze/route.ts          # 3段パイプラインのエントリ（nodejs / maxDuration 30）
        og/route.tsx              # 動的 OGP 画像（@vercel/og）
    lib/
      claude.ts                   # Anthropic クライアント・CLAUDE_CONFIG の単一情報源
      extract-features.ts         # Stage 1: Vision + Tool Use
      scoring.ts                  # Stage 2: 純関数の重み付き距離計算
      generate-narrative.ts       # Stage 3: ナラティブ生成（別 Tool）
    content/
      historical-figures.ts       # 8カテゴリの再エクスポート（合計200名）
      system-prompt.ts            # Prompt Caching 対象の固定 system テキスト
      figures/
        _shared.ts                # HistoricalFigure 型・wikimedia ヘルパ
        japanese.ts               # 日本史
        western-political.ts      # 西洋政治
        science.ts                # 科学
        arts.ts                   # 芸術
        religion-philosophy.ts    # 宗教・哲学
        eastern.ts                # 東洋
        fiction-myth.ts           # 神話・フィクション
        other-luminaries.ts       # その他
    types/
      features.ts                 # 顔特徴の enum と型（Tool input_schema の真実の情報源）
      analysis.ts                 # AnalysisResultSchema / Zod
    components/
      ComparisonCard.tsx          # 自分 vs 歴史人物の比較カード
      FeatureBreakdown.tsx        # 上位特徴と寄与スコア表示
      LoadingOverlay.tsx          # 解析中オーバーレイ
  public/                          # 静的アセット
  .env.example                     # 環境変数テンプレ
```

---

## 開発コマンド

```bash
npm run dev    # 開発サーバー起動（localhost:3000）
npm run build  # プロダクションビルド
npm run lint   # ESLint
```

---

## 環境変数

```env
ANTHROPIC_API_KEY=sk-ant-...
CLAUDE_MODEL=claude-sonnet-4-6   # モデルIDはここで一元管理
```

**ルール:**
- モデル ID を `src/` 内にハードコード禁止。必ず `process.env.CLAUDE_MODEL` を使う
- `ANTHROPIC_API_KEY` をクライアントコンポーネント・ログ・レスポンスに露出させない
- Vercel の Environment Variables ダッシュボードから設定

---

## モデル選択方針

| 用途 | 推奨モデル | 理由 |
|------|-----------|------|
| 本番（画像解析＋ナラティブ） | `claude-sonnet-4-6` | Vision 精度を優先。Hobby `maxDuration=30` 内で安定稼働を実測検証 |
| タイムアウト退避 | `claude-haiku-4-5` | Sonnet で 30 秒超過が頻発した場合の env 切替先。高速・安価 |
| 開発・デバッグ | `claude-haiku-4-5` | 反復速度優先 |

モデル ID 変更は `CLAUDE_MODEL` 環境変数の差し替えのみで完結させること。

---

## Claude クライアント設定（`src/lib/claude.ts`）

```typescript
import Anthropic from '@anthropic-ai/sdk';

export const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const CLAUDE_CONFIG = {
  model: process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-6',
  maxTokens: 512,    // Hobby 30秒制約内に収めるためのデフォルト。Stage 別に上書き可
  temperature: 0.7,
} as const;
```

各 Stage のリクエストでは `max_tokens` を個別に上書きする（Stage 1: 400、Stage 3: 500 など）。

---

## Route Handler 設定（`src/app/api/analyze/route.ts`）

```typescript
export const runtime = 'nodejs';   // Anthropic SDK は Edge Runtime 非対応
export const maxDuration = 30;     // Vercel Hobby の現行上限内
```

**ストリーミング:** 不採用。最終 JSON を一括返却する方がフロント実装が単純かつ堅牢。

**採用理由（Server Actions ではなく Route Handler）:** 再利用性・キャッシュヘッダ制御・将来的なモバイルアプリ対応を見据え Route Handler を採用。

---

## 画像アップロード仕様

### クライアント側
- `<input type="file" accept="image/jpeg,image/png,image/webp,image/gif">`
- アップロード前に `canvas.toBlob` でリサイズ（**long edge 1024px 以下・3MB 以下**）
- **JSON に base64 を乗せない**（Vercel の 4.5MB リクエスト制限を回避）
- `FormData (multipart/form-data)` で Route Handler へ送信

### サーバー側（Route Handler）
- `await request.formData()` → `File` → `arrayBuffer()` → base64 変換の順で処理
- `data:image/jpeg;base64,` などの prefix を API へ渡すときは付けない（Anthropic SDK の `source.data` は純粋な base64）
- 対応 MIME を検証: `image/jpeg` / `image/png` / `image/webp` / `image/gif` 以外は 400 を返す
- ファイルサイズが 3MB を超えたら 400
- **画像はメモリ上のみで処理。ファイルシステム・DB・ログ・Vercel ログに保存・出力しない**

---

## 歴史人物データセット（`src/content/figures/*.ts`）

- 8 カテゴリ計 **200 名**を `figures/` 配下のファイル単位で分割管理し、`historical-figures.ts` で再エクスポート
- 各人物は `id` / `name` / `era` / `traits` / `features`（8軸のカテゴリ値 + `overallImpression` タグ）/ `portraitUrl` を持つ
- プロンプトでは「**このリスト外を返さないこと**」を明示。実際の人物選定は Stage 2 の純関数が決めるため、リスト外人物が紛れ込むことは構造的に起きない
- ポートレート画像は Wikimedia の固定 URL を使用（`figures/_shared.ts` の `wikimedia` ヘルパ）

---

## Claude API プロンプト設計

### プロンプトキャッシング
- システムプロンプト（`EXTRACT_FEATURES_PROMPT` / `NARRATIVE_PROMPT`）は**固定テキスト**なので `cache_control: { type: 'ephemeral' }` でキャッシュ
- 画像・ユーザーメッセージはリクエストごとにユニークなのでキャッシュ不要

```typescript
system: [
  {
    type: 'text',
    text: EXTRACT_FEATURES_PROMPT, // 固定テキスト
    cache_control: { type: 'ephemeral' },
  },
],
```

### 出力スキーマ強制（Tool Use）

Stage 1（特徴抽出）と Stage 3（ナラティブ生成）でそれぞれ別の Tool を定義し、`tool_choice` で強制呼び出しする。

```typescript
// Stage 1: extract_facial_features
tools: [{
  name: 'extract_facial_features',
  description: '写真から顔の構造的特徴を抽出する',
  input_schema: {
    type: 'object',
    properties: {
      faceShape: { type: 'string', enum: [...FACE_SHAPES] },
      jawline:   { type: 'string', enum: [...JAWLINES] },
      // ... 残り 6 軸 + overallImpression (3〜5 タグ)
    },
    required: [/* 全 9 フィールド */],
  },
}]
tool_choice: { type: 'tool', name: 'extract_facial_features' }

// Stage 3: output_narrative
tools: [{
  name: 'output_narrative',
  input_schema: {
    type: 'object',
    properties: {
      reason:  { type: 'string' },
      episode: { type: 'string' },
      quote:   { type: 'string' },
    },
    required: ['reason', 'episode', 'quote'],
  },
}]
tool_choice: { type: 'tool', name: 'output_narrative' }
```

---

## 型定義（`src/types/analysis.ts`）

```typescript
import { z } from 'zod';

export const FeatureBreakdownItemSchema = z.object({
  feature: z.string(),
  userValue: z.string(),
  figureValue: z.string(),
  matched: z.boolean(),
  contribution: z.number(),
});

export const AnalysisResultSchema = z.object({
  person: z.string(),
  era: z.string(),
  matchRate: z.number().min(0).max(100),
  reason: z.string(),
  episode: z.string(),
  quote: z.string(),
  userPhotoDataUrl: z.string(),
  portraitUrl: z.string().url(),
  featureBreakdown: z.array(FeatureBreakdownItemSchema),
});

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
```

Route Handler の最終ペイロードは必ず `AnalysisResultSchema.parse()` を通してから返却する。

---

## Server / Client Components 分担

| ファイル | 種別 | 理由 |
|---------|------|------|
| `app/page.tsx` | Client Component (`'use client'`) | ファイル選択・プレビュー・リサイズ・フォーム送信 |
| `app/result/page.tsx` | Server Component | URL の searchParams / sessionStorage 受け取りの薄いラッパ |
| `app/result/result-content.tsx` | Client Component | 結果表示・OGP シェアボタン・アニメーション |
| `app/api/analyze/route.ts` | Server-only | API キー・画像処理を完全サーバー側に閉じる |
| `app/api/og/route.tsx` | Server-only | `@vercel/og` で動的 OGP 画像生成 |

---

## エラーハンドリング規約

### Route Handler 内
```typescript
try {
  // ...
} catch (error) {
  console.error('[analyze] error:', error); // ログ: 詳細
  return NextResponse.json(
    { error: '診断できませんでした。もう一度お試しください。' }, // ユーザー向け: 詳細を隠す
    { status: 500 }
  );
}
```

### HTTP ステータスコード別の扱い
| ステータス | 原因 | 対応 |
|-----------|------|------|
| 400 | 画像不正（MIME・サイズ） | ユーザーに原因を表示 |
| 429 | Anthropic レート制限 | **リトライしない**。即時 429 を返してユーザーに再試行を促す |
| 529 → 503 にリマップ | Anthropic サーバー過負荷 | 「混み合っています」表示、リトライなし |
| 500 | Zod 検証失敗 / SDK 例外 / 想定外 | ユーザー向けメッセージは汎用、`[analyze]` ログに詳細 |

- 開発時のみ `IS_DEV` フラグで `detail` フィールドを返却し、デバッグ可能にする
- Zod 失敗は `error.issues[0]` をログ + dev `detail` に出す（本番ユーザーには見せない）

---

## コーディング規約・禁止事項

- `any` 型の使用禁止
- `as` による型アサーション原則禁止（Zod の `.parse()` で型を獲得する。Tool Use の `input` は構造的に絞り込めないため `as` 利用を限定的に許可、ただしファイル境界を越えない）
- `process.env.ANTHROPIC_API_KEY` を `'use client'` 内で参照禁止
- API キー・base64 画像データをログに出力禁止
- 画像を localStorage・IndexedDB・DB・ファイルシステムに保存禁止
- 歴史人物リスト外の人物をプロンプトで選ばせない（そもそも Stage 2 の純関数が決めるので構造的に発生し得ないが、Stage 1/3 のプロンプトでも明示）
- モデル ID のハードコード禁止（環境変数経由のみ）

---

## プライバシー・コンテンツ方針

- アップロードされた画像はリクエスト処理後にメモリから破棄される
- 写真に写る人物の年齢・人種・性別を断定しないことをプロンプトで明示
- 著名人の写真であっても「本人特定はせず、特徴が似ている歴史人物としてのみ扱う」方針

---

## OGP / SEO / a11y

- 診断結果ページは `@vercel/og` で動的 OGP 画像を生成（シェア最適化）
- ファイルアップロードはキーボード操作対応（`<label>` + `<input>` で実装）
- 画像プレビューには `alt` 属性を設定
