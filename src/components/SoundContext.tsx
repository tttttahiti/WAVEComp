"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from "react";

interface SoundContextType {
  isSoundOn: boolean;
  toggleSound: () => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  pauseForVideo: () => void;
  resumeFromVideo: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const TARGET_VOLUME = 0.5;
const FADE_DURATION_MS = 1000;
const FADE_STEPS = 30;

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wasOnBeforeVideoRef = useRef(false);
  const activeVideoCountRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const audio = new Audio("/sound/03_Mirror2.wav");

      audio.addEventListener("canplaythrough", () => {
        audio.loop = true;
        audio.volume = TARGET_VOLUME;
        audioRef.current = audio;
      });

      audio.addEventListener("error", (e) => {
        console.error("音声ファイルの読み込みエラー:", e);
        console.error("Audio error code:", audio.error?.code);
        console.error("Audio error message:", audio.error?.message);
      });

      audio.load();
    } catch (error) {
      console.error("Audioオブジェクトの作成に失敗しました:", error);
    }

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const clearFade = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeTo = useCallback(
    (target: number, onComplete?: () => void) => {
      const audio = audioRef.current;
      if (!audio) {
        onComplete?.();
        return;
      }
      clearFade();
      const stepMs = FADE_DURATION_MS / FADE_STEPS;
      const startVolume = audio.volume;
      const delta = (target - startVolume) / FADE_STEPS;
      let step = 0;
      fadeIntervalRef.current = setInterval(() => {
        step += 1;
        const next = step >= FADE_STEPS ? target : startVolume + delta * step;
        audio.volume = Math.max(0, Math.min(1, next));
        if (step >= FADE_STEPS) {
          clearFade();
          onComplete?.();
        }
      }, stepMs);
    },
    [clearFade]
  );

  const toggleSound = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) {
      console.warn("音声ファイルがまだ読み込まれていません");
      return;
    }

    try {
      if (isSoundOn) {
        clearFade();
        audio.pause();
        audio.volume = TARGET_VOLUME;
        setIsSoundOn(false);
      } else {
        clearFade();
        audio.volume = TARGET_VOLUME;
        await audio.play();
        setIsSoundOn(true);
      }
    } catch (error) {
      console.error("音声の再生に失敗しました:", error);
      if (error instanceof Error && error.name === "NotAllowedError") {
        console.warn("ユーザーの操作が必要です。ページをクリックしてから再度お試しください。");
      }
    }
  }, [isSoundOn, clearFade]);

  const pauseForVideo = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const wasFirstVideo = activeVideoCountRef.current === 0;
    activeVideoCountRef.current += 1;
    if (!wasFirstVideo || !isSoundOn) return;
    wasOnBeforeVideoRef.current = true;
    fadeTo(0, () => {
      audio.pause();
      audio.volume = TARGET_VOLUME;
    });
    setIsSoundOn(false);
  }, [isSoundOn, fadeTo]);

  const resumeFromVideo = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (activeVideoCountRef.current > 0) {
      activeVideoCountRef.current -= 1;
    }
    if (activeVideoCountRef.current > 0) return;
    if (!wasOnBeforeVideoRef.current) return;
    wasOnBeforeVideoRef.current = false;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setIsSoundOn(true);
        fadeTo(TARGET_VOLUME);
      })
      .catch((error) => {
        console.error("動画停止後のサイト音再開に失敗しました:", error);
      });
  }, [fadeTo]);

  return (
    <SoundContext.Provider
      value={{ isSoundOn, toggleSound, audioRef, pauseForVideo, resumeFromVideo }}
    >
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
