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
  tags = [],
}: ReleaseCardProps) {
  return (
    <article className="grid-6 py-8 md:py-12">
      {/* モバイル: カバー画像を先に表示 */}
      <div className="col-6 md:hidden aspect-square w-full relative bg-gray-100 mb-6">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="col-6 md:col-1">
        <p className="text-[10pt] md:text-[12pt] font-bold mb-1 md:mb-2">
          {year || "no data"}. {"Release"}
        </p>
        <h3 className="text-[20pt] md:text-[30pt] font-bold mb-3 md:mb-4">{title || "no data"}</h3>
      </div>

      <div className="col-6 md:col-2">
        <p className="text-[10pt] md:text-sm leading-relaxed mb-4 md:mb-6">
          {description || "no data"}
        </p>

        <div className="border-t border-black pt-3 md:pt-4 mb-4 md:mb-6">
          <p className="text-[10pt] md:text-sm">Release Date: {releaseDate || "no data"}</p>
        </div>

        <div className="mb-4 md:mb-6 border-t border-black pt-3 md:pt-4">
          <p className="text-[10pt] md:text-sm font-medium mb-2">曲：</p>
          {tracks && tracks.length > 0 ? (
            <ul className="space-y-1">
              {tracks.map((track, index) => (
                <li key={index} className="text-[10pt] md:text-sm">
                  {track || "no data"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[10pt] md:text-sm">no data</p>
          )}
        </div>

        {listenUrl && (
          <Link
            href={listenUrl}
            className="btn-primary inline-block w-full md:w-[50%]"
            target="_blank"
            rel="noopener noreferrer"
          >
            LISTEN
          </Link>
        )}
      </div>

      {/* デスクトップ: カバー画像を右側に表示 */}
      <div className="hidden md:block col-3 aspect-square w-[66%] mx-auto relative bg-gray-100">
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
