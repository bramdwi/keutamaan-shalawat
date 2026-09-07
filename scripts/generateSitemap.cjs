const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://keutamaan-shalawat.vercel.app';
const LAST_MOD = '2026-09-08';

const chapterFiles = [
  { file: 'mukadimah.ts', id: 'mukadimah', name: 'Mukadimah & Latar Belakang Risalah' },
  { file: 'bab-1.ts', id: 'bab-1', name: 'Bab I: Keutamaan & Fadhilah Membaca Shalawat' },
  { file: 'bab-2.ts', id: 'bab-2', name: 'Bab II: Lafadz-Lafadz Khusus Shalawat & Keutamaannya' },
  { file: 'bab-3.ts', id: 'bab-3', name: 'Bab III: Ancaman & Kerugian Bagi yang Enggan Bershalawat' },
  { file: 'bab-4.ts', id: 'bab-4', name: 'Bab IV: Faedah, Manfaat & Khasiat Bershalawat' },
  { file: 'bab-5.ts', id: 'bab-5', name: 'Bab V: 50 Kisah & Hikayat Teladan Berkah Shalawat' },
  { file: 'khatimah.ts', id: 'khatimah', name: 'Khatimah: Penutup & Bait Syair Kerinduan Nabi ﷺ' }
];

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- 1. Halaman Utama / Beranda Kitab Keutamaan Shalawat -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

let totalSectionsCount = 0;

for (const chap of chapterFiles) {
  const filePath = path.join(__dirname, '../src/data', chap.file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // URL Halaman Bab Utama
  xml += `
  <!-- ${chap.name} -->
  <url>
    <loc>${BASE_URL}/?bab=${chap.id}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>
`;

  // Parse sections baris per baris secara akurat
  const lines = content.split('\n');
  let currentId = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const idMatch = line.match(/^id:\s*['"]([^'"]+)['"],?$/);
    if (idMatch && idMatch[1].includes('-sec-')) {
      currentId = idMatch[1];
    }
    const titleMatch = line.match(/^title:\s*['"](.*)['"],?$/);
    if (titleMatch && currentId) {
      let rawTitle = titleMatch[1];
      // Bersihkan closing quote jika tertangkap
      if (rawTitle.endsWith("'") || rawTitle.endsWith('"')) {
        rawTitle = rawTitle.slice(0, -1);
      }
      // Unescape petik tunggal & ganda
      const cleanTitle = rawTitle.replace(/\\'/g, "'").replace(/\\"/g, '"');

      totalSectionsCount++;

      xml += `  <!-- Subtitle: ${escapeXml(cleanTitle)} -->
  <url>
    <loc>${BASE_URL}/?bab=${chap.id}&amp;sec=${currentId}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
`;
      currentId = null;
    }
  }
}

xml += `</urlset>\n`;

const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf-8');

console.log(`✅ Sitemap XML berhasil di-generate secara lengkap!`);
console.log(`- Jumlah Bab: ${chapterFiles.length}`);
console.log(`- Jumlah Subtitle / Hadits / Kisah: ${totalSectionsCount}`);
console.log(`- Total Keseluruhan URL Terdaftar: ${1 + chapterFiles.length + totalSectionsCount}`);
console.log(`- Berkas Sitemap: ${outputPath}`);
