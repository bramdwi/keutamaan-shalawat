import React, { useState } from 'react';
import { X, RotateCcw, Sparkles, Volume2, VolumeX, CheckCircle, BookOpen, ChevronDown, ChevronUp, Award, ArrowRight } from 'lucide-react';
import type { ThemeMode } from '../types';
import { tasbihAmalanList } from '../data/tasbihAmalan';
import type { TasbihAmalan } from '../data/tasbihAmalan';

interface TasbihModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeMode;
  onNavigateToSection?: (chapterId: string, sectionId: string) => void;
}

export const TasbihModal: React.FC<TasbihModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onNavigateToSection
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedAmalanId, setSelectedAmalanId] = useState<string>(tasbihAmalanList[0].id);
  const [count, setCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(tasbihAmalanList[0].defaultTarget);
  const [isVibrate, setIsVibrate] = useState<boolean>(true);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentAmalan: TasbihAmalan =
    tasbihAmalanList.find((a) => a.id === selectedAmalanId) || tasbihAmalanList[0];

  const filteredAmalan =
    activeCategory === 'all'
      ? tasbihAmalanList
      : tasbihAmalanList.filter((a) => a.category === activeCategory);

  const handleSelectAmalan = (amalan: TasbihAmalan) => {
    setSelectedAmalanId(amalan.id);
    setTarget(amalan.defaultTarget);
    setCount(0); // reset count on amalan change
    if (isVibrate && typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(40);
    }
  };

  const handleIncrement = () => {
    setCount((prev) => {
      const nextVal = prev + 1;
      // Vibration haptic feedback on mobile
      if (isVibrate && typeof navigator !== 'undefined' && navigator.vibrate) {
        if (target > 0 && nextVal === target) {
          navigator.vibrate([120, 80, 150]); // double pulse on reaching target
        } else {
          navigator.vibrate(25); // light tap
        }
      }
      return nextVal;
    });
  };

  const handleReset = () => {
    setCount(0);
    if (isVibrate && typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(40);
    }
  };

  const getModalBg = () => {
    switch (currentTheme) {
      case 'dark':
        return 'bg-[#06241a] text-slate-100 border-emerald-800/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]';
      case 'sepia':
        return 'bg-[#fcf7ee] text-[#332214] border-amber-800/30';
      default:
        return 'bg-white text-slate-900 border-slate-200';
    }
  };

  const getArabicTextColor = () => {
    switch (currentTheme) {
      case 'dark':
        return 'text-slate-100';
      case 'sepia':
        return 'text-[#2a1708]';
      default:
        return 'text-slate-900';
    }
  };

  const progressPercent = target > 0 ? Math.min(100, (count / target) * 100) : 0;
  const targetReached = target > 0 && count >= target;

  const quickTargetOptions = [1, 3, 7, 10, 33, 80, 100, 300, 1000, 0];

  const categories = [
    { id: 'all', label: 'Semua Amalan' },
    { id: 'jumat', label: 'Hari Jumat' },
    { id: 'harian', label: 'Harian & Pagi/Petang' },
    { id: 'ibadah', label: 'Ibadah & Shalat' },
    { id: 'penyelamat', label: 'Karomah & Penyelamat' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-3xl p-5 sm:p-7 shadow-2xl border z-10 animate-in zoom-in-95 duration-200 ${getModalBg()}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600/15 flex items-center justify-center border border-emerald-600/20 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">Tasbih Digital Shalawat</h3>
              <p className="text-[11px] opacity-60">Amalan & Wirid dari Fadhail Shalawat</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsVibrate(!isVibrate)}
              title={isVibrate ? 'Getar Aktif (Haptic On)' : 'Getar Nonaktif (Haptic Off)'}
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-70 hover:opacity-100 text-emerald-600 dark:text-emerald-400"
            >
              {isVibrate ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-40" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Tutup Tasbih"
            >
              <X className="w-5 h-5 opacity-70" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 scrollbar-thin">
          {/* Category Filter Tabs */}
          <div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-black/5 dark:bg-white/5 opacity-75 hover:opacity-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Amalan Selector: Horizontal Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 pt-1.5 scrollbar-thin">
              {filteredAmalan.map((item) => {
                const isSelected = item.id === currentAmalan.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectAmalan(item)}
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold shrink-0 transition-all text-left flex items-center gap-2 ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm scale-100 ring-2 ring-emerald-500/40'
                        : 'border-black/10 dark:border-white/10 opacity-75 hover:opacity-100 bg-black/5 dark:bg-white/5'
                    }`}
                  >
                    <Award className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                    <div className="flex flex-col">
                      <span className="truncate max-w-[140px] sm:max-w-[160px] font-bold">{item.name}</span>
                      <span className={`text-[9px] ${isSelected ? 'text-emerald-100' : 'opacity-60'}`}>
                        {item.badge} • {item.defaultTarget === 0 ? 'Bebas' : `${item.defaultTarget}x`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Shalawat Display Card */}
          <div className="p-4 rounded-2xl bg-emerald-600/10 border border-emerald-600/25 space-y-2 text-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-600/20 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
              <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>{currentAmalan.name}</span>
            </div>

            <p className={`font-arabic text-xl sm:text-2xl font-bold leading-[2.1] py-1 ${getArabicTextColor()}`}>
              {currentAmalan.arabic}
            </p>

            <p className="text-xs opacity-75 italic leading-relaxed">
              "{currentAmalan.latin}"
            </p>

            {/* Collapsible Details: Fadhilah, Source & Direct Link to Story */}
            <div className="pt-2 border-t border-black/5 dark:border-white/10 text-left">
              <button
                onClick={() => setShowDetail(!showDetail)}
                className="w-full flex items-center justify-between text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 py-1 hover:underline"
              >
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Fadhilah & Rujukan Kitab</span>
                </span>
                {showDetail ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showDetail && (
                <div className="mt-2 p-3 rounded-xl bg-black/5 dark:bg-white/5 text-xs space-y-2 border border-black/5 dark:border-white/5 animate-in fade-in duration-200">
                  <p className="leading-relaxed opacity-85">
                    <strong>Artinya:</strong> {currentAmalan.translation}
                  </p>
                  <p className="leading-relaxed text-emerald-800 dark:text-emerald-300">
                    <strong>Fadhilah:</strong> {currentAmalan.fadhilah}
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-black/5 dark:border-white/5 text-[11px] opacity-75">
                    <span>📖 <em>{currentAmalan.source}</em></span>
                  </div>

                  {/* Direct Clickable Link to Full Hadith/Story */}
                  {onNavigateToSection && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToSection(currentAmalan.targetChapterId, currentAmalan.targetSectionId);
                      }}
                      className="mt-1 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs transition-all shadow-xs group"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Baca Riwayat / Kisah Lengkap di Kitab</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Target Wirid Selector */}
          <div className="space-y-1.5 text-center">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-60">
                Target Wirid:
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                {target === 0 ? 'Bebas (Tanpa Batas)' : `${target} Kali`}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {quickTargetOptions.map((tVal) => (
                <button
                  key={tVal}
                  onClick={() => setTarget(tVal)}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                    target === tVal
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs scale-105'
                      : 'border-black/10 dark:border-white/10 opacity-75 hover:opacity-100 bg-black/5 dark:bg-white/5'
                  }`}
                >
                  {tVal === 0 ? 'Bebas' : `${tVal}x`}
                </button>
              ))}
            </div>
          </div>

          {/* Big Tap Area / Counter Ring */}
          <div className="relative flex items-center justify-center py-2">
            <button
              onClick={handleIncrement}
              aria-label="Hitung Tasbih"
              className="w-40 h-40 sm:w-44 sm:h-44 rounded-full border-4 border-emerald-600/40 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-2xl flex flex-col items-center justify-center active:scale-95 transition-all select-none cursor-pointer group hover:border-emerald-400"
            >
              <span className="text-4xl sm:text-5xl font-black tracking-tight font-sans drop-shadow-md">
                {count}
              </span>
              <span className="text-[11px] opacity-80 mt-1 uppercase font-semibold tracking-wider">
                {target > 0 ? `dari ${target}` : 'Sentuh di sini'}
              </span>

              {targetReached && (
                <div className="absolute top-2 flex items-center gap-1 text-[10px] bg-emerald-950/90 px-3 py-1 rounded-full text-emerald-200 font-bold border border-emerald-400 shadow-md animate-bounce">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Target {target}x Tercapai!
                </div>
              )}
            </button>
          </div>

          {/* Progress Bar (if target set) */}
          {target > 0 && (
            <div className="space-y-1">
              <div className="w-full bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-150"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] opacity-60 font-medium px-0.5">
                <span>{count} dibaca</span>
                <span>{Math.round(progressPercent)}% selesai</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 text-xs font-semibold opacity-80 hover:opacity-100 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Hitungan</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold transition-all shadow-xs"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
