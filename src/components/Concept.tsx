interface ConceptProps {
  showTitle?: boolean;
  className?: string;
}

export function Concept({ showTitle = true, className = "" }: ConceptProps) {
  return (
    <section className={`py-[120px] md:py-[154px] px-[20px] md:px-[45px]${className}`}>
      <div className="grid-6 overflow-visible md:items-start">
        {showTitle && (
          <h2 className="text-[30pt] md:text-[30pt] font-bold col-6 md:col-1 md:col-start-1 mb-0">
            CONCEPT
          </h2>
        )}

        {/* モバイル: SVG画像 */}
        <div className={`pt-[40px] md:hidden ${showTitle ? "col-6" : "col-6"}`}>
          <img
            src="/svg/concept_msg.svg"
            alt="音のある時間を豊かに、緻密に、そして大胆に。私たちは、「目的地」だけを語りません。迷い、寄り道し、波に揺られながら進むプロセスを創造の本質だと考え、心に響く音や体験をつくりだします。"
            className="w-full h-auto"
          />
        </div>

        {/* デスクトップ: 縦書きテキスト */}
        <div
          className={`hidden md:flex justify-end overflow-visible ${showTitle ? "col-6 md:col-start-5 md:col-2" : "col-6"}`}
        >
          <div
            className="writing-vertical-rl font-jp font-medium leading-[1.2] text-[18pt]"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            <p>音のある時間を豊かに、</p>
            <p>緻密に、</p>
            <p>そして大胆に。</p>
            <p className="w-8"></p>
            <p className="w-8"></p>
            <p>私たちは、</p>
            <p>「目的地」だけを語りません。</p>
            <p className="w-8"></p>
            <p className="w-8"></p>
            <p>迷い、寄り道し、</p>
            <p>波に揺られながら進むプロセスを</p>
            <p>創造の本質だと考え、</p>
            <p>心に響く音や体験を</p>
            <p>つくりだします。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
