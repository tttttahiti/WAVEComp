# クラウド WordPress デプロイメントガイド

遠方のチームと実装確認を進めるための、クラウド WordPress 環境の構築方法です。

---

## 推奨オプション

| サービス | 月額費用 | セットアップ時間 | 本番移行 |
|---------|---------|----------------|---------|
| **Railway** | ~$5〜 | 5分 | ⭐⭐⭐ |
| **DigitalOcean** | $6〜 | 10分 | ⭐⭐⭐⭐ |
| **AWS Lightsail** | $5〜 | 15分 | ⭐⭐⭐⭐⭐ |
| **さくらVPS** | ¥700〜 | 20分 | ⭐⭐⭐⭐ |

---

## Option 1: Railway（最速・推奨）

### 特徴
- GitHub連携で自動デプロイ
- 無料枠あり（$5/月の使用量まで）
- スケーリングが簡単

### セットアップ手順

1. [Railway](https://railway.app/) でアカウント作成

2. 新規プロジェクト作成 → 「Deploy a Template」→ 「WordPress」を選択

3. 環境変数を設定（自動生成される）

4. デプロイ完了後、生成されたURLにアクセス

5. WordPress初期設定を完了

6. プラグインをアップロード:
   - 管理画面 → プラグイン → 新規追加 → プラグインをアップロード
   - `wordpress/plugins/wave-custom-post-types` フォルダをZIP化してアップロード

---

## Option 2: DigitalOcean 1-Click WordPress

### 特徴
- 本番環境と同等の構成
- SSH アクセス可能
- バックアップ機能あり

### セットアップ手順

1. [DigitalOcean](https://www.digitalocean.com/) でアカウント作成

2. 「Create」→「Droplets」→「Marketplace」→「WordPress」を選択

3. プランを選択（Basic $6/月 で十分）

4. リージョンを選択（SGP1 = シンガポールが日本から近い）

5. SSH Key を設定（またはパスワード認証）

6. 「Create Droplet」

7. 数分後、IPアドレスが発行される

8. ブラウザで `http://YOUR_IP` にアクセス

9. SSH でプラグインをアップロード:
```bash
scp -r wordpress/plugins/wave-custom-post-types root@YOUR_IP:/var/www/html/wp-content/plugins/
```

10. WordPress管理画面でプラグインを有効化

---

## Option 3: AWS Lightsail

### 特徴
- AWS 本番環境への移行が最もスムーズ
- 固定IP、SSL証明書が簡単
- 3ヶ月無料枠あり

### セットアップ手順

1. [AWS Lightsail](https://lightsail.aws.amazon.com/) にアクセス

2. 「Create instance」

3. 「WordPress」を選択

4. プランを選択（$5/月 で十分）

5. インスタンス名を入力して作成

6. 数分後、接続情報が表示される

7. 「Connect using SSH」でターミナル接続

8. WordPress パスワードを確認:
```bash
cat $HOME/bitnami_application_password
```

9. 静的IPを割り当て（Networking タブ）

10. プラグインをアップロード:
```bash
scp -i YOUR_KEY.pem -r wordpress/plugins/wave-custom-post-types bitnami@YOUR_IP:/opt/bitnami/wordpress/wp-content/plugins/
```

---

## 共通設定：チーム共有用

### 1. チームメンバーのアカウント作成

WordPress 管理画面 → ユーザー → 新規追加

| 役割 | 権限 |
|-----|-----|
| 管理者 | 全機能 |
| 編集者 | 投稿の編集・公開 |
| 投稿者 | 自分の投稿のみ |

### 2. SSL 証明書の設定（本番用）

**Lightsail の場合:**
```bash
sudo /opt/bitnami/bncert-tool
```

**DigitalOcean の場合:**
```bash
sudo certbot --apache -d yourdomain.com
```

### 3. Next.js 環境変数の設定

チームで共有する `.env.local`:

```env
# 開発環境（ローカル）
WORDPRESS_API_URL=http://localhost:8080/wp-json/wp/v2

# ステージング環境（クラウド）
# WORDPRESS_API_URL=https://your-staging-domain.com/wp-json/wp/v2

# 本番環境
# WORDPRESS_API_URL=https://api.wa-ve.jp/wp-json/wp/v2
```

---

## プラグインの ZIP 作成

チームにプラグインを共有する場合:

```bash
cd wordpress/plugins
zip -r wave-custom-post-types.zip wave-custom-post-types
```

---

## 推奨ワークフロー

```
[ローカル開発] → [ステージング(クラウド)] → [本番]
     ↓                    ↓                    ↓
  Next.js開発        チーム確認            公開
  Docker WP        クラウドWP          本番WP
```

### ブランチ戦略

```
main (本番)
  └── staging (ステージング確認用)
        └── feature/* (機能開発)
```

---

## 質問があれば

どのサービスを使うか決まったら、詳細なセットアップをサポートします。
