import { HomeClient, type FeaturedItem } from "./HomeClient";
import {
  getWorks,
  getReleases,
  getNewsList,
  filterVisibleNews,
  transformWork,
  transformRelease,
  type WPNews,
} from "@/lib/wordpress";

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

export default async function HomePage() {
  let featuredItems: FeaturedItem[] = [];
  let newsList: WPNews[] = [];

  try {
    const [wpWorks, wpReleases, wpNews] = await Promise.all([
      getWorks({ per_page: 100 }),
      getReleases({ per_page: 100 }),
      getNewsList({ per_page: 20 }).catch(() => []),
    ]);

    newsList = filterVisibleNews(wpNews);

    // Works を変換
    const works: FeaturedItem[] = wpWorks
      .filter((work) => !!work.work_meta.featured)
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
          featuredOrder: transformed.featuredOrder ?? 99,
          date: transformed.date,
        };
      });

    // Releases を変換
    const releases: FeaturedItem[] = wpReleases
      .filter((release) => !!release.release_meta.featured)
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
          featuredOrder: transformed.featuredOrder ?? 99,
          date: transformed.releaseDate,
        };
      });

    // 統合してfeatured_orderでソート
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

  return <HomeClient featuredItems={featuredItems} newsList={newsList} />;
}
