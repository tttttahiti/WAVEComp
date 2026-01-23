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
  marginTop = "mt-[15px]",
}: MemberCardProps) {
  return (
    <div className={`grid-6 ${marginTop}`}>
      <div
        className="relative aspect-[3/4] bg-gray-100"
        style={{
          gridColumnStart: "2",
          width: "150%", // col-1.5相当（1列分の150% = 1.5列分）
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

      <div
        style={{
          gridColumnStart: "4",
          gridColumnEnd: "6",
        }}
      >
        <p
          className="text-[18pt] font-bold whitespace-nowrap"
          style={{ lineHeight: "25pt" }}
        >
          <span>{name}</span>
          <br />
          <span>{title}</span>
        </p>
        <div className="text-[12pt] leading-[1.5] space-y-4">
          {biography.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8">
          <p className="text-[12pt] font-medium mb-2">実績：</p>
          <ul className="text-[12pt] space-y-1">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
