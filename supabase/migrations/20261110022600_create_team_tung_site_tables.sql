/*
# Create Team Tung site tables

1. New Tables
- `players`: roster members shown on the site (handle, real role, avatar color, stats, sort order).
- `matches`: schedule and results (opponent, game, date, score, result, event name).
- `tryout_applications`: applications submitted from the "Join the Team" form (name, handle, game, contact, message).

2. Security
- RLS enabled on all three tables.
- `players` and `matches` are public read-only for visitors (anon + authenticated SELECT only).
- `tryout_applications` accepts public INSERT only; visitors cannot read other applications.
- No UPDATE or DELETE granted to public roles.

3. Important Notes
- No sign-in exists in this site, so policies target anon and authenticated.
- Applications are reviewed by the team owner in the database dashboard.
*/

CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handle text NOT NULL,
  real_name text,
  role text NOT NULL,
  game text NOT NULL DEFAULT 'Valorant',
  bio text,
  accent_color text NOT NULL DEFAULT 'emerald',
  kills integer NOT NULL DEFAULT 0,
  deaths integer NOT NULL DEFAULT 0,
  assists integer NOT NULL DEFAULT 0,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opponent text NOT NULL,
  game text NOT NULL,
  event_name text,
  match_date timestamptz NOT NULL,
  team_score integer,
  opponent_score integer,
  status text NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'win', 'loss')),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS matches_match_date_idx ON matches (match_date);

CREATE TABLE IF NOT EXISTS tryout_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  handle text NOT NULL,
  game text NOT NULL,
  rank text,
  contact text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE tryout_applications ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON players TO anon, authenticated;
GRANT SELECT ON matches TO anon, authenticated;
GRANT INSERT ON tryout_applications TO anon, authenticated;

DROP POLICY IF EXISTS "public_select_players" ON players;
CREATE POLICY "public_select_players" ON players FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_select_matches" ON matches;
CREATE POLICY "public_select_matches" ON matches FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_tryout_applications" ON tryout_applications;
CREATE POLICY "public_insert_tryout_applications" ON tryout_applications FOR INSERT
  TO anon, authenticated WITH CHECK (true);
