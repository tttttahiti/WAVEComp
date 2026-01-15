"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { WorkCard } from "@/components/WorkCard";

const allWorks = [
  {
    id: "1",
    slug: "taste-in-the-woods",
    thumbnail: "/images/works/taste-woods.jpg",
    client: "虎ノ門ヒルズ・ステーションアトリウム",
    title: "諏訪綾子「森をあじわう TASTE in the woods」",
    tags: ["#HALca", "#Movie", "#Installation", "Music produce / Music Creation"],
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
    slug: "yamaha-hero",
    thumbnail: "/images/works/yamaha.jpg",
    client: "YAMAHA",
    title: "I'm a HERO Program",
    tags: ["#HALca", "#Movie", "Music produce / Music Creation"],
  },
  {
    id: "4",
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
];

export default function WorksPage() {
  const [filterTag, setFilterTag] = useState("");
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);

  const filteredWorks = useMemo(() => {
    if (!filterTag) return allWorks;
    return allWorks.filter((work) =>
      work.tags.some((tag) =>
        tag.toLowerCase().includes(filterTag.toLowerCase())
      )
    );
  }, [filterTag]);

  const handleImageLoad = useCallback((id: string, height: number) => {
    setImageHeights((prev) => {
      const updated = { ...prev, [id]: height };
      // フィルタリングされたワークの画像のみを考慮
      const filteredIds = filteredWorks.map((w) => w.id);
      const filteredHeights = Object.entries(updated)
        .filter(([id]) => filteredIds.includes(id))
        .map(([, height]) => height);
      
      if (filteredHeights.length === filteredWorks.length && filteredHeights.length > 0) {
        const min = Math.min(...filteredHeights);
        setMinHeight(min);
      }
      return updated;
    });
  }, [filteredWorks]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/svg/bg-gradient.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 w-full px-6 md:px-16 pb-12">
          <div className="flex justify-between items-end">
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight">
              WORKS
            </h1>
            <span className="text-white text-2xl md:text-4xl font-bold tracking-tight">
              ALL
            </span>
          </div>
        </div>
      </section>

      {/* Filter & Works Grid */}
      <section className="py-16 md:py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Filter Input */}
          <div className="flex justify-end mb-8">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                #
              </span>
              <input
                type="text"
                placeholder=""
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="w-48 md:w-64 border border-black/20 pl-8 pr-4 py-2 text-sm focus:outline-none focus:border-wave-blue transition-colors"
              />
            </div>
          </div>

          {/* Works Grid - 2 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {filteredWorks.map((work) => (
              <WorkCard
                key={work.id}
                {...work}
                onImageLoad={(height) => handleImageLoad(work.id, height)}
                imageHeight={minHeight}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
