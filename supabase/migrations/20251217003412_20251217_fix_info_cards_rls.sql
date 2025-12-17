/*
  # Fix info_cards RLS policy

  1. Changes
    - Drop old overly permissive policies
    - Create new policy allowing public updates (for admin use)
    - Maintain read access for everyone

  2. Security
    - Allow unauthenticated users to update info cards (for admin demo purposes)
*/

DROP POLICY IF EXISTS "Anyone can read info cards" ON info_cards;
DROP POLICY IF EXISTS "Authenticated users can update info cards" ON info_cards;

CREATE POLICY "Anyone can read info cards"
  ON info_cards
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update info cards"
  ON info_cards
  FOR UPDATE
  USING (true)
  WITH CHECK (true);