import Link from "next/link";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { AudioPlayer } from "@/components/AudioPlayer";
import { MasonryGallery } from "@/components/MasonryGallery";
import { HeroImage } from "@/components/HeroImage";
import type { WorkDetailData } from "@/lib/wordpress";

const Hr = () => <hr className="border-t border-black h-0 w-full my-4" />;

/**
 * Work 詳細の表示。公開ページとプレビューページで共通利用する。
 */
export function WorkDetail({ work }: { work: WorkDetailData }) {
  return (
    <>
      {/* Hero Section */}
      <HeroImage src={work.heroImage} alt={work.title} mode={work.heroDisplay} />

      {/* Work Info Section */}
      <section className="py-8 md:py-24 px-5 md:px-[45px]">
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

            {work.url && (
              <>
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
              </>
            )}

            {work.clientRole && (
              <>
                <Hr />
                <p className="text-[10pt] md:text-[12pt]">
                  <span className="text-[10pt] md:text-[12pt]">Client: </span>
                  {work.clientRole}
                </p>
              </>
            )}

            {work.listenUrl && (
              <>
                <Hr />
                <div className="mt-4 md:mt-8">
                  <AudioPlayer src={work.listenUrl} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Video Section */}
      {work.videoUrls.length > 0 && (
        <section className="py-4 md:py-8 px-5 md:px-[45px]">
          <div className="grid-6">
            {work.videoUrls.map((videoUrl, index) => (
              <div key={index} className="col-6 aspect-video relative bg-gray-900 mb-4 md:mb-8 last:mb-0">
                <YouTubeEmbed url={videoUrl} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery Section with Masonry */}
      {work.galleryImages.length > 0 && (
        <section className="py-4 md:py-8 px-5 md:px-[45px]">
          <MasonryGallery
            images={work.galleryImages}
            title={work.title}
            columnsDesktop={work.galleryColumnsDesktop}
            columnsMobile={work.galleryColumnsMobile}
            gutter={work.galleryGutter}
          />
        </section>
      )}

      {/* Credits Section */}
      {work.credits && (
        <section className="py-8 md:py-16 px-5 md:px-[45px]">
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
