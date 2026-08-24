import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'info' | 'error';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
}

export const Toast: React.FC<ToastProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-xs sm:max-w-sm px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 pointer-events-auto border animate-in fade-in slide-in-from-bottom-3 bg-emerald-950/90 text-emerald-100 border-emerald-700/50"
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="w-5 h-5 text-sky-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span className="text-sm font-medium leading-snug">{toast.text}</span>
        </div>
      ))}
    </div>
  );
};
