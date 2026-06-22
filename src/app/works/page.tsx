import { Suspense } from "react";
import { WorksClient, type Work } from "./WorksClient";
import { getWorks, transformWork } from "@/lib/wordpress";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Works",
  path: "/works",
});

export default async function WorksPage() {
  let works: Work[] = [];
  try {
    const wpWorks = await getWorks({ per_page: 100 });
    works = wpWorks.map(transformWork);
  } catch (error) {
    console.error("Failed to fetch works from WordPress:", error);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorksClient initialWorks={works} />
    </Suspense>
  );
}
