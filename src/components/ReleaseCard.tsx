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
  slug,
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
    <article className="grid-6 pb-[150px]" id={slug}>
      {/* モバイル: カバー画像を先に表示 */}
      <div className="col-span-6 md:col-span-1 h-[91px] mb-[41px]">
        <h3 className="text-[30pt] font-bold mb-3 md:mb-4 whitespace-nowrap">
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
        {listenUrl && (
          <Link
            href={listenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
            aria-label={`${title} を聴く`}
          />
        )}
      </div>

      <div className="col-span-6 md:col-span-2 md:pt-[66px]">
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
        <div>
          <Link
            href={listenUrl || ""}
            className="bg-[#536cdb] text-white px-8 py-2 text-sm font-bold transition-all duration-200 hover:bg-[#c2de6d] hover:text-black flex items-center justify-center md:inline-block md:w-1/2 text-center h-12 md:h-auto"
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
        {listenUrl && (
          <Link
            href={listenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
            aria-label={`${title} を聴く`}
          />
        )}
      </div>
    </article>
  );
}
