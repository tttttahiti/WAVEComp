"use client";

interface VideoEmbedProps {
  url: string;
}

type VideoType = "youtube" | "vimeo" | null;

/**
 * 動画URLを解析して埋め込みURLを生成
 */
function getVideoEmbedInfo(url: string): { type: VideoType; embedUrl: string | null } {
  if (!url) return { type: null, embedUrl: null };

  // YouTube URLのパターン
  const youtubePatterns = [
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const videoId = match[1];
      // YouTube パラメータ
      const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white&iv_load_policy=3&playsinline=1`;
      return { type: "youtube", embedUrl };
    }
  }

  // Vimeo URLのパターン
  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const videoId = match[1];
      // Vimeo パラメータ
      const embedUrl = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;
      return { type: "vimeo", embedUrl };
    }
  }

  return { type: null, embedUrl: null };
}

export function YouTubeEmbed({ url }: VideoEmbedProps) {
  const { type, embedUrl } = getVideoEmbedInfo(url);

  if (!embedUrl) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-sm">Invalid video URL</p>
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      className="absolute inset-0 w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={type === "vimeo" ? "Vimeo video player" : "YouTube video player"}
    />
  );
}
