"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

interface MasonryGalleryProps {
  images: string[];
  title?: string;
  columnsDesktop?: number;
  columnsMobile?: number;
  gutter?: number;
}

export function MasonryGallery({
  images,
  title = "",
  columnsDesktop = 2,
  columnsMobile = 2,
  gutter = 20,
}: MasonryGalleryProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<Masonry | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const columns = isMobile ? columnsMobile : columnsDesktop;

  const initMasonry = useCallback(() => {
    if (!gridRef.current || images.length === 0) return;

    const grid = gridRef.current;

    // Destroy existing instance
    if (masonryRef.current) {
      masonryRef.current.destroy?.();
    }

    // Wait for images to load before initializing Masonry
    const imgLoad = imagesLoaded(grid);

    imgLoad.on("always", () => {
      if (grid) {
        masonryRef.current = new Masonry(grid, {
          itemSelector: ".gallery-item",
          columnWidth: ".gallery-sizer",
          percentPosition: true,
          gutter: gutter,
        });
        setIsLoaded(true);
      }
    });
  }, [images, gutter]);

  // Initialize Masonry when images or columns change
  useEffect(() => {
    initMasonry();

    return () => {
      if (masonryRef.current) {
        masonryRef.current.destroy?.();
      }
    };
  }, [initMasonry, columns]);

  // Re-layout on window resize
  useEffect(() => {
    const handleResize = () => {
      if (masonryRef.current) {
        masonryRef.current.layout?.();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Re-layout when an image loads
  const handleImageLoad = () => {
    if (masonryRef.current) {
      masonryRef.current.layout?.();
    }
  };

  const columnWidth = `calc(${100 / columns}% - ${(gutter * (columns - 1)) / columns}px)`;

  return (
    <>
      <div
        ref={gridRef}
        className={`relative transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        {/* Sizer element for Masonry */}
        <div className="gallery-sizer" style={{ width: columnWidth }} />

        {images.map((image, index) => (
          <div
            key={index}
            className="gallery-item cursor-pointer overflow-hidden"
            style={{ width: columnWidth, marginBottom: `${gutter}px` }}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={title ? `${title} - ${index + 1}` : `Gallery image ${index + 1}`}
              width={800}
              height={600}
              className="w-full h-auto hover:opacity-90 transition-opacity"
              onLoad={handleImageLoad}
              sizes={`(max-width: 768px) ${100 / columnsMobile}vw, ${100 / columnsDesktop}vw`}
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
            src={selectedImage}
            alt=""
            width={1920}
            height={1080}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
