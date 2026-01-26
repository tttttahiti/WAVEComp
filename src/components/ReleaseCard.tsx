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
    <article className="grid-6 py-12">
      <div className="col-1">
        <p className="text-[12pt] font-bold mb-2">
          {year || "no data"}. {"Release"}
        </p>
        <h3 className="text-[30pt] md:text-4xl font-bold mb-4">{title || "no data"}</h3>

      </div>
      <div className="col-2">
        <p className="text-sm leading-relaxed mb-6">
          {description || "no data"}
        </p>

        <div className="border-t border-black pt-4 mb-6">
          <p className="text-sm">Release Date: {releaseDate || "no data"}</p>
        </div>

        <div className="mb-6 border-t border-black pt-4">
          <p className="text-sm font-medium mb-2">曲：</p>
          {tracks && tracks.length > 0 ? (
            <ul className="space-y-1">
              {tracks.map((track, index) => (
                <li key={index} className="text-sm">
                  {track || "no data"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">no data</p>
          )}
        </div>

        {listenUrl && (
          <Link
            href={listenUrl}
            className="btn-primary inline-block w-[50%]"
            target="_blank"
            rel="noopener noreferrer"
          >
            LISTEN
          </Link>
        )}
      </div>

      <div className="col-3 aspect-square w-[66%] mx-auto relative bg-gray-100">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </article>
  );
}
