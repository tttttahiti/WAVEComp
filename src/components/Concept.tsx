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

          {/* フォントサイズ: デザイン(InDesign)の mobile フレームは 800px に対し 24pt。
              実機 mobile 390px へは比率換算で 24pt × (390/800) ≈ 11.7pt ≈ 15.6px。
              → mobile は px 指定(15px)、画面が広がる sm/lg で pt にスイッチして拡大。
              縦書きでは line-height が「列の横幅」を決めるため、mobile は列間を詰めて
              横はみ出しを防ぎ、md 以上は #6 指示どおり広め(1.6)を維持する。 */}
          <div
            className={`flex-1 max-w-full font-jp font-medium leading-[1.35] md:leading-[1.6] text-[15px] sm:text-[15pt] lg:text-[20pt]`}
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                letterSpacing: "0.08em",
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
