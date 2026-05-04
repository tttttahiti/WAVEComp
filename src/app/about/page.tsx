import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Concept } from "@/components/Concept";
import { MemberCard } from "@/components/MemberCard";
import { getMembers, transformMember } from "@/lib/wordpress";

// メンバーデータの型
interface MemberData {
  imageSrc: string;
  imageSrcMobile?: string;
  imageAlt: string;
  name: string;
  title: string;
  biography: string[];
  achievements: string[];
}

// フォールバック用のメンバーデータ
const fallbackMembers: MemberData[] = [
  {
    imageSrc: "/images/members/shimada.jpg",
    imageSrcMobile: undefined,
    imageAlt: "島田 舞",
    name: "島田 舞 / Mai Shimada",
    title: "Producer / Manager",
    biography: [
      "音楽とカルチャーを軸にしたコンテンツ企画・制作を得意とするプロデューサー。",
      "トレンド感のある国内外のオルタナティブミュージックに精通し、音楽イベントやブランドの音楽演出などを手がける。SNSトレンドを日々キャッチし、フットワークの軽さとレスポンスの速さには定評がある。",
      "株式会社スペースシャワーネットワークの音楽メディア「fnmnl」で編集・ライターを経験後、音楽プロダクションLadaでプロデューサーとして活動。",
      "2026年3月、作曲家／プロデューサーのHAL caと共に「WA/VE」を設立し、現在は企画制作・プロデュース業に加え、HAL caのアーティストマネジメントも務めている。",
      "趣味は音楽イベントへの参加、散歩、レコード収集、そしてぬいぐるみ集め。",
    ],
    achievements: [
      "GINZA SIX XMAS 2024 / 2025",
      "YohaS 2024 / 2025",
      "Budwiser「BudX Uncovered Curated By VERDY」NEWoman",
      "Takanawa クリスマスソング",
    ],
  },
  {
    imageSrc: "/images/members/kikuchi.jpg",
    imageSrcMobile: undefined,
    imageAlt: "菊地 晴夏",
    name: "菊地 晴夏 / Haruka Kikuchi",
    title: "Planner / Producer / Composer",
    biography: [
      "音に関する企画・空間における体験デザインから制作まで一本筋の通ったプロデュースを得意とし、これまでに多くの広告やメディアアート作品に参加。",
      "国立音楽大学卒業後に渡仏し、映画音楽作曲と電子音響を学び、帰国後は、映像音楽、空間の音響演出を多く手がける。",
      "音の持つ力が、映像に、空間に、そして身体に還ってゆき、言葉では表現できない記憶となることを目指して作品づくりをする。",
    ],
    achievements: [
      "BMW THE SEVEN ART MUSEUM at 国立新美術館",
      "大阪関西万博 Panasonic館「ノモの国」",
      "Suntory 武蔵野ビール工場",
      "Where ideas meet ドバイ万博 日本館",
      "NEWoman Takanawa クリスマスソング",
    ],
  },
];

// WordPressからメンバーを取得
async function getMembersData() {
  try {
    const wpMembers = await getMembers();
    if (wpMembers && wpMembers.length > 0) {
      // 表示順でソート
      return wpMembers
        .map(transformMember)
        .sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
    }
  } catch (error) {
    console.error("Failed to fetch members from WordPress:", error);
  }
  // WordPressからデータが取得できない場合はフォールバックを使用
  return fallbackMembers;
}

