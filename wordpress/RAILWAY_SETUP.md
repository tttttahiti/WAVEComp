# Railway WordPress セットアップガイド

## 1. Railway アカウント作成

1. https://railway.app/ にアクセス
2. 「Login」→ GitHub アカウントでログイン（推奨）
3. プランを選択（Hobby $5/月 で十分）

## 2. WordPress プロジェクト作成

1. ダッシュボードで「New Project」をクリック

2. 「Deploy a Template」を選択

3. 検索バーで「WordPress」と検索

4. 「WordPress」テンプレートを選択（MySQL 付き）

5. 「Deploy」をクリック

6. 数分待つとデプロイ完了

## 3. WordPress URL の確認

1. デプロイ完了後、WordPress サービスをクリック

2. 「Settings」タブ → 「Networking」セクション

3. 「Generate Domain」をクリック

4. `xxxxx.up.railway.app` のような URL が生成される

5. この URL をブラウザで開く

## 4. WordPress 初期設定

1. 言語選択: 「日本語」を選択

2. サイト情報を入力:
   - サイトのタイトル: `WA/VE`
   - ユーザー名: `admin`（任意）
   - パスワード: 強力なパスワードを設定
   - メールアドレス: 管理者のメールアドレス

3. 「WordPress をインストール」をクリック

4. ログイン画面で設定した情報でログイン

## 5. カスタムプラグインのインストール

### 方法 A: 管理画面からアップロード

1. `wordpress/plugins/wave-custom-post-types` フォルダを ZIP 化:
   ```bash
   cd /Users/hayatoshimada/Documents/Code/WAVEComp/wordpress/plugins
   zip -r wave-custom-post-types.zip wave-custom-post-types
   ```

2. WordPress 管理画面 → プラグイン → 新規追加

3. 「プラグインをアップロード」をクリック

4. `wave-custom-post-types.zip` を選択してアップロード

5. 「今すぐインストール」→「有効化」

### 方法 B: WP-CLI（上級者向け）

Railway の Shell から:
```bash
cd /var/www/html/wp-content/plugins
# GitHubからダウンロードする場合
```

## 6. 推奨プラグインのインストール

管理画面 → プラグイン → 新規追加 から以下をインストール:

| プラグイン | 用途 |
|-----------|------|
| **ACF (Advanced Custom Fields)** | カスタムフィールドの拡張（任意） |
| **WP REST Cache** | API レスポンスのキャッシュ |
| **UpdraftPlus** | バックアップ（ムームー移行時に使用） |

## 7. パーマリンク設定

1. 設定 → パーマリンク

2. 「投稿名」を選択

3. 「変更を保存」

## 8. CORS 設定（既にプラグインに含まれています）

カスタムプラグインに CORS 設定が含まれているため、Next.js からのアクセスが可能です。

本番環境では `wave-custom-post-types.php` の以下の部分を修正:

```php
// 変更前（全てのオリジンを許可）
header('Access-Control-Allow-Origin: *');

// 変更後（特定のドメインのみ許可）
header('Access-Control-Allow-Origin: https://wa-ve.jp');
```

## 9. REST API の確認

ブラウザで以下の URL にアクセスして API が動作することを確認:

- Works: `https://YOUR_DOMAIN.up.railway.app/wp-json/wp/v2/works`
- Releases: `https://YOUR_DOMAIN.up.railway.app/wp-json/wp/v2/releases`
- Members: `https://YOUR_DOMAIN.up.railway.app/wp-json/wp/v2/members`

## 10. Next.js の環境変数を更新

`.env.local` を作成または更新:

```env
WORDPRESS_API_URL=https://YOUR_DOMAIN.up.railway.app/wp-json/wp/v2
```

## 11. チームメンバーの招待

1. Railway ダッシュボード → プロジェクト設定

2. 「Members」タブ

3. メールアドレスでチームメンバーを招待

WordPress 管理画面でもユーザーを追加:
1. ユーザー → 新規追加
2. 役割を「編集者」に設定（コンテンツ編集のみ許可）

---

## トラブルシューティング

### デプロイが失敗する場合

1. Railway ダッシュボードでログを確認
2. 「Redeploy」を試す

### データベース接続エラー

1. MySQL サービスが起動しているか確認
2. 環境変数が正しく設定されているか確認

### アップロードサイズ制限

Railway のデフォルトは 2MB。大きな画像をアップロードする場合:

1. `php.ini` または `.user.ini` で設定:
```ini
upload_max_filesize = 64M
post_max_size = 64M
```

---

## 料金について

Railway Hobby プラン: $5/月
- 500時間の実行時間
- 100GB のネットワーク転送
- 1GB のディスク容量

テスト・開発用途には十分です。

---

## 次のステップ

セットアップ完了後:
1. サンプルコンテンツを登録
2. Next.js からデータ取得を確認
3. チームで内容を確認
4. 本番環境（ムームーサーバー）への移行準備
