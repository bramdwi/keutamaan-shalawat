import { useEffect } from 'react';
import type { Chapter } from '../types';

interface UseSEOOptions {
  chapter?: Chapter;
  targetSectionId?: string;
}

const DEFAULT_TITLE = 'Keutamaan Shalawat ﷺ - Risalah Fadhilah, Khasiat & 50 Kisah Teladan';
const DEFAULT_DESC =
  'Aplikasi PWA Kitab Fadhail Shalawat karya Syaikhul Hadits Maulana Muhammad Zakariya Kandhlawi. Memuat hadits fadhilah shalawat, ancaman enggan bershalawat, lafadz khusus, 50 kisah teladan, dan tasbih digital offline.';
const BASE_URL = 'https://keutamaan-shalawat.web.app';

export function useSEO({ chapter, targetSectionId }: UseSEOOptions) {
  useEffect(() => {
    // 1. Update Title
    let pageTitle = DEFAULT_TITLE;
    if (chapter) {
      pageTitle = `${chapter.title} | Keutamaan Shalawat ﷺ`;
    }
    document.title = pageTitle;

    // 2. Update Description
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = chapter?.description
      ? `${chapter.description} - Dari Kitab Fadhail Shalawat karya Maulana Muhammad Zakariya Kandhlawi.`
      : DEFAULT_DESC;

    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    }

    // 3. Update Canonical URL
    const canonicalUrl = chapter
      ? `${BASE_URL}/#${chapter.id}${targetSectionId ? `/${targetSectionId}` : ''}`
      : `${BASE_URL}/`;

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 4. Update OpenGraph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', descContent);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

    // 5. Update Twitter Card Tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', pageTitle);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', descContent);

    // 6. Sinkronisasi URL Hash secara halus
    if (chapter) {
      const newHash = targetSectionId ? `#${chapter.id}/${targetSectionId}` : `#${chapter.id}`;
      if (window.location.hash !== newHash) {
        history.replaceState(null, '', newHash);
      }
    }
  }, [chapter, targetSectionId]);
}
