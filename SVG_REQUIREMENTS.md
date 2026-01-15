# 必要なSVGアセット一覧

PDFデザインから抽出が必要なSVG要素をまとめています。

## ロゴ・ブランド

### 1. WA/VE ロゴ（メイン）
- **ファイル名**: `logo-wave.svg`
- **用途**: ヒーローセクション、ページヘッダー、フッター
- **カラー**: 白（グラデーション背景用）、黒（白背景用）
- **特徴**: 幾何学的サンセリフ体、「A」が逆V字型
- **バリエーション**:
  - `logo-wave-white.svg` - 白色版
  - `logo-wave-black.svg` - 黒色版

### 2. SOUND \ テキストロゴ
- **ファイル名**: `logo-sound.svg`
- **用途**: 左上コーナーに常に表示
- **カラー**: 白
- **特徴**: 斜線「\」を含む特徴的なレイアウト

## アイコン

### 3. ハンバーガーメニューアイコン
- **ファイル名**: `icon-menu.svg`
- **用途**: ナビゲーション開閉ボタン
- **サイズ**: 24x24px
- **カラー**: 白
- **状態**: 開いた状態は×アイコンにアニメーション変形（CSS実装済み）

### 4. 閉じるアイコン（×）
- **ファイル名**: `icon-close.svg`
- **用途**: メニューオーバーレイの閉じるボタン
- **サイズ**: 24x24px
- **カラー**: 黒
- **特徴**: PDFでは斜めの交差線（⨉）

### 5. 再生ボタンアイコン
- **ファイル名**: `icon-play.svg`
- **用途**: 動画サムネイル上のプレイボタン
- **サイズ**: 64x64px
- **カラー**: 白（半透明背景付き）

## 背景・装飾

### 6. グラデーション背景画像
- **ファイル名**: `bg-gradient.svg` または `bg-gradient.png`
- **用途**: ヒーローセクション、ページヘッダー
- **サイズ**: フルスクリーン対応
- **カラー**: 青 → 紫 → ラベンダー → 黄緑のグラデーション
- **特徴**:
  - 縦横に重なる色面
  - ノイズ/グレインテクスチャ
  - 現在CSSで近似実装済み、よりオリジナルに近づけるなら画像推奨

## SNSアイコン（オプション）

必要に応じて外部リンク用にSNSアイコンを用意：
- `icon-instagram.svg`
- `icon-facebook.svg`
- `icon-apple-music.svg`
- `icon-spotify.svg`

---

## 配置場所

```
public/
└── svg/
    ├── logo-wave-white.svg
    ├── logo-wave-black.svg
    ├── logo-sound.svg
    ├── icon-menu.svg
    ├── icon-close.svg
    ├── icon-play.svg
    └── bg-gradient.svg (または .png)
```

## 優先度

1. **高**: WA/VE ロゴ（白・黒）
2. **高**: SOUND \ テキストロゴ
3. **中**: グラデーション背景（現在CSS近似あり）
4. **低**: メニューアイコン（現在CSS実装済み）
5. **低**: SNSアイコン（テキストリンクで代用可）

## 画像アセット（別途必要）

### メンバー写真
- `/public/images/members/shimada.jpg` - 島田舞
- `/public/images/members/kikuchi.jpg` - 菊地晴夏

### HAL ca
- `/public/images/hal-ca-hero.jpg` - HAL caページヒーロー画像（手の写真）

### Works サムネイル
- `/public/images/works/taste-woods.jpg`
- `/public/images/works/bmw-museum.jpg`
- `/public/images/works/suntory.jpg`
- `/public/images/works/yamaha.jpg`
- `/public/images/works/matsumoto.jpg`
- `/public/images/works/afterimage.jpg`

### Works 詳細画像
- `/public/images/works/taste-woods-hero.jpg`
- `/public/images/works/taste-woods-1.jpg` 〜 `taste-woods-4.jpg`
- `/public/images/works/matsumoto-hero.jpg`

### Releases ジャケット
- `/public/images/releases/reflection.jpg`
- `/public/images/releases/afterimage.jpg`
- `/public/images/releases/anima.jpg`
- `/public/images/releases/in-the-fog.jpg`
- `/public/images/releases/wanderer.jpg`
