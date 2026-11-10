/*
# Seed Team Tung placeholder roster and matches

1. Seeded Data
- 5 players in `players` (placeholder handles, roles, and stats the owner can replace).
- 6 matches in `matches` (3 upcoming, 3 past results).

2. Security
- No policy or grant changes; this only inserts rows.

3. Important Notes
- Rows use fixed ids so the migration is safe to re-run.
- Placeholder content should be replaced with the real roster and schedule.
*/

INSERT INTO players (id, handle, real_name, role, game, bio, accent_color, kills, deaths, assists, sort_order) VALUES
  ('11111111-0000-4000-8000-000000000001', 'TUNG-IRON', 'Marcus Reed', 'Duelist', 'Valorant', 'First-pick specialist who opens every round with aggression and clean mechanics.', 'emerald', 412, 298, 96, 1),
  ('11111111-0000-4000-8000-000000000002', 'VOLT', 'Ethan Park', 'Controller', 'Valorant', 'Smoke wizard who controls the map tempo and sets up the team for executes.', 'sky', 356, 301, 188, 2),
  ('11111111-0000-4000-8000-000000000003', 'NOVA', 'Dani Ruiz', 'Sentinel', 'Valorant', 'Anchors sites under pressure and calls the defensive rotations.', 'amber', 290, 262, 141, 3),
  ('11111111-0000-4000-8000-000000000004', 'HALO-K', 'Jordan Lee', 'Initiator', 'Valorant', 'Flash-and-info player who makes the first contact count every single round.', 'rose', 331, 280, 207, 4),
  ('11111111-0000-4000-8000-000000000005', 'GHOST', 'Sam Ortiz', 'Flex / IGL', 'Valorant', 'In-game leader with a read on the enemy economy that keeps the team disciplined.', 'emerald', 301, 244, 173, 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO matches (id, opponent, game, event_name, match_date, team_score, opponent_score, status) VALUES
  ('22222222-0000-4000-8000-000000000001', 'Night Owls', 'Valorant', 'Winter Clash Open', '2026-11-22T19:00:00Z', NULL, NULL, 'upcoming'),
  ('22222222-0000-4000-8000-000000000002', 'Pixel Wolves', 'Valorant', 'Winter Clash Open', '2026-11-29T20:30:00Z', NULL, NULL, 'upcoming'),
  ('22222222-0000-4000-8000-000000000003', 'Apex Havoc', 'Valorant', 'Regional Qualifier', '2026-12-06T18:00:00Z', NULL, NULL, 'upcoming'),
  ('22222222-0000-4000-8000-000000000004', 'Frostbite', 'Valorant', 'Autumn Ladder', '2026-10-30T19:00:00Z', 13, 9, 'win'),
  ('22222222-0000-4000-8000-000000000005', 'Neon Rangers', 'Valorant', 'Autumn Ladder', '2026-10-23T21:00:00Z', 8, 13, 'loss'),
  ('22222222-0000-4000-8000-000000000006', 'Shadow Syndicate', 'Valorant', 'Autumn Ladder', '2026-10-16T19:30:00Z', 13, 4, 'win')
ON CONFLICT (id) DO NOTHING;
