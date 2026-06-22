"use client";

import { useEffect, useRef, useState } from "react";
import type { WPNews } from "@/lib/wordpress";
import { stripHtml } from "@/lib/wordpress";

const ROTATION_INTERVAL_MS = 9000;
// 退場フェードアウトの長さ（globals.css の news-fade-out と合わせる）
const EXIT_DURATION_MS = 100;
// リビール順（動画再生開始 → ロゴ → ニュース1行目 → 2行目 → サウンド）に合わせ、
// 再生開始の合図（startReveal）を受けてから、ロゴの後ろにずらして入場させるディレイ。
const INTRO_DELAY_MS = 675;
// ニュース2行目（URL）を1行目の後ろにずらすオフセット。
// "ピピッ"と出す方針で、従来の半分(495→248)に短縮。
const URL_INTRO_OFFSET_MS = 248;

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

  return (
    <>
      {/* 色は固定: 上段（本文）= 緑、下段（URL）= 青 */}
      <div
        className={`bg-news-green text-white text-[10pt] md:text-[11pt] leading-[1.5] font-jp px-5 py-1.5 md:py-2 ${animateEntry ? "news-bar-anim" : ""}`}
        style={animateEntry && introDelayMs ? { animationDelay: `${introDelayMs}ms`, wordBreak: 'auto-phrase' } : { wordBreak: 'auto-phrase' }}
      >
        {body}
      </div>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-news-blue text-white text-[10pt] md:text-[11pt] leading-[1.4] font-mono px-5 py-1.5 md:py-2 break-all ${animateEntry ? "news-bar-anim-delayed" : ""} pointer-events-auto news-url-flicker`}
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
      // 1. 退場フェーズ：古いニュースを 100ms フェードアウト
      setExitingNews(newsList[idx]);
      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current);
      }
      // 2. 退場完了後に index を進めて新しいニュースをフェードイン
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
        // 退場フェーズ：古いニュースを 100ms フェードアウト。
        // この間は新しいニュースをまだ DOM に出さない（被らないように）。
        <div
          key={`exit-${exitingNews.id}`}
          className="flex flex-col items-start news-bar-exit"
        >
          <NewsBars item={exitingNews} animateEntry={false} />
        </div>
      ) : (
        // 通常フェーズ：現在のニュース。100ms フェードイン（2行目は 248ms 遅れ）。
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
