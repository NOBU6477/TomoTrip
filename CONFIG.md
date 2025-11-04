# TomoTrip 設定ガイド

このファイルには、TomoTripランディングページの動作に必要な設定情報が含まれています。

## 📱 LINE公式アカウント設定

LINE登録モーダルを動作させるには、以下の設定が必要です。

### 1. LINE_ACCOUNT_ID（必須）

**ファイル**: `client/src/main.js`（15行目）

```javascript
const LINE_ACCOUNT_ID = 'REPLACE_WITH_YOUR_LINE_ID'; // 先頭の@は付けない
```

**設定方法**:
1. LINE公式アカウントマネージャーにログイン
2. 「設定」→「アカウント設定」を開く
3. 「ベーシックID」または「プレミアムID」をコピー（例: `abc123def`）
4. `@`記号を除いて、上記の値を置き換える

**例**:
```javascript
const LINE_ACCOUNT_ID = 'abc123def'; // @abc123def の場合
```

### 2. LINE_ADD_FRIEND_URL（推奨）

**ファイル**: `client/src/main.js`（16行目）

```javascript
const LINE_ADD_FRIEND_URL = 'https://lin.ee/REPLACE_ME';
```

**設定方法**:
1. LINE公式アカウントマネージャーで「友だち追加」URL を取得
2. `https://lin.ee/` で始まるURLをコピー
3. 上記の値を置き換える

**例**:
```javascript
const LINE_ADD_FRIEND_URL = 'https://lin.ee/AbC1234';
```

**重要**: このURLはフォールバック用です。oaMessage Deep Linkが動作しない環境（デスクトップブラウザなど）で使用されます。

---

## 🎬 YouTube動画URL設定

動画選択モーダルを動作させるには、以下の設定が必要です。

### 動画URL設定

**ファイル**: `client/src/main.js`（19-23行目）

```javascript
const VIDEO_URLS = {
  guide: 'https://www.youtube.com/watch?v=GUIDE_VIDEO_ID',
  tourist: 'https://www.youtube.com/watch?v=TOURIST_VIDEO_ID',
  sponsor: 'https://www.youtube.com/watch?v=SPONSOR_VIDEO_ID'
};
```

**設定方法**:
1. YouTube動画をアップロード（各ユーザータイプ向けに3本の動画）
2. 各動画のURLをコピー（`https://www.youtube.com/watch?v=` 形式）
3. 上記の値を置き換える

**例**:
```javascript
const VIDEO_URLS = {
  guide: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  tourist: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
  sponsor: 'https://www.youtube.com/watch?v=9bZkp7q19f0'
};
```

**または、HTMLファイルで直接設定**:

**ファイル**: `client/index.html`（777, 789, 801行目）

```html
<!-- ガイド向け動画 -->
<button class="option-card option-card--guide" data-video-url="https://www.youtube.com/watch?v=GUIDE_VIDEO_ID">

<!-- 観光客向け動画 -->
<button class="option-card option-card--tourist" data-video-url="https://www.youtube.com/watch?v=TOURIST_VIDEO_ID">

<!-- 協賛店向け動画 -->
<button class="option-card option-card--sponsor" data-video-url="https://www.youtube.com/watch?v=SPONSOR_VIDEO_ID">
```

---

## ✅ 設定確認チェックリスト

設定が完了したら、以下を確認してください：

### LINE登録機能
- [ ] `LINE_ACCOUNT_ID` に実際のLINE公式アカウントIDを設定した
- [ ] `LINE_ADD_FRIEND_URL` に友だち追加URLを設定した
- [ ] モーダルの各ボタン（観光客/ガイド/協賛店）をクリックして、LINEアプリが開くか確認
- [ ] デスクトップブラウザで、フォールバック機能（キーワードコピーUI）が表示されるか確認

### 動画選択機能
- [ ] 3つの動画URLを設定した（ガイド向け/観光客向け/協賛店向け）
- [ ] モーダルの各ボタンをクリックして、YouTube動画が新規タブで開くか確認

---

## 🎯 動作の仕組み

### LINE登録モーダル
1. ユーザーが登録タイプ（観光客/ガイド/協賛店）を選択
2. LINE oaMessage Deep Linkで、選択したキーワードが自動入力された状態でLINEアプリを開く
3. ユーザーが送信ボタンを押すだけで登録完了

**Deep Link形式**:
```
https://line.me/R/oaMessage/@{LINE_ACCOUNT_ID}/?{キーワード}
```

**送信されるキーワード**:
- 観光客登録 → `観光客`
- ガイド登録 → `ガイド`
- 協賛店登録 → `協賛店`

### フォールバック機能
Deep Linkが動作しない環境では：
1. 友だち追加URLを新規タブで開く
2. キーワードコピーUIを表示
3. ユーザーがキーワードをコピーして手動で送信

---

## 📊 アナリティクス

すべてのインタラクションは `window.ttTrack()` 関数で追跡されます：

- `line_modal_open` - LINE登録モーダルを開いた
- `line_registration_click` - 登録タイプを選択した（キーワード付き）
- `line_fallback_triggered` - フォールバック機能が起動した
- `keyword_copied` - キーワードをコピーした
- `video_selection_modal_open` - 動画選択モーダルを開いた
- `video_open` - 動画を開いた（動画タイプとURL付き）

Google Analytics 4またはGoogle Tag Managerと連携する場合は、`main.js` の `window.ttTrack` 関数を編集してください。

---

## ❓ トラブルシューティング

### LINEアプリが開かない
- `LINE_ACCOUNT_ID` が正しいか確認（`@`記号は不要）
- モバイルデバイスでテスト（デスクトップではフォールバック機能が動作）

### フォールバック機能が表示されない
- `LINE_ADD_FRIEND_URL` が設定されているか確認
- デスクトップブラウザでテスト

### 動画が開かない
- YouTube URLが正しいか確認（`https://www.youtube.com/watch?v=` 形式）
- ブラウザのポップアップブロッカーを確認

---

## 🔄 設定変更後の手順

設定を変更した後は：
1. ファイルを保存
2. ワークフローを再起動（自動的に再起動されます）
3. ブラウザでページをリロード
4. 各機能をテスト

---

必要に応じて、このファイルを参照して設定を更新してください。
