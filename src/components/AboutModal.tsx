import React from 'react';
import { X, Info, BookOpen, Smartphone, Share2 } from 'lucide-react';
import type { ThemeMode } from '../types';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeMode;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  currentTheme
}) => {
  if (!isOpen) return null;

  const getModalBg = () => {
    switch (currentTheme) {
      case 'dark':
        return 'bg-[#06241a] text-emerald-100 border-emerald-800/50';
      case 'sepia':
        return 'bg-[#fcf7ee] text-[#332214] border-amber-800/30';
      default:
        return 'bg-white text-slate-900 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border z-10 animate-in zoom-in-95 duration-200 ${getModalBg()}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold">Tentang Aplikasi</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Informasi"
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 text-xs sm:text-sm leading-relaxed">
          {/* Hero Branding */}
          <div className="text-center p-5 rounded-2xl bg-emerald-600/10 border border-emerald-600/20">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center mx-auto mb-2 text-2xl font-arabic font-bold shadow-md">
              ﷺ
            </div>
            <h3 className="font-extrabold text-base sm:text-lg">Keutamaan Shalawat</h3>
            <p className="text-xs opacity-75 font-medium mt-0.5">
              Risalah Fadhilah, Khasiat, Adab & Hikayat Pengamal Shalawat
            </p>
          </div>

          {/* Risalah Structure */}
          <div>
            <h4 className="font-bold flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 uppercase tracking-wider text-xs mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Susunan 5 Bab & Khatimah</span>
            </h4>
            <ul className="space-y-1.5 text-xs opacity-90">
              <li><strong>Bab I:</strong> Fadhilah & Keutamaan Sholawat secara Umum.</li>
              <li><strong>Bab II:</strong> Fadhilah Khusus Bacaan Sholawat Tertentu.</li>
              <li><strong>Bab III:</strong> Ancaman & Peringatan bagi yang Enggan Bersholawat.</li>
              <li><strong>Bab IV:</strong> Faedah Beraneka Ragam, Masalah Fiqih, & Adab Sholawat.</li>
              <li><strong>Bab V:</strong> Kisah & Hikayat Teladan Para Pengamal Sholawat.</li>
              <li><strong>Khatimah:</strong> Untaian Syair Mathnawi Maulana Jami, Qashidah Qasimi, & Catatan Akhir.</li>
            </ul>
          </div>

          {/* PWA & Offline Guide */}
          <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-2">
            <h4 className="font-bold flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 text-xs uppercase tracking-wider">
              <Smartphone className="w-4 h-4" />
              <span>Cara Install di Smartphone (PWA)</span>
            </h4>
            <p className="text-xs opacity-80">
              Aplikasi ini berteknologi <strong>Progressive Web App (PWA)</strong> dan 100% dapat digunakan tanpa internet:
            </p>
            <ul className="text-xs opacity-80 list-disc list-inside space-y-1">
              <li><strong>Android (Chrome):</strong> Ketuk menu titik tiga (⋮) &gt; pilih <em>"Tambahkan ke Layar Utama"</em> (Add to Home screen).</li>
              <li><strong>iOS / iPhone (Safari):</strong> Ketuk tombol Bagikan (<Share2 className="w-3 h-3 inline" />) &gt; pilih <em>"Tambahkan ke Layar Utama"</em>.</li>
            </ul>
          </div>

          {/* Closing Dua & Attribution */}
          <div className="text-center pt-3 border-t border-black/10 dark:border-white/10 space-y-1">
            <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              Didigitalisasi Oleh : Abu Basyir, Jakarta
            </p>
            <p className="text-xs opacity-75 italic">
              "Semoga shalawat dan salam senantiasa tercurah kepada Nabi Agung Muhammad ﷺ, keluarga, dan para sahabat beliau."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
