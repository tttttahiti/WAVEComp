interface ConceptProps {
  showTitle?: boolean;
  className?: string;
}

export function Concept({ showTitle = true, className = "" }: ConceptProps) {
  return (
    <section className={`py-12 md:py-32 px-6 md:px-[45px] ${className}`}>
      <div className="grid-6 overflow-visible">
        {showTitle && (
          <h2 className="text-[20pt] md:text-[30pt] font-bold col-6 md:col-1 mb-6 md:mb-0">CONCEPT</h2>
        )}

        {/* 縦書きテキスト */}
        <div className={`flex justify-start md:justify-end overflow-visible ${showTitle ? "col-6 md:col-start-5 md:col-2" : "col-6"}`}>
          <div
            className="writing-vertical-rl font-jp font-medium leading-[2.5] text-[14pt] md:text-[18pt]"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            <p>音のある時間を豊かに、</p>
            <p>緻密に、</p>
            <p>そして大胆に。</p>
            <p className="w-6 md:w-8"></p>
            <p className="w-6 md:w-8"></p>
            <p>私たちは、</p>
            <p>「目的地」だけを語りません。</p>
            <p className="w-6 md:w-8"></p>
            <p className="w-6 md:w-8"></p>
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