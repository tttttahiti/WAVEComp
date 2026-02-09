"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { WorkCard } from "@/components/WorkCard";

export interface Work {
  id: string;
  slug: string;
  thumbnail: string;
  client: string;
  title: string;
  tags: string[];
  role?: string;
  displayOrder?: number;
}

interface WorksClientProps {
  initialWorks: Work[];
}

export function WorksClient({ initialWorks }: WorksClientProps) {
  const searchParams = useSearchParams();
  const [filterTag, setFilterTag] = useState("");
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});

  // URLのクエリパラメータからタグを取得
  useEffect(() => {
    const tagParam = searchParams.get("tag");
    if (tagParam) {
      setFilterTag(decodeURIComponent(tagParam));
    }
  }, [searchParams]);

  // プルダウン表示順（この順で表示、未定義タグは末尾）
  const TAG_ORDER = ["#HAL ca", "#Installation", "#Movie", "#Experience Design", "#Event Produce"];

  // 全ての記事から重複なしのタグ一覧を取得（指定順でソート）
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    initialWorks.forEach((work) => {
      work.tags.forEach((tag) => tagSet.add(tag));
    });
    const list = Array.from(tagSet);
    return list.sort((a, b) => {
      const i = TAG_ORDER.indexOf(a);
      const j = TAG_ORDER.indexOf(b);
      if (i === -1 && j === -1) return a.localeCompare(b);
      if (i === -1) return 1;
      if (j === -1) return -1;
      return i - j;
    });
  }, [initialWorks]);

  const filteredWorks = useMemo(() => {
    // 表示順でソート（小さい数字が先）
    const sortedWorks = [...initialWorks].sort(
      (a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99)
    );

    if (!filterTag) return sortedWorks;
    return sortedWorks.filter((work) =>
      work.tags.some((tag) => tag === filterTag)
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
      <section className="relative h-[150px] md:h-[215px] min-h-[150px] md:min-h-[215px] flex items-end overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-screen squish-on-menu transition-transform duration-500 origin-left">
          <Image
            src="/svg/bg-gradient.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 w-full pb-6 md:pb-12">
          <div className="grid-6 px-[45px] md:px-[45px]">
            <h2 className="text-white text-[30pt] md:text-[30pt] font-bold col-3 md:col-3">WORKS</h2>
            <div className="col-3 md:col-3 flex justify-end items-end mt-0">
              <Link href="/">
                <Image
                  src="/svg/logo-wave.svg"
                  alt="WA/VE"
                  width={140}
                  height={40}
                  className="w-[140px] h-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Works Grid */}
      <section className="py-[30px] pb-[20px] px-[45px] md:px-[45px] mb-[55px]">
        <div className="">
          {/* Filter Selector */}
          <div className="grid-6 mb-6 md:mb-8">
            <div className="col-6 md:col-start-6 md:col-1 flex justify-end">
              <div className="relative">
                <select
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                  className="w-48 md:w-64 bg-white text-black border border-black/20 px-4 py-2 text-sm focus:outline-none focus:border-wave-blue transition-colors appearance-none cursor-pointer"
                >
                  <option value="">#</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  ▼
                </span>
              </div>
            </div>
          </div>

          {/* Works Grid - モバイル: 1列, デスクトップ: 2列 */}
          {filteredWorks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[10pt] md:text-[12pt]">Works not found</p>
            </div>
          ) : (
            <div className="grid-6 justify-end">
              {/* モバイル用 (md未満): 1カード表示 */}
              <div className="col-6 md:hidden">
                <div className="grid-6">
                  {filteredWorks.map((work, index) => [

                    // 画像
                    <div key={`image-${work.id}`} className="col-6">
                      <WorkCard
                        {...work}
                        onImageLoad={(height) => handleImageLoad(work.id, height)}
                        imageOnly
                      />
                    </div>,
                    // 中間ボーダー
                    <div key={`border-middle-${work.id}`} className="col-6">
                      <div className="w-full h-px bg-black" />
                    </div>,
                    // テキスト
                    <div key={`text-${work.id}`} className={`col-6 ${index === filteredWorks.length - 1 ? '' : ''}`}>
                      <WorkCard
                        {...work}
                        textOnly
                      />
                    </div>,
                    // 上部ボーダー
                    <div key={`border-top-${work.id}`} className="col-6">
                      <div className="w-full h-px bg-black" />
                    </div>,

                  ]).flat()}
                </div>
              </div>

              {/* デスクトップ用 (md以上): 2カード表示 */}
              <div className="col-6 hidden md:block mb-[200px]">
                <div className="grid-6">
                  {Array.from({ length: Math.ceil(filteredWorks.length / 2) }, (_, groupIndex) => {
                    const startIndex = groupIndex * 2;
                    const groupWorks = filteredWorks.slice(startIndex, startIndex + 2);

                    return [
                      // 上部ボーダー
                      <div key={`border-top-${groupIndex}`} className="h-[10px] col-6">
                        <Image
                          src="/svg/line.svg"
                          alt=""
                          width={800}
                          height={10}
                          className="w-full"
                        />
                      </div>,
                      // 画像2つ
                      ...groupWorks.map((work) => (
                        <div key={`image-${work.id}`} className="col-3">
                          <WorkCard
                            {...work}
                            onImageLoad={(height) => handleImageLoad(work.id, height)}
                            imageHeight={minHeight}
                            imageOnly
                          />
                        </div>
                      )),
                      // 中間ボーダー
                      <div key={`border-middle-${groupIndex}`} className="h-[10px] col-6">
                        <Image
                          src="/svg/line.svg"
                          alt=""
                          width={800}
                          height={10}
                          className="w-full"
                        />
                      </div>,
                      // テキスト2つ
                      ...groupWorks.map((work) => (
                        <div key={`text-${work.id}`} className={`col-3 ${groupIndex === Math.ceil(filteredWorks.length / 2) - 1 ? 'mb-[80px]' : ''}`}>
                          <WorkCard
                            {...work}
                            textOnly
                          />
                        </div>
                      )),
                    ];
                  }).flat()}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
