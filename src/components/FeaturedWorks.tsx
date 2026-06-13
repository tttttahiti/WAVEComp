"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { WorkCard } from "@/components/WorkCard";
import { BorderLine } from "@/components/BorderLine";

// TOP / hal-ca で共通の FEATURED WORKS セクションで扱う項目。
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
  featuredOrder: number;
  date: string;
}

interface FeaturedWorksProps {
  featuredItems: FeaturedItem[];
}

// TOP（HomeClient）と hal-ca（HalCaClient）で共通の「FEATURED WORKS」ブロック。
// 見出し + モバイル1カラム / デスクトップ3カラムのグリッド + MORE WORKS / MORE RELEASE。
export function FeaturedWorks({ featuredItems }: FeaturedWorksProps) {
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

  const linkHref = (item: FeaturedItem) =>
    item.type === "release" ? `/releases#${item.slug}` : `/works/${item.slug}`;

  return (
    <section className="py-12 md:py-[92px] px-[20px] md:px-[45px] bg-white">
      <div className="">
        <div className="grid-6 md:mb-12">
          <h2 className="text-[30pt] font-bold col-3 featured-heading">FEATURED</h2>
          <h2 className="text-[30pt] font-bold col-3 text-right featured-heading">WORKS</h2>
        </div>

        <div className="grid-6 justify-end">
          {/* モバイル用 (md未満): 1カード表示 */}
          <div className="col-6 md:hidden">
            <div className="grid-6">
              <div className="col-6 my-8">
                <div className="w-full h-px bg-black" />
              </div>
              {featuredItems.map((item) => [
                // 画像
                <div key={`image-${item.type}-${item.id}`} className="col-6">
                  <WorkCard
                    id={item.id}
                    slug={item.slug}
                    thumbnail={item.thumbnail}
                    client={item.client}
                    title={item.title}
                    tags={item.tags}
                    linkHref={linkHref(item)}
                    onImageLoad={(height) => handleImageLoad(item.id, height)}
                    imageOnly
                  />
                </div>,
                // 中間ボーダー
                <div key={`border-middle-${item.type}-${item.id}`} className="col-6 my-8">
                  <div className="w-full h-px bg-black" />
                </div>,
                // テキスト
                <div key={`text-${item.type}-${item.id}`} className="col-6">
                  <WorkCard
                    id={item.id}
                    slug={item.slug}
                    thumbnail={item.thumbnail}
                    client={item.client}
                    title={item.title}
                    tags={item.tags}
                    role={item.role}
                    linkHref={linkHref(item)}
                    textOnly
                  />
                </div>,
                // 下部ボーダー
                <div key={`border-bottom-${item.type}-${item.id}`} className="col-6 my-8">
                  <div className="w-full h-px bg-black" />
                </div>,
              ]).flat()}
            </div>
          </div>

          {/* デスクトップ用 (md以上): 3カード表示 */}
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
                      <BorderLine />
                    </div>,
                    // 画像3つ
                    ...groupItems.map((item) => (
                      <div key={`image-${item.type}-${item.id}`} className="col-2 pt-5 pb-8">
                        <WorkCard
                          id={item.id}
                          slug={item.slug}
                          thumbnail={item.thumbnail}
                          client={item.client}
                          title={item.title}
                          tags={item.tags}
                          linkHref={linkHref(item)}
                          onImageLoad={(height) => handleImageLoad(item.id, height)}
                          imageHeight={minHeight}
                          imageOnly
                        />
                      </div>
                    )),
                    // 中間ボーダー
                    <div key={`border-middle-${groupIndex}`} className="col-6">
                      <BorderLine />
                    </div>,
                    // テキスト3つ
                    ...groupItems.map((item) => (
                      <div key={`text-${item.type}-${item.id}`} className="col-2 mt-3 mb-12">
                        <WorkCard
                          id={item.id}
                          slug={item.slug}
                          thumbnail={item.thumbnail}
                          client={item.client}
                          title={item.title}
                          tags={item.tags}
                          role={item.role}
                          linkHref={linkHref(item)}
                          textOnly
                        />
                      </div>
                    )),
                  ];
                },
              ).flat()}
            </div>
          </div>
        </div>

        {/* More Works and Releases */}
        {/* 上の余白はデザイン(IDML)の設計値に合わせて 82px。
            デスクトップのデザインフレームは 1200px・左右マージン45px で Web と一致するため、
            デザインの px をそのまま適用できる（キャプション下端→MORE枠上端 = 約81.8px）。 */}
        <div className="h-[143px] mt-[52px] mb-[52px]">
          <div className="grid-6">
            <Link
              href="/works"
              className="inline-block text-[30pt] md:text-[30pt] col-6 text-en font-bold text-wave-blue hover:text-[#c2de6d]"
            >
              MORE WORKS
            </Link>
          </div>
          <div className="mt-2 grid-6">
            <Link
              href="/releases"
              className="inline-block text-[30pt] md:text-[30pt] col-6 text-en font-bold text-wave-blue hover:text-[#c2de6d]"
            >
              MORE RELEASE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
