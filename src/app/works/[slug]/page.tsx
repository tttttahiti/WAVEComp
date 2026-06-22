import type { Metadata } from "next";
import { getWorkBySlug, stripHtml, transformWorkDetail } from "@/lib/wordpress";
import { pageMetadata } from "@/lib/metadata";
import { WorkDetail } from "@/components/WorkDetail";

// 常にサーバーサイドで動的レンダリングを行う
export const dynamic = 'force-dynamic';

interface WorkDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const wpWork = await getWorkBySlug(slug);
    if (wpWork) {
      const title = stripHtml(wpWork.title.rendered);
      const rawDescription = stripHtml(wpWork.content.rendered).replace(/\s+/g, " ").trim();

      return pageMetadata({
        title,
        description: rawDescription ? rawDescription.slice(0, 120) : undefined,
        path: `/works/${slug}`,
        image: wpWork.featured_image_url || undefined,
      });
    }
  } catch (error) {
    console.error("Failed to fetch work metadata from WordPress:", error);
  }

  return { title: "Works" };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;

  let wpWork = null;
  try {
    wpWork = await getWorkBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch work from WordPress:", error);
  }

  if (!wpWork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Work not found</p>
      </div>
    );
  }

  return <WorkDetail work={transformWorkDetail(wpWork)} />;
}
