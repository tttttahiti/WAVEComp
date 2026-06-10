import Link from "next/link";
import { getWorkBySlug, stripHtml } from "@/lib/wordpress";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { AudioPlayer } from "@/components/AudioPlayer";
import { MasonryGallery } from "@/components/MasonryGallery";
import { HeroImage } from "@/components/HeroImage";

// 常にサーバーサイドで動的レンダリングを行う
export const dynamic = 'force-dynamic';

interface WorkDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Hr = () => (<hr className="border-t border-black h-0 w-full my-4" />)

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  
  let work = null;
  try {
    const wpWork = await getWorkBySlug(slug);
    if (wpWork) {
      // credits はプレーンテキスト（改行区切り）
      const credits = wpWork.work_meta.credits || '';

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
        // 旧バージョンのプラグインでは hero_display / hero_video_url が無いので blur にフォールバック
        heroDisplay: (wpWork.work_meta.hero_display === 'full' ? 'full' : 'blur') as 'blur' | 'full',
        heroVideoUrl: wpWork.work_meta.hero_video_url || null,
        galleryImages: wpWork.work_meta.gallery_images?.map((img: { url: string }) => img.url) || [],
        galleryColumnsDesktop: wpWork.work_meta.gallery_columns_desktop ?? 2,
        galleryColumnsMobile: wpWork.work_meta.gallery_columns_mobile ?? 2,
        galleryGutter: wpWork.work_meta.gallery_gutter ?? 20,
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
      <HeroImage
        src={work.heroImage}
        alt={work.title}
        mode={work.heroDisplay}
        videoSrc={work.heroVideoUrl}
      />

      {/* Work Info Section */}
      <section className="py-8 md:py-24 px-[20px] md:px-[45px]">
        <div className="grid-6">
          {/* Left Column - Title & Date */}
          <div className="col-6 md:col-span-3">
            <p className="text-[12pt] font-bold">{work.client}</p>
            <h1 className="text-[20pt] md:text-[30pt] font-bold leading-snug mb-2 md:mb-4">
              {work.title}
            </h1>
            <p className="text-[10pt] md:text-[12pt]">Date: {work.date}</p>
          </div>

          {/* Right Column - Description & Details */}
          <div className="col-6 md:col-span-3">
            <div className="text-[10pt] md:text-[12pt] leading-[1.33] md:leading-[1.7] whitespace-pre-line">
              {work.description}
            </div>

            <Hr />

            <p className="text-[10pt] md:text-[12pt]">{work.role}</p>

            <Hr />

            <div className="flex flex-wrap justify-between gap-y-2 text-[10pt] md:text-[12pt]">
              {work.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/works?tag=${encodeURIComponent(tag)}`}
                  className="text-[6pt] md:text-[7pt] font-medium hashtag hover:text-[#c2de6d] transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {work.url && (<>
              <Hr />
              <p className="text-[10pt] md:text-[12pt] md:flex justify-between">
                <span className="text-[10pt] md:text-[12pt]">URL: </span>
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wave-blue hover:text-[#c2de6d] transition-colors break-all"
                >
                  {work.url}
                </a>
              </p>
            </>)}

            {work.clientRole && (<>
              <Hr />
              <p className="text-[10pt] md:text-[12pt]">
                <span className="text-[10pt] md:text-[12pt]">Client: </span>
                {work.clientRole}
              </p>
            </>)}

            {work.listenUrl && (<>
              <Hr />
              <div className="mt-4 md:mt-8">
                <AudioPlayer src={work.listenUrl} />
              </div>
            </>)}
          </div>
        </div>
      </section>

      {/* Gallery Section with Masonry */}
      {work.galleryImages.length > 0 && (
        <section className="py-4 md:py-8 px-[20px] md:px-[45px]">
          <MasonryGallery
            images={work.galleryImages}
            title={work.title}
            columnsDesktop={work.galleryColumnsDesktop}
            columnsMobile={work.galleryColumnsMobile}
            gutter={work.galleryGutter}
          />
        </section>
      )}

      {/* Video Section */}
      {work.videoUrls.length > 0 && (
        <section className="py-4 md:py-8 px-[20px] md:px-[45px]">
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
      {work.credits && (
        <section className="py-8 md:py-16 px-[20px] md:px-[45px]">
          <div className="grid-6">
            <div className="col-6 md:col-start-4 md:col-span-3">
              <Hr />
              <p className="text-xs md:text-sm font-medium mt-8 mb-1">Credit:</p>
              <div className="text-[10pt] md:text-[12pt] whitespace-pre-line">
                {work.credits}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
