import { HalCaClient } from "./HalCaClient";
import { getWorks, getReleases, transformWork, transformRelease } from "@/lib/wordpress";
import { type FeaturedItem } from "@/app/HomeClient";

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

    // Works を変換
    const works: FeaturedItem[] = wpWorks.map((work) => {
      const transformed = transformWork(work);
      return {
        type: "work" as const,
        id: transformed.id,
        slug: transformed.slug,
        thumbnail: transformed.thumbnail,
        client: transformed.client,
        title: transformed.title,
        tags: transformed.tags,
        role: transformed.role,
        displayOrder: transformed.displayOrder ?? 99,
        date: transformed.date,
      };
    });

    // Releases を変換
    const releases: FeaturedItem[] = wpReleases.map((release) => {
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
        client: "",
        title: transformed.title,
        tags: transformed.tags,
        role: roleArray.join(", "),
        displayOrder: transformed.displayOrder ?? 99,
        date: transformed.releaseDate,
      };
    });

    // #HAL ca タグが含まれているアイテムだけを抽出
    const halCaItems = [...works, ...releases].filter((item) =>
      item.tags.some((tag) => tag === "#HAL ca" || tag === "#HALca" || tag.toLowerCase().includes("hal ca"))
    );

    // 統合してソート
    featuredItems = halCaItems.sort((a, b) => {
      // 1. 表示順でソート（小さい数字が先）
      if (a.displayOrder !== b.displayOrder) {
        return a.displayOrder - b.displayOrder;
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
