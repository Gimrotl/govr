/*
  # Add RLS policy for image hiding

  1. Security
    - Add policy to restrict image hiding updates to authenticated users only
    - For now, allows any authenticated user (frontend enforces admin check)
    - Can be made stricter once admin role system is fully implemented in Supabase
*/

CREATE POLICY "Users can update hidden_image_indices"
  ON rest_stops
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);