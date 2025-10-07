export interface CityWithCountry {
  city: string;
  country: string;
  cityRu?: string;
}

// European cities with countries
export const citiesWithCountries: CityWithCountry[] = [
  // Germany
  { city: 'Berlin', country: 'Deutschland', cityRu: 'Берлин' },
  { city: 'Hamburg', country: 'Deutschland', cityRu: 'Гамбург' },
  { city: 'München', country: 'Deutschland', cityRu: 'Мюнхен' },
  { city: 'Köln', country: 'Deutschland', cityRu: 'Кёльн' },
  { city: 'Frankfurt am Main', country: 'Deutschland', cityRu: 'Франкфурт-на-Майне' },
  { city: 'Stuttgart', country: 'Deutschland', cityRu: 'Штутгарт' },
  { city: 'Düsseldorf', country: 'Deutschland', cityRu: 'Дюссельдорф' },
  { city: 'Dortmund', country: 'Deutschland', cityRu: 'Дортмунд' },
  { city: 'Essen', country: 'Deutschland', cityRu: 'Эссен' },
  { city: 'Leipzig', country: 'Deutschland', cityRu: 'Лейпциг' },
  { city: 'Bremen', country: 'Deutschland', cityRu: 'Бремен' },
  { city: 'Dresden', country: 'Deutschland', cityRu: 'Дрезден' },
  { city: 'Hannover', country: 'Deutschland', cityRu: 'Ганновер' },
  { city: 'Nürnberg', country: 'Deutschland', cityRu: 'Нюрнберг' },
  { city: 'Duisburg', country: 'Deutschland', cityRu: 'Дуйсбург' },
  { city: 'Bochum', country: 'Deutschland', cityRu: 'Бохум' },
  { city: 'Wuppertal', country: 'Deutschland', cityRu: 'Вупперталь' },
  { city: 'Bielefeld', country: 'Deutschland', cityRu: 'Билефельд' },
  { city: 'Bonn', country: 'Deutschland', cityRu: 'Бонн' },
  { city: 'Münster', country: 'Deutschland', cityRu: 'Мюнстер' },
  { city: 'Karlsruhe', country: 'Deutschland', cityRu: 'Карлсруэ' },
  { city: 'Mannheim', country: 'Deutschland', cityRu: 'Мангейм' },
  { city: 'Augsburg', country: 'Deutschland', cityRu: 'Аугсбург' },
  { city: 'Wiesbaden', country: 'Deutschland', cityRu: 'Висбаден' },
  { city: 'Gelsenkirchen', country: 'Deutschland', cityRu: 'Гельзенкирхен' },
  { city: 'Mönchengladbach', country: 'Deutschland', cityRu: 'Мёнхенгладбах' },
  { city: 'Braunschweig', country: 'Deutschland', cityRu: 'Брауншвейг' },
  { city: 'Chemnitz', country: 'Deutschland', cityRu: 'Хемниц' },
  { city: 'Kiel', country: 'Deutschland', cityRu: 'Киль' },
  { city: 'Aachen', country: 'Deutschland', cityRu: 'Ахен' },
  { city: 'Halle', country: 'Deutschland', cityRu: 'Галле' },
  { city: 'Magdeburg', country: 'Deutschland', cityRu: 'Магдебург' },
  { city: 'Freiburg im Breisgau', country: 'Deutschland', cityRu: 'Фрайбург-в-Брайсгау' },
  { city: 'Krefeld', country: 'Deutschland', cityRu: 'Крефельд' },
  { city: 'Lübeck', country: 'Deutschland', cityRu: 'Любек' },
  { city: 'Oberhausen', country: 'Deutschland', cityRu: 'Оберхаузен' },
  { city: 'Erfurt', country: 'Deutschland', cityRu: 'Эрфурт' },
  { city: 'Mainz', country: 'Deutschland', cityRu: 'Майнц' },
  { city: 'Rostock', country: 'Deutschland', cityRu: 'Росток' },
  { city: 'Kassel', country: 'Deutschland', cityRu: 'Кассель' },
  { city: 'Hagen', country: 'Deutschland', cityRu: 'Хаген' },
  { city: 'Potsdam', country: 'Deutschland', cityRu: 'Потсдам' },
  { city: 'Saarbrücken', country: 'Deutschland', cityRu: 'Саарбрюккен' },
  { city: 'Hamm', country: 'Deutschland', cityRu: 'Хамм' },
  { city: 'Mülheim an der Ruhr', country: 'Deutschland', cityRu: 'Мюльхайм-на-Руре' },
  { city: 'Ludwigshafen', country: 'Deutschland', cityRu: 'Людвигсхафен' },
  { city: 'Leverkusen', country: 'Deutschland', cityRu: 'Леверкузен' },
  { city: 'Oldenburg', country: 'Deutschland', cityRu: 'Ольденбург' },
  { city: 'Neuss', country: 'Deutschland', cityRu: 'Нойс' },
  { city: 'Solingen', country: 'Deutschland', cityRu: 'Золинген' },
  { city: 'Heidelberg', country: 'Deutschland', cityRu: 'Гейдельберг' },
  { city: 'Herne', country: 'Deutschland', cityRu: 'Херне' },
  { city: 'Darmstadt', country: 'Deutschland', cityRu: 'Дармштадт' },
  { city: 'Paderborn', country: 'Deutschland', cityRu: 'Падерборн' },
  { city: 'Regensburg', country: 'Deutschland', cityRu: 'Регенсбург' },
  { city: 'Ingolstadt', country: 'Deutschland', cityRu: 'Ингольштадт' },
  { city: 'Würzburg', country: 'Deutschland', cityRu: 'Вюрцбург' },
  { city: 'Fürth', country: 'Deutschland', cityRu: 'Фюрт' },
  { city: 'Wolfsburg', country: 'Deutschland', cityRu: 'Вольфсбург' },
  { city: 'Offenbach am Main', country: 'Deutschland', cityRu: 'Оффенбах-на-Майне' },
  { city: 'Ulm', country: 'Deutschland', cityRu: 'Ульм' },
  { city: 'Heilbronn', country: 'Deutschland', cityRu: 'Хайльбронн' },
  { city: 'Pforzheim', country: 'Deutschland', cityRu: 'Пфорцхайм' },
  { city: 'Göttingen', country: 'Deutschland', cityRu: 'Гёттинген' },
  { city: 'Bottrop', country: 'Deutschland', cityRu: 'Ботроп' },
  { city: 'Trier', country: 'Deutschland', cityRu: 'Трир' },
  { city: 'Recklinghausen', country: 'Deutschland', cityRu: 'Реклингхаузен' },
  { city: 'Reutlingen', country: 'Deutschland', cityRu: 'Ройтлинген' },
  { city: 'Bremerhaven', country: 'Deutschland', cityRu: 'Бремерхафен' },
  { city: 'Koblenz', country: 'Deutschland', cityRu: 'Кобленц' },
  { city: 'Bergisch Gladbach', country: 'Deutschland', cityRu: 'Бергиш-Гладбах' },
  { city: 'Jena', country: 'Deutschland', cityRu: 'Йена' },
  { city: 'Remscheid', country: 'Deutschland', cityRu: 'Ремшайд' },
  { city: 'Erlangen', country: 'Deutschland', cityRu: 'Эрланген' },
  { city: 'Moers', country: 'Deutschland', cityRu: 'Мёрс' },
  { city: 'Siegen', country: 'Deutschland', cityRu: 'Зиген' },
  { city: 'Hildesheim', country: 'Deutschland', cityRu: 'Хильдесхайм' },
  { city: 'Salzgitter', country: 'Deutschland', cityRu: 'Зальцгиттер' },

  // France
  { city: 'Paris', country: 'Frankreich', cityRu: 'Париж' },
  { city: 'Marseille', country: 'Frankreich', cityRu: 'Марсель' },
  { city: 'Lyon', country: 'Frankreich', cityRu: 'Лион' },
  { city: 'Toulouse', country: 'Frankreich', cityRu: 'Тулуза' },
  { city: 'Nice', country: 'Frankreich', cityRu: 'Ницца' },
  { city: 'Nantes', country: 'Frankreich', cityRu: 'Нант' },
  { city: 'Strasbourg', country: 'Frankreich', cityRu: 'Страсбург' },
  { city: 'Montpellier', country: 'Frankreich', cityRu: 'Монпелье' },
  { city: 'Bordeaux', country: 'Frankreich', cityRu: 'Бордо' },
  { city: 'Lille', country: 'Frankreich', cityRu: 'Лилль' },
  { city: 'Rennes', country: 'Frankreich', cityRu: 'Ренн' },
  { city: 'Reims', country: 'Frankreich', cityRu: 'Реймс' },
  { city: 'Le Havre', country: 'Frankreich', cityRu: 'Гавр' },
  { city: 'Saint-Étienne', country: 'Frankreich', cityRu: 'Сент-Этьен' },
  { city: 'Toulon', country: 'Frankreich', cityRu: 'Тулон' },
  { city: 'Angers', country: 'Frankreich', cityRu: 'Анже' },
  { city: 'Grenoble', country: 'Frankreich', cityRu: 'Гренобль' },
  { city: 'Dijon', country: 'Frankreich', cityRu: 'Дижон' },
  { city: 'Nîmes', country: 'Frankreich', cityRu: 'Ним' },
  { city: 'Aix-en-Provence', country: 'Frankreich', cityRu: 'Экс-ан-Прованс' },

  // United Kingdom
  { city: 'London', country: 'Vereinigtes Königreich', cityRu: 'Лондон' },
  { city: 'Birmingham', country: 'Vereinigtes Königreich', cityRu: 'Бирмингем' },
  { city: 'Manchester', country: 'Vereinigtes Königreich', cityRu: 'Манчестер' },
  { city: 'Glasgow', country: 'Vereinigtes Königreich', cityRu: 'Глазго' },
  { city: 'Liverpool', country: 'Vereinigtes Königreich', cityRu: 'Ливерпуль' },
  { city: 'Leeds', country: 'Vereinigtes Königreich', cityRu: 'Лидс' },
  { city: 'Sheffield', country: 'Vereinigtes Königreich', cityRu: 'Шеффилд' },
  { city: 'Edinburgh', country: 'Vereinigtes Königreich', cityRu: 'Эдинбург' },
  { city: 'Bristol', country: 'Vereinigtes Königreich', cityRu: 'Бристоль' },
  { city: 'Cardiff', country: 'Vereinigtes Königreich', cityRu: 'Кардифф' },

  // Italy
  { city: 'Roma', country: 'Italien', cityRu: 'Рим' },
  { city: 'Milano', country: 'Italien', cityRu: 'Милан' },
  { city: 'Napoli', country: 'Italien', cityRu: 'Неаполь' },
  { city: 'Torino', country: 'Italien', cityRu: 'Турин' },
  { city: 'Palermo', country: 'Italien', cityRu: 'Палермо' },
  { city: 'Genova', country: 'Italien', cityRu: 'Генуя' },
  { city: 'Bologna', country: 'Italien', cityRu: 'Болонья' },
  { city: 'Firenze', country: 'Italien', cityRu: 'Флоренция' },
  { city: 'Bari', country: 'Italien', cityRu: 'Бари' },
  { city: 'Catania', country: 'Italien', cityRu: 'Катания' },

  // Spain
  { city: 'Madrid', country: 'Spanien', cityRu: 'Мадрид' },
  { city: 'Barcelona', country: 'Spanien', cityRu: 'Барселона' },
  { city: 'Valencia', country: 'Spanien', cityRu: 'Валенсия' },
  { city: 'Sevilla', country: 'Spanien', cityRu: 'Севилья' },
  { city: 'Zaragoza', country: 'Spanien', cityRu: 'Сарагоса' },
  { city: 'Málaga', country: 'Spanien', cityRu: 'Малага' },
  { city: 'Murcia', country: 'Spanien', cityRu: 'Мурсия' },
  { city: 'Palma', country: 'Spanien', cityRu: 'Пальма' },
  { city: 'Las Palmas', country: 'Spanien', cityRu: 'Лас-Пальмас' },
  { city: 'Bilbao', country: 'Spanien', cityRu: 'Бильбао' },

  // Poland
  { city: 'Warszawa', country: 'Polen', cityRu: 'Варшава' },
  { city: 'Kraków', country: 'Polen', cityRu: 'Краков' },
  { city: 'Łódź', country: 'Polen', cityRu: 'Лодзь' },
  { city: 'Wrocław', country: 'Polen', cityRu: 'Вроцлав' },
  { city: 'Poznań', country: 'Polen', cityRu: 'Познань' },
  { city: 'Gdańsk', country: 'Polen', cityRu: 'Гданьск' },
  { city: 'Szczecin', country: 'Polen', cityRu: 'Щецин' },
  { city: 'Bydgoszcz', country: 'Polen', cityRu: 'Быдгощ' },
  { city: 'Lublin', country: 'Polen', cityRu: 'Люблин' },
  { city: 'Białystok', country: 'Polen', cityRu: 'Белосток' },

  // Netherlands
  { city: 'Amsterdam', country: 'Niederlande', cityRu: 'Амстердам' },
  { city: 'Rotterdam', country: 'Niederlande', cityRu: 'Роттердам' },
  { city: 'Den Haag', country: 'Niederlande', cityRu: 'Гаага' },
  { city: 'Utrecht', country: 'Niederlande', cityRu: 'Утрехт' },
  { city: 'Eindhoven', country: 'Niederlande', cityRu: 'Эйндховен' },
  { city: 'Tilburg', country: 'Niederlande', cityRu: 'Тилбург' },
  { city: 'Groningen', country: 'Niederlande', cityRu: 'Гронинген' },
  { city: 'Almere', country: 'Niederlande', cityRu: 'Алмере' },
  { city: 'Breda', country: 'Niederlande', cityRu: 'Бреда' },
  { city: 'Nijmegen', country: 'Niederlande', cityRu: 'Неймеген' },

  // Belgium
  { city: 'Bruxelles', country: 'Belgien', cityRu: 'Брюссель' },
  { city: 'Antwerpen', country: 'Belgien', cityRu: 'Антверпен' },
  { city: 'Gent', country: 'Belgien', cityRu: 'Гент' },
  { city: 'Charleroi', country: 'Belgien', cityRu: 'Шарлеруа' },
  { city: 'Liège', country: 'Belgien', cityRu: 'Льеж' },
  { city: 'Brugge', country: 'Belgien', cityRu: 'Брюгге' },
  { city: 'Namur', country: 'Belgien', cityRu: 'Намюр' },
  { city: 'Leuven', country: 'Belgien', cityRu: 'Лёвен' },
  { city: 'Mons', country: 'Belgien', cityRu: 'Монс' },
  { city: 'Aalst', country: 'Belgien', cityRu: 'Алст' },

  // Austria
  { city: 'Wien', country: 'Österreich', cityRu: 'Вена' },
  { city: 'Graz', country: 'Österreich', cityRu: 'Грац' },
  { city: 'Linz', country: 'Österreich', cityRu: 'Линц' },
  { city: 'Salzburg', country: 'Österreich', cityRu: 'Зальцбург' },
  { city: 'Innsbruck', country: 'Österreich', cityRu: 'Инсбрук' },
  { city: 'Klagenfurt', country: 'Österreich', cityRu: 'Клагенфурт' },
  { city: 'Villach', country: 'Österreich', cityRu: 'Филлах' },
  { city: 'Wels', country: 'Österreich', cityRu: 'Вельс' },
  { city: 'Sankt Pölten', country: 'Österreich', cityRu: 'Санкт-Пёльтен' },
  { city: 'Dornbirn', country: 'Österreich', cityRu: 'Дорнбирн' },

  // Switzerland
  { city: 'Zürich', country: 'Schweiz', cityRu: 'Цюрих' },
  { city: 'Genève', country: 'Schweiz', cityRu: 'Женева' },
  { city: 'Basel', country: 'Schweiz', cityRu: 'Базель' },
  { city: 'Bern', country: 'Schweiz', cityRu: 'Берн' },
  { city: 'Lausanne', country: 'Schweiz', cityRu: 'Лозанна' },
  { city: 'Winterthur', country: 'Schweiz', cityRu: 'Винтертур' },
  { city: 'Luzern', country: 'Schweiz', cityRu: 'Люцерн' },
  { city: 'St. Gallen', country: 'Schweiz', cityRu: 'Санкт-Галлен' },
  { city: 'Lugano', country: 'Schweiz', cityRu: 'Лугано' },
  { city: 'Biel/Bienne', country: 'Schweiz', cityRu: 'Биль' },

  // Czech Republic
  { city: 'Praha', country: 'Tschechien', cityRu: 'Прага' },
  { city: 'Brno', country: 'Tschechien', cityRu: 'Брно' },
  { city: 'Ostrava', country: 'Tschechien', cityRu: 'Острава' },
  { city: 'Plzeň', country: 'Tschechien', cityRu: 'Пльзень' },
  { city: 'Liberec', country: 'Tschechien', cityRu: 'Либерец' },
  { city: 'Olomouc', country: 'Tschechien', cityRu: 'Оломоуц' },
  { city: 'Ústí nad Labem', country: 'Tschechien', cityRu: 'Усти-над-Лабем' },
  { city: 'České Budějovice', country: 'Tschechien', cityRu: 'Ческе-Будеёвице' },
  { city: 'Hradec Králové', country: 'Tschechien', cityRu: 'Градец-Кралове' },
  { city: 'Pardubice', country: 'Tschechien', cityRu: 'Пардубице' },

  // Slovakia
  { city: 'Bratislava', country: 'Slowakei', cityRu: 'Братислава' },
  { city: 'Košice', country: 'Slowakei', cityRu: 'Кошице' },
  { city: 'Prešov', country: 'Slowakei', cityRu: 'Прешов' },
  { city: 'Žilina', country: 'Slowakei', cityRu: 'Жилина' },
  { city: 'Banská Bystrica', country: 'Slowakei', cityRu: 'Банска-Бистрица' },
  { city: 'Nitra', country: 'Slowakei', cityRu: 'Нитра' },
  { city: 'Trnava', country: 'Slowakei', cityRu: 'Трнава' },
  { city: 'Trenčín', country: 'Slowakei', cityRu: 'Тренчин' },
  { city: 'Martin', country: 'Slowakei', cityRu: 'Мартин' },
  { city: 'Poprad', country: 'Slowakei', cityRu: 'Попрад' },

  // Hungary
  { city: 'Budapest', country: 'Ungarn', cityRu: 'Будапешт' },
  { city: 'Debrecen', country: 'Ungarn', cityRu: 'Дебрецен' },
  { city: 'Szeged', country: 'Ungarn', cityRu: 'Сегед' },
  { city: 'Miskolc', country: 'Ungarn', cityRu: 'Мишкольц' },
  { city: 'Pécs', country: 'Ungarn', cityRu: 'Печ' },
  { city: 'Győr', country: 'Ungarn', cityRu: 'Дьёр' },
  { city: 'Nyíregyháza', country: 'Ungarn', cityRu: 'Ниредьхаза' },
  { city: 'Kecskemét', country: 'Ungarn', cityRu: 'Кечкемет' },
  { city: 'Székesfehérvár', country: 'Ungarn', cityRu: 'Секешфехервар' },
  { city: 'Szombathely', country: 'Ungarn', cityRu: 'Сомбатхей' },

  // Romania
  { city: 'București', country: 'Rumänien', cityRu: 'Бухарест' },
  { city: 'Cluj-Napoca', country: 'Rumänien', cityRu: 'Клуж-Напока' },
  { city: 'Timișoara', country: 'Rumänien', cityRu: 'Тимишоара' },
  { city: 'Iași', country: 'Rumänien', cityRu: 'Яссы' },
  { city: 'Constanța', country: 'Rumänien', cityRu: 'Констанца' },
  { city: 'Craiova', country: 'Rumänien', cityRu: 'Крайова' },
  { city: 'Brașov', country: 'Rumänien', cityRu: 'Брашов' },
  { city: 'Galați', country: 'Rumänien', cityRu: 'Галац' },
  { city: 'Ploiești', country: 'Rumänien', cityRu: 'Плоешти' },
  { city: 'Oradea', country: 'Rumänien', cityRu: 'Орадя' },

  // Russia
  { city: 'Москва', country: 'Russland' },
  { city: 'Санкт-Петербург', country: 'Russland' },
  { city: 'Новосибирск', country: 'Russland' },
  { city: 'Екатеринбург', country: 'Russland' },
  { city: 'Нижний Новгород', country: 'Russland' },
  { city: 'Казань', country: 'Russland' },
  { city: 'Челябинск', country: 'Russland' },
  { city: 'Омск', country: 'Russland' },
  { city: 'Самара', country: 'Russland' },
  { city: 'Ростов-на-Дону', country: 'Russland' },
  { city: 'Уфа', country: 'Russland' },
  { city: 'Красноярск', country: 'Russland' },
  { city: 'Пермь', country: 'Russland' },
  { city: 'Воронеж', country: 'Russland' },
  { city: 'Волгоград', country: 'Russland' },
  { city: 'Краснодар', country: 'Russland' },
  { city: 'Саратов', country: 'Russland' },
  { city: 'Тюмень', country: 'Russland' },
  { city: 'Тольятти', country: 'Russland' },
  { city: 'Ижевск', country: 'Russland' },
  { city: 'Грозный', country: 'Russland' },
  { city: 'Махачкала', country: 'Russland' },
  { city: 'Владикавказ', country: 'Russland' },
  { city: 'Нальчик', country: 'Russland' },
  { city: 'Черкесск', country: 'Russland' },
  { city: 'Майкоп', country: 'Russland' },
  { city: 'Элиста', country: 'Russland' },
  { city: 'Дербент', country: 'Russland' },
  { city: 'Хасавюрт', country: 'Russland' },
  { city: 'Буйнакск', country: 'Russland' },

  // Belarus
  { city: 'Минск', country: 'Belarus' },
  { city: 'Гомель', country: 'Belarus' },
  { city: 'Могилёв', country: 'Belarus' },
  { city: 'Витебск', country: 'Belarus' },
  { city: 'Гродно', country: 'Belarus' },
  { city: 'Брест', country: 'Belarus' },
  { city: 'Бобруйск', country: 'Belarus' },
  { city: 'Барановичи', country: 'Belarus' },
  { city: 'Борисов', country: 'Belarus' },
  { city: 'Пинск', country: 'Belarus' },

  // Turkey
  { city: 'İstanbul', country: 'Türkei', cityRu: 'Стамбул' },
  { city: 'Ankara', country: 'Türkei', cityRu: 'Анкара' },
  { city: 'İzmir', country: 'Türkei', cityRu: 'Измир' },
  { city: 'Bursa', country: 'Türkei', cityRu: 'Бурса' },
  { city: 'Adana', country: 'Türkei', cityRu: 'Адана' },
  { city: 'Gaziantep', country: 'Türkei', cityRu: 'Газиантеп' },
  { city: 'Konya', country: 'Türkei', cityRu: 'Конья' },
  { city: 'Antalya', country: 'Türkei', cityRu: 'Анталья' },
  { city: 'Kayseri', country: 'Türkei', cityRu: 'Кайсери' },
  { city: 'Mersin', country: 'Türkei', cityRu: 'Мерсин' },

  // Georgia
  { city: 'თბილისი', country: 'Georgien' },
  { city: 'ბათუმი', country: 'Georgien' },
  { city: 'ქუთაისი', country: 'Georgien' },
  { city: 'რუსთავი', country: 'Georgien' },
  { city: 'გორი', country: 'Georgien' },
  { city: 'ზუგდიდი', country: 'Georgien' },
  { city: 'ფოთი', country: 'Georgien' },
  { city: 'ხაშური', country: 'Georgien' },
  { city: 'სამტრედია', country: 'Georgien' },
  { city: 'სენაკი', country: 'Georgien' },

  // Sweden
  { city: 'Stockholm', country: 'Schweden', cityRu: 'Стокгольм' },
  { city: 'Göteborg', country: 'Schweden', cityRu: 'Гётеборг' },
  { city: 'Malmö', country: 'Schweden', cityRu: 'Мальмё' },
  { city: 'Uppsala', country: 'Schweden', cityRu: 'Уппсала' },
  { city: 'Västerås', country: 'Schweden', cityRu: 'Вестерос' },
  { city: 'Örebro', country: 'Schweden', cityRu: 'Эребру' },
  { city: 'Linköping', country: 'Schweden', cityRu: 'Линчёпинг' },
  { city: 'Helsingborg', country: 'Schweden', cityRu: 'Хельсингборг' },
  { city: 'Jönköping', country: 'Schweden', cityRu: 'Йёнчёпинг' },
  { city: 'Norrköping', country: 'Schweden', cityRu: 'Норрчёпинг' },

  // Norway
  { city: 'Oslo', country: 'Norwegen', cityRu: 'Осло' },
  { city: 'Bergen', country: 'Norwegen', cityRu: 'Берген' },
  { city: 'Stavanger', country: 'Norwegen', cityRu: 'Ставангер' },
  { city: 'Trondheim', country: 'Norwegen', cityRu: 'Тронхейм' },
  { city: 'Fredrikstad', country: 'Norwegen', cityRu: 'Фредрикстад' },
  { city: 'Drammen', country: 'Norwegen', cityRu: 'Драммен' },
  { city: 'Skien', country: 'Norwegen', cityRu: 'Шиен' },
  { city: 'Kristiansand', country: 'Norwegen', cityRu: 'Кристиансанн' },
  { city: 'Ålesund', country: 'Norwegen', cityRu: 'Олесунн' },
  { city: 'Tønsberg', country: 'Norwegen', cityRu: 'Тёнсберг' },

  // Finland
  { city: 'Helsinki', country: 'Finnland', cityRu: 'Хельсинки' },
  { city: 'Espoo', country: 'Finnland', cityRu: 'Эспоо' },
  { city: 'Tampere', country: 'Finnland', cityRu: 'Тампере' },
  { city: 'Vantaa', country: 'Finnland', cityRu: 'Вантаа' },
  { city: 'Oulu', country: 'Finnland', cityRu: 'Оулу' },
  { city: 'Turku', country: 'Finnland', cityRu: 'Турку' },
  { city: 'Jyväskylä', country: 'Finnland', cityRu: 'Ювяскюля' },
  { city: 'Lahti', country: 'Finnland', cityRu: 'Лахти' },
  { city: 'Kuopio', country: 'Finnland', cityRu: 'Куопио' },
  { city: 'Pori', country: 'Finnland', cityRu: 'Пори' },

  // Denmark
  { city: 'København', country: 'Dänemark', cityRu: 'Копенгаген' },
  { city: 'Aarhus', country: 'Dänemark', cityRu: 'Орхус' },
  { city: 'Odense', country: 'Dänemark', cityRu: 'Оденсе' },
  { city: 'Aalborg', country: 'Dänemark', cityRu: 'Олборг' },
  { city: 'Esbjerg', country: 'Dänemark', cityRu: 'Эсбьерг' },
  { city: 'Randers', country: 'Dänemark', cityRu: 'Раннерс' },
  { city: 'Kolding', country: 'Dänemark', cityRu: 'Колдинг' },
  { city: 'Horsens', country: 'Dänemark', cityRu: 'Хорсенс' },
  { city: 'Vejle', country: 'Dänemark', cityRu: 'Вайле' },
  { city: 'Roskilde', country: 'Dänemark', cityRu: 'Роскилле' },

  // Portugal
  { city: 'Lisboa', country: 'Portugal', cityRu: 'Лиссабон' },
  { city: 'Porto', country: 'Portugal', cityRu: 'Порту' },
  { city: 'Vila Nova de Gaia', country: 'Portugal', cityRu: 'Вила-Нова-де-Гая' },
  { city: 'Amadora', country: 'Portugal', cityRu: 'Амадора' },
  { city: 'Braga', country: 'Portugal', cityRu: 'Брага' },
  { city: 'Funchal', country: 'Portugal', cityRu: 'Фуншал' },
  { city: 'Coimbra', country: 'Portugal', cityRu: 'Коимбра' },
  { city: 'Setúbal', country: 'Portugal', cityRu: 'Сетубал' },
  { city: 'Almada', country: 'Portugal', cityRu: 'Алмада' },
  { city: 'Agualva-Cacém', country: 'Portugal', cityRu: 'Агуалва-Касен' },

  // Middle East and North Africa
  { city: 'Medina', country: 'Saudi-Arabien', cityRu: 'Медина' },
  { city: 'Mekka', country: 'Saudi-Arabien', cityRu: 'Мекка' },
  { city: 'Riad', country: 'Saudi-Arabien', cityRu: 'Эр-Рияд' },
  { city: 'Kuwait', country: 'Kuwait', cityRu: 'Эль-Кувейт' },
  { city: 'Dschidda', country: 'Saudi-Arabien', cityRu: 'Джидда' },
  { city: 'Kairo', country: 'Ägypten', cityRu: 'Каир' },
  { city: 'Alexandria', country: 'Ägypten', cityRu: 'Александрия' },
  { city: 'Luxor', country: 'Ägypten', cityRu: 'Луксор' },
  { city: 'Hurghada', country: 'Ägypten', cityRu: 'Хургада' },
  { city: 'Marrakesch', country: 'Marokko', cityRu: 'Марракеш' },
  { city: 'Damaskus', country: 'Syrien', cityRu: 'Дамаск' },
  { city: 'Bagdad', country: 'Irak', cityRu: 'Багдад' },
  { city: 'Beirut', country: 'Libanon', cityRu: 'Бейрут' },
  { city: 'Baku', country: 'Aserbaidschan', cityRu: 'Баку' },

  // Ukraine
  { city: 'Kyjiw', country: 'Ukraine', cityRu: 'Киев' },
  { city: 'Charkiw', country: 'Ukraine', cityRu: 'Харьков' },
  { city: 'Dnipro', country: 'Ukraine', cityRu: 'Днепр' },
  { city: 'Lwiw', country: 'Ukraine', cityRu: 'Львов' },
  { city: 'Odessa', country: 'Ukraine', cityRu: 'Одесса' },

  // Greece
  { city: 'Athen', country: 'Griechenland', cityRu: 'Афины' },

  // Balkan cities
  { city: 'Pristina', country: 'Kosovo', cityRu: 'Приштина' },
  { city: 'Skopje', country: 'Nordmazedonien', cityRu: 'Скопье' },
  { city: 'Podgorica', country: 'Montenegro', cityRu: 'Подгорица' },
  { city: 'Belgrad', country: 'Serbien', cityRu: 'Белград' },
  { city: 'Dubrovnik', country: 'Kroatien', cityRu: 'Дубровник' },
  { city: 'Split', country: 'Kroatien', cityRu: 'Сплит' },
  { city: 'Tirana', country: 'Albanien', cityRu: 'Тирана' },
  { city: 'Sofia', country: 'Bulgarien', cityRu: 'София' },

  // Baltic cities
  { city: 'Vilnius', country: 'Litauen', cityRu: 'Вильнюс' },
  { city: 'Riga', country: 'Lettland', cityRu: 'Рига' },
  { city: 'Kaunas', country: 'Litauen', cityRu: 'Каунас' }
];

