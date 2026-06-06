"use client";

import { useEffect, useRef, useState } from "react";
import type { NewsColor, WPNews } from "@/lib/wordpress";
import { stripHtml } from "@/lib/wordpress";

const ROTATION_INTERVAL_MS = 9000;
const EXIT_DURATION_MS = 350;
// リビール順（動画再生開始 → ロゴ → ニュース1行目 → 2行目 → サウンド）に合わせ、
// 再生開始の合図（startReveal）を受けてから、ロゴの後ろにずらして入場させるディレイ。
const INTRO_DELAY_MS = 675;
// ニュース2行目（URL）を1行目の後ろにずらすオフセット。
const URL_INTRO_OFFSET_MS = 495;

const colorBgClass: Record<NewsColor, string> = {
  red: "bg-news-red",
  green: "bg-news-green",
  blue: "bg-news-blue",
};

interface NewsProps {
  newsList: WPNews[];
  // true になって初めてニュースを表示・入場アニメ・ローテーションを開始する。
  // TOP では背景動画の再生開始に同期させる。
  startReveal?: boolean;
}

function NewsBars({
  item,
  animateEntry,
  introDelayMs = 0,
}: {
  item: WPNews;
  animateEntry: boolean;
  introDelayMs?: number;
}) {
  const body = stripHtml(item.content.rendered).trim();
  const url = (item.news_meta.url ?? "").trim();
  const bodyBg = colorBgClass[item.news_meta.body_color] ?? colorBgClass.blue;
  const urlBg = colorBgClass[item.news_meta.url_color] ?? colorBgClass.green;

  return (
    <>
      <div
        className={`${bodyBg} text-white text-[12pt] md:text-[14pt] leading-[1.5] font-jp px-[20px] md:px-[30px] py-[10px] md:py-[12px] ${animateEntry ? "news-bar-anim" : ""}`}
        style={animateEntry && introDelayMs ? { animationDelay: `${introDelayMs}ms` } : undefined}
      >
        {body}
      </div>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${urlBg} text-white text-[11pt] md:text-[12pt] leading-[1.4] font-mono px-[20px] md:px-[30px] py-[8px] md:py-[10px] ${animateEntry ? "news-bar-anim-delayed" : ""} pointer-events-auto news-url-flicker`}
          style={animateEntry && introDelayMs ? { animationDelay: `${introDelayMs + URL_INTRO_OFFSET_MS}ms` } : undefined}
        >
          {url}
        </a>
      )}
    </>
  );
}

export function News({ newsList, startReveal = true }: NewsProps) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const [isFirstReveal, setIsFirstReveal] = useState(true);
  const [exitingNews, setExitingNews] = useState<WPNews | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const exitTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // 再生開始の合図が来るまではローテーションを始めない。
    if (!startReveal) return;
    if (newsList.length <= 1) return;
    const id = window.setInterval(() => {
      const idx = indexRef.current;
      // 初回リビールのディレイは1回限り。以降のローテーションは通常速度。
      setIsFirstReveal(false);
      // 1. 退場フェーズ開始：古いニュースだけを表示して左へスライドアウト
      setExitingNews(newsList[idx]);
      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current);
      }
      // 2. 退場完了後に index を進めて新しいニュースを入場させる
      exitTimeoutRef.current = window.setTimeout(() => {
        const nextIdx = (idx + 1) % newsList.length;
        indexRef.current = nextIdx;
        setIndex(nextIdx);
        setExitingNews(null);
      }, EXIT_DURATION_MS);
    }, ROTATION_INTERVAL_MS);
    return () => {
      window.clearInterval(id);
      if (exitTimeoutRef.current) window.clearTimeout(exitTimeoutRef.current);
    };
  }, [newsList, startReveal]);

  // NEWS の現在の高さを CSS 変数として公開。Header の SOUND ボタンが
  // これを参照して NEWS の下にずれる。外側の安定したラッパーに ResizeObserver
  // を付けるので、ローテーション（内側 DOM の remount）でも購読が切れない。
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height ?? 0;
      document.documentElement.style.setProperty(
        "--news-bar-height",
        `${Math.ceil(h)}px`,
      );
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.setProperty("--news-bar-height", "0px");
    };
  }, []);

  if (newsList.length === 0) return null;

  const current = newsList[index];

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 z-20 flex flex-col items-start max-w-[calc(100%-70px)] md:max-w-[60%] pointer-events-none"
    >
      {!startReveal ? (
        // 再生開始の合図待ち：まだニュースを出さない（背景動画 → ロゴ より後）。
        null
      ) : exitingNews ? (
        // 退場フェーズ：古いニュースを通常フローでレンダリングして左へスライドアウト。
        // この間は新しいニュースをまだ DOM に出さない（被らないように）。
        <div
          key={`exit-${exitingNews.id}`}
          className="flex flex-col items-start news-bar-exit"
        >
          <NewsBars item={exitingNews} animateEntry={false} />
        </div>
      ) : (
        // 通常フェーズ：現在のニュース。入場アニメ。
        <div key={current.id} className="flex flex-col items-start">
          <NewsBars
            item={current}
            animateEntry={true}
            introDelayMs={isFirstReveal ? INTRO_DELAY_MS : 0}
          />
        </div>
      )}
    </div>
  );
}
