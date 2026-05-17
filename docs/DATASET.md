# データセット仕様

`src/content/figures/` に格納された200名の歴史人物データセットの構造・選定基準・拡張方法を解説します。

---

## 構成

| ファイル | カテゴリ | 人数 |
|---------|---------|-----|
| `japanese.ts` | 日本史 | 25名 |
| `western-political.ts` | 西洋政治・軍事 | 30名 |
| `science.ts` | 科学・数学・医学 | 25名 |
| `arts.ts` | 芸術・文学・音楽 | 25名 |
| `religion-philosophy.ts` | 宗教・哲学 | 25名 |
| `eastern.ts` | 東洋（中国・インド・中東等）| 25名 |
| `fiction-myth.ts` | 神話・伝説・フィクション | 20名 |
| `other-luminaries.ts` | その他の著名人 | 25名 |

全カテゴリは `src/content/historical-figures.ts` で再エクスポートされ、Stage 2 のスコアリングに使われます。

---

## 各人物のデータ構造

```typescript
// src/content/figures/_shared.ts
type HistoricalFigure = {
  id: string;                    // スネークケースの一意ID（例: 'oda_nobunaga'）
  name: string;                  // 表示名（日本語）
  era: string;                   // 時代・地域（例: '戦国時代・日本, 1534-1582'）
  traits: string[];              // 性格・行動特性キーワード（3〜5個）
  features: FacialFeatureProfile; // 8軸の顔特徴 + overallImpression
  portraitUrl: string;           // Wikimedia Commons の肖像画 URL
};
```

---

## 8軸の特徴定義

各軸の enum 値は `src/types/features.ts` が**唯一の情報源**です。

| 軸 | フィールド名 | enum 値の数 | 例 |
|----|------------|-----------|-----|
| 顔の輪郭 | `faceShape` | 9 | oval, round, square, long, heart... |
| 顎のライン | `jawline` | 8 | sharp, soft, square, narrow... |
| 目の形 | `eyeShape` | 9 | almond, round, hooded, upturned... |
| 目の間隔 | `eyeSpacing` | 7 | very-close → very-wide |
| 鼻筋 | `noseShape` | 9 | straight, aquiline, roman, flat... |
| 眉 | `browShape` | 9 | arched, thick, bushy, sparse... |
| 唇の厚み | `lipFullness` | 7 | very-thin → very-full |
| 頬骨 | `cheekbones` | 8 | high, prominent, sculpted, flat... |
| 全体印象 | `overallImpression` | 自由タグ 3〜5個 | stoic, regal, intense... |

`overallImpression` は英語の短語タグ（スネークケース）で記述します。Stage 2 の `impressionSimilarity()` が Jaccard 係数でタグの重複率を計算します。

---

## 選定基準

1. **肖像画の存在**: Wikimedia Commons に信頼できる肖像画があること
2. **カテゴリバランス**: 8カテゴリで大きな偏りが出ないよう調整
3. **地理的多様性**: 西洋中心にならないよう東洋・日本・中東・アフリカも含む
4. **時代的多様性**: 古代〜近代まで幅広くカバー
5. **スコアリングの多様性**: 8軸の特徴組み合わせが多様であること（同じ `faceShape='oval'` の人物が集中しないよう調整）

---

## 肖像画の利用について

全肖像画は Wikimedia Commons から取得しており、以下のライセンス条件を確認済みです。

- **PD-old（著作権切れ）**: 作者の没後70年以上経過した作品
- **PD-art**: 平面美術作品の忠実な複製
- **CC BY / CC BY-SA**: 帰属表示が必要なもの（URL を `portraitUrl` に含めることで帰属を示す）

```typescript
// src/content/figures/_shared.ts
export function wikimedia(filename: string): string {
  const encoded = encodeURIComponent(filename);
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/.../${encoded}/240px-${encoded}`;
}
```

---

## 新規人物の追加手順

1. 対象カテゴリのファイル（`src/content/figures/*.ts`）を開く
2. `HistoricalFigure` 型に従ってオブジェクトを追加する
3. `features` の8軸値は `src/types/features.ts` の enum から選ぶ（IDE 補完が効きます）
4. `portraitUrl` は Wikimedia Commons で肖像画を探し、`wikimedia()` ヘルパを使う
5. `npm run typecheck` で型エラーがないことを確認する
6. `npm test` でスコアリングテストが通ることを確認する

---

## データセットの限界

- **文化的バイアス**: 史料・肖像画が豊富に残る西洋・東アジアの人物が多い
- **時代的バイアス**: 写実的な肖像画が一般化した近世以降の人物の方が特徴を正確に設定しやすい
- **特徴設定の主観性**: 8軸の値は歴史的肖像画・彫像・写真を元に手動で設定しており、完全に客観的ではない
- **過剰な「鋭い顎」**: 歴史的肖像画では貴族的な顔立ちが多く描かれる傾向があり、`sharp` jawline が多めになっている
