"use client";

import { useEffect, useRef, useState } from "react";

interface ConceptProps {
  className?: string;
  titleColStart?: 1 | 2;
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

const FADE_BASE = "transition-opacity duration-[4500ms] ease-out";

export function Concept({
  className = "",
  titleColStart = 1,
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
      { threshold: 0.7 },
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
        <div className={`col-span-6 flex flex-wrap justify-between gap-y-10 ${titleColStart === 2 ? 'md:col-start-2 md:col-span-4' : 'col-span-6 md:col-span-5'}`}>
          <h2
            className="shrink-0 text-[30pt] font-bold w-full lg:w-auto"
          >
            CONCEPT
          </h2>

          <div
            className={`flex-1 flex flex-col justify-center sm:block flex-nowrap font-jp font-medium leading-[1.75] tracking-[0.2em] text-[11pt] sm:text-[14pt] lg:text-[18pt]`}
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
                  transitionDelay: isVisible ? `${pIndex * 1500}ms` : "0ms",
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
