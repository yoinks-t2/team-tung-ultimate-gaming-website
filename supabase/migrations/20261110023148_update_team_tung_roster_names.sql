/*
# Update Team Tung roster to real player names

1. Modified Tables
- `players`: the four real members (Vincent, Deniz, Brandon, Jia Jun) replace the placeholder handles.
- Placeholder bios, roles, and stats are cleared since they were not real data.

2. Removed Rows
- The fifth placeholder player is removed from `players`. No other tables reference this row.

3. Security
- No policy or grant changes.

4. Important Notes
- Re-running this migration is safe: each update targets fixed ids and the delete only matches the placeholder id.
*/

UPDATE players SET handle = 'Vincent', real_name = NULL, role = 'Player', bio = NULL, kills = 0, deaths = 0, assists = 0, sort_order = 1
  WHERE id = '11111111-0000-4000-8000-000000000001';
UPDATE players SET handle = 'Deniz', real_name = NULL, role = 'Player', bio = NULL, kills = 0, deaths = 0, assists = 0, sort_order = 2
  WHERE id = '11111111-0000-4000-8000-000000000002';
UPDATE players SET handle = 'Brandon', real_name = NULL, role = 'Player', bio = NULL, kills = 0, deaths = 0, assists = 0, sort_order = 3
  WHERE id = '11111111-0000-4000-8000-000000000003';
UPDATE players SET handle = 'Jia Jun', real_name = NULL, role = 'Player', bio = NULL, kills = 0, deaths = 0, assists = 0, sort_order = 4
  WHERE id = '11111111-0000-4000-8000-000000000004';
DELETE FROM players WHERE id = '11111111-0000-4000-8000-000000000005';
