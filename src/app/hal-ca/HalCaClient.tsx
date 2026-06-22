"use client";

import Image from "next/image";
import { FeaturedWorks, type FeaturedItem } from "@/components/FeaturedWorks";

interface HalCaClientProps {
  featuredItems: FeaturedItem[];
}

export function HalCaClient({ featuredItems }: HalCaClientProps) {
  return (
    <>
      {/* Hero Section */}
      <section data-hero className="relative aspect-video md:aspect-auto md:h-[40vh] md:max-h-[512px] bg-gray-100 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-full transition-[width] duration-500 ease-out">
          {/* 背景: 横方向の余白を埋める blur レイヤー（コンテナ全体を cover） */}
          <Image
            src="/images/hal-ca-hero2.jpg"
            alt=""
            fill
            aria-hidden
            className="object-cover blur-2xl scale-110"
          />
          {/* 前景: 高さ100%・幅auto で常に「上下ぴったり」。横は中央寄せし、
              余りは背景 blur が埋め、はみ出しは overflow-hidden で隠す。
              これで画面の幅・高さに関わらず画像の上下がコンテンツエリアに一致する。 */}
          <div className="absolute inset-0 flex justify-center">
            <Image
              src="/images/hal-ca-hero2.jpg"
              alt="HAL ca"
              width={13000}
              height={4160}
              sizes="100vw"
              className="h-full w-auto max-w-none"
              priority
            />
          </div>
        </div>
      </section>

      {/* Artist Info Section */}
      <section className="py-[94px] md:py-32 px-5 md:px-[45px]">
        <div className="grid-6">
          <div className="col-span-6 md:col-span-3">
            <h2 className="text-[20pt] sm:text-[30pt] font-bold mb-[59px]">HAL ca</h2>

            <p className="text-[12pt] font-medium leading-[1.33] md:leading-[1.75] space-y-4 md:space-y-6">
              HAL caは、アンビエント・実験音楽を軸とするコンポーザー /
              サウンドアーティスト。
              <br />
              <br />
              東京生まれ。国立音楽大学を経て渡仏し、パリ・エコールノルマル音楽院映画音楽作曲科を首席で修了、またパリ地方音楽院エレクトロアコースティック作曲科にて電子音響を学ぶ。
              <br />
              <br />
              ノイズや声、フィールドレコーディングなど多様な音響オブジェクトをオーケストレーションし、円環的な時間感覚をもった音のデザインを追求。抽象的でありながらも身体感覚に訴えかける響きを生み出し、聴く者を「今ここ」に立ち戻らせる音楽を作り続けている。
              <br />
              <br />
              作品はデジタルリリースにとどまらず、オーディオヴィジュアル作品や空間インスタレーションなどのメディアアート作品へも展開。マルチチャンネルによる多層的な音響デザインや、音の体験デザインを得意とし、近年は
              BMW THE SEVEN ART MUSEUM
              や大阪関西万博に空間音響演出で参加するなど、活動を幅を広げている。
            </p>

            <p className="mt-8 md:mt-12 text-[12pt] font-medium leading-[1.33] md:leading-[1.5] font-en">
              HAL ca is an ambient and experimental music project by composer
              and sound artist Haruka Kikuchi.
              <br />
              <br />
              Born in Tokyo, she studied at Kunitachi College of Music before
              moving to France, where she graduated top of her class in Film
              Music Composition from the École Normale de Musique de Paris,
              receiving unanimous distinction from the jury, while
              simultaneously studying electroacoustic composition at the
              Conservatoire à Rayonnement Régional de Paris.
              <br />
              <br />
              Drawing on noise, voice, field recordings, and other sonic
              materials, HAL ca composes sonic environments that blur the
              boundaries between music and space. Through layered orchestration
              and a circular sense of time, her work creates abstract yet
              deeply physical resonances, inviting listeners back to the
              present moment.
              <br />
              <br />
              Beyond digital releases, her work extends into media art,
              including audiovisual works and spatial installations. Working
              across multi-channel sound design and sound experience design,
              she creates layered sonic experiences that engage both space and
              perception. Recent projects include spatial audio works for BMW
              THE SEVEN ART MUSEUM and Expo 2025 Osaka, Kansai.
            </p>
          </div>
          <div className="hidden md:block md:col-span-1"></div>
          <div className="col-span-6 md:col-span-2 mt-[30px] md:mt-[107px]">
            {/* External Links */}
            <div className="flex flex-col">
              <a
                href="https://music.apple.com/us/artist/hal-ca/1702034837"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13pt] md:text-[12pt] leading-[1.33] tracking-[0.05em] font-bold text-wave-blue hover:text-[#c2de6d] transition-colors"
              >
                APPLE MUSIC
              </a>
              <a
                href="https://open.spotify.com/artist/4PtZB4ONshF7mdbYQgVWtm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13pt] md:text-[12pt] leading-[1.33] tracking-[0.05em] font-bold text-wave-blue hover:text-[#c2de6d] transition-colors"
              >
                SPOTIFY
              </a>
              <a
                href="https://www.instagram.com/haru.kikuchi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13pt] md:text-[12pt] leading-[1.33] tracking-[0.05em] font-bold text-wave-blue hover:text-[#c2de6d] transition-colors"
              >
                INSTAGRAM (HAL ca)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works Section（TOP / hal-ca 共通） */}
      <FeaturedWorks featuredItems={featuredItems} />
    </>
  );
}
