/*
  # Add hidden image indices to rest stops

  1. New Columns
    - `hidden_image_indices` - JSONB array storing indices of hidden images (e.g., [2, 5, 7])
    - Allows admins to selectively hide individual images from the 10 predefined images

  2. Changes
    - Add `hidden_image_indices` column with default empty array
    - Initialize all existing rest stops with empty array

  3. Notes
    - Images are not deleted, just marked as hidden via indices
    - Admins can unhide images by removing indices from this array
    - Makes it easy to toggle visibility without data loss
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rest_stops' AND column_name = 'hidden_image_indices'
  ) THEN
    ALTER TABLE rest_stops ADD COLUMN hidden_image_indices jsonb DEFAULT '[]';
  END IF;
END $$;