# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WA/VE Website - A creative studio/artist collective website using a headless CMS architecture.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Technology Stack

- **Frontend:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **CMS:** WordPress (Headless configuration via REST API) - 未実装

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # トップページ
│   ├── about/             # ABOUTページ
│   ├── hal-ca/            # HAL caアーティストページ
│   ├── releases/          # リリース一覧
│   ├── works/             # WORKS一覧
│   │   └── [slug]/        # WORKS詳細（動的ルート）
│   └── contact/           # お問い合わせ
├── components/            # 共通コンポーネント
│   ├── Header.tsx         # ヘッダー＋ナビゲーション
│   ├── Footer.tsx         # フッター
│   ├── WorkCard.tsx       # WORKS カード
│   ├── ReleaseCard.tsx    # Release カード
│   └── ContactForm.tsx    # お問い合わせフォーム
└── lib/                   # ユーティリティ（WordPress API連携予定）
```

## Reference Materials

- `DESIGN.md` - Project specifications (Japanese)
- `SVG_REQUIREMENTS.md` - 必要なSVG/画像アセット一覧
- `WAVE_WEBSITE_10.pdf` - Desktop design reference
- `WAVE_WEBSITE_10_MOBILE.pdf` - Mobile design reference

## Content Schema

### WORKS (制作実績)
Portfolio items with: thumbnail, client/company, title, hashtags, production date, caption, WAVE's role, participating artists, URL, client's role, gallery images, YouTube embeds, credits.

### Releases
HAL ca artist releases with: release date, track list, streaming links, images, title, album/single type, caption.

## Design Colors

- Blue: `#0066FF`
- Purple: `#8B7BE8`
- Lime: `#C8FF00`
- Lavender: `#B8C4FF`

## Remaining Tasks

1. WordPress headless CMS セットアップ
2. WordPress REST API 連携実装
3. 画像アセットの配置
4. SVGアセットの配置（`SVG_REQUIREMENTS.md`参照）
5. フォーム送信機能の実装
