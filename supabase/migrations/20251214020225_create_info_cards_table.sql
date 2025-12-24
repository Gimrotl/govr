/*
  # Create info_cards table

  1. New Tables
    - `info_cards`
      - `id` (uuid, primary key)
      - `title` (text) - Card title
      - `description` (text) - Card description text
      - `link_text` (text) - Text for the link/button
      - `order_index` (integer) - Display order
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `info_cards` table
    - Add policy for public read access
    - Add policy for authenticated admin updates
*/

CREATE TABLE IF NOT EXISTS info_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  link_text text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE info_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read info cards"
  ON info_cards
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can update info cards"
  ON info_cards
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO info_cards (title, description, link_text, order_index) VALUES
  ('Не берите слишком много груза. Берите только то, что вам необходимо. Так вы сэкономите на таможне время и нервы', 'Mehr erfahren', 1), 
  ('Zoll Infos', 'Zollbestimmungen und Einfuhrregeln fuer die Grenzueberquerung. Informieren Sie sich ueber erlaubte Waren und Freigrenzen.', 'Zollinfos anzeigen', 2),
  ('Gepaeck Infos', 'Nehmen Sie bis zu 20 Kilo Gepaeck kostenlos mit. Fuer zusaetzliches Gepaeck koennen weitere 25 Kilo hinzugefuegt werden.', 'Entdecken Sie mehr', 3)
ON CONFLICT DO NOTHING;