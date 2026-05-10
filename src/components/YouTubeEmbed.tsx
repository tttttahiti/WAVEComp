"use client";

import { useEffect, useRef } from "react";
import { useSound } from "@/components/SoundContext";

interface VideoEmbedProps {
  url: string;
}

type VideoType = "youtube" | "vimeo" | null;

interface VideoEmbedInfo {
  type: VideoType;
  embedUrl: string | null;
}

function getVideoEmbedInfo(url: string): VideoEmbedInfo {
  if (!url) return { type: null, embedUrl: null };

  const youtubePatterns = [
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const videoId = match[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white&iv_load_policy=3&playsinline=1&enablejsapi=1`;
      return { type: "youtube", embedUrl };
    }
  }

  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const videoId = match[1];
      const embedUrl = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;
      return { type: "vimeo", embedUrl };
    }
  }

  return { type: null, embedUrl: null };
}

interface YTPlayerEvent {
  data: number;
}

interface YTPlayer {
  destroy?: () => void;
}

interface YTNamespace {
  Player: new (
    element: HTMLIFrameElement,
    options: { events: { onStateChange: (event: YTPlayerEvent) => void } }
  ) => YTPlayer;
  PlayerState: { PLAYING: number };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<void> | null = null;

function loadYouTubeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise<void>((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previous) previous();
      resolve();
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  });
  return ytApiPromise;
}

export function YouTubeEmbed({ url }: VideoEmbedProps) {
  const { type, embedUrl } = getVideoEmbedInfo(url);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { isSoundOn, toggleSound } = useSound();
  const isSoundOnRef = useRef(isSoundOn);
  const toggleSoundRef = useRef(toggleSound);
  isSoundOnRef.current = isSoundOn;
  toggleSoundRef.current = toggleSound;

  useEffect(() => {
    if (type !== "youtube" || !iframeRef.current) return;
    let cancelled = false;
    let player: YTPlayer | null = null;

    loadYouTubeAPI().then(() => {
      if (cancelled || !iframeRef.current || !window.YT) return;
      player = new window.YT.Player(iframeRef.current, {
        events: {
          onStateChange: (event) => {
            if (
              event.data === window.YT!.PlayerState.PLAYING &&
              isSoundOnRef.current
            ) {
              toggleSoundRef.current();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (player && typeof player.destroy === "function") {
        try {
          player.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, [type, embedUrl]);

  if (!embedUrl) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-sm">Invalid video URL</p>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      src={embedUrl}
      className="absolute inset-0 w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={type === "vimeo" ? "Vimeo video player" : "YouTube video player"}
    />
  );
}
