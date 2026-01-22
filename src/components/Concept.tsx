interface ConceptProps {
  showTitle?: boolean;
  className?: string;
}

export function Concept({ showTitle = true, className = "" }: ConceptProps) {
  return (
    <section className={`py-20 md:py-32 px-6 md:px-16 ${className}`}>
      <div className="max-w-7xl mx-auto grid-6">
        {showTitle && (
          <h2 className="text-2xl md:text-3xl font-bold col-1">CONCEPT</h2>
        )}

        {/* 縦書きテキスト */}
        <div className={`flex justify-end overflow-x-auto ${showTitle ? "col-start-2 col-5" : "col-6"}`}>
          <div
            className="writing-vertical-rl text-base md:text-lg leading-[2.5] h-[400px] md:h-[450px]"
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
            <p>迷い、</p>
            <p>寄り道し、</p>
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