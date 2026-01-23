import Image from "next/image";
import Link from "next/link";
import { getWorkBySlug } from "@/lib/wordpress";

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

      work = {
        client: wpWork.work_meta.client || '',
        title: wpWork.title.rendered.replace(/<[^>]*>/g, ''),
        date: wpWork.work_meta.date || '',
        description: wpWork.content.rendered.replace(/<[^>]*>/g, ''),
        role: wpWork.work_meta.role || '',
        tags: [], // タグは別途取得が必要
        url: wpWork.work_meta.url || '',
        clientRole: '', // clientRole は work_meta にない場合は空文字
        heroImage: wpWork.featured_image_url || '/images/placeholder.jpg',
        galleryImages: wpWork.work_meta.gallery_images?.map((img: { url: string }) => img.url) || [],
        videoUrl: wpWork.work_meta.video_urls?.[0] || '',
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
      <section className="relative h-[60vh] min-h-[233px]">
        <Image
          src={work.heroImage}
          alt={work.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-6 left-6 z-10">
          <span className="text-white text-sm tracking-wider">SOUND \</span>
        </div>
      </section>

      {/* Work Info Section */}
      <section className="py-16 md:py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid-6">
          {/* Left Column - Title & Date */}
          <div className="col-3">
            <p className="text-sm text-gray-500 mb-2">{work.client}</p>
            <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-4">
              {work.title}
            </h1>
            <p className="text-sm text-gray-500">Date: {work.date}</p>
          </div>

          {/* Right Column - Description & Details */}
          <div className="col-3">
            <div className="text-sm leading-[2] whitespace-pre-line mb-8">
              {work.description}
            </div>

            <p className="text-sm mb-6">{work.role}</p>

            <div className="border-t border-black/10 pt-4 space-y-3">
              <div className="flex gap-4 text-sm">
                {work.tags.map((tag, index) => (
                  <span key={index} className="text-gray-500">
                    {tag}
                  </span>
                ))}
              </div>

              {work.url && (
                <p className="text-sm">
                  <span className="text-gray-500">URL: </span>
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
                <p className="text-sm">
                  <span className="text-gray-500">Client: </span>
                  {work.clientRole}
                </p>
              )}
            </div>

            {work.listenUrl && (
              <div className="mt-8">
                <Link
                  href={work.listenUrl}
                  className="btn-primary inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LISTEN
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {work.galleryImages.length > 0 && (
        <section className="py-8 px-6 md:px-16">
          <div className="max-w-7xl mx-auto grid-6">
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
      {work.videoUrl && (
        <section className="py-8 px-6 md:px-16">
          <div className="max-w-7xl mx-auto grid-6">
            <div className="col-6 aspect-video relative bg-gray-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Credits Section */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid-6">
          <div className="col-6 border-t border-black/10 pt-8">
            <p className="text-sm font-medium mb-4">Credit:</p>
            <ul className="space-y-1">
              {work.credits.map((credit: { role: string; name: string }, index: number) => (
                <li key={index} className="text-sm">
                  <span className="text-gray-500">{credit.role}：</span>
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
