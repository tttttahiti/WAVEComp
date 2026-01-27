"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // クライアントサイドでのみマウント状態を設定
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateDuration = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
      setDuration(audio.duration);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      updateDuration();
    };

    const handleCanPlay = () => {
      updateDuration();
    };

    const handleDurationChange = () => {
      updateDuration();
    };

    const handleTimeUpdate = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
        // durationがまだ取得できていない場合、再度試行
        if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
          setDuration(audio.duration);
        }
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    // 複数のイベントでdurationを取得を試みる
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // 既にメタデータが読み込まれている場合
    if (audio.readyState >= 1) {
      updateDuration();
    }

    // 手動でloadを呼び出してメタデータを取得
    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [isMounted, updateDuration]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
    } catch (error) {
      console.error("Audio playback error:", error);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progress = progressRef.current;
    if (!audio || !progress || !duration) return;

    const rect = progress.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    audio.currentTime = percentage * duration;
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="py-4">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
      />

      {title && (
        <p className="text-sm font-medium mb-3">{title}</p>
      )}

      <div className="flex items-center gap-3 md:gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-[12px] md:w-[15px] h-[15px] md:h-[18px] flex-shrink-0 flex items-center justify-center transition-opacity hover:opacity-80"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Image
              src="/player/pause.svg"
              alt="Pause"
              width={20}
              height={27}
              className="w-full h-full"
            />
          ) : (
            <Image
              src="/player/play.svg"
              alt="Play"
              width={15}
              height={18}
              className="w-full h-full"
            />
          )}
        </button>

        {/* Progress Bar Container */}
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="flex-1 h-[10px] relative cursor-pointer"
        >
          {/* Background outline - sequence_outline style */}
          <svg
            viewBox="0 0 100 10"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Left vertical cap */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="10"
              stroke="#536cdb"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            {/* Horizontal line */}
            <line
              x1="0"
              y1="10"
              x2="100"
              y2="10"
              stroke="#536cdb"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            {/* Right vertical cap */}
            <line
              x1="100"
              y1="0"
              x2="100"
              y2="10"
              stroke="#536cdb"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Progress bar fill - sequence_bar style */}
          {isMounted && (
            <div
              className="absolute top-0 left-2 h-full"
              style={{
                width: `${progressPercentage}%`,
                transition: isPlaying ? 'width 0.1s linear' : 'none'
              }}
            >
              <svg
                viewBox="0 0 100 10"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="4"
                  x2="98"
                  y2="4"
                  stroke="#536cdb"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Time Display */}
        <span className="text-[10pt] md:text-[12pt] text-wave-blue hashtag flex-shrink-0 min-w-[80px] md:min-w-[100px] text-right">
          {formatTime(currentTime)}/{formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
