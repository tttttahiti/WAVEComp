import { HalCaClient } from "./HalCaClient";
import { getWorks, getReleases, transformWork, transformRelease } from "@/lib/wordpress";
import { type FeaturedItem } from "@/app/HomeClient";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "HAL ca",
  path: "/hal-ca",
});

/**
 * 日付文字列をDateオブジェクトに変換
 * 対応フォーマット: "2024/12/13", "2024.12", "2024-12-13" など
 */
function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  // "2024/12/13" or "2024.12" or "2024-12-13"
  const normalized = dateStr.replace(/[.\/]/g, "-");
  const parts = normalized.split("-").map(Number);
  if (parts.length >= 2) {
    const [year, month, day = 1] = parts;
    return new Date(year, month - 1, day);
  }
  return null;
}

export default async function HalCaPage() {
  let featuredItems: FeaturedItem[] = [];

  try {
    const [wpWorks, wpReleases] = await Promise.all([
      getWorks({ per_page: 100 }),
      getReleases({ per_page: 100 }),
    ]);

    // Works を変換（featured_halcaフラグ付きのみ）
    const works: FeaturedItem[] = wpWorks
      .filter((work) => !!work.work_meta.featured_halca)
      .map((work) => {
        const transformed = transformWork(work);
        return {
          type: "work" as const,
          id: transformed.id,
          slug: transformed.slug,
          thumbnail: transformed.thumbnail,
          client: transformed.client,
          title: transformed.title,
          tags: transformed.tags,
          role: transformed.roleEn || transformed.role,
          displayOrder: transformed.displayOrder ?? 99,
          featuredOrder: transformed.featuredHalcaOrder ?? 99,
          date: transformed.date,
        };
      });

    // Releases を変換（featured_halcaフラグ付きのみ）
    const releases: FeaturedItem[] = wpReleases
      .filter((release) => !!release.release_meta.featured_halca)
      .map((release) => {
        const transformed = transformRelease(release);
        const roleArray = ["Release"];
        if (transformed.releaseDate) {
          roleArray.push("Date:");
          roleArray.push(transformed.releaseDate);
        }
        return {
          type: "release" as const,
          id: transformed.id,
          slug: transformed.slug,
          thumbnail: transformed.coverImage,
          client: "RELEASE",
          title: transformed.title,
          tags: transformed.tags,
          role: roleArray.join(", "),
          displayOrder: transformed.displayOrder ?? 99,
          featuredOrder: transformed.featuredHalcaOrder ?? 99,
          date: transformed.releaseDate,
          listenUrl: transformed.listenUrl
        };
      });

    // featured_halca_orderでソート
    featuredItems = [...works, ...releases].sort((a, b) => {
      // 1. featured_orderでソート（小さい数字が先）
      if (a.featuredOrder !== b.featuredOrder) {
        return a.featuredOrder - b.featuredOrder;
      }

      // 2. 日付でソート（新しい順）
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      if (dateA && dateB) {
        return dateB.getTime() - dateA.getTime();
      }
      if (dateA) return -1;
      if (dateB) return 1;

      // 3. 取得順（元の順序を維持）
      return 0;
    });
  } catch (error) {
    console.error("Failed to fetch data from WordPress:", error);
  }

  return <HalCaClient featuredItems={featuredItems} />;
}
