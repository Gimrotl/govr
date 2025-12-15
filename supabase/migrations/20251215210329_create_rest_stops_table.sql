/*
  # Create Rest Stops Table

  1. New Tables
    - `rest_stops`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (enum: Raststätte, Hotel, Tankstelle, Restaurant)
      - `location` (text)
      - `address` (text)
      - `rating` (numeric)
      - `description` (text)
      - `full_description` (text)
      - `image` (text - base64 or URL)
      - `amenities` (jsonb array)
      - `coordinates` (jsonb with lat, lng)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `created_by` (uuid - foreign key to auth.users)

  2. Security
    - Enable RLS on `rest_stops` table
    - Add policy for public read access
    - Add policy for authenticated users to manage their own rest stops
    - Add policy for admin to manage all rest stops
*/

CREATE TYPE rest_stop_type AS ENUM ('Raststätte', 'Hotel', 'Tankstelle', 'Restaurant');

CREATE TABLE IF NOT EXISTS rest_stops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type rest_stop_type NOT NULL,
  location text NOT NULL,
  address text NOT NULL,
  rating numeric(3,1) DEFAULT 4.0,
  description text,
  full_description text,
  image text,
  amenities jsonb DEFAULT '[]',
  coordinates jsonb DEFAULT '{"lat": 0, "lng": 0}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE rest_stops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view rest stops"
  ON rest_stops FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create rest stops"
  ON rest_stops FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Admins can update any rest stop"
  ON rest_stops FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid() OR (auth.jwt() ->> 'role') = 'admin')
  WITH CHECK (created_by = auth.uid() OR (auth.jwt() ->> 'role') = 'admin');

CREATE POLICY "Admins can delete any rest stop"
  ON rest_stops FOR DELETE
  TO authenticated
  USING (created_by = auth.uid() OR (auth.jwt() ->> 'role') = 'admin');

CREATE INDEX idx_rest_stops_type ON rest_stops(type);
CREATE INDEX idx_rest_stops_created_by ON rest_stops(created_by);
