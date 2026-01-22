import Image from "next/image";
import Link from "next/link";

interface ReleaseCardProps {
  id: string;
  slug: string;
  coverImage: string;
  title: string;
  year: string;
  type: "Album" | "Single" | "EP";
  description: string;
  releaseDate: string;
  tracks: string[];
  listenUrl?: string;
}

export function ReleaseCard({
  slug,
  coverImage,
  title,
  year,
  type,
  description,
  releaseDate,
  tracks,
  listenUrl,
}: ReleaseCardProps) {
  return (
    <article className="grid-6 py-12 border-t border-black/10">
      <div className="col-3">
        <p className="text-sm text-gray-500 mb-2">
          {year}. {type}
        </p>
        <h3 className="text-3xl md:text-4xl font-bold mb-4">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-700 mb-6">{description}</p>

        <div className="border-t border-black/10 pt-4 mb-6">
          <p className="text-sm text-gray-500">Release Date: {releaseDate}</p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium mb-2">曲：</p>
          <ul className="space-y-1">
            {tracks.map((track, index) => (
              <li key={index} className="text-sm text-gray-700">
                {track}
              </li>
            ))}
          </ul>
        </div>

        {listenUrl && (
          <Link
            href={listenUrl}
            className="btn-primary inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            LISTEN
          </Link>
        )}
      </div>

      <div className="col-3 aspect-square relative bg-gray-100">
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
