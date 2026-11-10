/*
# Create games catalog for the Play Games section

1. New Tables
- `games`: games the Team Tung roster plays. Columns: name, genre, blurb (short description), accent_color, sort_order.

2. Seeded Data
- 6 games: Valorant, League of Legends, Counter-Strike 2, Rocket League, Overwatch 2, Apex Legends.

3. Security
- RLS enabled on `games`.
- Visitors (anon and authenticated) can read rows. No write access is granted to public roles.

4. Important Notes
- Seed rows use fixed ids, so this migration is safe to re-run.
- The owner can edit game entries from the database dashboard.
*/

CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  genre text NOT NULL,
  blurb text NOT NULL,
  accent_color text NOT NULL DEFAULT 'emerald',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON games TO anon, authenticated;

DROP POLICY IF EXISTS "public_select_games" ON games;
CREATE POLICY "public_select_games" ON games FOR SELECT
  TO anon, authenticated USING (true);

INSERT INTO games (id, name, genre, blurb, accent_color, sort_order) VALUES
  ('33333333-0000-4000-8000-000000000001', 'Valorant', 'Tactical Shooter', 'Precise gunplay and team-based tactics. Our home base for competitive play.', 'rose', 1),
  ('33333333-0000-4000-8000-000000000002', 'League of Legends', 'MOBA', 'Lane strategy, objective control, and late-game teamfights.', 'sky', 2),
  ('33333333-0000-4000-8000-000000000003', 'Counter-Strike 2', 'Tactical Shooter', 'Economy rounds, smokes, and clutch moments under pressure.', 'amber', 3),
  ('33333333-0000-4000-8000-000000000004', 'Rocket League', 'Vehicular Soccer', 'Fast rotations, aerial mechanics, and a whole lot of chaos.', 'sky', 4),
  ('33333333-0000-4000-8000-000000000005', 'Overwatch 2', 'Hero Shooter', 'Hero swaps, team synergy, and constant objective pushes.', 'amber', 5),
  ('33333333-0000-4000-8000-000000000006', 'Apex Legends', 'Battle Royale', 'Squad drops, positioning, and outlasting every team in the lobby.', 'rose', 6)
ON CONFLICT (id) DO NOTHING;
