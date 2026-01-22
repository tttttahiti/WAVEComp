# WA/VE WordPress テスト環境

Docker を使用した WordPress ヘッドレス CMS 環境です。

## 必要条件

- Docker Desktop がインストールされていること
- Docker Compose が使用可能なこと

## セットアップ

### 1. 環境変数の設定

```bash
cd wordpress
cp .env.example .env
```

### 2. Docker コンテナの起動

```bash
docker-compose up -d
```

### 3. WordPress の初期設定

1. ブラウザで http://localhost:8080 にアクセス
2. WordPress のセットアップウィザードに従ってインストール
3. 管理画面にログイン後、プラグイン → インストール済みプラグイン → 「WA/VE Custom Post Types」を有効化

## アクセス URL

| サービス | URL |
|---------|-----|
| WordPress | http://localhost:8080 |
| WordPress 管理画面 | http://localhost:8080/wp-admin |
| phpMyAdmin | http://localhost:8081 |

## REST API エンドポイント

| エンドポイント | 説明 |
|--------------|------|
| `/wp-json/wp/v2/works` | Works 一覧・詳細 |
| `/wp-json/wp/v2/releases` | Releases 一覧・詳細 |
| `/wp-json/wp/v2/members` | Members 一覧・詳細 |
| `/wp-json/wp/v2/work-categories` | Work カテゴリー |
| `/wp-json/wp/v2/work-tags` | Work タグ |
| `/wp-json/wp/v2/release-types` | Release タイプ |

## カスタム投稿タイプ

### Works（実績）
- Client（クライアント名）
- Date（日付）
- Role（担当）
- URL（外部リンク）
- Video URL（動画URL）
- Listen URL（視聴リンク）
- Gallery（ギャラリー画像）
- Credits（クレジット）

### Releases（リリース）
- Release Date（リリース日）
- Tracks（曲リスト）
- Listen URL（視聴リンク）
- Apple Music URL
- Spotify URL

### Members（メンバー）
- Name English（英語名）
- Role（役職）
- Achievements（実績一覧）

## コマンド

```bash
# 起動
docker-compose up -d

# 停止
docker-compose down

# ログ確認
docker-compose logs -f

# 再起動
docker-compose restart

# 完全削除（データも含む）
docker-compose down -v
```

## 本番環境への移行

### データのエクスポート

1. WordPress 管理画面 → ツール → エクスポート
2. すべてのコンテンツをエクスポート

または phpMyAdmin からデータベースをエクスポート。

### 推奨本番環境

- **AWS**: Lightsail WordPress または EC2 + RDS
- **GCP**: Compute Engine + Cloud SQL
- **Managed WordPress**: Kinsta, WP Engine, さくらのレンタルサーバー

### 本番環境での設定

1. `wp-config.php` で以下を設定:

```php
define('WP_HOME', 'https://your-domain.com');
define('WP_SITEURL', 'https://your-domain.com');
define('WP_DEBUG', false);
```

2. SSL 証明書を設定
3. CORS 設定を Next.js のドメインに限定
4. セキュリティプラグインをインストール（Wordfence など）

## トラブルシューティング

### ポートが使用中の場合

`docker-compose.yml` の ports を変更:

```yaml
ports:
  - "8082:80"  # 8080 → 8082 に変更
```

### パーミッションエラー

```bash
docker-compose exec wordpress chown -R www-data:www-data /var/www/html/wp-content
```

### データベース接続エラー

```bash
docker-compose down
docker-compose up -d
```

## Next.js からの接続

`.env.local` に追加:

```env
WORDPRESS_API_URL=http://localhost:8080/wp-json/wp/v2
```
