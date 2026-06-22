"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Concept } from "@/components/Concept";
import { News } from "@/components/News";
import { FeaturedWorks, type FeaturedItem } from "@/components/FeaturedWorks";
import type { WPNews } from "@/lib/wordpress";

// FeaturedItem は FeaturedWorks に移動。既存の `from "./HomeClient"` 参照のため再エクスポート。
export type { FeaturedItem };

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

  return (
    <>
      {/* Hero Section（data-hero: SOUND の追従/固定切替の IntersectionObserver 対象） */}
      <section data-hero className="relative h-screen overflow-hidden">
        {/* Background Video - Vimeo Streaming (Cover方式) */}
        <div className="w-full h-screen transition-[width] duration-500 ease-out absolute inset-0 overflow-hidden">
          <iframe
            ref={videoIframeRef}
            src="https://player.vimeo.com/video/1157420243?autoplay=1&loop=1&muted=1&background=1&controls=0"
            className="hero-video-iframe absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none pointer-events-none"
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
        <div className="relative h-full px-5 md:px-[45px] grid-6 items-center">
          <div
            className={`col-span-6 flex justify-end z-10 ${isVideoReady ? "hero-intro" : "opacity-0"}`}
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
      <Concept className="py-[120px] md:py-[154px]" />

      {/* Selected Works Section（TOP / hal-ca 共通） */}
      <FeaturedWorks featuredItems={featuredItems} />
    </>
  );
}
