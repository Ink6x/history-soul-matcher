# ADR-0005: JSON base64 ではなく FormData で画像送信

## ステータス

採用済

## コンテキスト

クライアント（ブラウザ）からサーバー（Route Handler）へ画像を送信する方法を選択する必要があった。

## 決定

`multipart/form-data`（FormData）で送信する。

クライアント側:
```typescript
const formData = new FormData();
formData.append('image', resizedBlob, 'photo.jpg');
await fetch('/api/analyze', { method: 'POST', body: formData });
```

サーバー側:
```typescript
const formData = await request.formData();
const file = formData.get('image'); // File オブジェクト
const arrayBuffer = await file.arrayBuffer();
const base64 = Buffer.from(arrayBuffer).toString('base64');
```

## 理由

- **Vercel のリクエストサイズ制限**: Vercel Hobby プランは JSON リクエストボディの上限が 4.5MB。base64 は元のバイナリより約33%大きくなるため、3MB の画像を base64 で JSON に包むと約4MB になり制限に近づく。FormData（multipart）はバイナリをそのまま送るためオーバーヘッドがない
- **`File` オブジェクトの取得**: `formData.get('image')` が `File` を返すため、`file.type`（MIME）と `file.size` を直接取得でき、バリデーションが簡潔
- **Content-Length による早期拒否**: `request.headers.get('content-length')` でボディ解析前にサイズ超過を弾ける
- **Web 標準**: FormData は Web 標準 API であり、ブラウザ・Node.js・将来のモバイルクライアントで一貫して使える

## 結果・トレードオフ

**良い点:**
- Anthropic SDK の `source.data` に渡す base64 は純粋な base64 文字列（prefix なし）で、FormData 経由の変換フローと整合している
- クライアント側は `canvas.toBlob()` でリサイズ後にそのまま FormData に追加できるため実装が自然

**トレードオフ:**
- JSON API と異なり `Content-Type: application/json` でないため、一部の API クライアントライブラリでの利用時に設定が必要
- `request.json()` ではなく `request.formData()` を使う必要があり、Route Handler の実装が若干異なる

## 検討した代替案

| 案 | 却下理由 |
|----|---------|
| JSON body に base64 を埋め込む | Vercel 4.5MB 制限に抵触するリスクがある。base64 オーバーヘッド（+33%）で 3MB 画像が約4MBになる |
| Presigned URL（S3 等）で直接アップロード | インフラ追加が必要。画像をストレージに保存するためプライバシーポリシーが複雑になる |
| URL で画像を渡す（外部 URL 参照）| ユーザーの自撮り写真を外部 URL で扱えないケースが大半 |
