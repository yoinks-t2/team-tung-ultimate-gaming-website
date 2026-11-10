import { CalendarDays, Trophy, type LucideIcon } from 'lucide-react';
import type { Match } from '@/types';

interface MatchesProps {
  matches: Match[];
  loading: boolean;
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

function MatchRow({ match }: { match: Match }) {
  const isPlayed = match.status !== 'upcoming';
  const won = match.status === 'win';

  return (
    <li className="flex flex-col gap-4 rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 transition-colors hover:border-zinc-700 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          {match.event_name ?? match.game}
        </p>
        <p className="font-display mt-1 text-2xl uppercase tracking-wide text-zinc-50">
          Team Tung <span className="text-zinc-500">vs</span> {match.opponent}
        </p>
        <p className="mt-1 text-sm text-zinc-400">{dateFormat.format(new Date(match.match_date))}</p>
      </div>

      {isPlayed ? (
        <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
          <p className="font-display text-3xl text-zinc-50">
            {match.team_score ?? '-'} <span className="text-zinc-600">:</span> {match.opponent_score ?? '-'}
          </p>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
              won ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
            }`}
          >
            {won ? 'Victory' : 'Defeat'}
          </span>
        </div>
      ) : (
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-300">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          Upcoming
        </span>
      )}
    </li>
  );
}

function MatchList({ title, icon: Icon, matches }: { title: string; icon: LucideIcon; matches: Match[] }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
        <Icon className="h-4 w-4 text-emerald-400" aria-hidden="true" />
        {title}
      </h3>
      {matches.length === 0 ? (
        <p className="mt-5 rounded-lg border border-dashed border-zinc-800 p-5 text-sm text-zinc-500">
          Nothing here yet.
        </p>
      ) : (
        <ul className="mt-5 flex flex-col gap-3">
          {matches.map((match) => (
            <MatchRow key={match.id} match={match} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Matches({ matches, loading }: MatchesProps) {
  const upcoming = matches.filter((m) => m.status === 'upcoming');
  const results = matches.filter((m) => m.status !== 'upcoming').reverse();

  return (
    <section id="matches" className="scroll-mt-16 border-t border-zinc-900 bg-zinc-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Schedule</p>
          <h2 className="font-display mt-3 text-5xl uppercase leading-[1.05] text-zinc-50 sm:text-6xl">
            Matches &amp; Results
          </h2>
        </div>

        {loading ? (
          <div className="mt-14 h-64 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/60" />
        ) : matches.length === 0 ? (
          <p className="mt-14 rounded-xl border border-dashed border-zinc-700 p-10 text-center text-zinc-400">
            No matches scheduled yet. Follow along here for the next game day.
          </p>
        ) : (
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <MatchList title="Upcoming" icon={CalendarDays} matches={upcoming} />
            <MatchList title="Recent Results" icon={Trophy} matches={results} />
          </div>
        )}
      </div>
    </section>
  );
}
