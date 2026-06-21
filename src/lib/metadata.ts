import type { Metadata } from "next";

export const SITE_NAME = "WA/VE";
export const SITE_URL = "https://wa-ve.jp";
export const SITE_DESCRIPTION =
  "WA/VEは音楽制作・サウンドデザイン・空間演出を手がけるクリエイティブプロダクションです。音を軸としたコンテンツ企画・制作、サウンドブランディング、イベントプロデュースを行っています。";
export const DEFAULT_OG_IMAGE = "/images/ogp.jpg";

/**
 * ページ単位の metadata を生成する。
 * Next.js は openGraph / twitter をディープマージしないため、
 * ページで定義するとルートの og:image やカード種別が失われる。
 * このヘルパーで毎回フルに組み立てて取りこぼしを防ぐ。
 */
export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  return {
    title, // ルートの title.template により "title | WA/VE" になる
    description,
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
