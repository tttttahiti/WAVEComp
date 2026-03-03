"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { WorkCard } from "@/components/WorkCard";
import { Concept } from "@/components/Concept";

export interface FeaturedItem {
  type: "work" | "release";
  id: string;
  slug: string;
  thumbnail: string;
  client: string;
  title: string;
  tags: string[];
  role?: string;
  displayOrder: number;
  date: string;
}

interface HomeClientProps {
  featuredItems: FeaturedItem[];
}

export function HomeClient({ featuredItems }: HomeClientProps) {
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});

  const handleImageLoad = useCallback((id: string, height: number) => {
    setImageHeights((prev) => {
      if (prev[id] === height) return prev;
      return { ...prev, [id]: height };
    });
  }, []);

  const minHeight = useMemo(() => {
    const heights = Object.values(imageHeights);
    if (heights.length === featuredItems.length) {
      return Math.min(...heights);
    }
    return undefined;
  }, [imageHeights, featuredItems.length]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Video - Vimeo Streaming (Cover方式) */}
        <div className="hero-video-container absolute inset-0 overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/1157420243?autoplay=1&loop=1&muted=1&background=1&controls=0"
            className="hero-video-iframe absolute top-1/2 left-1/2 border-none pointer-events-none"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        {/* Logo */}
        <div className="relative h-full px-[45px] grid-6 items-center">
          <div className="col-6 flex justify-end z-10">
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
      <section className="py-12 md:py-[92px] px-[45px] md:px-[45px] bg-white">
        <div className="">
          <div className="grid-6 mb-8 md:mb-12">
            <h2 className="max-[400px]:text-[8pt] text-[30pt] font-bold col-3">FEATURED</h2>
            <h2 className="max-[400px]:text-[8pt] text-[30pt] font-bold col-3 text-right">WORKS</h2>
          </div>

          <div className="grid-6 justify-end">
            {/* モバイル: 2列表示, デスクトップ: 3列表示 */}
            {/* モバイル用 (md未満): 2カード表示 */}
            <div className="col-6 md:hidden">
              <div className="grid-6">
                {Array.from(
                  { length: Math.ceil(featuredItems.length / 2) },
                  (_, groupIndex) => {
                    const startIndex = groupIndex * 2;
                    const groupItems = featuredItems.slice(startIndex, startIndex + 2);

                    return [
                      // 上部ボーダー
                      <div key={`border-top-${groupIndex}`} className="col-6">
                        <Image
                          src="/svg/line.svg"
                          alt=""
                          width={800}
                          height={10}
                          className="w-full"
                        />
                      </div>,
                      // 画像2つ
                      ...groupItems.map((item) => (
                        <div key={`image-${item.type}-${item.id}`} className="col-3">
                          <WorkCard
                            id={item.id}
                            slug={item.slug}
                            thumbnail={item.thumbnail}
                            client={item.client}
                            title={item.title}
                            tags={item.tags}
                            linkHref={
                              item.type === "release"
                                ? `/releases#${item.slug}`
                                : `/works/${item.slug}`
                            }
                            onImageLoad={(height) => handleImageLoad(item.id, height)}
                            imageOnly
                          />
                        </div>
                      )),
                      // 中間ボーダー
                      <div key={`border-middle-${groupIndex}`} className="col-6">
                        <Image
                          src="/svg/line.svg"
                          alt=""
                          width={800}
                          height={10}
                          className="w-full"
                        />
                      </div>,
                      // テキスト2つ
                      ...groupItems.map((item) => (
                        <div
                          key={`text-${item.type}-${item.id}`}
                          className={`col-3 ${groupIndex === Math.ceil(featuredItems.length / 2) - 1 ? "mb-10" : ""}`}
                        >
                          <WorkCard
                            id={item.id}
                            slug={item.slug}
                            thumbnail={item.thumbnail}
                            client={item.client}
                            title={item.title}
                            tags={item.tags}
                            role={item.role}
                            linkHref={
                              item.type === "release"
                                ? `/releases#${item.slug}`
                                : `/works/${item.slug}`
                            }
                            textOnly
                          />
                        </div>
                      )),
                    ];
                  }
                ).flat()}
              </div>
            </div>

            {/* デスクトップ用 (md以上) */}
            <div className="col-6 hidden md:block">
              <div className="grid-6">
                {Array.from(
                  { length: Math.ceil(featuredItems.length / 3) },
                  (_, groupIndex) => {
                    const startIndex = groupIndex * 3;
                    const groupItems = featuredItems.slice(startIndex, startIndex + 3);

                    return [
                      // 上部ボーダー
                      <div key={`border-top-${groupIndex}`} className="col-6">
                        <Image
                          src="/svg/border.svg"
                          alt=""
                          width={800}
                          height={10}
                          className="w-full"
                        />
                      </div>,
                      // 画像3つ
                      ...groupItems.map((item) => (
                        <div key={`image-${item.type}-${item.id}`} className="col-2">
                          <WorkCard
                            id={item.id}
                            slug={item.slug}
                            thumbnail={item.thumbnail}
                            client={item.client}
                            title={item.title}
                            tags={item.tags}
                            linkHref={
                              item.type === "release"
                                ? `/releases#${item.slug}`
                                : `/works/${item.slug}`
                            }
                            onImageLoad={(height) => handleImageLoad(item.id, height)}
                            imageHeight={minHeight}
                            imageOnly
                          />
                        </div>
                      )),
                      // 中間ボーダー
                      <div key={`border-middle-${groupIndex}`} className="col-6">
                        <Image
                          src="/svg/border.svg"
                          alt=""
                          width={800}
                          height={10}
                          className="w-full"
                        />
                      </div>,
                      // テキスト3つ
                      ...groupItems.map((item) => (
                        <div
                          key={`text-${item.type}-${item.id}`}
                          className={`col-2 ${groupIndex === Math.ceil(featuredItems.length / 3) - 1 ? "mb-[80px]" : ""}`}
                        >
                          <WorkCard
                            id={item.id}
                            slug={item.slug}
                            thumbnail={item.thumbnail}
                            client={item.client}
                            title={item.title}
                            tags={item.tags}
                            role={item.role}
                            linkHref={
                              item.type === "release"
                                ? `/releases#${item.slug}`
                                : `/works/${item.slug}`
                            }
                            textOnly
                          />
                        </div>
                      )),
                    ];
                  }
                ).flat()}
              </div>
            </div>
          </div>

          {/* More Works and Releases */}
          <div className="h-[143px] mt-[92px] mb-[52px]">
            <div className="grid-6">
              <Link
                href="/works"
                className="inline-block max-[400px]:text-[8pt] text-[30pt] md:text-[30pt] col-6 text-en font-bold text-wave-blue hover:text-[#c2de6d]"
              >
                MORE WORKS
              </Link>
            </div>
            <div className="mt-2 grid-6">
              <Link
                href="/releases"
                className="inline-block max-[400px]:text-[8pt] text-[30pt] md:text-[30pt] col-6 text-en font-bold text-wave-blue hover:text-[#c2de6d]"
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
