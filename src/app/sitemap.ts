import type { MetadataRoute } from "next";
import { getWorks } from "@/lib/wordpress";

const SITE_URL = "https://wa-ve.jp";

// 静的ルート
const STATIC_PATHS = ["", "/about", "/hal-ca", "/works", "/releases", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  let workEntries: MetadataRoute.Sitemap = [];
  try {
    const works = await getWorks({ per_page: 100 });
    workEntries = works.map((work) => ({
      url: `${SITE_URL}/works/${work.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Failed to build works sitemap entries:", error);
  }

  return [...staticEntries, ...workEntries];
}