export default async function AboutPage() {
  const members = await getMembersData();
  return (
    <>
      {/* Hero Section */}
      <section data-hero className="relative h-[270px] md:h-[215px] min-h-[150px] md:min-h-[215px] flex items-end overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-screen squish-on-menu transition-transform duration-500 origin-left">
          <Image
            src="/svg/bg-gradient.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 w-full pb-6 md:pb-12">
          <div className="grid-6 px-[20px] md:px-[45px]">
            <h2 className="text-white text-[30pt] md:text-[30pt] font-bold col-3">ABOUT</h2>
            <div className="col-3 flex justify-end items-end mt-0">
              <Link href="/">
                <Image
                  src="/svg/logo-wave.svg"
                  alt="WA/VE"
                  width={140}
                  height={40}
                  className="w-[140px] h-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section className="pt-[120px] pb-[109px] px-[20px] md:px-[45px]">
        <div className="grid-6 overflow-visible">
          <h2 className="text-[30pt] font-bold col-6 md:col-1 md:col-start-2 mb-[41px] md:mb-0">CONCEPT</h2>

          {/* モバイル: SVG画像 */}
          <div className="col-6 md:hidden">
            <img
              src="/svg/concept_msg.svg"
              alt="音のある時間を豊かに、緻密に、そして大胆に。私たちは、「目的地」だけを語りません。迷い、寄り道し、波に揺られながら進むプロセスを創造の本質だと考え、心に響く音や体験をつくりだします。"
              className="w-full h-auto"
            />
          </div>

          {/* デスクトップ: 縦書きテキスト */}
          <div className="hidden md:flex justify-end overflow-visible col-6 md:col-start-5 md:col-2">
            <div
              className="writing-vertical-rl font-jp font-medium leading-[2.5] text-[18pt]"
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

      {/* Our Service Section */}
      <section className="pt-[30px] pb-[60px] px-[20px] md:px-[45px]">
        <div className="grid-6 items-start">
          <h2 className="text-[30pt] font-bold col-6 md:col-2 md:col-start-2 whitespace-nowrap mb-4 md:mb-0">
            OUR SERVICE
          </h2>

          <ul
            className="text-[12pt] md:text-[18pt] font-medium pt-[70px] pb-[80px] md:pt-0 md:pb-0 col-span-4 col-start-2 md:col-start-4 md:col-3 service-list"
            style={{ lineHeight: "1.75" }}
          >
            <li className="whitespace-nowrap">
              HAL ca アーティストマネージメント
            </li>
            <li className="whitespace-nowrap">サウンドプロデュース</li>
            <li className="whitespace-nowrap">コンテンツ制作</li>
            <li className="whitespace-nowrap">音楽制作</li>
            <li className="whitespace-nowrap">企画 / 体験デザイン</li>
            <li className="whitespace-nowrap">イベント企画 / プロデュース</li>
          </ul>
        </div>
      </section>

      {/* Member Section */}
      <section className="px-[20px] md:px-[45px]">
        <div className="grid-6 h-[96px] md:h-[50px] mb-[0px] md:mb-[40px]">
          <h2 className="text-[30pt] font-bold col-6 md:col-4 md:col-start-2 whitespace-nowrap">
            MEMBER
          </h2>
        </div>

        {members.map((member, index) => (
          <MemberCard
            key={member.name}
            imageSrc={member.imageSrc}
            imageSrcMobile={member.imageSrcMobile}
            imageAlt={member.imageAlt}
            name={member.name}
            title={member.title}
            biography={member.biography}
            achievements={member.achievements}
            marginTop={index === 0 ? "mt-0 md:mt-[15px]" : "mt-12 md:mt-[90px]"}
          />
        ))}
      </section>

      {/* Info Section */}
      <section className="pt-0 md:pt-[30px] pb-[20px] px-[20px] md:px-[45px]">
        <div className="grid-6">
          <div className="col-6 md:col-1 md:col-start-2 mb-4 md:mb-0">
            <h2 className="text-[30pt] md:text-[30pt] font-bold">INFO</h2>
          </div>
          <div className="col-start-2 col-span-4 md:col-start-4 md:col-span-2">
            <div className="text-[12pt] font-medium">
              <p>WA/VE</p>
              <p>株式会社ウェーブ</p>
              <br/>
              <p>設立日：2026年4月1日</p>
              <p>代表取締役（共同代表）：</p>
              <p>菊地晴夏 / 島田舞</p>
              <br/>

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
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-32 px-[20px] md:px-[45px] md:px-[20px] md:px-[45px] pb-[98px]">
        <div className="grid-6">
          <div className="col-6 md:col-1 md:col-start-2 mb-4 md:mb-0">
            <h2 className="text-[30pt] font-bold">CONTACT</h2>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
