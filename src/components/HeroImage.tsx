import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
}

export function HeroImage({ src, alt }: HeroImageProps) {
  return (
    <>
      {/* Mobile: blurなし、aspect-video の前景写真のみ */}
      <section
        data-hero
        className="md:hidden relative w-full aspect-video min-h-[180px]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover"
        />
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
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}
