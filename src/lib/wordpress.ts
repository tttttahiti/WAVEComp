/**
 * WordPress REST API Client
 *
 * WordPress のカスタム投稿タイプからデータを取得するためのクライアント
 */

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://localhost:8080/wp-json/wp/v2';

// Types
export interface WPGalleryImage {
  id: number;
  url: string;
  width: number;
  height: number;
  thumbnail: string;
}

export interface WPWork {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_image_url: string | null;
  work_meta: {
    client: string;
    date: string;
    role: string;
    url: string;
    video_urls: string[];
    credits: string;
    audio_url: string | null;
    gallery_images: WPGalleryImage[];
    layout_order: string[];
  };
  work_tag: number[];
  work_category: number[];
}

export interface WPRelease {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_image_url: string | null;
  release_meta: {
    release_date: string;
    tracks: string;
    listen_url: string;
    apple_music_url: string;
    spotify_url: string;
  };
  release_type: number[];
}

export interface WPMember {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  featured_image_url: string | null;
  member_meta: {
    name_en: string;
    role: string;
    achievements: string;
    mobile_image_url: string | null;
    display_order: number;
  };
}

export interface WPTerm {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// API Functions

/**
 * Works を取得
 */
export async function getWorks(params?: {
  per_page?: number;
  page?: number;
  work_category?: number;
  work_tag?: number;
  slug?: string;
}): Promise<WPWork[]> {
  const searchParams = new URLSearchParams();

  if (params?.per_page) searchParams.set('per_page', String(params.per_page));
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.work_category) searchParams.set('work_category', String(params.work_category));
  if (params?.work_tag) searchParams.set('work_tag', String(params.work_tag));
  if (params?.slug) searchParams.set('slug', params.slug);

  const url = `${WORDPRESS_API_URL}/works?${searchParams.toString()}`;

  const res = await fetch(url, {
    next: { revalidate: 60 }, // 60秒でキャッシュを再検証
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch works: ${res.status}`);
  }

  return res.json();
}

/**
 * Work を slug で取得
 */
export async function getWorkBySlug(slug: string): Promise<WPWork | null> {
  const works = await getWorks({ slug });
  return works[0] || null;
}

/**
 * Releases を取得
 */
export async function getReleases(params?: {
  per_page?: number;
  page?: number;
  release_type?: number;
  slug?: string;
}): Promise<WPRelease[]> {
  const searchParams = new URLSearchParams();

  if (params?.per_page) searchParams.set('per_page', String(params.per_page));
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.release_type) searchParams.set('release_type', String(params.release_type));
  if (params?.slug) searchParams.set('slug', params.slug);

  const url = `${WORDPRESS_API_URL}/releases?${searchParams.toString()}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch releases: ${res.status}`);
  }

  return res.json();
}

/**
 * Release を slug で取得
 */
export async function getReleaseBySlug(slug: string): Promise<WPRelease | null> {
  const releases = await getReleases({ slug });
  return releases[0] || null;
}

/**
 * Members を取得
 */
export async function getMembers(params?: {
  per_page?: number;
  page?: number;
}): Promise<WPMember[]> {
  const searchParams = new URLSearchParams();

  if (params?.per_page) searchParams.set('per_page', String(params.per_page));
  if (params?.page) searchParams.set('page', String(params.page));

  const url = `${WORDPRESS_API_URL}/members?${searchParams.toString()}`;

  const res = await fetch(url, {
    next: { revalidate: 0 }, // キャッシュ無効化（デバッグ用）
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch members: ${res.status}`);
  }

  return res.json();
}

/**
 * Work カテゴリーを取得
 */
export async function getWorkCategories(): Promise<WPTerm[]> {
  const res = await fetch(`${WORDPRESS_API_URL}/work-categories`, {
    next: { revalidate: 300 }, // 5分でキャッシュを再検証
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch work categories: ${res.status}`);
  }

  return res.json();
}

/**
 * Work タグを取得
 */
export async function getWorkTags(): Promise<WPTerm[]> {
  const res = await fetch(`${WORDPRESS_API_URL}/work-tags`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch work tags: ${res.status}`);
  }

  return res.json();
}

