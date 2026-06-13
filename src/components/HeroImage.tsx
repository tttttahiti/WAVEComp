import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  /** WP側で選択する表示モード。
   *  blur: ブラーあり16:9（見切れない）/
   *  full: 横幅いっぱい。画像本来の高さを保持しつつ max-height を上限にトリミング */
  mode?: "blur" | "full";
}

export function HeroImage({ src, alt, mode = "blur" }: HeroImageProps) {
  if (mode === "full") {
    /* full: 横幅いっぱいに表示。画像本来の高さを出来る限り保持し、
       max-height を上限として、超過分は object-cover でトリミングする。
       ※ max-height は実機を見ながら調整する。 */
    return (
      <section data-hero className="relative w-full">
        {/* full に来る画像は運用上ほぼ 16:9（端に文字がある等の例外は blur に振る）。
            16:9 を width/height で渡すとロード前から領域が予約され CLS をほぼ防げる。
            実寸が 16:9 でない場合のはみ出しは object-cover でトリミング。
            生 <img> だと本番の http 画像が Mixed Content でブロックされるため Next/Image を使う。 */}
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          sizes="100vw"
          priority
          className="block w-full h-auto max-h-[60vh] object-cover"
        />
      </section>
    );
  }

  return (
    <>
      {/* Mobile: blurなし、aspect-video の前景画像のみ */}
      <section
        data-hero
        className="md:hidden relative w-full aspect-video min-h-[180px]"
      >
        <Image src={src} alt={alt} fill priority className="object-cover" />
      </section>

      {/* Desktop: blurレターボックス（背景blur + 前景16:9） */}
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
          <Image src={src} alt={alt} fill priority className="object-contain" />
        </div>
      </section>
    </>
  );
}
