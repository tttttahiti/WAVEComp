"use client";

import { useState, useCallback } from "react";
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
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);

  const handleImageLoad = useCallback((id: string, height: number) => {
    setImageHeights((prev) => {
      const updated = { ...prev, [id]: height };
      const heights = Object.values(updated);
      if (heights.length === sampleWorks.length) {
        const min = Math.min(...heights);
        setMinHeight(min);
      }
      return updated;
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/svg/bg-gradient.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Logo */}
        <div className="relative z-10 px-6 md:px-16">
          <Image
            src="/svg/logo-wave.svg"
            alt="WA/VE"
            width={278}
            height={79}
            className="w-[200px] md:w-[278px] h-auto"
            priority
          />
        </div>
      </section>

      {/* Concept Section */}
      <Concept />

      {/* Selected Works Section */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">SELECTED</h2>
            <h2 className="text-3xl md:text-4xl font-bold">WORKS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleWorks.map((work) => (
              <WorkCard
                key={work.id}
                {...work}
                onImageLoad={(height) => handleImageLoad(work.id, height)}
                imageHeight={minHeight}
              />
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
