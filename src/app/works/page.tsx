import { WorksClient } from "./WorksClient";
import { getWorks, transformWork } from "@/lib/wordpress";

export default async function WorksPage() {
  let works = [];
  try {
    const wpWorks = await getWorks({ per_page: 100 });
    works = wpWorks.map(transformWork);
  } catch (error) {
    console.error("Failed to fetch works from WordPress:", error);
    // エラー時は空配列を返す
  }

  return <WorksClient initialWorks={works} />;
}
