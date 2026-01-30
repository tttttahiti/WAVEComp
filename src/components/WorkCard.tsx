"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface WorkCardProps {
  id: string;
  slug: string;
  thumbnail: string;
  client: string;
  title: string;
  tags: string[];
  role?: string;
  onImageLoad?: (height: number) => void;
  imageHeight?: number;
  imageOnly?: boolean;
  textOnly?: boolean;
  linkHref?: string; // カスタムリンク先（指定しない場合は /works/{slug}）
}

export function WorkCard({ slug, thumbnail, client, title, tags, role, onImageLoad, imageHeight, imageOnly = false, textOnly = false, linkHref }: WorkCardProps) {
  const href = linkHref ?? `/works/${slug}`;
  // Parse role into array (split by ", " only, keep " / " intact)
  const roleItems = role ? role.split(/\s*,\s*/).filter(r => r.trim()) : [];
  const containerRef = useRef<HTMLDivElement>(null);
  const hasReportedRef = useRef(false);

  useEffect(() => {
    if (!onImageLoad || !containerRef.current || hasReportedRef.current) return;

    const container = containerRef.current;
    const img = container.querySelector("img") as HTMLImageElement;

    if (!img) return;

    const checkImageSize = () => {
      if (hasReportedRef.current) return;
      if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
        const containerWidth = container.offsetWidth;
        const imgNaturalWidth = img.naturalWidth;
        const imgNaturalHeight = img.naturalHeight;

        // コンテナの幅に合わせた時の高さを計算
        const aspectRatio = imgNaturalHeight / imgNaturalWidth;
        const calculatedHeight = containerWidth * aspectRatio;

        hasReportedRef.current = true;
        onImageLoad(calculatedHeight);
      }
    };

    // 既に読み込み済みの場合
    if (img.complete) {
      checkImageSize();
    } else {
      // 読み込み完了を待つ
      img.addEventListener("load", checkImageSize);
      return () => img.removeEventListener("load", checkImageSize);
    }
  }, [onImageLoad, thumbnail]);

  if (imageOnly) {
    return (
      <Link href={href} className="block card-hover">
        <div
          ref={containerRef}
          className="relative bg-white overflow-hidden py-[22px] flex items-center justify-center"
          style={imageHeight ? { height: `${imageHeight}px` } : { aspectRatio: "4/3" }}
        >
          <Image
            src={thumbnail}
            alt={title}
            width={800}
            height={600}
            className="object-contain"
            style={{ width: "auto", height: "600px", maxWidth: "100%", maxHeight: "100%" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
    );
  }

  if (textOnly) {
    return (
      <div className="pt-[17px] pb-[60px]">
        <Link href={href} className="block card-hover">
          <p className="text-[8pt] md:text-[10pt] text-black font-bold">{client}</p>
          <h3 className="font-bold text-[12pt] md:text-[14pt] leading-snug">{title}</h3>
        </Link>
        <div className="text-[6pt] md:text-[7pt] text-black mt-3 md:mt-[16px] space-y-[2px]">
          <div className="flex flex-wrap justify-between gap-x-10 md:gap-x-20">
            {tags.map((tag, index) => (
              <Link
                key={index}
                href={`/works?tag=${encodeURIComponent(tag)}`}
                className="hashtag hover:text-wave-blue transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
          {roleItems.length > 0 && (
            <div className="flex flex-wrap justify-between gap-x-10 md:gap-x-20">
              {roleItems.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Link href={href} className="block card-hover">
        <div
          ref={containerRef}
          className="relative bg-white mb-3 md:mb-4 overflow-hidden flex items-center justify-center"
          style={imageHeight ? { height: `${imageHeight}px` } : { aspectRatio: "4/3" }}
        >
          <Image
            src={thumbnail}
            alt={title}
            width={800}
            height={600}
            className="object-contain"
            style={{ width: "auto", height: "600px", maxWidth: "100%", maxHeight: "100%" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="">
          <p className="text-[8pt] md:text-[10pt] text-black font-bold">{client}</p>
          <h3 className="font-bold text-[12pt] md:text-[14pt] leading-snug">{title}</h3>
        </div>
      </Link>
      <div className="text-[6pt] md:text-[7pt] text-black mt-3 md:mt-[16px] space-y-[2px]">
        <div className="flex flex-wrap justify-between gap-x-10 md:gap-x-20">
          {tags.map((tag, index) => (
            <Link
              key={index}
              href={`/works?tag=${encodeURIComponent(tag)}`}
              className="hashtag hover:text-wave-blue transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
        {roleItems.length > 0 && (
          <div className="flex flex-wrap justify-between gap-x-10 md:gap-x-20">
            {roleItems.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
