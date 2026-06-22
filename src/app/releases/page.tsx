import { ReleaseCard } from "@/components/ReleaseCard";
import { HeroSection } from "@/components/HeroSection";
import { getReleases, transformRelease } from "@/lib/wordpress";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Releases",
  path: "/releases",
});

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
      <HeroSection
        title="RELEASES"
        right="ALL"
      />

      {/* Releases List */}
      <section className="py-8 pt-[52px] px-5 md:px-[45px]">
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
                releaseType={release.releaseType}
                tags={release.tags}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}
