/*
# Create game play requests

1. New Tables
- `game_requests`: visitor requests to play a game with Team Tung. Columns: game (linked to the game they picked), player name, contact info, preferred time, optional message, and created time.

2. Security
- RLS enabled on `game_requests`.
- Visitors (anon and authenticated) can only insert new requests. They cannot read, edit, or delete requests.
- Only INSERT is granted.

3. Important Notes
- Requests are reviewed by the team from the database dashboard.
- Deleting a game sets the linked game on any existing requests to empty instead of removing them.
*/

CREATE TABLE IF NOT EXISTS game_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid REFERENCES games(id) ON DELETE SET NULL,
  player_name text NOT NULL,
  contact text NOT NULL,
  preferred_time text,
  message text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS game_requests_game_id_idx ON game_requests (game_id);

ALTER TABLE game_requests ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON game_requests TO anon, authenticated;

DROP POLICY IF EXISTS "public_insert_game_requests" ON game_requests;
CREATE POLICY "public_insert_game_requests" ON game_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);
