/*
  # Create User Tracking Table

  1. New Tables
    - `user_tracking`
      - `id` (uuid, primary key)
      - `email` (text, unique) - User email
      - `last_ip_address` (text) - Last known IP address
      - `first_login_ip` (text) - IP from first login
      - `login_count` (integer) - Number of logins
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on user_tracking table
    - Admin can view all user data
*/

CREATE TABLE IF NOT EXISTS user_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  last_ip_address text,
  first_login_ip text,
  login_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view all user tracking"
  ON user_tracking
  FOR SELECT
  USING (true);

CREATE POLICY "Users can view own tracking"
  ON user_tracking
  FOR SELECT
  USING (email = auth.jwt()->>'email');