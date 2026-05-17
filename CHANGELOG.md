# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.1.0] - 2026-05-17

### Added

- 3段パイプライン（Claude Vision + 決定論的スコアリング + ナラティブ生成）の実装
- 200名の歴史人物データセット（8カテゴリ）
- 顔特徴の8軸構造化抽出（Tool Use + 閉じた enum）
- 純関数による決定論的スコアリング（Stage 2 に LLM 不使用）
- 動的 OGP 画像生成（`@vercel/og`）
- Upstash Redis によるレート制限
- Prompt Caching によるコスト最適化
- Vercel Hobby プランへの本番デプロイ（hnd1 リージョン）
- Zod によるレスポンスのスキーマ検証
- セキュリティヘッダ（`vercel.json`）
- Health check エンドポイント（`/api/healthz`）
- GitHub Actions による CI（lint / typecheck / test / build）

[Unreleased]: https://github.com/Ink6x/history-soul-matcher/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Ink6x/history-soul-matcher/releases/tag/v0.1.0
