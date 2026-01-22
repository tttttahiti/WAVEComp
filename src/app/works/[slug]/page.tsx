import Image from "next/image";
import Link from "next/link";

// Sample work data - will be replaced with WordPress data
const worksData: Record<string, {
  client: string;
  title: string;
  date: string;
  description: string;
  role: string;
  tags: string[];
  url?: string;
  clientRole?: string;
  heroImage: string;
  galleryImages: string[];
  videoUrl?: string;
  credits: { role: string; name: string }[];
  listenUrl?: string;
}> = {
  "taste-in-the-woods": {
    client: "虎ノ門ヒルズ・ステーションアトリウム",
    title: "諏訪綾子「森をあじわう TASTE in the woods」",
    date: "2025.11",
    description:
      "「食」をテーマに新たな感覚体験を生み出すアーティスト・諏訪綾子氏によるクリスマスインスタレーション、諏訪綾子「森をあじわう TASTE in the woods」にて、空間音響演出を HAL ca 担当致しました。\n\n虎ノ門ヒルズに静かに森がたちあらわれ、美しい野生の気配と共に、様々な森や動物、生命の気配を感じられるサウンドインスタレーションを作りました。",
    role: "サウンドプロデュース／音響演出制作",
    tags: ["#HALca", "#Installation"],
    url: "https://www.toranomonhills.com/events/2025/10/0214.html",
    clientRole: "food creation",
    heroImage: "/images/works/taste-woods-hero.jpg",
    galleryImages: [
      "/images/works/taste-woods-1.jpg",
      "/images/works/taste-woods-2.jpg",
      "/images/works/taste-woods-3.jpg",
      "/images/works/taste-woods-4.jpg",
    ],
    credits: [
      { role: "Artist", name: "諏訪綾子" },
      { role: "Sound Installation", name: "HAL ca" },
      { role: "Sound Produce", name: "HAL ca , WA/VE" },
    ],
    listenUrl: "https://spotify.com",
  },
  "matsumoto-castle": {
    client: "長野県松本市",
    title: "松本城 〜 氷晶きらめく水鏡 〜",
    date: "2025.11",
    description:
      "国宝・松本城を舞台にレーザーマッピングを起用した光と音の幻想的な演出が行われ、2021-2022の2年間 HAL ca が音響演出で参加しました。\n\n松本城に訪れ、歩いたり、立ち止まったり、それぞれの時間の過ごし方の中で聴こえてくる音は一瞬一瞬違うものであってほしいという願いを込めて、お城を映し出す水の表情のように静かに移り変わり、今を感じさせる音楽演出を制作しました。",
    role: "サウンドプロデュース／音響演出制作",
    tags: ["#HAL ca", "#Movie", "#Installation", "#Experience Design", "#Event Produce"],
    url: "https://www.toranomonhills.com/events/2025/10/0214.html",
    clientRole: "Tokyo Lighting Design",
    heroImage: "/images/works/matsumoto-hero.jpg",
    galleryImages: [],
    videoUrl: "https://youtube.com/embed/xxxxx",
    credits: [
      { role: "Lighting Produce", name: "Tokyo Lighting Design" },
      { role: "Sound Produce", name: "HAL ca / Lada Inc." },
      { role: "Composer", name: "HAL ca" },
    ],
    listenUrl: "https://spotify.com",
  },
};

interface WorkDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = worksData[slug];

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
      <section className="relative h-[60vh] min-h-[400px]">
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
              {work.credits.map((credit, index) => (
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
