import { useEffect } from 'react';
import type { Chapter } from '../types';

interface UseSEOOptions {
  chapter?: Chapter;
  targetSectionId?: string;
}

const DEFAULT_TITLE = 'Keutamaan Shalawat ﷺ - Risalah Fadhilah, Khasiat & 50 Kisah Hadits Nabi';
const DEFAULT_DESC =
  'Aplikasi PWA Kitab Fadhail Shalawat karya Syaikhul Hadits Maulana Muhammad Zakariya Kandhlawi. Memuat hadits keutamaan membaca shalawat nabi, ancaman enggan bershalawat, lafadz khusus, 50 kisah teladan, dan tasbih digital offline.';
const BASE_URL = 'https://keutamaan-shalawat.vercel.app';

export function useSEO({ chapter, targetSectionId }: UseSEOOptions) {
  useEffect(() => {
    // Cari section aktif jika targetSectionId ada
    const targetSection = chapter?.sections.find((s) => s.id === targetSectionId);

    // 1. Update Title
    let pageTitle = DEFAULT_TITLE;
    if (targetSection && chapter) {
      pageTitle = `${targetSection.title} | ${chapter.title} - Keutamaan Shalawat ﷺ`;
    } else if (chapter) {
      pageTitle = `${chapter.title} | Keutamaan Shalawat ﷺ`;
    }
    document.title = pageTitle;

    // 2. Update Description
    const metaDesc = document.querySelector('meta[name="description"]');
    let descContent = DEFAULT_DESC;
    if (targetSection) {
      const snippet = targetSection.translation
        ? targetSection.translation.replace(/\n+/g, ' ').slice(0, 160)
        : targetSection.title;
      descContent = `${targetSection.title}: "${snippet}..." - Dari Kitab Fadhail Shalawat karya Maulana Muhammad Zakariya Kandhlawi.`;
    } else if (chapter?.description) {
      descContent = `${chapter.description} - Dari Kitab Fadhail Shalawat karya Maulana Muhammad Zakariya Kandhlawi.`;
    }

    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    }

    // 3. Update Canonical URL (Query param bersih untuk bab dan subtitle hadits)
    let canonicalUrl = `${BASE_URL}/`;
    if (chapter) {
      if (targetSectionId) {
        canonicalUrl = `${BASE_URL}/?bab=${chapter.id}&sec=${targetSectionId}`;
      } else if (chapter.id !== 'bab-1') {
        canonicalUrl = `${BASE_URL}/?bab=${chapter.id}`;
      }
    }

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

    // 6. Sinkronisasi URL Hash atau Search Param secara halus tanpa reload
    if (chapter) {
      const newHash = targetSectionId ? `#${chapter.id}/${targetSectionId}` : `#${chapter.id}`;
      if (window.location.hash !== newHash) {
        history.replaceState(null, '', newHash);
      }
    }
  }, [chapter, targetSectionId]);
}
