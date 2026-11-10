import type { AccentColor } from '@/types';

export const accentStyles: Record<AccentColor, { text: string; border: string; bg: string }> = {
  emerald: { text: 'text-emerald-400', border: 'group-hover:border-emerald-500/60', bg: 'bg-emerald-500/10' },
  sky: { text: 'text-sky-400', border: 'group-hover:border-sky-500/60', bg: 'bg-sky-500/10' },
  amber: { text: 'text-amber-400', border: 'group-hover:border-amber-500/60', bg: 'bg-amber-500/10' },
  rose: { text: 'text-rose-400', border: 'group-hover:border-rose-500/60', bg: 'bg-rose-500/10' },
};
