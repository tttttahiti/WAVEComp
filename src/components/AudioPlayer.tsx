"use client";

import { useState, useRef, useEffect } from "react";
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio playback error:", error);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progress = progressRef.current;
    if (!audio || !progress) return;

    const rect = progress.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    audio.currentTime = percentage * duration;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="py-4">
      <audio ref={audioRef} src={src} preload="metadata" />

      {title && (
        <p className="text-sm font-medium mb-3">{title}</p>
      )}

      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-[15px] h-[18px] flex-shrink-0 flex items-center justify-center transition-opacity hover:opacity-80"
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
          <div
            className="absolute top-0 left-0 h-full transition-[width] duration-100 ease-linear"
            style={{ width: `${progressPercentage}%` }}
          >
            <svg
              viewBox="0 0 100 10"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <line
                x1="2"
                y1="5"
                x2="98"
                y2="5"
                stroke="#536cdb"
                strokeWidth="4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

        {/* Time Display */}
        <span className="text-[12pt] text-wave-blue hashtag flex-shrink-0 min-w-[100px] text-right">
          {formatTime(currentTime)}/{formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
