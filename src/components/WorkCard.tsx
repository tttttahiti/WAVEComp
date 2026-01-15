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
}

export function WorkCard({ slug, thumbnail, client, title, tags, onImageLoad, imageHeight }: WorkCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onImageLoad || !containerRef.current) return;

    const container = containerRef.current;
    const img = container.querySelector("img") as HTMLImageElement;
    
    if (!img) return;

    const checkImageSize = () => {
      if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
        const containerWidth = container.offsetWidth;
        const imgNaturalWidth = img.naturalWidth;
        const imgNaturalHeight = img.naturalHeight;
        
        // コンテナの幅に合わせた時の高さを計算（object-containの場合）
        const aspectRatio = imgNaturalHeight / imgNaturalWidth;
        const calculatedHeight = containerWidth * aspectRatio;
        
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

  return (
    <Link href={`/works/${slug}`} className="block card-hover">
      <article className="border-t border-black/10 pt-6">
        <div
          ref={containerRef}
          className="relative bg-gray-100 mb-4 overflow-hidden flex items-center justify-center"
          style={imageHeight ? { height: `${imageHeight}px` } : { aspectRatio: "4/3" }}
        >
          <Image
            src={thumbnail}
            alt={title}
            width={800}
            height={600}
            className="object-contain"
            style={{ width: "auto", height: "100%" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-gray-500">{client}</p>
          <h3 className="font-medium text-sm leading-snug">{title}</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
            {tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
