"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMenu } from "./MenuContext";
import { useSound } from "./SoundContext";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const { isMenuOpen, toggleMenu } = useMenu();
  const { isSoundOn, toggleSound } = useSound();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSoundHidden, setIsSoundHidden] = useState(false);
  // ヒーロー＋ニュースのエリアがまだ画面に見えているか（IntersectionObserver で判定）。
  //  - 見えている間: SOUND は --news-bar-height でニュース直下に追従（従来通り）
  //  - 通り過ぎたら: 固定オフセット(0)で通常位置に戻す（揺れない）
  const [inHeroZone, setInHeroZone] = useState(true);
  // TOP では SOUND をリビール順（動画再生開始 → ロゴ → ニュース → サウンド）の最後に出す。
  //  - "hidden": 再生開始の合図待ち（非表示）
  //  - "animating": フェードイン中（ニュースの後ろにディレイ）
  //  - "done": 以降はスクロール連動の opacity 制御に明け渡す
  const [soundReveal, setSoundReveal] = useState<"hidden" | "animating" | "done">(
    pathname === "/" ? "hidden" : "done",
  );
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (pathname !== "/") {
      setSoundReveal("done");
      return;
    }
    setSoundReveal("hidden");

    let triggered = false;
    let settleTimer = 0;
    const reveal = () => {
      if (triggered) return;
      triggered = true;
      window.clearTimeout(fallback);
      setSoundReveal("animating");
      // ディレイ(1125ms) + sound-intro(100ms) の完了後に通常制御へ（余裕をみて 3150ms）
      settleTimer = window.setTimeout(() => setSoundReveal("done"), 3150);
    };

    window.addEventListener("wave:hero-video-started", reveal, { once: true });
    // 合図が来ないケースの保険（HomeClient 側にも3秒フォールバックあり）
    const fallback = window.setTimeout(reveal, 5000);

    return () => {
      window.removeEventListener("wave:hero-video-started", reveal);
      window.clearTimeout(fallback);
      window.clearTimeout(settleTimer);
    };
  }, [pathname]);

  useEffect(() => {
    const getThreshold = () => {
      const hero = document.querySelector("[data-hero]");
      if (hero) {
        return (hero as HTMLElement).offsetHeight;
      }
      // フォールバック（TOPページなど）
      return window.innerHeight - 48;
    };

    const handleScroll = () => {
      const threshold = getThreshold();
      const currentY = window.scrollY;
      setIsScrolled(currentY >= threshold);

      const lastY = lastScrollYRef.current;
      if (currentY <= 4) {
        setIsSoundHidden(false);
      } else if (currentY > lastY + 2) {
        setIsSoundHidden(true);
      } else if (currentY < lastY - 2) {
        setIsSoundHidden(false);
      }
      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // 初期状態をチェック

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // ヒーロー（[data-hero]）が画面に見えているかを IntersectionObserver で監視。
  // 見えている間だけ SOUND をニュース高さに追従させ、通り過ぎたら固定オフセットへ。
  useEffect(() => {
    const heroEl = document.querySelector("[data-hero]");
    if (!heroEl) {
      // ヒーローが無いページは常に固定位置(0)扱い。
      setInHeroZone(false);
      return;
    }
    setInHeroZone(true);
    const io = new IntersectionObserver(
      ([entry]) => setInHeroZone(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(heroEl);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <>
      {/* Fixed Header - stays at full width.
          pointer-events-none で透明な領域へのクリックを背後（NEWS の URL リンク等）に透過させ、
          実際の操作要素（SOUND / メニューボタン）だけ pointer-events-auto で復活させる。 */}
      <header
        className={`fixed top-0 left-0 z-50 pt-[45px] px-[20px] md:px-[45px] transition-[width] duration-500 ease-out pointer-events-none ${
          isMenuOpen ? "md:w-[calc(100vw-233px)]" : "w-full"
        }`}
      >
        <div className={`flex justify-between items-start ${isMenuOpen ? "hidden md:flex" : ""}`}>
          <button
            onClick={toggleSound}
            style={{
              // ヒーロー＋ニュースが見えている間はニュース直下に追従（--news-bar-height）、
              // エリアを通り過ぎたら固定オフセット(0)で通常位置へ。
              // header の pt-[45px] が NEWS 下端のさらに下に乗って空きすぎるため、
              // その 45px を相殺し、NEWS 本文の行間ぶんだけ空けて行リズムに合わせる。
              // 18px ≒ 14pt×leading-1.5 の行間の約2倍。詰め/緩めは末尾の +18px を増減して調整可能。
              marginTop: inHeroZone ? "calc(var(--news-bar-height, 0px) - 45px + 12px)" : "0px",
              // NEWS2段目(=923ms: URLオフセット半減後)→SOUND の間隔を約半分(約200ms)に
              // 詰めて "ピピッ"とデジタル的に出す（旧: 1575ms / 間隔405ms）。
              ...(soundReveal === "animating" ? { animationDelay: "1125ms" } : {}),
            }}
            className={`pointer-events-auto font-en font-bold transition-[color,opacity,margin-top] duration-300 text-left text-[10pt] ${isScrolled ? "text-black" : "text-white"} ${
              soundReveal === "hidden"
                ? "opacity-0 pointer-events-none"
                : soundReveal === "animating"
                  ? "sound-intro"
                  : isSoundHidden
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
            }`}
            aria-label={isSoundOn ? "音声をオフ" : "音声をオン"}
          >
            SOUND {isSoundOn ? "/" : "\\"}
          </button>
          <button
            onClick={toggleMenu}
            className={`p-2 -m-2 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0 pointer-events-none" : "pointer-events-auto"
            }`}
            aria-label="メニューを開く"
          >
            {isScrolled ? (
              <Image
                src="/svg/icon-menu-black.svg"
                alt="メニュー"
                width={23}
                height={21}
                className="h-[21px] w-auto"
              />
            ) : (
              <Image
                src="/svg/icon-menu.svg"
                alt="メニュー"
                width={23}
                height={21}
                className="h-[21px] w-auto"
              />
            )}
          </button>
        </div>
      </header>

      {/* Page Content - width shrinks when menu opens */}
      <div
        className={`min-h-screen bg-white transition-[width] duration-500 ease-out overflow-hidden ${
          isMenuOpen ? "md:w-[calc(100vw-233px)]" : "w-full"
        }`}
      >
        {children}
      </div>
    </>
  );
}
