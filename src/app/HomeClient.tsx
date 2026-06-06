"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { WorkCard } from "@/components/WorkCard";
import { Concept } from "@/components/Concept";
import { News } from "@/components/News";
import type { WPNews } from "@/lib/wordpress";

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

interface HomeClientProps {
  featuredItems: FeaturedItem[];
  newsList: WPNews[];
}

// 背景動画のプレースホルダー（GRAD_03.psd の書き出し）。
// 動画再生が始まるまで表示し、開始後にフェードアウトする。
const HERO_FALLBACK_SRC = "/images/hero-fallback.jpg";
// 再生開始を検知できなかった場合でも、この時間で必ずプレースホルダーを外す。
const HERO_FALLBACK_TIMEOUT_MS = 3000;

export function HomeClient({ featuredItems, newsList }: HomeClientProps) {
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);
  const videoIframeRef = useRef<HTMLIFrameElement>(null);

  // Vimeo の postMessage API で実際の再生開始（play / playing / timeupdate）を検知し、
  // プレースホルダー静止画をフェードアウトさせる。検知できないケースに備えてタイムアウトも併用。
  useEffect(() => {
    const VIMEO_ORIGIN = "https://player.vimeo.com";

    const post = (method: string, value?: string) => {
      const win = videoIframeRef.current?.contentWindow;
      if (!win) return;
      win.postMessage(JSON.stringify(value ? { method, value } : { method }), VIMEO_ORIGIN);
    };

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== VIMEO_ORIGIN) return;
      let data: { event?: string; method?: string };
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (data.event === "ready") {
        // プレーヤー準備完了後に再生系イベントを購読
        post("addEventListener", "play");
        post("addEventListener", "playing");
        post("addEventListener", "timeupdate");
        post("addEventListener", "bufferend");
      } else if (
        data.event === "play" ||
        data.event === "playing" ||
        data.event === "timeupdate" ||
        data.event === "bufferend"
      ) {
        setIsVideoReady(true);
      }
    };

    window.addEventListener("message", handleMessage);
    // すでに ready 済みのケース（HMR 等）に備えて購読リクエストを一度送る
    post("addEventListener", "play");
    post("addEventListener", "timeupdate");

    const timeout = window.setTimeout(() => setIsVideoReady(true), HERO_FALLBACK_TIMEOUT_MS);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.clearTimeout(timeout);
    };
  }, []);

  // 動画再生開始を別コンポーネント（PageWrapper の SOUND ボタン）へ通知し、
  // リビール順の最後にサウンドを出せるようにする。
  useEffect(() => {
    if (!isVideoReady) return;
    window.dispatchEvent(new Event("wave:hero-video-started"));
  }, [isVideoReady]);

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
      {/* Hero Section（data-hero: SOUND の追従/固定切替の IntersectionObserver 対象） */}
      <section data-hero className="relative h-screen overflow-hidden">
        {/* Background Video - Vimeo Streaming (Cover方式) */}
        <div className="hero-video-container absolute inset-0 overflow-hidden">
          <iframe
            ref={videoIframeRef}
            src="https://player.vimeo.com/video/1157420243?autoplay=1&loop=1&muted=1&background=1&controls=0"
            className="hero-video-iframe absolute top-1/2 left-1/2 border-none pointer-events-none"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        {/* 背景動画のプレースホルダー静止画（動画再生開始までのつなぎ） */}
        {!fallbackFailed && (
          <div
            className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-700 ease-out ${
              isVideoReady ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden
          >
            <Image
              src={HERO_FALLBACK_SRC}
              alt=""
              fill
              priority
              className="object-cover"
              onError={() => setFallbackFailed(true)}
            />
          </div>
        )}
        {/* News (左上、Heroにオーバーレイ)。動画再生開始（isVideoReady）後に入場。 */}
        <News newsList={newsList} startReveal={isVideoReady} />
        {/* Logo */}
        <div className="relative h-full px-[20px] md:px-[45px] grid-6 items-center">
          <div
            className={`col-6 flex justify-end z-10 ${isVideoReady ? "hero-intro" : "opacity-0"}`}
            style={isVideoReady ? { animationDelay: "340ms" } : undefined}
          >
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
      <section className="py-12 md:py-[92px] px-[20px] md:px-[45px] bg-white">
        <div className="">
          <div className="grid-6 mb-8 md:mb-12">
            <h2 className="text-[30pt] font-bold col-3 featured-heading">FEATURED</h2>
            <h2 className="text-[30pt] font-bold col-3 text-right featured-heading">WORKS</h2>
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
                      linkHref={
                        item.type === "release"
                          ? `/releases#${item.slug}`
                          : `/works/${item.slug}`
                      }
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
                      linkHref={
                        item.type === "release"
                          ? `/releases#${item.slug}`
                          : `/works/${item.slug}`
                      }
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
                        <img
                          src="/svg/border.svg"
                          alt=""
                          style={{ width: '100%', height: '10px', minHeight: '10px', maxHeight: '10px', objectFit: 'fill' }}
                        />
                      </div>,
                      // テキスト3つ
                      ...groupItems.map((item) => (
                        <div
                          key={`text-${item.type}-${item.id}`}
                          className="col-2"
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
          {/* 上の余白はデザイン(IDML)の設計値に合わせて 82px。
              デスクトップのデザインフレームは 1200px・左右マージン45px で Web と一致するため、
              デザインの px をそのまま適用できる（キャプション下端→MORE枠上端 = 約81.8px）。 */}
          <div className="h-[143px] mt-[52px] lg:mt-[82px] mb-[52px]">
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
