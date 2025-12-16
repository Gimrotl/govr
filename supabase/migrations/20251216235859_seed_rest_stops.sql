/*
  # Seed Rest Stops Data

  Initial data for demonstration and testing
*/

INSERT INTO rest_stops (name, type, location, address, rating, description, full_description, image, amenities, coordinates, created_by)
VALUES
  (
    'Raststätte Geiselwind',
    'Raststätte',
    'Geiselwind',
    'A3 Raststätte Geiselwind, 96160 Geiselwind',
    4.3,
    'Große Raststätte mit Restaurant, Tankstelle und Spielplatz. Perfekt für...',
    'Große Raststätte mit Restaurant, Tankstelle und Spielplatz. Perfekt für Familien mit Kindern. Die Raststätte bietet eine Vielzahl von Restaurants und Imbissen, saubere Sanitäranlagen und einen großen Parkplatz für PKW und LKW. Der Spielplatz ist modern ausgestattet und bietet Kindern verschiedene Spielmöglichkeiten.',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    '["WC", "Kinder", "Sport", "Grün"]',
    '{"lat": 49.7667, "lng": 10.4667}',
    auth.uid()
  ),
  (
    'Hotel Gasthof Zur Post',
    'Hotel',
    'Lauf an der Pegnitz',
    'Hauptstraße 12, 91207 Lauf an der Pegnitz',
    4.7,
    'Gemütliches Hotel mit Restaurant und Biergarten. Ideal für Übernachtungen auf...',
    'Gemütliches Hotel mit Restaurant und Biergarten. Ideal für Übernachtungen auf längeren Reisen. Das traditionelle Gasthaus bietet komfortable Zimmer, regionale Küche und einen schönen Biergarten. Die Lage ist ruhig und dennoch verkehrsgünstig gelegen.',
    'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    '["WC", "Hotel", "Essen", "Parkplatz"]',
    '{"lat": 49.5167, "lng": 11.2833}',
    auth.uid()
  ),
  (
    'Shell Tankstelle Würzburg',
    'Tankstelle',
    'Würzburg',
    'Würzburger Straße 45, 97082 Würzburg',
    4.1,
    'Moderne Tankstelle mit Shop, Café und sauberen Sanitäranlagen.',
    'Moderne Tankstelle mit Shop, Café und sauberen Sanitäranlagen. Die Tankstelle bietet alle gängigen Kraftstoffe, einen gut sortierten Shop mit Reiseproviant und warmen Snacks. Die Sanitäranlagen werden regelmäßig gereinigt und sind barrierefrei zugänglich.',
    'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpeg',
    '["WC", "Tankstelle", "Essen", "Autowaschen"]',
    '{"lat": 49.7913, "lng": 9.9534}',
    auth.uid()
  ),
  (
    'Restaurant Waldblick',
    'Restaurant',
    'Bad Hersfeld',
    'Waldweg 8, 36251 Bad Hersfeld',
    4.5,
    'Familienrestaurant mit regionaler Küche und herrlichem Blick in den...',
    'Familienrestaurant mit regionaler Küche und herrlichem Blick in den Wald. Das Restaurant bietet traditionelle deutsche Küche mit frischen, regionalen Zutaten. Die Terrasse mit Waldblick lädt zum Verweilen ein. Besonders empfehlenswert sind die hausgemachten Kuchen und das Wild aus der Region.',
    'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
    '["WC", "Kinder", "Essen", "Esstisch", "Parkplatz"]',
    '{"lat": 50.8667, "lng": 9.7}',
    auth.uid()
  ),
  (
    'Autohof München Süd',
    'Raststätte',
    'München',
    'A8 Autohof München Süd, 85521 Ottobrunn',
    4.2,
    'Großer Autohof mit vielen Restaurants und Einkaufsmöglichkeiten.',
    'Großer Autohof mit vielen Restaurants und Einkaufsmöglichkeiten. Der Autohof bietet eine große Auswahl an Restaurants, von Fast Food bis hin zu gehobener Küche. Zusätzlich gibt es Einkaufsmöglichkeiten, eine Apotheke und verschiedene Dienstleistungen für Reisende.',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    '["WC", "Kinder", "Sport", "Essen", "Tankstelle", "Duschen", "Parkplatz"]',
    '{"lat": 48.0667, "lng": 11.6667}',
    auth.uid()
  )
ON CONFLICT DO NOTHING;
