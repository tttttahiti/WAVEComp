"use client";

import Link from "next/link";
import Image from "next/image";

// WORKS 一覧ページ専用のカード。
// TOP / hal-ca の FEATURED で使う共用 WorkCard とは分離し、
// 一覧側のスタイル調整が他に影響しないようにする。
interface WorkListCardProps {
  slug: string;
  thumbnail: string;
  client: string;
  title: string;
  tags: string[];
  role?: string;
  imageOnly?: boolean;
  textOnly?: boolean;
  linkHref?: string;
}

export function WorkListCard({
  slug,
  thumbnail,
  client,
  title,
  tags,
  role,
  imageOnly = false,
  textOnly = false,
  linkHref,
}: WorkListCardProps) {
  const href = linkHref ?? `/works/${slug}`;
  // role を配列化（", " で分割、" / " は維持）
  const roleItems = role ? role.split(/\s*,\s*/).filter((r) => r.trim()) : [];

  if (imageOnly) {
    return (
      <Link href={href} className="block transition-opacity duration-300 ease-out hover:opacity-70">
        {/* サムネール: 16:9 フレームに画像を contain（#12） */}
        <div className="relative bg-white overflow-hidden aspect-video">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
      </Link>
    );
  }

  if (textOnly) {
    return (
      <div>
        <Link href={href} className="block hover:text-[#c2de6d] transition-colors">
          <p className="text-[8pt] md:text-[10pt] font-bold">{client}</p>
          <h3 className="font-bold text-[12pt] md:text-[14pt] leading-snug">{title}</h3>
        </Link>
        <div className="text-[6pt] md:text-[7pt] text-black mt-3 md:mt-[16px] space-y-[2px]">
          <div className="flex flex-wrap justify-between">
            {tags.map((tag, index) => (
              <Link
                key={index}
                href={`/works?tag=${encodeURIComponent(tag)}`}
                className="font-hashtag hover:text-[#c2de6d] transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
          {roleItems.length > 0 && (
            <div className="flex flex-wrap justify-between">
              {roleItems.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
