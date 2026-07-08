export interface VideoEmbed {
  /** iframe: embeddable player; file: direct video file; link: unrecognized URL, open externally */
  type: 'iframe' | 'file' | 'link';
  src: string;
  platform: 'YouTube' | 'TikTok' | 'Vimeo' | 'Facebook' | 'File' | 'Khác';
  /** true for 9:16 portrait players (TikTok, YouTube Shorts) */
  vertical?: boolean;
}

/** Parse a video URL from any supported platform into an embeddable descriptor. */
export const getVideoEmbed = (url: string): VideoEmbed | null => {
  const trimmed = (url || '').trim();
  if (!trimmed) return null;

  // YouTube: watch / share / shorts / embed links
  const yt = trimmed.match(/(?:youtube\.com\/(?:watch\?.*v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) {
    return {
      type: 'iframe',
      src: `https://www.youtube.com/embed/${yt[1]}`,
      platform: 'YouTube',
      vertical: /youtube\.com\/shorts\//.test(trimmed),
    };
  }

  // TikTok: https://www.tiktok.com/@user/video/123...
  const tk = trimmed.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  if (tk) {
    return {
      type: 'iframe',
      src: `https://www.tiktok.com/player/v1/${tk[1]}`,
      platform: 'TikTok',
      vertical: true,
    };
  }

  // Vimeo: https://vimeo.com/123456789
  const vm = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) {
    return { type: 'iframe', src: `https://player.vimeo.com/video/${vm[1]}`, platform: 'Vimeo' };
  }

  // Facebook video / watch / reel / fb.watch
  if (/facebook\.com\/(?:.+\/videos\/|watch|reel\/)|fb\.watch\//.test(trimmed)) {
    return {
      type: 'iframe',
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(trimmed)}&show_text=false`,
      platform: 'Facebook',
    };
  }

  // Direct video file: known extension, or a relative path from our own /upload API
  if (/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(trimmed) || trimmed.startsWith('/')) {
    return { type: 'file', src: trimmed, platform: 'File' };
  }

  return { type: 'link', src: trimmed, platform: 'Khác' };
};

/** Platform label for a URL, '' when the input is empty. Used for admin form badges. */
export const getVideoPlatform = (url: string): string => getVideoEmbed(url)?.platform ?? '';
