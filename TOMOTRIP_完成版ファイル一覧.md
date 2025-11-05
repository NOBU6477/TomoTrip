# TomoTrip 完成版ファイル一覧

## 📍 完成版の場所

すべての最新ファイルは **`client/`** ディレクトリにあります。

## 📁 主要ファイル

### HTMLファイル（メインページ）
- **場所**: `client/index.html`
- **行数**: 940行
- **更新日**: 2025年11月4日
- **内容**: 
  - LINE登録モーダル（ガイド/旅行者/協賛店の3択）
  - 動画選択モーダル（YouTube新規タブ表示）
  - 4タブ式オーディエンスセグメント
  - モバイル最適化デザイン
  - すべてのLINE登録ボタンがモーダル機能に統合

### JavaScriptファイル（機能実装）
- **場所**: `client/src/main.js`
- **行数**: 779行
- **更新日**: 2025年11月4日
- **実装機能**:
  - LINE深層リンク（oaMessage形式）
  - フォールバック機構（キーワードコピー機能）
  - YouTube動画の新規タブ表示
  - タブ切り替え機能
  - アナリティクストラッキング準備
  - キーボードナビゲーション（Escapeキー対応）

### CSSファイル（デザイン）
- **場所**: `client/src/styles.css`
- **内容**:
  - #00A3C4 アクセントカラー
  - モバイルファースト responsive design
  - 44px+ タップターゲット
  - モーダルアニメーション
  - 白ベースの清潔感あるデザイン

## 🖼️ 画像ファイル

### ロゴ
- **場所**: `client/public/tomotrip-logo.png`
- **説明**: TomoTripの公式ロゴ（ヤシの木と人物）

### ヒーロー画像
- **場所**: `client/public/hero-beach-yacht.png`
- **説明**: メインビジュアル用のビーチとヨットの画像

### ステップ画像
- `client/public/step1.png` - LINE登録ステップ
- `client/public/step2.png` - プラン作成ステップ
- `client/public/step3.png` - 予約受付ステップ

## ⚙️ 設定ファイル

### 設定ガイド
- **場所**: `CONFIG.md`
- **内容**: LINE Account ID、友だち追加URL、動画URLの設定方法

### 設定箇所（`client/src/main.js`内）
```javascript
// 13行目から23行目
const LINE_ACCOUNT_ID = 'REPLACE_WITH_YOUR_LINE_ID';
const LINE_ADD_FRIEND_URL = 'https://lin.ee/REPLACE_ME';
const VIDEO_URLS = {
  guide: 'https://www.youtube.com/watch?v=GUIDE_VIDEO_ID',
  tourist: 'https://www.youtube.com/watch?v=TOURIST_VIDEO_ID',
  sponsor: 'https://www.youtube.com/watch?v=SPONSOR_VIDEO_ID'
};
```

## ✨ 実装済み機能

### LINE登録機能
- ✅ 全ページのLINE登録ボタンからモーダルが開く
- ✅ ガイド/旅行者/協賛店の3つの選択肢
- ✅ LINE深層リンク（oaMessage形式）で事前入力メッセージ
- ✅ フォールバック機構（デスクトップ環境向け）
- ✅ キーワードコピー機能

### 動画選択機能
- ✅ 「30秒で見る」ボタンからモーダルが開く
- ✅ ガイド向け/旅行者向け/協賛店向けの3つの動画選択
- ✅ YouTube動画を新規タブで表示
- ✅ 設定未完了時の警告メッセージ

### オーディエンスセグメント
- ✅ 4つのタブ（学生/夜職/主婦・個人事業主/観光事業者）
- ✅ 各タブごとの詳細説明とFAQ
- ✅ URLパラメータ対応（?audience=student など）

### モバイル最適化
- ✅ レスポンシブデザイン（360px最小幅）
- ✅ タッチ最適化（44px以上のタップターゲット）
- ✅ モバイル用固定CTAバー
- ✅ スムーズスクロール

### アクセシビリティ
- ✅ ARIA属性
- ✅ キーボードナビゲーション
- ✅ スキップリンク
- ✅ フォーカス管理

### SEO対策
- ✅ Open Graph タグ
- ✅ Twitter Card
- ✅ JSON-LD構造化データ
- ✅ PWAマニフェスト

## 🚀 本番利用前の設定項目

本番環境で使用する前に、以下を設定してください：

1. **LINE Account ID** (`client/src/main.js` 13行目)
2. **LINE友だち追加URL** (`client/src/main.js` 14行目)
3. **YouTube動画URL** (`client/src/main.js` 17-21行目)
4. **ドメイン・OGP画像URL** (`client/index.html` 16行目など)

詳細は `CONFIG.md` を参照してください。

## 📊 GitHubリポジトリ

完成版はGitHubにも保存されています：
- **リポジトリ**: https://github.com/NOBU6477/TomoTrip

---

**このファイル一覧を保存しておくと、いつでも完成版の場所を確認できます。**
