/*
  # Fix rest_stops created_by column

  1. Changes
    - Make created_by nullable and optional
    - Allow rest stops to be created without a valid user ID
    - This allows public contributions while maintaining optional tracking of who created it

  2. Why
    - Previous migration set created_by UUID to reference auth.users
    - When creating rest stops without auth, passing invalid UUID strings causes insert to fail
    - Making it nullable and giving it a NULL default solves this
*/

ALTER TABLE rest_stops
  ALTER COLUMN created_by DROP NOT NULL,
  ALTER COLUMN created_by SET DEFAULT NULL;