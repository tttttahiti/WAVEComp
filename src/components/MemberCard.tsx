import Image from "next/image";

interface MemberCardProps {
  imageSrc: string;
  imageSrcMobile?: string; // モバイル用画像（オプション）
  imageAlt: string;
  name: string;
  title: string;
  biography: string[];
  achievements: string[];
}

export function MemberCard({
  imageSrc,
  imageSrcMobile,
  imageAlt,
  name,
  title,
  biography,
  achievements,
}: MemberCardProps) {
  return (
    <div className={`grid-6 mb-16 md:mb-24`}>
      {/* モバイル: 4列・中央・正方形、デスクトップ: col-start-2から1.5列分・3:4 */}
      <div
        className="relative aspect-square md:aspect-[3/4] bg-gray-100 col-span-6 col-start-1 md:col-span-2 md:col-start-2 w-full md:w-[75%] mb-14 md:mb-[132px] "
      >
        {/* デスクトップ用画像 */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={`object-cover ${imageSrcMobile ? "hidden md:block" : ""}`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* モバイル用画像（指定がある場合のみ） */}
        {imageSrcMobile && (
          <Image
            src={imageSrcMobile}
            alt={imageAlt}
            fill
            className="object-cover md:hidden"
            sizes="100vw"
          />
        )}
      </div>

      {/* モバイル: 全幅、デスクトップ: 右半分（col-span-2） */}
      <div className="col-span-6 md:col-span-2">
        <p
          className="text-[18pt] font-bold letter-height-[40pt] mb-10"
          style={{ lineHeight: "1.4" }}
        >
          <span>{name}</span>
          <br />
          <span>{title}</span>
        </p>
        <div className="text-[12pt] letter-height-[14pt]">
          {biography.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-[14px]">
          <p className="text-[12pt] font-medium">実績：</p>
          <ul className="text-[12pt] letter-height-[14pt]">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
