import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Game, Match, Player } from '@/types';

interface TeamData {
  players: Player[];
  matches: Match[];
  games: Game[];
  loading: boolean;
  error: string | null;
}

export function useTeamData(): TeamData {
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [playersRes, matchesRes, gamesRes] = await Promise.all([
        supabase.from('players').select('*').order('sort_order', { ascending: true }),
        supabase.from('matches').select('*').order('match_date', { ascending: true }),
        supabase.from('games').select('*').order('sort_order', { ascending: true }),
      ]);

      if (cancelled) return;

      if (playersRes.error || matchesRes.error || gamesRes.error) {
        setError('We could not load the team data right now. Please refresh the page.');
      } else {
        setPlayers((playersRes.data ?? []) as Player[]);
        setMatches((matchesRes.data ?? []) as Match[]);
        setGames((gamesRes.data ?? []) as Game[]);
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { players, matches, games, loading, error };
}
