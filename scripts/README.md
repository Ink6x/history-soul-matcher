# Scripts

データセット管理用のユーティリティスクリプトです。通常の開発では使用しません。

## enrich-figures.ts

`src/content/figures/` の歴史人物データに不足している `features` フィールドを Claude API で補完します。

```bash
npm run enrich-figures
```

- `ANTHROPIC_API_KEY` が必要です
- 処理結果は `enrichment-output.json` に出力されます
- **注意**: API コストが発生します。差分確認後に `apply-enrichment.ts` で適用してください

## apply-enrichment.ts

`enrichment-output.json` の内容を対応する `figures/*.ts` ファイルに適用します。

```bash
npm run apply-enrichment
```

- `enrich-figures.ts` の実行後に使います
- 適用前に `enrichment-output.json` の内容を必ず確認してください
- 変更後は `npm run typecheck` と `npm test` で整合性を確認してください
