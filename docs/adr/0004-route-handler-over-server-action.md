# ADR-0004: Server Action ではなく Route Handler を採用

## ステータス

採用済

## コンテキスト

Next.js App Router では、サーバーサイドの処理を実装する手段として Server Actions と Route Handlers の2つがある。`/api/analyze` エンドポイントの実装方式を選択する必要があった。

## 決定

`src/app/api/analyze/route.ts` として Route Handler を採用した。

```typescript
export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: NextRequest) { ... }
```

## 理由

- **明示的な HTTP セマンティクス**: ステータスコード（400 / 429 / 503 / 500）を細かく制御できる。Anthropic の 529 を 503 にリマップするような HTTP レイヤーの操作が Server Action では難しい
- **マルチクライアント対応**: 将来的なモバイルアプリやサードパーティからの直接 API 呼び出しに対応できる。Server Action は Next.js クライアント専用
- **明示的なレート制限**: `request.headers.get('x-forwarded-for')` で IP を取得して Upstash Redis でレート制限を適用できる
- **`runtime: 'nodejs'` の明示**: Anthropic SDK は Edge Runtime に非対応。Route Handler では `export const runtime = 'nodejs'` を明示でき、誤って Edge で動く事故を防げる
- **テスト容易性**: `fetch` でモックした HTTP リクエストを送ることで統合テストが書きやすい

## 結果・トレードオフ

**良い点:**
- エラーハンドリングが HTTP ステータスコードに直接マッピングされ、フロント側が `response.status` で判断しやすい
- `Content-Length` ヘッダーでボディ解析前の早期拒否ができる

**トレードオフ:**
- Server Action の Progressive Enhancement（JS 無効環境でのフォーム動作）は不要なため問題にならない
- `next/cache` の `revalidatePath` 等の統合が若干使いにくくなるが、このエンドポイントにキャッシュは不要

## 検討した代替案

| 案 | 却下理由 |
|----|---------|
| Server Action | HTTP ステータスコードの細かい制御が難しい。Edge/Node の明示がしにくい。マルチクライアント対応に向かない |
| tRPC | 追加の依存関係が必要で、このプロジェクトの規模に対して過剰 |
| GraphQL | 同上 |
