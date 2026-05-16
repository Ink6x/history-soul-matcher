<div align="center">

# History Soul Matcher

**自撮り写真から、最も「魂が似ている」歴史上の人物を見つけるWebアプリ。**

Claude Vision で顔特徴を構造化抽出し、200名の歴史人物データセット（8カテゴリ分割）に対して決定論的にスコアリング、上位3特徴を根拠としたナラティブを生成する3段パイプラインで構築。

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.2-000000?logo=next.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="Anthropic" src="https://img.shields.io/badge/Anthropic-Claude%20Vision-191919">
  <img alt="License" src="https://img.shields.io/badge/license-All%20Rights%20Reserved-lightgrey">
</p>

<sub>Status: GitHub 公開済 / Vercel デプロイ準備中（公開 URL はデプロイ完了後に追記）</sub>

</div>

---

## Table of Contents

- [Overview](#overview)
- [How It Works](#how-it-works)
- [Why a 3-Stage Pipeline](#why-a-3-stage-pipeline)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Privacy & Security](#privacy--security)
- [License](#license)

---

## Overview

**History Soul Matcher** は、ユーザーがアップロードした顔写真から、最も特徴が一致する歴史上の人物を提示し、その人物との一致点をストーリーとして生成するWebアプリケーションです。

> **Role:** Solo project（要件定義 / アーキテクチャ設計 / 実装 / データセット構築 / 運用設計）
> **Scope:** Claude Vision を中核に据えた 3 段パイプラインの設計検証、200名分の歴史人物データセット構築、デプロイ運用設計まで一貫してソロで担当。

LLM単体で「顔写真を見て歴史上の人物を一人選び、その理由を語ってください」というプロンプトを投げると、

- 人物が **同じ顔ぶれに偏る**（信長・アインシュタインなど）
- データセット外の **架空の人物** が混ざる
- 「なぜ似ているか」がプロンプト調整のたびに **再現性なくブレる**

といった問題が起きます。本プロジェクトは、これらを構造的に抑え込む実装パターンの提示そのものをコアバリューとしています。

### Key Features

- 顔特徴8軸の **構造化抽出**（Claude Vision + Tool Use + 閉じた enum で型を強制）
- **200名** の歴史人物データセット（8カテゴリに分割管理）
- **決定論的スコアリング**（純関数 / LLM不使用）でハルシネーションを排除
- 上位3特徴を **根拠として明示** したナラティブ生成
- **動的 OGP 画像**（`@vercel/og`）でシェア時の体験を最適化
- **アップロード画像は保存しない** プライバシーファースト設計

> Screenshots / live demo はデプロイ完了後に追記します。

---

## How It Works

```
[ User uploads selfie ]
        │
        ▼  client-side resize (≤1024px long edge, ≤3MB)
[ POST /api/analyze ]
        │
        ▼  Stage 1: Vision + Tool Use
[ Structured features ]   ← 顔形 / 輪郭 / 目 / 鼻 / 眉 / 唇 / 頬骨 / 印象タグ
        │
        ▼  Stage 2: pure function (no LLM)
[ Weighted distance scoring against 200 figures ]
        │
        ▼  Stage 3: LLM narrative
[ Reason / episode / quote citing top-3 features ]
        │
        ▼
[ Result page + dynamic OGP image ]
```

| Stage | 責務 | LLM 使用 | 効果 |
|---|---|---|---|
| 1. Feature Extraction | 写真 → 8軸の構造化データ | Yes（Tool Use + enum 制約） | スキーマ違反を構造的に排除 |
| 2. Scoring | 構造化特徴 ⇄ 200名データセットの重み付き距離 | **No（純関数）** | 人物選定でハルシネーションが発生しない |
| 3. Narrative Generation | 上位人物 + 一致特徴 → 理由・エピソード・引用 | Yes（別 Tool） | 物語生成だけを LLM に任せ、人物選定は確定済み |

---

## Why a 3-Stage Pipeline

「LLM に判断と物語生成を一度にやらせない」という原則を、コードレベルで強制するための分割です。

- **判定ロジックを純関数化することで、テスト・再現・パラメータチューニングが容易になる**。同じ特徴入力に対して常に同じスコアが返るため、人物選択結果の差分はスコア重みの差分としてレビューできる。
- **LLM の自由度を「物語生成」だけに局所化することで、誤情報のリスクをナラティブ層に閉じ込められる**。人物名そのものは Stage 2 で決定済みなので、Stage 3 で別人物が紛れることはない。
- **Tool Use + enum によりスキーマ違反を表現できなくする**。`src/types/features.ts` で定義した閉じた列挙型を `input_schema` に渡し、フリーテキスト JSON のパース失敗を構造的に排除している。

### 主要な実装判断

- **Prompt Caching の活用**：固定システムプロンプト（指示文 + 出力スキーマ）を `cache_control: { type: 'ephemeral' }` でキャッシュ。可変な画像入力とキャッシュ境界を分離してコスト・レイテンシを抑える（`src/lib/extract-features.ts`）。
- **Edge Runtime ではなく Node.js Runtime を選択**：Anthropic SDK は Edge 非対応のため `runtime = 'nodejs'`。Route Handler 側で `export const maxDuration = 30` を明示し、Vercel の関数タイムアウトを設計時から制約に組み込んでいる。
- **画像は base64 を JSON に乗せず FormData で送信**：Vercel の 4.5MB JSON リクエスト制限を回避し、サーバー側で `arrayBuffer` → base64 変換。クライアント側は `canvas.toBlob` で長辺 1024px・3MB 以下にリサイズしてから送る。
- **データセットを 8 ファイルに分割**：日本史 / 西洋政治 / 科学 / 芸術 / 宗教哲学 / 東洋 / 神話・フィクション / その他に分けて `src/content/figures/*.ts` で管理し、`src/content/historical-figures.ts` から再エクスポート。プロンプトで「このリスト外を返さないこと」を明示しつつ、実際の人物選定は Stage 2 の純関数が決めるため構造的にリスト外人物は発生しない。
- **OGP は `@vercel/og` で動的生成**：結果ページの URL から人物名と一致率を受け取り、シェア時に画像化される（`src/app/api/og/route.tsx`）。

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2（App Router） |
| UI | React 19.2 / Tailwind CSS 4 |
| Language | TypeScript 5（strict） |
| AI | Anthropic Claude（Vision + Tool Use）— `@anthropic-ai/sdk` 0.95 |
| Schema Validation | Zod 4 |
| OGP | `@vercel/og` 0.11 |
| Deployment | Vercel |

モデル ID は `src/` にハードコードせず、`CLAUDE_MODEL` 環境変数で一元管理しています。

---

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                       Client                          │
│  app/page.tsx (Client Component)                      │
│  ├─ ファイル選択 / プレビュー                          │
│  ├─ canvas で long edge 1024px・3MB 以下にリサイズ      │
│  └─ FormData で POST /api/analyze                      │
└──────────────────────────────────────────────────────┘
                          │
                          ▼ multipart/form-data
┌──────────────────────────────────────────────────────┐
│      Route Handler  app/api/analyze/route.ts           │
│      runtime: nodejs / maxDuration: 30                │
│                                                       │
│   ┌──────────────────────┐                            │
│   │ Stage 1              │  Claude Vision + Tool Use  │
│   │ extractUserFeatures()│  → structured features     │
│   └──────────┬───────────┘                            │
│              │                                        │
│   ┌──────────▼───────────┐                            │
│   │ Stage 2              │  Pure function, no LLM     │
│   │ scoreFigures()       │  → top-N candidates        │
│   └──────────┬───────────┘                            │
│              │                                        │
│   ┌──────────▼───────────┐                            │
│   │ Stage 3              │  Claude narrative gen      │
│   │ generateNarrative()  │  → reason / episode / quote│
│   └──────────────────────┘                            │
└──────────────────────────────────────────────────────┘
                          │
                          ▼ JSON (Zod validated)
┌──────────────────────────────────────────────────────┐
│       Result Page  app/result/page.tsx                 │
│  - sessionStorage + URL params で結果を受け取り         │
│  - /api/og で動的 OGP 画像生成                          │
└──────────────────────────────────────────────────────┘
```

### Boundaries

- API キーは Route Handler 内のみで参照（`'use client'` 内では絶対に触らない）。
- 画像バイナリはメモリ上のみで処理。DB・ファイルシステム・Vercel Logs に出さない。
- すべての外部入力（API レスポンス・画像 MIME / サイズ）は Zod で検証してから使用。

---

## Project Structure

```
history-soul-matcher/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                  # ルートレイアウト + OGP メタデータ
│  │  ├─ page.tsx                    # アップロード UI（Client）
│  │  ├─ result/
│  │  │  ├─ page.tsx                 # 結果ページ（Server、searchParams 受け取り）
│  │  │  └─ result-content.tsx       # 結果表示の Client サブツリー
│  │  └─ api/
│  │     ├─ analyze/route.ts         # 3段パイプラインのエントリ（nodejs / maxDuration 30）
│  │     └─ og/route.tsx             # 動的 OGP 画像（@vercel/og）
│  ├─ lib/
│  │  ├─ claude.ts                   # Anthropic クライアントと CLAUDE_CONFIG
│  │  ├─ extract-features.ts         # Stage 1: Vision + Tool Use（顔特徴8軸）
│  │  ├─ scoring.ts                  # Stage 2: 純関数の重み付き距離計算
│  │  └─ generate-narrative.ts       # Stage 3: 物語生成（別 Tool）
│  ├─ content/
│  │  ├─ historical-figures.ts       # 8カテゴリの再エクスポート（合計200名）
│  │  ├─ system-prompt.ts            # Prompt Caching 対象の固定 system テキスト
│  │  └─ figures/
│  │     ├─ _shared.ts               # HistoricalFigure 型・wikimedia ヘルパ
│  │     ├─ japanese.ts              # 日本史
│  │     ├─ western-political.ts     # 西洋政治
│  │     ├─ science.ts               # 科学
│  │     ├─ arts.ts                  # 芸術
│  │     ├─ religion-philosophy.ts   # 宗教・哲学
│  │     ├─ eastern.ts               # 東洋
│  │     ├─ fiction-myth.ts          # 神話・フィクション
│  │     └─ other-luminaries.ts      # その他
│  ├─ types/
│  │  ├─ features.ts                 # 顔特徴の enum と型（Tool input_schema の真実の情報源）
│  │  └─ analysis.ts                 # AnalysisResult の Zod schema
│  └─ components/
│     ├─ ComparisonCard.tsx          # 自分 vs 歴史人物の比較カード
│     ├─ FeatureBreakdown.tsx        # 上位特徴と寄与スコアの表示
│     └─ LoadingOverlay.tsx          # 解析中オーバーレイ
├─ public/                            # 静的アセット
├─ .env.example                       # 環境変数テンプレ
└─ package.json
```

---

## Getting Started

### Prerequisites

- Node.js 20 以上
- Anthropic API キー（[console.anthropic.com](https://console.anthropic.com/) で発行）

### Installation

```bash
git clone https://github.com/Ink6x/history-soul-matcher.git
cd history-soul-matcher
npm install
cp .env.example .env.local
```

`.env.local` に API キーを記入したあと、

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開きます。

---

## Environment Variables

`.env.example` をコピーして `.env.local` を作成し、以下を設定します。

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ | Anthropic Console で発行した API キー |
| `CLAUDE_MODEL` | ⛔️ (optional) | 既定 `claude-sonnet-4-6`。タイムアウト退避時は `claude-haiku-4-5` 等に切替可能 |

**Rules**

- モデル ID は `src/` にハードコードしない（`CLAUDE_MODEL` 環境変数経由のみ）。
- `ANTHROPIC_API_KEY` を `'use client'` ファイル・ログ・レスポンスに露出させない。
- Vercel デプロイ時は Project Settings → Environment Variables から設定。

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | 開発サーバー起動（http://localhost:3000） |
| `npm run build` | プロダクションビルド |
| `npm run start` | ビルド済アプリのローカル起動 |
| `npm run lint` | ESLint（`eslint-config-next`） |

---

## Deployment

Vercel での運用を前提に設計しています。

1. このリポジトリを Vercel にインポート
2. `ANTHROPIC_API_KEY`（必要なら `CLAUDE_MODEL`）を Environment Variables に追加
3. Hobby プランの場合、`/api/analyze` の `maxDuration` を `30` 以内に維持（既定で 30）

タイムアウトが頻発する場合は `CLAUDE_MODEL=claude-haiku-4-5` に環境変数だけで切り替え可能です。コード変更不要。

---

## Privacy & Security

- アップロードされた画像は Route Handler のメモリ上でのみ処理し、レスポンス返却後に破棄します。**ファイルシステム・データベース・ログには一切保存しません**。
- API キーはサーバーサイドの環境変数のみから参照し、Client Component・レスポンス本体・ログには出力しません。
- 画像 MIME（`image/jpeg` / `image/png` / `image/webp` / `image/gif`）とサイズ（3MB 以下）をサーバー側で検証します。
- 著名人の写真であっても「本人特定はせず、特徴が似ている歴史人物としてのみ扱う」方針をプロンプトで明示しています。

---

## License

All Rights Reserved.

本リポジトリは閲覧目的で公開されています。商用利用・再配布・派生物の作成は許可していません。ライセンスに関する問い合わせは Issue または GitHub プロフィール記載の連絡先までお願いします。
