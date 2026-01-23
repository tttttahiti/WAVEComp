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
  onImageLoad?: (height: number) => void;
  imageHeight?: number;
  imageOnly?: boolean;
  textOnly?: boolean;
}

export function WorkCard({ slug, thumbnail, client, title, tags, onImageLoad, imageHeight, imageOnly = false, textOnly = false }: WorkCardProps) {
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
      <Link href={`/works/${slug}`} className="block card-hover">
        <div
          ref={containerRef}
          className="relative bg-white overflow-hidden flex items-center justify-center"
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
      <Link href={`/works/${slug}`} className="block card-hover">
        <div className="">
          <p className="text-[10pt] text-black font-bold">{client}</p>
          <h3 className="font-bold text-[14pt] leading-snug">{title}</h3>
          <div className="flex flex-wrap justify-between gap-x-20 gap-y-[2px] text-[7pt] text-black mt-[16px]">
            {tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="">
      <Link href={`/works/${slug}`} className="block card-hover">
      <div
        ref={containerRef}
        className="relative bg-white mb-4 overflow-hidden flex items-center justify-center"
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
        <p className="text-[10pt] text-black font-bold">{client}</p>
        <h3 className="font-bold text-[14pt] leading-snug">{title}</h3>
        <div className="flex flex-wrap justify-between gap-x-20 gap-y-[2px] text-[7pt] text-black mt-[16px]">
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      </div>
      </Link>
    </div>
  );
}
