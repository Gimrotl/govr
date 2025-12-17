/*
  # Add Images Array to Rest Stops

  1. Changes
    - Add `images` column as JSONB array to store multiple image URLs
    - Migrate existing `image` data to `images` array
    - Keep `image` column for backward compatibility (stores first image)

  2. Notes
    - images column stores array of image URLs
    - First image in array is used as the main/preview image
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rest_stops' AND column_name = 'images'
  ) THEN
    ALTER TABLE rest_stops ADD COLUMN images jsonb DEFAULT '[]';
    
    UPDATE rest_stops
    SET images = CASE 
      WHEN image IS NOT NULL AND image != '' 
      THEN jsonb_build_array(image)
      ELSE '[]'::jsonb
    END
    WHERE images = '[]'::jsonb;
  END IF;
END $$;