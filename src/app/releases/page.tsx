import Image from "next/image";
import Link from "next/link";
import { ReleaseCard } from "@/components/ReleaseCard";
import { getReleases, transformRelease } from "@/lib/wordpress";

export default async function ReleasesPage() {
  let releases: ReturnType<typeof transformRelease>[] = [];

  try {
    const wpReleases = await getReleases({ per_page: 100 });
    // リリースを変換して表示順でソート
    releases = wpReleases
      .map(transformRelease)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  } catch (error) {
    console.error("Failed to fetch releases from WordPress:", error);
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[150px] md:h-[215px] min-h-[150px] md:min-h-[215px] flex items-end overflow-hidden">
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
          <div className="grid-6 px-6 md:px-[45px]">
            <h2 className="text-white text-[20pt] md:text-[30pt] font-bold col-6 md:col-3">RELEASES</h2>
            <div className="col-6 md:col-3 flex justify-start md:justify-end items-end mt-2 md:mt-0">
              <Link href="/">
                <Image
                  src="/svg/logo-wave.svg"
                  alt="WA/VE"
                  width={140}
                  height={40}
                  className="w-[100px] md:w-[140px] h-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Releases List */}
      <section className="py-8 md:py-24 px-6 md:px-[45px]">
        <div className="">
          {releases.length === 0 ? (
            <div className="text-center py-8 md:py-16">
              <p className="text-[10pt] md:text-[12pt]">Releases not found</p>
            </div>
          ) : (
            releases.map((release) => (
              <ReleaseCard
                key={release.id}
                id={release.id}
                slug={release.slug}
                coverImage={release.coverImage}
                title={release.title}
                year={release.year}
                description={release.description}
                releaseDate={release.releaseDate}
                tracks={release.tracks}
                listenUrl={release.listenUrl}
                appleMusicUrl={release.appleMusicUrl}
                spotifyUrl={release.spotifyUrl}
                tags={release.tags}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}
