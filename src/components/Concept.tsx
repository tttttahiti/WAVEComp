"use client";

import { useEffect, useRef, useState } from "react";

interface ConceptProps {
  showTitle?: boolean;
  className?: string;
  titleColStart?: 1 | 2;
  titleMobileMb?: string;
}

const paragraphs: string[][] = [
  ["音のある時間を豊かに、", "緻密に、", "そして大胆に。"],
  ["私たちは、", "「目的地」だけを語りません。"],
  [
    "迷い、寄り道し、",
    "波に揺られながら進むプロセスを",
    "創造の本質だと考え、",
    "心に響く音や体験を",
    "つくりだします。",
  ],
];

const FADE_BASE = "transition-opacity duration-1000 ease-out";

export function Concept({
  showTitle = true,
  className = "",
  titleColStart = 1,
  titleMobileMb = "",
}: ConceptProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-[120px] md:py-[154px] px-[20px] md:px-[45px]${className}`}
    >
      <div className="grid-6 overflow-visible md:items-start">
        {showTitle && (
          <h2
            className={`text-[30pt] md:text-[30pt] font-bold col-6 md:col-1 ${
              titleColStart === 2 ? "md:col-start-2" : "md:col-start-1"
            } ${titleMobileMb} md:mb-0`}
          >
            CONCEPT
          </h2>
        )}

        <div
          className={`flex justify-end overflow-visible mt-[40px] md:mt-0 ${
            showTitle ? "col-6 md:col-start-5 md:col-2" : "col-6"
          }`}
        >
          <div
            className="font-jp font-medium leading-[1.2] text-[11pt] md:text-[18pt]"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            {paragraphs.map((phrases, pIndex) => (
              <div
                key={pIndex}
                className={`${FADE_BASE} ${
                  pIndex > 0
                    ? "[margin-block-start:2rem] md:[margin-block-start:3rem]"
                    : ""
                }`}
                style={{
                  transitionDelay: isVisible ? `${pIndex * 500}ms` : "0ms",
                  opacity: isVisible ? 1 : 0,
                }}
              >
                {phrases.map((phrase, lIndex) => (
                  <p key={lIndex}>{phrase}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
