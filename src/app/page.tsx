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
    tags: ["#HALca", "#Installation", "Music produce / Music Creation"],
  },
  {
    id: "2",
    slug: "bmw-seven-art-museum",
    thumbnail: "/images/works/bmw-museum.jpg",
    client: "BMW",
    title: "The Seven Art Museum",
    tags: ["#HALca", "#Installation", "Music produce / Music Creation"],
  },
  {
    id: "3",
    slug: "suntory-winery",
    thumbnail: "/images/works/suntory.jpg",
    client: "Suntory",
    title: "登美の丘ワイナリー",
    tags: ["#HAL ca", "#Movie", "#Installation", "#Experience Design", "#Event Produce", "Sound Design / Sound Production"],
  },
  {
    id: "4",
    slug: "afterimage",
    thumbnail: "/images/works/afterimage.jpg",
    client: "RELEASE",
    title: "Afterimage",
    tags: ["#HALca", "#Release", "Release Date: 2018.12"],
  },
  {
    id: "5",
    slug: "matsumoto-castle",
    thumbnail: "/images/works/matsumoto.jpg",
    client: "長野県松本市",
    title: "松本城 ~氷晶きらめく水鏡~",
    tags: ["#HALca", "#Installation", "Music produce / Music Creation"],
  },
  {
    id: "6",
    slug: "yamaha-hero",
    thumbnail: "/images/works/yamaha.jpg",
    client: "YAMAHA",
    title: "I'm a HERO Program",
    tags: ["#HALca", "#Installation", "Music produce / Music Creation"],
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
        {/* Background */}
        <div className="absolute inset-y-0 left-0 w-screen h-full squish-on-menu transition-transform duration-500 origin-left">
          <Image
            src="/svg/bg-gradient.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
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
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid-6 mb-12">
            <h2 className="heading-section col-3">FEATURED</h2>
            <h2 className="heading-section col-3 text-right">WORKS</h2>
          </div>

          <div className="grid-6 justify-end">
            {sampleWorks.map((work) => (
              <div key={work.id} className="col-2">
                <WorkCard
                  {...work}
                  onImageLoad={(height) => handleImageLoad(work.id, height)}
                  imageHeight={minHeight}
                />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/works"
              className="inline-block text-wave-blue hover:underline font-medium"
            >
              MORE WORKS →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
