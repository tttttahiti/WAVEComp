"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

interface SoundContextType {
  isSoundOn: boolean;
  toggleSound: () => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    <SoundContext.Provider value={{ isSoundOn, toggleSound, audioRef }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
