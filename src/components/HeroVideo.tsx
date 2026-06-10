// ヒーロー用の音無しループ映像（YouTube / Vimeo の background 埋め込み）。
// 操作 UI は出さず、pointer-events も切って背景メディアとして扱う。

interface HeroVideoProps {
  embedUrl: string;
  /**
   * cover: ビューポート全面を覆う（TOPページと同じ hero-video-* の cover 方式）
   * fit:   親要素（16:9 エリア）にそのまま収める
   */
  variant: "cover" | "fit";
}

/**
 * YouTube / Vimeo のページURLを、音無し自動ループ再生の埋め込みURLに変換する。
 * どちらでもない URL は null（呼び出し側で画像にフォールバック）。
 */
export function getHeroVideoEmbedUrl(url: string): string | null {
  if (!url) return null;

  const youtubePatterns = [
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
  ];
  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const id = match[1];
      // loop には playlist=ID の指定が必須
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&playsinline=1&modestbranding=1&iv_load_policy=3&disablekb=1`;
    }
  }

  const vimeoPatterns = [/vimeo\.com\/(\d+)/, /player\.vimeo\.com\/video\/(\d+)/];
  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}?autoplay=1&loop=1&muted=1&background=1&controls=0`;
    }
  }

  return null;
}

export function HeroVideo({ embedUrl, variant }: HeroVideoProps) {
  if (variant === "cover") {
    return (
      <div className="hero-video-container absolute inset-0 overflow-hidden">
        <iframe
          src={embedUrl}
          className="hero-video-iframe absolute top-1/2 left-1/2 border-none pointer-events-none"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Hero video"
        />
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      className="absolute inset-0 w-full h-full border-none pointer-events-none"
      allow="autoplay; fullscreen; picture-in-picture"
      title="Hero video"
    />
  );
}
