/*
  # Add route field to rest_stops table

  1. Changes
    - Add `route` column to `rest_stops` table to categorize each rest stop into one of three routes:
      - 'eastern': Östliche Routen
      - 'baltic': Baltische und östliche Staaten  
      - 'southern': Südliche Routen
    - Default value is 'eastern' for existing records
    - Column is NOT NULL with DEFAULT value

  2. Purpose
    - Allow rest stops to belong to a specific route
    - Enable filtering rest stops by route in the UI
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rest_stops' AND column_name = 'route'
  ) THEN
    ALTER TABLE rest_stops 
    ADD COLUMN route TEXT NOT NULL DEFAULT 'eastern' 
    CHECK (route IN ('eastern', 'baltic', 'southern'));
  END IF;
END $$;
