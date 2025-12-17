/*
  # Remove images array to improve performance

  1. Changes
    - Remove the `images` JSONB column to reduce payload size
    - Keep only the single `image` column (main image)
    - This improves loading performance by removing large base64 arrays from each request

  2. Rationale
    - Each REST Stop was storing multiple base64-encoded images as JSONB
    - This caused large payloads that slowed down fetching
    - Using a single main image is more performant and practical
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rest_stops' AND column_name = 'images'
  ) THEN
    ALTER TABLE rest_stops DROP COLUMN images;
  END IF;
END $$;
