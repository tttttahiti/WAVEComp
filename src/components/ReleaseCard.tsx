import Image from "next/image";
import Link from "next/link";

interface ReleaseCardProps {
  id: string;
  slug: string;
  coverImage: string;
  title: string;
  year: string;
  description: string;
  releaseDate: string;
  tracks: string[];
  listenUrl?: string;
  appleMusicUrl?: string;
  spotifyUrl?: string;
  releaseType?: string;
  tags?: string[];
}

export function ReleaseCard({
  coverImage,
  title,
  year,
  description,
  releaseDate,
  tracks,
  listenUrl,
  releaseType,
  tags = [],
}: ReleaseCardProps) {
  return (
    <article className="grid-6 pb-[150px]">
      {/* モバイル: カバー画像を先に表示 */}
      <div className="col-span-6 md:col-span-1 h-[91px] mb-[41px]">
        <h3 className="text-[30pt] font-bold mb-3 md:mb-4">
          {title || "no data"}
        </h3>
        <p className="text-[12pt] font-bold mb-[0px]">
        {releaseType || "Release"}
        </p>
      </div>

      <div className="col-span-4 col-start-2 md:hidden aspect-square w-full min-w-0 relative bg-gray-100 mb-[80px]">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="col-6 md:col-span-2 md:pt-[66px]">
        {description ? (
          <div
            className="text-[12pt] leading-relaxed mb-4 md:mb-6 [&>p]:mb-4 [&>p:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <p className="text-[12pt] leading-relaxed mb-4 md:mb-6">no data</p>
        )}

        <div className="border-t border-black pt-3 md:pt-4 mb-4 md:mb-6">
          <p className="text-[12pt]">
            Release Date: {releaseDate || "no data"}
          </p>
        </div>

        <div className="mb-4 md:mb-6 border-t border-black pt-3 md:pt-4">
          <p className="text-[12pt] font-medium">曲：</p>
          {tracks && tracks.length > 0 ? (
            <ul className="space-y-1">
              {tracks.map((track, index) => (
                <li key={index} className="text-[12pt]">
                  {track || "no data"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[12pt]">no data</p>
          )}
        </div>
        <div className="font-bold text-center text-[12pt]">
          <Link
            href={listenUrl || ""}
            className="btn-primary inline-block w-full font-bold text-[12pt]"
            target="_blank"
            rel="noopener noreferrer"
          >
            LISTEN
          </Link>
        </div>
      </div>

      {/* デスクトップ: カバー画像を右側に表示 */}
      <div className="hidden md:block col-span-3 aspect-square w-[66%] mx-auto relative bg-gray-100">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
          sizes="50vw"
        />
      </div>
    </article>
  );
}
