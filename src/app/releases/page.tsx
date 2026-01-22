import Image from "next/image";
import { ReleaseCard } from "@/components/ReleaseCard";

const releases = [
  {
    id: "1",
    slug: "reflection",
    coverImage: "/images/releases/reflection.jpg",
    title: "Reflection",
    year: "2024",
    type: "Album" as const,
    description:
      "自分の中に相手を感じ、相手の中に自分を感じたりする感覚や、自然の中で起こる反射や鏡映など、存在同士の間で交換されるシグナルを柔らかく表現することをテーマにしたアルバム",
    releaseDate: "2024/12/13",
    tracks: [
      "Mirror#0",
      "Mirror#1",
      "Mirror#2",
      "Mirror#3",
      "Montage",
      "Lambent",
      "Late spring",
    ],
    listenUrl: "https://spotify.com",
  },
  {
    id: "2",
    slug: "afterimage",
    coverImage: "/images/releases/afterimage.jpg",
    title: "Afterimage",
    year: "2024",
    type: "Album" as const,
    description:
      "2nd EP「Afterimage」をデジタルリリースいたしました。夢の中の夢をテーマに連作された、アンビエント / サウンドスケープ作品。\n\nアートワークの写真はカメラマンの Noriko Watanabe、デザインは Mars89 が手掛けました。",
    releaseDate: "2024/12/13",
    tracks: ["Sketch#1", "Sketch#2"],
    listenUrl: "https://spotify.com",
  },
  {
    id: "3",
    slug: "anima",
    coverImage: "/images/releases/anima.jpg",
    title: "ANIMA",
    year: "2024",
    type: "Album" as const,
    description:
      "形ある身体、意味のある記憶、支配する感情など、自分を形成する様々な要素から解き放たれ、新しい魂の姿に変容するストーリーを描いた作品。",
    releaseDate: "2024/12/13",
    tracks: ["MononooN", "roTaTe", "MeMory", "NoVa"],
    listenUrl: "https://spotify.com",
  },
];

export default function ReleasesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-screen squish-on-menu transition-transform duration-500 origin-left">
          <Image
            src="/svg/bg-gradient.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 w-full px-6 md:px-16 pb-12">
          <div className="max-w-7xl mx-auto grid-6">
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight col-3">
              RELEASES
            </h1>
            <span className="text-white text-2xl md:text-4xl font-bold tracking-tight col-3 text-right">
              ALL
            </span>
          </div>
        </div>
      </section>

      {/* Releases List */}
      <section className="py-16 md:py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          {releases.map((release) => (
            <ReleaseCard key={release.id} {...release} />
          ))}
        </div>
      </section>
    </>
  );
}
