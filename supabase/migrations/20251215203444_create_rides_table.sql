/*
  # Create Rides Table

  1. New Tables
    - `rides`
      - `id` (uuid, primary key)
      - `driver_email` (text) - Driver's email
      - `from` (text) - Starting location
      - `to` (text) - Destination
      - `date` (text) - Ride date (DD.MM.YYYY format)
      - `time` (text) - Ride time
      - `price` (text) - Price per seat
      - `available_seats` (integer) - Number of available seats
      - `booked_seats` (integer) - Number of booked seats
      - `car_model` (text) - Car model
      - `car_year` (text) - Car year
      - `mobile` (text) - Driver mobile number
      - `whatsapp` (text) - Driver WhatsApp number
      - `telegram` (text) - Driver Telegram handle
      - `information` (text) - Additional ride information
      - `ip_address` (text) - Client IP for spam/duplicate detection
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on rides table
    - Add policy for public read (everyone can see rides)
    - Add policy for insert/update/delete (driver only)
*/

CREATE TABLE IF NOT EXISTS rides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_email text NOT NULL,
  from_location text NOT NULL,
  to_location text NOT NULL,
  stopovers text[] DEFAULT '{}',
  date text NOT NULL,
  time text NOT NULL,
  price text NOT NULL,
  available_seats integer NOT NULL DEFAULT 0,
  booked_seats integer NOT NULL DEFAULT 0,
  car_model text,
  car_year text,
  car_image text,
  mobile text,
  whatsapp text,
  telegram text,
  information text,
  rating numeric DEFAULT 0,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view rides"
  ON rides
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own rides"
  ON rides
  FOR INSERT
  TO authenticated
  WITH CHECK (driver_email = auth.jwt()->>'email');

CREATE POLICY "Users can update their own rides"
  ON rides
  FOR UPDATE
  TO authenticated
  USING (driver_email = auth.jwt()->>'email')
  WITH CHECK (driver_email = auth.jwt()->>'email');

CREATE POLICY "Users can delete their own rides"
  ON rides
  FOR DELETE
  TO authenticated
  USING (driver_email = auth.jwt()->>'email');