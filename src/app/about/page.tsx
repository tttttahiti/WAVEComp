import { ContactSection } from "@/components/ContactSection";
import { Concept } from "@/components/Concept";
import { MemberCard } from "@/components/MemberCard";
import { InfoSection } from "@/components/InfoSection";
import { HeroSection } from "@/components/HeroSection";
import { getMembers, transformMember } from "@/lib/wordpress";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  path: "/about",
});

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
      <HeroSection title="ABOUT" right="WA/VE" />

      {/* Concept Section */}
      <Concept titleColStart={2} className="py-[120px] md:py-[184px]" />

      {/* Our Service Section */}
      <section className="pt-0 pb-16 md:pb-24 px-5 md:px-[45px]">
        <div className="grid-6 items-start">
          <h2 className="text-[20pt] sm:text-[30pt] font-bold col-span-6 md:col-span-2 md:col-start-2 whitespace-nowrap mb-12 md:mb-0">
            OUR SERVICE
          </h2>

          <ul
            className="text-[12pt] md:text-[18pt] leading-[1.75] font-bold md:pt-0 md:pb-0 col-span-6 md:col-start-4 md:col-span-3 service-list"
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
      <section className="px-5 md:px-[45px]">
        <div className="grid-6 h-auto md:h-[50px] mb-12 md:mb-[40px]">
          <h2 className="text-[20pt] sm:text-[30pt] font-bold col-span-6 md:col-span-4 md:col-start-2 whitespace-nowrap">
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
          />
        ))}
      </section>

      {/* Info Section */}
      <section className="pt-0 pb-16 md:pb-24 px-5 md:px-[45px]">
        <InfoSection />
      </section>

      {/* Contact Section */}
      <section className="pt-0 pb-24 px-5 md:px-[45px]">
        <ContactSection />
      </section>
    </>
  );
}
