"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { WorkCard } from "@/components/WorkCard";

interface Work {
  id: string;
  slug: string;
  thumbnail: string;
  client: string;
  title: string;
  tags: string[];
  role?: string;
}

interface WorksClientProps {
  initialWorks: Work[];
}

export function WorksClient({ initialWorks }: WorksClientProps) {
  const [filterTag, setFilterTag] = useState("");
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});

  const filteredWorks = useMemo(() => {
    if (!filterTag) return initialWorks;
    return initialWorks.filter((work) =>
      work.tags.some((tag) =>
        tag.toLowerCase().includes(filterTag.toLowerCase())
      )
    );
  }, [filterTag, initialWorks]);

  const handleImageLoad = useCallback((id: string, height: number) => {
    setImageHeights((prev) => {
      if (prev[id] === height) return prev;
      return { ...prev, [id]: height };
    });
  }, []);

  const minHeight = useMemo(() => {
    const filteredIds = filteredWorks.map((w) => w.id);
    const filteredHeights = Object.entries(imageHeights)
      .filter(([id]) => filteredIds.includes(id))
      .map(([, height]) => height);

    if (filteredHeights.length === filteredWorks.length && filteredHeights.length > 0) {
      return Math.min(...filteredHeights);
    }
    return undefined;
  }, [imageHeights, filteredWorks]);

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
              WORKS
            </h1>
            <span className="text-white text-2xl md:text-4xl font-bold tracking-tight col-3 text-right">
              ALL
            </span>
          </div>
        </div>
      </section>

      {/* Filter & Works Grid */}
      <section className="py-16 md:py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Filter Input */}
          <div className="grid-6 mb-8">
            <div className="col-start-5 col-2 flex justify-end">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  #
                </span>
                <input
                  type="text"
                  placeholder=""
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                  className="w-48 md:w-64 bg-white text-black border border-black/20 pl-8 pr-4 py-2 text-sm focus:outline-none focus:border-wave-blue transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Works Grid - 6 columns (each card takes 3 columns) */}
          {filteredWorks.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">Works not found</p>
            </div>
          ) : (
            <div className="grid-6">
              {filteredWorks.map((work) => (
                <div key={work.id} className="col-3">
                  <WorkCard
                    {...work}
                    onImageLoad={(height) => handleImageLoad(work.id, height)}
                    imageHeight={minHeight}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