/**
 * Release タイプを取得
 */
export async function getReleaseTypes(): Promise<WPTerm[]> {
  const res = await fetch(`${WORDPRESS_API_URL}/release-types`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch release types: ${res.status}`);
  }

  return res.json();
}

// Utility functions

/**
 * HTML タグを除去
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * tracks 文字列を配列に変換（改行区切り）
 */
export function parseTracksToArray(tracks: string): string[] {
  if (!tracks) return [];
  return tracks.split('\n').filter(track => track.trim() !== '');
}

/**
 * achievements 文字列を配列に変換（改行区切り）
 */
export function parseAchievementsToArray(achievements: string): string[] {
  if (!achievements) return [];
  return achievements.split('\n').filter(item => item.trim() !== '');
}

/**
 * WPWork を フロントエンド用の形式に変換
 */
export function transformWork(work: WPWork) {
  // タグを取得（work_tag は ID の配列なので、別途取得が必要）
  // ここでは簡易的に role からタグを生成するか、空配列を返す
  const tags: string[] = [];
  
  // role からタグを抽出（例: "Music produce / Music Creation" → ["#Music produce", "#Music Creation"]）
  if (work.work_meta.role) {
    const roleParts = work.work_meta.role.split(/[,\/]/).map(r => r.trim()).filter(r => r);
    tags.push(...roleParts.map(r => `#${r}`));
  }

  return {
    id: String(work.id),
    slug: work.slug,
    thumbnail: work.featured_image_url || '/images/placeholder.jpg',
    client: work.work_meta.client || '',
    title: stripHtml(work.title.rendered),
    description: stripHtml(work.content.rendered),
    date: work.work_meta.date || '',
    role: work.work_meta.role || '',
    url: work.work_meta.url || '',
    videoUrls: work.work_meta.video_urls || [],
    audioUrl: work.work_meta.audio_url || null,
    galleryImages: work.work_meta.gallery_images || [],
    layoutOrder: work.work_meta.layout_order || ['video', 'content', 'gallery', 'audio'],
    tags,
  };
}

/**
 * WPRelease を フロントエンド用の形式に変換
 */
export function transformRelease(release: WPRelease) {
  return {
    id: String(release.id),
    slug: release.slug,
    coverImage: release.featured_image_url || '/images/placeholder.jpg',
    title: stripHtml(release.title.rendered),
    description: stripHtml(release.content.rendered),
    releaseDate: release.release_meta.release_date || '',
    tracks: parseTracksToArray(release.release_meta.tracks),
    listenUrl: release.release_meta.listen_url || '',
    appleMusicUrl: release.release_meta.apple_music_url || '',
    spotifyUrl: release.release_meta.spotify_url || '',
  };
}

/**
 * HTML コンテンツを段落配列に変換
 */
export function parseBiographyToArray(html: string): string[] {
  if (!html) return [];
  // <p>タグで分割し、空の段落を除去
  const paragraphs = html
    .split(/<\/?p[^>]*>/)
    .map(p => stripHtml(p).trim())
    .filter(p => p !== '');
  return paragraphs.length > 0 ? paragraphs : [stripHtml(html)];
}

/**
 * WPMember を フロントエンド用の形式に変換
 */
export function transformMember(member: WPMember) {
  const nameJa = stripHtml(member.title.rendered);
  const nameEn = member.member_meta.name_en || '';

  return {
    id: String(member.id),
    slug: member.slug,
    imageSrc: member.featured_image_url || '/images/placeholder.jpg',
    imageSrcMobile: member.member_meta.mobile_image_url || undefined,
    imageAlt: nameJa,
    name: nameEn ? `${nameJa} / ${nameEn}` : nameJa,
    title: member.member_meta.role || '',
    biography: parseBiographyToArray(member.content.rendered),
    achievements: parseAchievementsToArray(member.member_meta.achievements),
    displayOrder: member.member_meta.display_order || 99,
  };
}
