"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { WorkCard } from "@/components/WorkCard";

const featuredWorks = [
  {
    id: "1",
    slug: "taste-in-the-woods",
    thumbnail: "/images/works/taste-woods.jpg",
    client: "虎ノ門ヒルズ・ステーションアトリウム",
    title: "諏訪綾子「森をあじわう TASTE in the woods」",
    tags: ["#HAL ca", "#Installation"],
    role: "Music produce / Music Creation",
  },
  {
    id: "2",
    slug: "bmw-seven-art-museum",
    thumbnail: "/images/works/bmw-museum.jpg",
    client: "BMW",
    title: "The Seven Art Museum",
    tags: ["#HAL ca", "#Installation"],
    role: "Music produce / Music Creation",
  },
  {
    id: "3",
    slug: "suntory-winery",
    thumbnail: "/images/works/suntory.jpg",
    client: "Suntory",
    title: "登美の丘ワイナリー",
    tags: ["#HAL ca", "#Movie", "#Installation", "#Experience Design", "#Event Produce"],
    role: "Sound Design / Sound Production",
  },
];

const featuredReleases = [
  {
    id: "1",
    slug: "afterimage",
    thumbnail: "/images/releases/afterimage.jpg",
    title: "Afterimage",
    releaseDate: "2018.12",
  },
  {
    id: "2",
    slug: "in-the-fog",
    thumbnail: "/images/releases/in-the-fog.jpg",
    title: "IN THE FOG",
    releaseDate: "2018.12",
  },
  {
    id: "3",
    slug: "wanderer",
    thumbnail: "/images/releases/wanderer.jpg",
    title: "WANDERER",
    releaseDate: "2018.12",
  },
];

export default function HalCaPage() {
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});

  const handleImageLoad = useCallback((id: string, height: number) => {
    setImageHeights((prev) => {
      if (prev[id] === height) return prev;
      return { ...prev, [id]: height };
    });
  }, []);

  const minHeight = useMemo(() => {
    const heights = Object.values(imageHeights);
    if (heights.length === featuredWorks.length) {
      return Math.min(...heights);
    }
    return undefined;
  }, [imageHeights]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-gray-100 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-screen squish-on-menu transition-transform duration-500 origin-left">
          <Image
            src="/images/hal-ca-hero.jpg"
            alt="HAL ca"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="absolute top-6 left-6 z-10">
          <span className="text-white text-sm tracking-wider">SOUND \</span>
        </div>
      </section>

      {/* Artist Info Section */}
      <section className="py-20 md:py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid-6">
          <div className="col-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">HAL ca</h1>

            <p className="text-base md:text-lg leading-[2] mb-8">
              HAL caは、アンビエント・実験音楽を軸とするコンポーザー / サウンドアーティスト。
            </p>

            <div className="text-sm md:text-base leading-[2.2] space-y-6 text-gray-700">
              <p>
                東京生まれ。国立音楽大学を経て渡仏し、パリ・エコールノルマル音楽院映画音楽作曲科を首席で修了、またパリ地方音楽院エレクトロアコースティック作曲科にて電子音響を学ぶ。
              </p>
              <p>
                ノイズや声、フィールドレコーディングなど多様な音響オブジェクトをオーケストレーションし、円環的な時間感覚をもった音のデザインを追求。抽象的でありながらも身体感覚に訴えかける響きを生み出し、聴く者を「今ここ」に立ち戻らせる音楽を作り続けている。
              </p>
              <p>
                作品はデジタルリリースにとどまらず、広告音楽、オーディオヴィジュアルや空間インスタレーションへも展開。マルチチャンネルによる多層的な音響デザインや、音の体験デザインを得意とし、近年は BMW THE SEVEN ART MUSEUM や大阪関西万博に空間音響演出で参加するなど、活動を幅を広げている。
              </p>
            </div>

            {/* External Links */}
            <div className="mt-12 flex flex-wrap gap-6">
              <a
                href="https://music.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-wave-blue hover:underline"
              >
                APPLE MUSIC
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-wave-blue hover:underline"
              >
                SPOTIFY
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-wave-blue hover:underline"
              >
                INSTAGRAM (HAL ca)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="py-20 md:py-32 px-6 md:px-16 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid-6 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold col-3">FEATURED</h2>
            <h2 className="text-2xl md:text-3xl font-bold col-3 text-right">WORKS</h2>
          </div>

          <div className="grid-6">
            {featuredWorks.map((work) => (
              <div key={work.id} className="col-2">
                <WorkCard
                  {...work}
                  onImageLoad={(height) => handleImageLoad(work.id, height)}
                  imageHeight={minHeight}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Releases Section */}
      <section className="py-20 md:py-32 px-6 md:px-16 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid-6">
            {featuredReleases.map((release) => (
              <div key={release.id} className="col-2">
                <Link
                  href={`/releases#${release.slug}`}
                  className="block card-hover"
                >
                  <article className="border-t border-black/10 pt-6">
                    <div className="aspect-square relative bg-gray-100 mb-4 overflow-hidden">
                      <Image
                        src={release.thumbnail}
                        alt={release.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">RELEASE</p>
                      <h3 className="font-medium text-sm">{release.title}</h3>
                      <p className="text-xs text-gray-500">
                        #HALca #Release Release Date: {release.releaseDate}
                      </p>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-4">
            <Link
              href="/works"
              className="block text-wave-blue hover:underline font-medium"
            >
              MORE WORKS
            </Link>
            <Link
              href="/releases"
              className="block text-wave-blue hover:underline font-medium"
            >
              MORE RELEASE
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
