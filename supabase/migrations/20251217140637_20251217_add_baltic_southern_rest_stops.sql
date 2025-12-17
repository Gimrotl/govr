/*
  # Add Baltic and Southern Rest Stops

  1. New Data
    - Add 4 rest stops for Baltic route
    - Add 4 rest stops for Southern route
*/

INSERT INTO rest_stops (name, type, location, address, rating, description, full_description, image, amenities, route) VALUES
-- Baltic Route
('Autohof Dresden', 'Raststätte', 'Dresden', 'Autobahn A4, Dresden', 4.5, 'Moderner Rastplatz mit vollständiger Ausstattung', 'Ein großer Rastplatz mit Restaurant, WC, Duschen und Parkplätzen. Perfekt zum Ausruhen auf dem Weg nach Polen und Litauen.', 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg', '["WC", "Restaurant", "Duschen", "Parkplatz"]', 'baltic'),
('Hotel Warsaw Express', 'Hotel', 'Warschau', 'Al. Jerozolimskie 42, Warschau', 4.2, 'Komfortables Hotel nahe der Autobahn', 'Modernes Hotel mit schnellem Check-in für Durchreisende. Kostenlose Parkplätze und kostenloses WLAN.', 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg', '["WC", "Parkplatz", "Restaurant"]', 'baltic'),
('Vilnius Service Stop', 'Tankstelle', 'Vilnius', 'A1 Autobahn, Vilnius', 4.3, 'Moderne Tankstelle mit Shop und Restaurant', 'Vollservice Tankstelle mit 24/7 Betrieb, Restaurant und Annehmlichkeiten für lange Fahrten.', 'https://images.pexels.com/photos/3862621/pexels-photo-3862621.jpeg', '["WC", "Restaurant", "Parkplatz"]', 'baltic'),
('Riga Transit Hotel', 'Hotel', 'Riga', 'Brīvības iela 32, Riga', 4.4, 'Budget-freundliches Hotel für Durchreisende', 'Einfaches, sauberes Hotel mit gutem Service. Zentrale Lage und gute Erreichbarkeit.', 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg', '["WC", "Parkplatz", "Restaurant", "Kinderfreundlich"]', 'baltic'),

-- Southern Route
('Rastplatz Passau', 'Raststätte', 'Passau', 'Autobahn A3, Passau', 4.6, 'Ausgezeichneter Rastplatz an der Donau', 'Großer Rastplatz mit herrlichem Blick auf die Donau. Gutes Restaurant, WC, Spielplatz für Kinder und ausreichend Parkplätze.', 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg', '["WC", "Restaurant", "Kinderfreundlich", "Grün", "Parkplatz"]', 'southern'),
('Budapest Hotel Central', 'Hotel', 'Budapest', 'Vörösmarty tér 1, Budapest', 4.5, 'Luxuriöses Hotel im Zentrum', 'Elegantes Hotel mit ausgezeichnetem Service, Restaurant und Wellness-Bereich. Perfekt zum Ausruhen auf längeren Reisen.', 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg', '["WC", "Restaurant", "Parkplatz"]', 'southern'),
('Turkish Truck Stop', 'Restaurant', 'Istanbul', 'E90 Autobahn, Istanbul', 4.3, 'Traditionelles Restaurant mit Tankstelle', 'Authentisches türkisches Restaurant mit großem Parkplatz für LKW und PKW. Hausmannskost und schneller Service.', 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg', '["WC", "Restaurant", "Parkplatz"]', 'southern'),
('Athens Highway Hotel', 'Hotel', 'Athen', 'Leoforos Mesogeion 1, Athen', 4.2, 'Modernes Hotel an der Ausfallstraße', 'Zweckmäßiges Hotel mit guter Erreichbarkeit. Günstige Preise und schneller Service für Durchreisende.', 'https://images.pexels.com/photos/3531446/pexels-photo-3531446.jpeg', '["WC", "Restaurant", "Parkplatz", "Sport"]', 'southern');
