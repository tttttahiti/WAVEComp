# ムームーサーバーへの移行ガイド

Railway でテスト・確認が完了したら、本番環境のムームーサーバーへ移行します。

## 前提条件

- ムームーサーバーの契約が完了していること
- ムームードメインでドメインを取得済み（例: `wa-ve.jp`）
- Railway WordPress でコンテンツが登録済み

---

## Step 1: ムームーサーバーで WordPress をセットアップ

### 1.1 コントロールパネルにログイン

1. https://muumuu-domain.com/ にアクセス
2. コントロールパネルにログイン
3. サーバー管理画面へ

### 1.2 WordPress 簡単インストール

1. 「WordPress」または「簡単インストール」を選択
2. インストール先ディレクトリを設定:
   - サブディレクトリ: `/wp` または `/api`（推奨）
   - 例: `https://wa-ve.jp/wp/`
3. データベースを新規作成
4. 管理者情報を入力
5. インストール実行

### 1.3 SSL 証明書の設定

1. サーバー管理画面 → SSL設定
2. 無料SSL（Let's Encrypt）を有効化
3. `https://wa-ve.jp` でアクセスできることを確認

---

## Step 2: Railway からデータをエクスポート

### 2.1 WordPress 標準エクスポート

1. Railway WordPress 管理画面にログイン
2. ツール → エクスポート
3. 「すべてのコンテンツ」を選択
4. 「エクスポートファイルをダウンロード」
5. `.xml` ファイルを保存

### 2.2 メディアファイルのエクスポート

1. プラグイン「Export Media Library」をインストール
2. メディア → Export → ZIP でダウンロード

### 2.3 データベースのエクスポート（バックアップ用）

Railway で phpMyAdmin または WP-CLI を使用:

```bash
# WP-CLI の場合
wp db export backup.sql
```

または UpdraftPlus プラグインでバックアップ。

---

## Step 3: ムームーサーバーにデータをインポート

### 3.1 カスタムプラグインをインストール

1. ムームー WordPress 管理画面 → プラグイン → 新規追加
2. 「プラグインをアップロード」
3. `wave-custom-post-types.zip` をアップロード
4. 有効化

### 3.2 コンテンツをインポート

1. ツール → インポート
2. 「WordPress」の「今すぐインストール」
3. インポーターを実行
4. Railway からエクスポートした `.xml` ファイルを選択
5. 「添付ファイルをダウンロードしてインポートする」にチェック
6. 実行

### 3.3 メディアファイルを手動アップロード（必要な場合）

FTP または ファイルマネージャーで:
```
/wp-content/uploads/
```
にメディアファイルをアップロード

---

## Step 4: 設定の調整

### 4.1 サイト URL の更新

WordPress 管理画面 → 設定 → 一般:
- WordPress アドレス: `https://wa-ve.jp/wp`
- サイトアドレス: `https://wa-ve.jp/wp`

### 4.2 パーマリンク設定

設定 → パーマリンク → 「投稿名」→ 保存

### 4.3 CORS 設定の更新

`wave-custom-post-types.php` を編集:

```php
// 本番用に変更
header('Access-Control-Allow-Origin: https://wa-ve.jp');
```

FTP でファイルを更新、または管理画面のプラグインエディタで編集。

---

## Step 5: Next.js の環境変数を更新

### 5.1 本番環境変数

Vercel などのホスティングで環境変数を設定:

```env
WORDPRESS_API_URL=https://wa-ve.jp/wp/wp-json/wp/v2
```

### 5.2 ドメイン構成の例

```
wa-ve.jp                  → Next.js（Vercel）
wa-ve.jp/wp              → WordPress（ムームーサーバー）
wa-ve.jp/wp/wp-admin     → WordPress 管理画面
```

---

## Step 6: DNS 設定

### 6.1 ムームードメインで設定

1. ムームードメイン管理画面
2. DNS設定 → カスタムDNS

### 6.2 A レコード / CNAME の設定

| ホスト | タイプ | 値 |
|-------|-------|-----|
| @ | A | ムームーサーバーのIP |
| www | CNAME | @ |
| (Vercel用) | CNAME | cname.vercel-dns.com |

※ Next.js を Vercel でホストする場合は、Vercel の DNS 設定に従う

---

## Step 7: 動作確認

### 7.1 WordPress API の確認

```bash
curl https://wa-ve.jp/wp/wp-json/wp/v2/works
```

### 7.2 Next.js からの接続確認

```bash
cd /Users/hayatoshimada/Documents/Code/WAVEComp
npm run build
npm run start
```

### 7.3 チェックリスト

- [ ] WordPress 管理画面にログインできる
- [ ] カスタム投稿タイプ（Works, Releases, Members）が表示される
- [ ] REST API が正しく動作する
- [ ] メディアファイルが正しく表示される
- [ ] Next.js からデータを取得できる
- [ ] SSL が有効（https）

---

## トラブルシューティング

### メディアファイルが表示されない

1. URL の置換が必要な場合:
   - プラグイン「Better Search Replace」をインストール
   - Railway の URL をムームーの URL に一括置換

### REST API が 404

1. パーマリンク設定を保存し直す
2. `.htaccess` が正しく生成されているか確認

### CORS エラー

1. プラグインの CORS 設定を確認
2. `wp-config.php` に以下を追加:
```php
define('CORS_ORIGIN', 'https://wa-ve.jp');
```

---

## 本番運用の推奨設定

### セキュリティ

1. **Wordfence** プラグインをインストール
2. 管理画面へのアクセス制限（IP制限など）
3. 定期バックアップの設定（UpdraftPlus）

### パフォーマンス

1. **WP Super Cache** または **W3 Total Cache**
2. 画像の最適化（**ShortPixel** など）

### 監視

1. **Jetpack** でダウンタイム監視
2. Google Search Console の設定

---

## Railway の停止

本番移行が完了し、問題ないことを確認したら:

1. Railway ダッシュボード → プロジェクト
2. Settings → Danger Zone
3. 「Delete Project」

※ 念のため 1-2 週間は Railway を維持しておくことを推奨
