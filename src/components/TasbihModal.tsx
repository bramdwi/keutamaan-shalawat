import React, { useState } from 'react';
import { X, RotateCcw, Sparkles, Volume2, VolumeX, CheckCircle } from 'lucide-react';
import type { ThemeMode } from '../types';

interface TasbihModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeMode;
}

const presetDhikr = [
  {
    name: 'Shalawat Ringkas (Jibril)',
    arabic: 'صَلَّى اللَّهُ عَلَى مُحَمَّدٍ',
    latin: 'Ṣallallāhu \'alā Muḥammad'
  },
  {
    name: 'Shalawat Sayyidina',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ',
    latin: 'Allāhumma ṣalli \'alā sayyidinā Muḥammadin wa \'alā āli sayyidinā Muḥammad'
  },
  {
    name: 'Shalawat Ummi (Hari Jumat)',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ عَبْدِكَ وَنَبِيِّكَ وَرَسُولِكَ النَّبِيِّ الأُمِّيِّ',
    latin: 'Allāhumma ṣalli \'alā Muḥammadin \'abdika wa nabiyyika wa rasūlikan-nabiyyil-ummiyy'
  },
  {
    name: 'Shalawat & Salam',
    arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَيْهِ',
    latin: 'Allāhumma ṣalli wa sallim wa bārik \'alayh'
  }
];

export const TasbihModal: React.FC<TasbihModalProps> = ({
  isOpen,
  onClose,
  currentTheme
}) => {
  const [count, setCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(33);
  const [selectedDhikrIndex, setSelectedDhikrIndex] = useState<number>(0);
  const [isVibrate, setIsVibrate] = useState<boolean>(true);

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

  const handleIncrement = () => {
    setCount((prev) => {
      const nextVal = prev + 1;
      // Vibration haptic feedback on mobile
      if (isVibrate && typeof navigator !== 'undefined' && navigator.vibrate) {
        if (target > 0 && nextVal % target === 0) {
          navigator.vibrate([100, 50, 100]); // double pulse on target reach
        } else {
          navigator.vibrate(30); // light tap
        }
      }
      return nextVal;
    });
  };

  const handleReset = () => {
    setCount(0);
    if (isVibrate && typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const currentDhikr = presetDhikr[selectedDhikrIndex];
  const progressPercent = target > 0 ? Math.min(100, (count / target) * 100) : 0;
  const targetReached = target > 0 && count >= target;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border z-10 animate-in zoom-in-95 duration-200 text-center ${getModalBg()}`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 mb-4">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-base">
            <Sparkles className="w-5 h-5" />
            <span>Tasbih Digital Shalawat</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsVibrate(!isVibrate)}
              title={isVibrate ? 'Getar Aktif' : 'Getar Nonaktif'}
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-70 hover:opacity-100"
            >
              {isVibrate ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dhikr Selector Tabs */}
        <div className="mb-4 text-left">
          <label className="text-[11px] font-bold uppercase tracking-wider opacity-60 block mb-1.5">
            Pilihan Bacaan Shalawat
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {presetDhikr.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDhikrIndex(idx)}
                className={`p-2 rounded-xl border text-[11px] font-semibold text-left transition-all truncate ${
                  selectedDhikrIndex === idx
                    ? 'bg-emerald-600/15 border-emerald-600 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'border-black/10 dark:border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Shalawat Display */}
        <div className="my-4 p-4 rounded-2xl bg-emerald-600/10 border border-emerald-600/20">
          <p className={`font-arabic text-xl sm:text-2xl font-bold leading-relaxed mb-1 ${currentTheme === 'dark' ? 'text-slate-100' : currentTheme === 'sepia' ? 'text-[#2a1708]' : 'text-slate-900'}`}>
            {currentDhikr.arabic}
          </p>
          <p className="text-xs opacity-75 italic">{currentDhikr.latin}</p>
        </div>

        {/* Target Buttons */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-[11px] font-bold uppercase opacity-60">Target:</span>
          {[33, 100, 1000, 0].map((tVal) => (
            <button
              key={tVal}
              onClick={() => setTarget(tVal)}
              className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-all ${
                target === tVal
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'border-black/10 dark:border-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              {tVal === 0 ? 'Bebas' : tVal}
            </button>
          ))}
        </div>

        {/* Big Tap Area / Counter Ring */}
        <div className="relative flex items-center justify-center my-6">
          <button
            onClick={handleIncrement}
            aria-label="Hitung Tasbih"
            className="w-44 h-44 sm:w-48 sm:h-48 rounded-full border-4 border-emerald-600/40 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-2xl flex flex-col items-center justify-center active:scale-95 transition-all select-none cursor-pointer group hover:border-emerald-400"
          >
            <span className="text-4xl sm:text-5xl font-black tracking-tight font-sans drop-shadow-md">
              {count}
            </span>
            <span className="text-xs opacity-80 mt-1 uppercase font-semibold tracking-wider">
              {target > 0 ? `dari ${target}` : 'Sentuh di sini'}
            </span>
            {targetReached && (
              <div className="absolute top-3 flex items-center gap-1 text-[11px] bg-emerald-900/80 px-2.5 py-0.5 rounded-full text-emerald-200 font-bold border border-emerald-500 animate-pulse">
                <CheckCircle className="w-3 h-3" /> Target Tercapai
              </div>
            )}
          </button>
        </div>

        {/* Progress Bar (if target set) */}
        {target > 0 && (
          <div className="w-full bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden mb-6">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Reset & Done Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 text-xs font-semibold opacity-80 hover:opacity-100 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Hitungan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
