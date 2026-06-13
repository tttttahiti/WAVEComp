export function InfoSection() {
  return (
    <div className="grid-6">
      <div className="col-span-6 md:col-span-1 md:col-start-2 mb-12 md:mb-0">
        <h2 className="text-[30pt] font-bold">INFO</h2>
      </div>
      <div className="col-span-6 md:col-start-4 md:col-span-2">
        <div className="text-[12pt] leading-[1.75] font-medium">
          <p>WA/VE</p>
          <p>株式会社ウェーブ</p>
          <br/>
          <p>設立日：2026年4月1日</p>
          <p>CEO：菊地晴夏</p>
          <p>Co-Founder：島田舞</p>
          <p>
            <a
              href="mailto:info@wa-ve.jp"
              className="text-wave-blue hover:text-[#c2de6d] transition-colors"
            >
              info@wa-ve.jp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
