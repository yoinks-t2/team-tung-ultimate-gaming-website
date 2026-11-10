import { Crosshair, Shield, Target, Zap, Brain, type LucideIcon } from 'lucide-react';
import { accentStyles } from '@/lib/accent';
import type { Player } from '@/types';

const roleIcons: Record<string, LucideIcon> = {
  Duelist: Crosshair,
  Controller: Brain,
  Sentinel: Shield,
  Initiator: Zap,
  'Flex / IGL': Target,
};

function kdRatio(kills: number, deaths: number): string {
  if (deaths === 0) return kills.toFixed(2);
  return (kills / deaths).toFixed(2);
}

export default function PlayerCard({ player }: { player: Player }) {
  const accent = accentStyles[player.accent_color] ?? accentStyles.emerald;
  const RoleIcon = roleIcons[player.role] ?? Target;
  const initials = player.handle.slice(0, 2).toUpperCase();

  return (
    <article
      className={`group flex h-full flex-col rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-900 hover:shadow-xl hover:shadow-black/40 ${accent.border}`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-lg ${accent.bg} font-display text-3xl ${accent.text}`}
          aria-hidden="true"
        >
          {initials}
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full ${accent.bg} px-3 py-1 text-xs font-semibold ${accent.text}`}>
          <RoleIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {player.role}
        </span>
      </div>

      <h3 className="font-display mt-5 text-3xl uppercase tracking-wide text-zinc-50">{player.handle}</h3>
      {player.real_name && <p className="mt-1 text-sm text-zinc-400">{player.real_name}</p>}
      {player.bio && <p className="mt-4 text-sm leading-relaxed text-zinc-300">{player.bio}</p>}

      <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-zinc-800 pt-5 text-center">
        <div>
          <dt className="text-xs uppercase tracking-wider text-zinc-500">K/D</dt>
          <dd className={`mt-1 font-display text-2xl ${accent.text}`}>{kdRatio(player.kills, player.deaths)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-zinc-500">Kills</dt>
          <dd className="mt-1 font-display text-2xl text-zinc-100">{player.kills}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-zinc-500">Assists</dt>
          <dd className="mt-1 font-display text-2xl text-zinc-100">{player.assists}</dd>
        </div>
      </dl>
    </article>
  );
}
