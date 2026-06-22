import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkPreview, transformWorkDetail } from "@/lib/wordpress";
import { WorkDetail } from "@/components/WorkDetail";

// プレビューは常に最新の下書きを取得する
export const dynamic = "force-dynamic";

// 検索エンジンにインデックスさせない
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

interface PreviewPageProps {
  searchParams: Promise<{ id?: string; token?: string }>;
}

export default async function WorkPreviewPage({ searchParams }: PreviewPageProps) {
  const { id, token } = await searchParams;

  const wpWork = await getWorkPreview(id ?? "", token ?? "");
  if (!wpWork) {
    // トークン不一致 / 存在しない場合は 404（プレビューの存在を秘匿）
    notFound();
  }

  const statusLabel = wpWork.status === "publish" ? "公開中" : "公開前（下書き）";

  return (
    <>
      {/* 非公開プレビューであることを明示するバナー */}
      <div className="sticky top-0 z-40 bg-wave-blue text-white text-[10pt] md:text-[12pt] font-bold text-center py-2 px-5 md:px-[45px]">
        プレビュー表示（{statusLabel}）— このページは検索結果に出ず、URLを知る人のみ閲覧できます
      </div>
      <WorkDetail work={transformWorkDetail(wpWork)} />
    </>
  );
}
