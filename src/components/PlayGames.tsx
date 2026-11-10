import { useCallback, useState } from 'react';
import { ArrowRight, Gamepad2 } from 'lucide-react';
import GameRequestModal from '@/components/GameRequestModal';
import { accentStyles } from '@/lib/accent';
import type { Game } from '@/types';

interface PlayGamesProps {
  games: Game[];
  loading: boolean;
}

export default function PlayGames({ games, loading }: PlayGamesProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const closeModal = useCallback(() => setSelectedGame(null), []);

  return (
    <section id="play-games" className="scroll-mt-16 border-t border-zinc-900 bg-zinc-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Play Games</p>
          <h2 className="font-display mt-3 text-5xl uppercase leading-[1.05] text-zinc-50 sm:text-6xl">
            Want to play games played by the legendary Team Tung?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            Our squad competes across a range of titles. Pick a game below and request a session. We
            will set up a match and invite you to play with the team.
          </p>
        </div>

        {loading ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-48 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/60" />
            ))}
          </div>
        ) : games.length === 0 ? (
          <p className="mt-14 rounded-xl border border-dashed border-zinc-700 p-10 text-center text-zinc-400">
            Our game library is being updated. Check back soon.
          </p>
        ) : (
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => {
              const accent = accentStyles[game.accent_color] ?? accentStyles.emerald;
              return (
                <li key={game.id}>
                  <article
                    className={`group flex h-full flex-col rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-900 hover:shadow-xl hover:shadow-black/40 ${accent.border}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-lg ${accent.bg} ${accent.text}`}>
                        <Gamepad2 className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                        {game.genre}
                      </span>
                    </div>
                    <h3 className="font-display mt-5 text-3xl uppercase tracking-wide text-zinc-50">{game.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{game.blurb}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedGame(game)}
                      className={`mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-semibold ${accent.text} transition-colors hover:underline`}
                    >
                      Request a game
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {selectedGame && <GameRequestModal game={selectedGame} onClose={closeModal} />}
    </section>
  );
}
