import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { Concept } from "@/components/Concept";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-screen squish-on-menu transition-transform duration-500 origin-left">
          <Image
            src="/svg/bg-gradient.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 w-full px-6 md:px-16 pb-12">
          <div className="max-w-7xl mx-auto grid-6">
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight col-3">
              ABOUT
            </h1>
            <div className="col-3 flex justify-end items-end">
              <Image
                src="/svg/logo-wave.svg"
                alt="WA/VE"
                width={140}
                height={40}
                className="w-[100px] md:w-[140px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <Concept />

      {/* Our Service Section */}
      <section className="py-20 md:py-32 px-6 md:px-16 border-t border-black/10">
        <div className="max-w-7xl mx-auto grid-6">
          <h2 className="text-2xl md:text-3xl font-bold col-1">OUR SERVICE</h2>
          <ul className="space-y-3 text-sm md:text-base col-start-2 col-5">
            <li>HAL ca アーティストマネージメント</li>
            <li>サウンドプロデュース</li>
            <li>コンテンツ制作</li>
            <li>音楽制作</li>
            <li>企画 / 体験デザイン</li>
            <li>イベント企画 / プロデュース</li>
          </ul>
        </div>
      </section>

      {/* Member Section */}
      <section className="py-20 md:py-32 px-6 md:px-16 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-16">MEMBER</h2>

          <div className="space-y-24">
            {/* Member 1 - Mai Shimada */}
            <div className="grid-6">
              <div className="aspect-[3/4] relative bg-gray-100 col-2">
                <Image
                  src="/images/members/shimada.jpg"
                  alt="島田 舞"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 280px"
                />
              </div>
              <div className="col-4">
                <p className="text-lg md:text-xl font-bold mb-1">島田 舞 / Mai Shimada</p>
                <p className="text-sm text-gray-500 mb-6">Producer / Manager</p>
                <div className="text-sm leading-[2] space-y-4">
                  <p>
                    音楽とカルチャーを軸にしたコンテンツ企画・制作を得意とするプロデューサー。
                  </p>
                  <p>
                    トレンド感のある国内外のオルタナティブミュージックに精通し、音楽イベントやブランドの音楽演出などを手がける。SNSトレンドを日々キャッチし、フットワークの軽さとレスポンスの速さには定評がある。
                  </p>
                  <p>
                    株式会社スペースシャワーネットワークの音楽メディア「fnmnl」で編集・ライターを経験後、音楽プロダクションLadaでプロデューサーとして活動。
                  </p>
                  <p>
                    2026年3月、作曲家／プロデューサーのHAL caと共に「WA/VE」を設立し、現在は企画制作・プロデュース業に加え、HAL caのアーティストマネジメントも務めている。
                  </p>
                  <p>
                    趣味は音楽イベントへの参加、散歩、レコード収集、そしてぬいぐるみ集め。
                  </p>
                </div>
                <div className="mt-8">
                  <p className="text-sm font-medium mb-2">実績：</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>GINZA SIX XMAS 2024 / 2025</li>
                    <li>YohaS 2024 / 2025</li>
                    <li>Budwiser「BudX Uncovered Curated By VERDY」NEWoman</li>
                    <li>Takanawa クリスマスソング</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Member 2 - Haruka Kikuchi */}
            <div className="grid-6">
              <div className="aspect-[3/4] relative bg-gray-100 col-2">
                <Image
                  src="/images/members/kikuchi.jpg"
                  alt="菊地 晴夏"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 280px"
                />
              </div>
              <div className="col-4">
                <p className="text-lg md:text-xl font-bold mb-1">菊地 晴夏 / Haruka Kikuchi</p>
                <p className="text-sm text-gray-500 mb-6">Planner / Producer / Composer</p>
                <div className="text-sm leading-[2] space-y-4">
                  <p>
                    音に関する企画・空間における体験デザインから制作まで一本筋の通ったプロデュースを得意とし、これまでに多くの広告やメディアアート作品に参加。
                  </p>
                  <p>
                    国立音楽大学卒業後に渡仏し、映画音楽作曲と電子音響を学び、帰国後は、映像音楽、空間の音響演出を多く手がける。
                  </p>
                  <p>
                    音の持つ力が、映像に、空間に、そして身体に還ってゆき、言葉では表現できない記憶となることを目指して作品づくりをする。
                  </p>
                </div>
                <div className="mt-8">
                  <p className="text-sm font-medium mb-2">実績：</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>BMW THE SEVEN ART MUSEUM at 国立新美術館</li>
                    <li>大阪関西万博 Panasonic館「ノモの国」</li>
                    <li>Suntory 武蔵野ビール工場</li>
                    <li>Where ideas meet ドバイ万博 日本館</li>
                    <li>NEWoman Takanawa クリスマスソング</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 md:py-32 px-6 md:px-16 border-t border-black/10">
        <div className="max-w-7xl mx-auto grid-6">
          <h2 className="text-2xl md:text-3xl font-bold col-1">INFO</h2>
          <div className="text-sm leading-[2] col-start-2 col-5">
            <p className="font-medium">WA/VE</p>
            <p>株式会社ウェーブ</p>
            <p className="mt-4">設立日：2026年4月1日</p>
            <p>代表取締役（共同代表）：</p>
            <p>菊地晴夏 / 島田舞</p>
            <p className="mt-4">
              <a href="mailto:info@wa-ve.jp" className="text-wave-blue hover:underline">
                info@wa-ve.jp
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 px-6 md:px-16 border-t border-black/10">
        <div className="max-w-7xl mx-auto grid-6">
          <h2 className="text-2xl md:text-3xl font-bold col-1">CONTACT</h2>
          <div className="col-start-2 col-4">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
