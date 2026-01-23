"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMenu } from "./MenuContext";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const { isMenuOpen, toggleMenu } = useMenu();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight - 48;
      setIsScrolled(window.scrollY >= viewportHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期状態をチェック

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // 音声ファイルを初期化
    if (typeof window !== "undefined") {
      try {
        // 音声ファイルのパス
        const audioPath = "/sound/03_Mirror2.wav";
        const audio = new Audio(audioPath);
        
        // 音声が読み込めるか確認
        audio.addEventListener("canplaythrough", () => {
          audio.loop = true;
          audio.volume = 0.5;
          audioRef.current = audio;
        });
        
        // エラーハンドリング
        audio.addEventListener("error", (e) => {
          console.error("音声ファイルの読み込みエラー:", e);
          console.error("Audio error code:", audio.error?.code);
          console.error("Audio error message:", audio.error?.message);
        });
        
        // 読み込みを開始
        audio.load();
      } catch (error) {
        console.error("Audioオブジェクトの作成に失敗しました:", error);
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = async () => {
    if (!audioRef.current) {
      console.warn("音声ファイルがまだ読み込まれていません");
      return;
    }

    try {
      if (isSoundOn) {
        audioRef.current.pause();
        setIsSoundOn(false);
      } else {
        await audioRef.current.play();
        setIsSoundOn(true);
      }
    } catch (error) {
      console.error("音声の再生に失敗しました:", error);
      // ユーザーの操作が必要な場合（ブラウザの自動再生ポリシー）
      if (error instanceof Error && error.name === "NotAllowedError") {
        console.warn("ユーザーの操作が必要です。ページをクリックしてから再度お試しください。");
      }
    }
  };

  return (
    <>
      {/* Fixed Header - stays at full width */}
      <header
        className={`fixed top-0 left-0 z-50 px-6 pt-12 md:px-16 transition-[width] duration-500 ease-out ${
          isMenuOpen ? "md:w-[80vw] w-full" : "w-full"
        }`}
      >
        <div className="grid-6 items-start">
          <button
            onClick={toggleSound}
            className={`col-1 font-en font-bold transition-colors duration-300 text-left ${isScrolled ? 'text-black' : 'text-white'}`}
            style={{ fontSize: '10pt' }}
            aria-label={isSoundOn ? '音声をオフ' : '音声をオン'}
          >
            SOUND {isSoundOn ? '/' : '\\'}
          </button>
          <div className="col-start-6 col-1 flex justify-end">
            <button
              onClick={toggleMenu}
              className="p-2 -m-2"
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
        </div>
      </header>

      {/* Page Content - width shrinks when menu opens */}
      <div
        className={`min-h-screen bg-white transition-[width] duration-500 ease-out overflow-hidden ${
          isMenuOpen ? "md:w-[80vw]" : "w-full"
        }`}
      >
        {children}
      </div>
    </>
  );
}
