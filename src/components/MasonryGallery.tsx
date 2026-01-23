"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

interface GalleryImage {
  id: number;
  url: string;
  width: number;
  height: number;
  thumbnail: string;
}

interface MasonryGalleryProps {
  images: GalleryImage[];
  columns?: number;
}

export function MasonryGallery({ images, columns = 3 }: MasonryGalleryProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<Masonry | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!gridRef.current || images.length === 0) return;

    // Wait for images to load before initializing Masonry
    const imgLoad = imagesLoaded(gridRef.current);

    imgLoad.on("always", () => {
      if (gridRef.current) {
        masonryRef.current = new Masonry(gridRef.current, {
          itemSelector: ".gallery-item",
          columnWidth: ".gallery-sizer",
          percentPosition: true,
          gutter: 16,
        });
      }
    });

    return () => {
      if (masonryRef.current) {
        masonryRef.current.destroy?.();
      }
    };
  }, [images]);

  // Re-layout when images change
  useEffect(() => {
    if (masonryRef.current && gridRef.current) {
      const imgLoad = imagesLoaded(gridRef.current);
      imgLoad.on("always", () => {
        masonryRef.current?.layout?.();
      });
    }
  }, [images]);

  const columnWidth = `calc(${100 / columns}% - ${(16 * (columns - 1)) / columns}px)`;

  return (
    <>
      <div ref={gridRef} className="relative">
        {/* Sizer element for Masonry */}
        <div className="gallery-sizer" style={{ width: columnWidth }} />

        {images.map((image) => (
          <div
            key={image.id}
            className="gallery-item mb-4 cursor-pointer overflow-hidden"
            style={{ width: columnWidth }}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.thumbnail}
              alt=""
              width={image.width}
              height={image.height}
              className="w-full h-auto hover:opacity-90 transition-opacity"
              sizes={`(max-width: 768px) 50vw, ${100 / columns}vw`}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:opacity-70 transition-opacity"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            &times;
          </button>
          <Image
            src={selectedImage.url}
            alt=""
            width={selectedImage.width}
            height={selectedImage.height}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
