export type AccentColor = 'emerald' | 'sky' | 'amber' | 'rose';

export interface Player {
  id: string;
  handle: string;
  real_name: string | null;
  role: string;
  game: string;
  bio: string | null;
  accent_color: AccentColor;
  kills: number;
  deaths: number;
  assists: number;
  sort_order: number;
}

export type MatchStatus = 'upcoming' | 'win' | 'loss';

export interface Match {
  id: string;
  opponent: string;
  game: string;
  event_name: string | null;
  match_date: string;
  team_score: number | null;
  opponent_score: number | null;
  status: MatchStatus;
}

export interface Game {
  id: string;
  name: string;
  genre: string;
  blurb: string;
  accent_color: AccentColor;
  sort_order: number;
}

export interface TryoutApplication {
  full_name: string;
  handle: string;
  game: string;
  rank: string | null;
  contact: string;
  message: string | null;
}