// Keep the old cities array for backward compatibility
export const cities = citiesWithCountries.map(item => item.city);

export const getCitySuggestions = (input: string, limit: number = 10): CityWithCountry[] => {
  if (!input.trim()) return [];

  const searchTerm = input.toLowerCase().trim();

  return citiesWithCountries
    .filter(item => {
      const cityMatch = item.city.toLowerCase().includes(searchTerm);
      const cityRuMatch = item.cityRu?.toLowerCase().includes(searchTerm);
      return cityMatch || cityRuMatch;
    })
    .sort((a, b) => {
      const aLower = a.city.toLowerCase();
      const bLower = b.city.toLowerCase();
      const aRuLower = a.cityRu?.toLowerCase() || '';
      const bRuLower = b.cityRu?.toLowerCase() || '';

      // Prioritize exact matches (either original or Russian)
      if (aLower === searchTerm || aRuLower === searchTerm) return -1;
      if (bLower === searchTerm || bRuLower === searchTerm) return 1;

      // Then prioritize cities that start with the search term
      const aStarts = aLower.startsWith(searchTerm) || aRuLower.startsWith(searchTerm);
      const bStarts = bLower.startsWith(searchTerm) || bRuLower.startsWith(searchTerm);
      if (aStarts && !bStarts) return -1;
      if (bStarts && !aStarts) return 1;

      // Finally sort alphabetically
      return a.city.localeCompare(b.city);
    })
    .slice(0, limit);
};