import Image from "next/image";

interface MemberCardProps {
  imageSrc: string;
  imageSrcMobile?: string; // モバイル用画像（オプション）
  imageAlt: string;
  name: string;
  title: string;
  biography: string[];
  achievements: string[];
  marginTop?: string;
}

export function MemberCard({
  imageSrc,
  imageSrcMobile,
  imageAlt,
  name,
  title,
  biography,
  achievements,
  marginTop = "mt-2 md:mt-[15px]",
}: MemberCardProps) {
  return (
    <div className={`grid-6 ${marginTop}`}>
      {/* モバイル: 全幅、デスクトップ: col-2から開始して1.5列分 */}
      <div
        className="relative aspect-[3/4] bg-gray-100 col-span-4 md:col-span-1"
        style={{
          gridColumnStart: undefined,
        }}
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

      {/* モバイル: 全幅、デスクトップ: col-4からcol-6 */}
      <div className="col-6 md:col-span-2 mt-4 md:mt-0">
        <p
          className="text-[14pt] md:text-[18pt] font-bold"
          style={{ lineHeight: "1.4" }}
        >
          <span>{name}</span>
          <br />
          <span>{title}</span>
        </p>
        <div className="text-[10pt] md:text-[12pt] leading-[1.5] space-y-3 md:space-y-4 mt-3 md:mt-4">
          {biography.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-6 md:mt-8">
          <p className="text-[10pt] md:text-[12pt] font-medium mb-2">実績：</p>
          <ul className="text-[10pt] md:text-[12pt] space-y-1">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
