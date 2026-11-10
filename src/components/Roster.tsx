import PlayerCard from '@/components/PlayerCard';
import type { Player } from '@/types';

interface RosterProps {
  players: Player[];
  loading: boolean;
}

export default function Roster({ players, loading }: RosterProps) {
  return (
    <section id="roster" className="scroll-mt-16 bg-zinc-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">The Squad</p>
          <h2 className="font-display mt-3 text-5xl uppercase leading-[1.05] text-zinc-50 sm:text-6xl">
            Meet the Roster
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            Every player brings a different strength. Together they form a team built to close out
            rounds under pressure.
          </p>
        </div>

        {loading ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-72 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/60" />
            ))}
          </div>
        ) : players.length === 0 ? (
          <p className="mt-14 rounded-xl border border-dashed border-zinc-700 p-10 text-center text-zinc-400">
            The roster is being updated. Check back soon.
          </p>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
