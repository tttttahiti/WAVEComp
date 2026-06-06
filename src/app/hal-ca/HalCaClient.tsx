"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { WorkCard } from "@/components/WorkCard";
import { type FeaturedItem } from "@/app/HomeClient";

interface HalCaClientProps {
  featuredItems: FeaturedItem[];
}

export function HalCaClient({ featuredItems }: HalCaClientProps) {
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
      <section data-hero className="relative aspect-video md:aspect-auto md:h-[40vh] md:max-h-[512px] bg-gray-100 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-full transition-[width] duration-500 ease-out hal-ca-hero-image">
          {/* 背景: 横方向の余白を埋める blur レイヤー（コンテナ全体を cover） */}
          <Image
            src="/images/hal-ca-hero2.jpg"
            alt=""
            fill
            aria-hidden
            className="object-cover blur-2xl scale-110"
          />
          {/* 前景: 高さ100%・幅auto で常に「上下ぴったり」。横は中央寄せし、
              余りは背景 blur が埋め、はみ出しは overflow-hidden で隠す。
              これで画面の幅・高さに関わらず画像の上下がコンテンツエリアに一致する。 */}
          <div className="absolute inset-0 flex justify-center">
            <Image
              src="/images/hal-ca-hero2.jpg"
              alt="HAL ca"
              width={13000}
              height={4160}
              sizes="100vw"
              className="h-full w-auto max-w-none"
              priority
            />
          </div>
        </div>
      </section>

      {/* Artist Info Section */}
      <section className="py-[94px] md:py-32 px-[20px] md:px-[45px] md:px-[20px] md:px-[45px]">
        <div className="grid-6">
          <div className="col-6 md:col-3">
            <h2 className="text-[30pt] md:text-[30pt] font-bold mb-[59px]">HAL ca</h2>

            <p className="text-[12pt] font-medium letter-height-[14pt] mb-4 md:mb-8">
              HAL caは、アンビエント・実験音楽を軸とするコンポーザー /
              サウンドアーティスト。
            </p>

            <div className="text-[12pt] font-medium letter-height-[14pt] space-y-4 md:space-y-6">
              <p>
                東京生まれ。国立音楽大学を経て渡仏し、パリ・エコールノルマル音楽院映画音楽作曲科を首席で修了、またパリ地方音楽院エレクトロアコースティック作曲科にて電子音響を学ぶ。
                <br />
                <br />
                ノイズや声、フィールドレコーディングなど多様な音響オブジェクトをオーケストレーションし、円環的な時間感覚をもった音のデザインを追求。抽象的でありながらも身体感覚に訴えかける響きを生み出し、聴く者を「今ここ」に立ち戻らせる音楽を作り続けている。
                <br />
                <br />
                作品はデジタルリリースにとどまらず、広告音楽、オーディオヴィジュアルや空間インスタレーションへも展開。マルチチャンネルによる多層的な音響デザインや、音の体験デザインを得意とし、近年は
                BMW THE SEVEN ART MUSEUM
                や大阪関西万博に空間音響演出で参加するなど、活動を幅を広げている。
              </p>
            </div>
          </div>
          <div className="hidden md:block md:col-1"></div>
          <div className="col-6 md:col-2 mt-[30px] md:mt-[107px]">
            {/* External Links */}
            <div className="flex flex-col gap-4 md:gap-0">
              <a
                href="https://music.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12pt] font-bold text-wave-blue hover:text-[#c2de6d] transition-colors"
              >
                APPLE MUSIC
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12pt] font-bold text-wave-blue hover:text-[#c2de6d] transition-colors"
              >
                SPOTIFY
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12pt] font-bold text-wave-blue hover:text-[#c2de6d] transition-colors"
              >
                INSTAGRAM (HAL ca)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section className="py-12 md:py-[92px] px-[20px] md:px-[45px] md:px-[20px] md:px-[45px] bg-white">
        <div className="">
          <div className="grid-6 mb-8 md:mb-12">
            <h2 className="text-[30pt] md:text-[30pt] font-bold col-3 featured-heading">FEATURED</h2>
            <h2 className="text-[30pt] md:text-[30pt] font-bold col-3 text-right featured-heading">WORKS</h2>
          </div>

          <div className="grid-6 justify-end">
            {/* モバイル用 (md未満): 1カード表示 */}
            <div className="col-6 md:hidden">
              <div className="grid-6">
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
                      role={item.role}
                      linkHref={item.type === "release" ? `/releases#${item.slug}` : `/works/${item.slug}`}
                      onImageLoad={(height) => handleImageLoad(item.id, height)}
                      imageOnly
                    />
                  </div>,
                  // 中間ボーダー
                  <div key={`border-middle-${item.type}-${item.id}`} className="col-6">
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
                      linkHref={item.type === "release" ? `/releases#${item.slug}` : `/works/${item.slug}`}
                      textOnly
                    />
                  </div>,
                  // 下部ボーダー
                  <div key={`border-bottom-${item.type}-${item.id}`} className="col-6">
                    <div className="w-full h-px bg-black" />
                  </div>,
                ]).flat()}
              </div>
            </div>

            {/* デスクトップ用 (md以上): 3カード表示 */}
            <div className="col-6 hidden md:block">
              <div className="grid-6">
                {Array.from({ length: Math.ceil(featuredItems.length / 3) }, (_, groupIndex) => {
                  const startIndex = groupIndex * 3;
                  const groupItems = featuredItems.slice(startIndex, startIndex + 3);

                  return [
                    // 上部ボーダー
                    <div key={`border-top-${groupIndex}`} className="col-6">
                      <img
                        src="/svg/border.svg"
                        alt=""
                        style={{ width: '100%', height: '10px', minHeight: '10px', maxHeight: '10px', objectFit: 'fill' }}
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
                          role={item.role}
                          linkHref={item.type === "release" ? `/releases#${item.slug}` : `/works/${item.slug}`}
                          onImageLoad={(height) => handleImageLoad(item.id, height)}
                          imageHeight={minHeight}
                          imageOnly
                        />
                      </div>
                    )),
                    // 中間ボーダー
                    <div key={`border-middle-${groupIndex}`} className="col-6">
                      <img
                        src="/svg/border.svg"
                        alt=""
                        style={{ width: '100%', height: '10px', minHeight: '10px', maxHeight: '10px', objectFit: 'fill' }}
                      />
                    </div>,
                    // テキスト3つ
                    ...groupItems.map((item) => (
                      <div key={`text-${item.type}-${item.id}`} className={`col-2 ${groupIndex === Math.ceil(featuredItems.length / 3) - 1 ? 'mb-[80px]' : ''}`}>
                        <WorkCard
                          id={item.id}
                          slug={item.slug}
                          thumbnail={item.thumbnail}
                          client={item.client}
                          title={item.title}
                          tags={item.tags}
                          role={item.role}
                          linkHref={item.type === "release" ? `/releases#${item.slug}` : `/works/${item.slug}`}
                          textOnly
                        />
                      </div>
                    )),
                  ];
                }).flat()}
              </div>
            </div>
          </div>

          {/* More Works and Releases */}
          <div className="h-auto md:h-[143px] mt-12 md:mt-[92px] mb-8 md:mb-[52px]">
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
    </>
  );
}
