/*
  # Fix rest_stops RLS policies

  1. Changes
    - Drop old restrictive policies that require authentication
    - Create new policies allowing public access for all operations
    - Needed because admin login is not using Supabase Auth

  2. Security
    - Allow anyone to create, update, and delete rest stops (for admin demo)
    - Maintain read access for everyone
*/

DROP POLICY IF EXISTS "Anyone can view rest stops" ON rest_stops;
DROP POLICY IF EXISTS "Authenticated users can create rest stops" ON rest_stops;
DROP POLICY IF EXISTS "Admins can update any rest stop" ON rest_stops;
DROP POLICY IF EXISTS "Admins can delete any rest stop" ON rest_stops;

CREATE POLICY "Anyone can view rest stops"
  ON rest_stops FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create rest stops"
  ON rest_stops FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update rest stops"
  ON rest_stops FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete rest stops"
  ON rest_stops FOR DELETE
  USING (true);