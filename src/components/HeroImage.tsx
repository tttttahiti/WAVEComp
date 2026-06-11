import Image from "next/image";
import { HeroVideo, getHeroVideoEmbedUrl } from "./HeroVideo";

interface HeroImageProps {
  src: string;
  alt: string;
  /** WP側で選択する表示モード。blur: ブラーあり16:9（見切れない）/ full: フル画面（見切れる） */
  mode?: "blur" | "full";
  /** YouTube / Vimeo のURL。指定するとアイキャッチの代わりに映像（音無しループ）を表示 */
  videoSrc?: string | null;
}

export function HeroImage({ src, alt, mode = "blur", videoSrc = null }: HeroImageProps) {
  // YouTube / Vimeo 以外のURLは埋め込めないので画像にフォールバック
  const embedUrl = videoSrc ? getHeroVideoEmbedUrl(videoSrc) : null;

  if (mode === "full") {
    /* full: md以上のみビューポート全面（100vh × 100vw）で cover（見切れる）。
       モバイルは左右が見切れるため aspect-video 表示にフォールバック */
    return (
      <>
        {/* Mobile: aspect-video の前景メディアのみ（見切れない） */}
        <section
          data-hero
          className="md:hidden relative w-full aspect-video min-h-[180px]"
        >
          {embedUrl ? (
            <HeroVideo embedUrl={embedUrl} variant="fit" />
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              priority
              className="object-cover"
            />
          )}
        </section>

        {/* Desktop: フル画面 cover */}
        <section
          data-hero
          className="hidden md:block relative h-screen w-full overflow-hidden"
        >
          {embedUrl ? (
            <HeroVideo embedUrl={embedUrl} variant="cover" />
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              priority
              className="object-cover"
            />
          )}
        </section>
      </>
    );
  }

  return (
    <>
      {/* Mobile: blurなし、aspect-video の前景メディアのみ */}
      <section
        data-hero
        className="md:hidden relative w-full aspect-video min-h-[180px]"
      >
        {embedUrl ? (
          <HeroVideo embedUrl={embedUrl} variant="fit" />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className="object-cover"
          />
        )}
      </section>

      {/* Desktop: blurレターボックス（背景blur + 前景16:9）。映像時も背景はアイキャッチのblur */}
      <section
        data-hero
        className="hidden md:block relative h-[60vh] min-h-[233px] w-full overflow-hidden bg-black"
      >
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={src}
            alt=""
            fill
            className="object-cover scale-110 blur-2xl"
          />
        </div>
        <div className="relative h-full max-w-full mx-auto aspect-video">
          {embedUrl ? (
            <HeroVideo embedUrl={embedUrl} variant="fit" />
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              priority
              className="object-contain"
            />
          )}
        </div>
      </section>
    </>
  );
}
