/*
  # Add images array column to rest_stops

  1. Changes
    - Add `images` column (text array) to store multiple image URLs
    - Migrate existing single image to images array

  2. Notes
    - Existing single image is preserved in the images array
    - The first image in the array will be the main image
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rest_stops' AND column_name = 'images'
  ) THEN
    ALTER TABLE rest_stops ADD COLUMN images text[] DEFAULT '{}';
  END IF;
END $$;

UPDATE rest_stops 
SET images = ARRAY[image]
WHERE image IS NOT NULL 
  AND image != '' 
  AND (images IS NULL OR images = '{}');