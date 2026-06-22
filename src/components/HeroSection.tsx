import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  /** 左側の見出しテキスト（例: "ABOUT"） */
  title: string;
  /** 右側に差し込む要素。未指定なら WA/VE ロゴ（トップへのリンク）を表示 */
  right?: React.ReactNode;
}

export function HeroSection({ title, right }: HeroSectionProps) {
  return (
    <section
      data-hero
      className="relative h-[20vh] md:h-[215px] min-h-[150px] md:min-h-[215px] flex items-end overflow-hidden"
    >
      <div className="absolute inset-y-0 left-0 w-screen squish-on-menu transition-transform duration-500 origin-left">
        <Image
          src="/svg/bg-gradient.svg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative z-10 w-full pb-6 md:pb-12">
        <h2 className="px-5 md:px-[45px] text-white text-[20pt] sm:text-[30pt] font-bold flex justify-between items-end">
          <div>
            {title}
          </div>
          {right && <div>{right}</div>}
        </h2>
      </div>
    </section>
  );
}
