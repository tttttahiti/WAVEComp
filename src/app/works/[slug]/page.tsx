import Image from "next/image";
import Link from "next/link";
import { getWorkBySlug, stripHtml } from "@/lib/wordpress";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { AudioPlayer } from "@/components/AudioPlayer";

// 常にサーバーサイドで動的レンダリングを行う
export const dynamic = 'force-dynamic';

interface WorkDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  
  let work = null;
  try {
    const wpWork = await getWorkBySlug(slug);
    if (wpWork) {
      // credits をパース（JSON文字列の場合と配列の場合の両方に対応）
      let credits: { role: string; name: string }[] = [];
      if (wpWork.work_meta.credits) {
        try {
          const parsed = typeof wpWork.work_meta.credits === 'string' 
            ? JSON.parse(wpWork.work_meta.credits) 
            : wpWork.work_meta.credits;
          credits = Array.isArray(parsed) ? parsed : [];
        } catch {
          credits = [];
        }
      }

      // タグを取得
      const tags = (wpWork.work_tags_data || []).map((tag: { name: string }) =>
        tag.name.startsWith('#') ? tag.name : `#${tag.name}`
      );

      work = {
        client: wpWork.work_meta.client || '',
        title: stripHtml(wpWork.title.rendered),
        date: wpWork.work_meta.date || '',
        description: stripHtml(wpWork.content.rendered),
        role: wpWork.work_meta.role || '',
        tags,
        url: wpWork.work_meta.url || '',
        clientRole: '', // clientRole は work_meta にない場合は空文字
        heroImage: wpWork.featured_image_url || '/images/placeholder.jpg',
        galleryImages: wpWork.work_meta.gallery_images?.map((img: { url: string }) => img.url) || [],
        videoUrls: wpWork.work_meta.video_urls || [],
        credits,
        listenUrl: wpWork.work_meta.audio_url || '',
      };
    }
  } catch (error) {
    console.error("Failed to fetch work from WordPress:", error);
  }

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Work not found</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] min-h-[180px] md:min-h-[233px]">
        <Image
          src={work.heroImage}
          alt={work.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
          <span className="text-white text-xs md:text-sm tracking-wider">SOUND \</span>
        </div>
      </section>

      {/* Work Info Section */}
      <section className="py-8 md:py-24 px-[45px] md:px-[45px]">
        <div className="grid-6">
          {/* Left Column - Title & Date */}
          <div className="col-3">
            <p className="text-[10pt] md:text-[12pt] mb-1 md:mb-2">{work.client}</p>
            <h1 className="text-[30pt] md:text-[30pt] font-bold leading-snug mb-2 md:mb-4">
              {work.title}
            </h1>
            <p className="text-[10pt] md:text-[12pt]">Date: {work.date}</p>
          </div>

          {/* Right Column - Description & Details */}
          <div className="col-3">
            <div className="text-[10pt] md:text-[12pt] leading-[1.8] md:leading-[2] whitespace-pre-line mb-4 md:mb-8">
              {work.description}
            </div>

            <p className="text-[10pt] md:text-[12pt] mb-4 md:mb-6">{work.role}</p>

            <div className="border-t border-black/10 pt-3 md:pt-4 space-y-2 md:space-y-3">
              <div className="flex flex-wrap gap-2 md:gap-4 text-[10pt] md:text-[12pt]">
                {work.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/works?tag=${encodeURIComponent(tag)}`}
                    className="text-[10pt] md:text-[12pt] hashtag hover:text-wave-blue transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {work.url && (
                <p className="text-[10pt] md:text-[12pt]">
                  <span className="text-[10pt] md:text-[12pt]">URL: </span>
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-wave-blue hover:underline break-all"
                  >
                    {work.url}
                  </a>
                </p>
              )}

              {work.clientRole && (
                <p className="text-[10pt] md:text-[12pt]">
                  <span className="text-[10pt] md:text-[12pt]">Client: </span>
                  {work.clientRole}
                </p>
              )}
            </div>

            {work.listenUrl && (
              <div className="mt-4 md:mt-8">
                <AudioPlayer src={work.listenUrl} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {work.galleryImages.length > 0 && (
        <section className="py-4 md:py-8 px-[45px] md:px-[45px]">
          <div className="grid-6">
            {work.galleryImages.map((image, index) => (
              <div
                key={index}
                className="col-3 aspect-[4/3] relative bg-gray-100"
              >
                <Image
                  src={image}
                  alt={`${work.title} - ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Video Section */}
      {work.videoUrls.length > 0 && (
        <section className="py-4 md:py-8 px-[45px] md:px-[45px]">
          <div className="grid-6">
            {work.videoUrls.map((videoUrl, index) => (
              <div key={index} className="col-6 aspect-video relative bg-gray-900 mb-4 md:mb-8 last:mb-0">
                <YouTubeEmbed url={videoUrl} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Credits Section */}
      <section className="py-8 md:py-16 px-[45px] md:px-[45px]">
        <div className="grid-6">
          <div className="col-6 md:col-start-4 md:col-span-3 border-t border-black/10 pt-4 md:pt-8">
            <p className="text-xs md:text-sm font-medium mb-1">Credit:</p>
            <ul className="space-y-1">
              {work.credits.map((credit: { role: string; name: string }, index: number) => (
                <li key={index} className="text-xs md:text-sm">
                  <span className="text-[10pt] md:text-[12pt]">{credit.role}：</span>
                  {credit.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
