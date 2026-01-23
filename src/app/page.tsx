"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { WorkCard } from "@/components/WorkCard";
import { Concept } from "@/components/Concept";

// Sample works data - will be replaced with WordPress data
const sampleWorks = [
  {
    id: "1",
    slug: "taste-in-the-woods",
    thumbnail: "/images/works/taste-woods.jpg",
    client: "虎ノ門ヒルズ・ステーションアトリウム",
    title: "諏訪綾子「森をあじわう TASTE in the woods」",
    tags: ["#HAL ca", "#Installation", "Music produce / Music Creation"],
  },
  {
    id: "2",
    slug: "bmw-seven-art-museum",
    thumbnail: "/images/works/bmw-museum.jpg",
    client: "BMW",
    title: "The Seven Art Museum",
    tags: ["#HAL ca", "#Installation", "Music produce / Music Creation"],
  },
  {
    id: "3",
    slug: "suntory-winery",
    thumbnail: "/images/works/suntory.jpg",
    client: "Suntory",
    title: "登美の丘ワイナリー",
    tags: [
      "#HAL ca",
      "#Movie",
      "#Installation",
      "#Experience Design",
      "#Event Produce",
      "Sound Design / Sound Production",
    ],
  },
  {
    id: "4",
    slug: "afterimage",
    thumbnail: "/images/works/afterimage.jpg",
    client: "RELEASE",
    title: "Afterimage",
    tags: ["#HAL ca", "#Release", "Release Date: 2018.12"],
  },
  {
    id: "5",
    slug: "matsumoto-castle",
    thumbnail: "/images/works/matsumoto.jpg",
    client: "長野県松本市",
    title: "松本城 ~氷晶きらめく水鏡~",
    tags: ["#HAL ca", "#Installation", "Music produce / Music Creation"],
  },
  {
    id: "6",
    slug: "yamaha-hero",
    thumbnail: "/images/works/yamaha.jpg",
    client: "YAMAHA",
    title: "I'm a HERO Program",
    tags: ["#HAL ca", "#Installation", "Music produce / Music Creation"],
  },
];

export default function HomePage() {
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});

  const handleImageLoad = useCallback((id: string, height: number) => {
    setImageHeights((prev) => {
      if (prev[id] === height) return prev;
      return { ...prev, [id]: height };
    });
  }, []);

  const minHeight = useMemo(() => {
    const heights = Object.values(imageHeights);
    if (heights.length === sampleWorks.length) {
      return Math.min(...heights);
    }
    return undefined;
  }, [imageHeights]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Video - Vimeo Streaming */}
        <div className="absolute inset-y-0 left-0 w-screen h-full squish-on-menu transition-transform duration-500 origin-left overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full"
            style={{ height: "100%" }}
          >
            <iframe
              src="https://player.vimeo.com/video/1157420243?autoplay=1&loop=1&muted=1&background=1&controls=0"
              className="absolute top-0 left-0 w-full h-full"
              style={{
                border: "none",
                objectFit: "fill",
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        {/* Logo */}
        <div className="relative h-full px-6 md:px-16 grid-6 items-center">
          <div className="col-6 flex justify-end items-end z-10">
            <Image
              src="/svg/logo-wave.svg"
              alt="WA/VE"
              width={278}
              height={79}
              className="w-[200px] md:w-[278px] h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <Concept />

      {/* Selected Works Section */}
      <section className="py-[92px] px-6 md:px-16 bg-white">
        <div className="">
          <div className="grid-6 mb-12">
            <h2 className="heading-section col-3">FEATURED</h2>
            <h2 className="heading-section col-3 text-right">WORKS</h2>
          </div>

          <div className="grid-6 justify-end">
            {Array.from({ length: Math.ceil(sampleWorks.length / 3) }, (_, groupIndex) => {
              const startIndex = groupIndex * 3;
              const groupWorks = sampleWorks.slice(startIndex, startIndex + 3);
              
              return [
                // 上部ボーダー
                <div key={`border-top-${groupIndex}`} className="col-6">
                  <Image
                    src="/svg/border.svg"
                    alt="3つのカードの上部のボーダー"
                    width={800}
                    height={10}
                    className="w-full"
                  />
                </div>,
                // 画像3つ
                ...groupWorks.map((work) => (
                  <div key={`image-${work.id}`} className="col-2">
                    <WorkCard
                      {...work}
                      onImageLoad={(height) => handleImageLoad(work.id, height)}
                      imageHeight={minHeight}
                      imageOnly
                    />
                  </div>
                )),
                // 中間ボーダー
                <div key={`border-middle-${groupIndex}`} className="col-6">
                  <Image
                    src="/svg/border.svg"
                    alt="画像と文章の間のボーダー"
                    width={800}
                    height={10}
                    className="w-full"
                  />
                </div>,
                // テキスト3つ
                ...groupWorks.map((work) => (
                  <div key={`text-${work.id}`} className={`col-2 ${groupIndex === Math.ceil(sampleWorks.length / 3) - 1 ? 'mb-[80px]' : ''}`}>
                    <WorkCard
                      {...work}
                      textOnly
                    />
                  </div>
                )),
              ];
            }).flat()}
          </div>

          {/* More Works and Releases */}
          <div className="h-[143px] mt-[92px] mb-[52px]">
            <div className="grid-6">
              <Link
                href="/works"
                className="inline-block text-[30pt] col-6 text-en font-bold text-wave-blue hover:text-[#c2de6d]"
              >
                MORE WORKS
              </Link>
            </div>
            <div className="mt-2 grid-6">
              <Link
                href="/works"
                className="inline-block text-[30pt] col-6 text-en font-bold text-wave-blue hover:text-[#c2de6d]"
              >
                MORE RELEASE
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
