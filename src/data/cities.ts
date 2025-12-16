export interface CityWithCountry {
  city: string;
  country: string;
  cityRu?: string;
  cityEn?: string;
}

// European cities with countries
export const citiesWithCountries: CityWithCountry[] = [
  // Germany
  { city: 'Berlin', country: 'Germany', cityRu: 'Берлин' },
  { city: 'Hamburg', country: 'Germany', cityRu: 'Гамбург' },
  { city: 'München', country: 'Germany', cityRu: 'Мюнхен' },
  { city: 'Köln', country: 'Germany', cityRu: 'Кёльн' },
  { city: 'Frankfurt am Main', country: 'Germany', cityRu: 'Франкфурт-на-Майне' },
  { city: 'Stuttgart', country: 'Germany', cityRu: 'Штутгарт' },
  { city: 'Düsseldorf', country: 'Germany', cityRu: 'Дюссельдорф' },
  { city: 'Dortmund', country: 'Germany', cityRu: 'Дортмунд' },
  { city: 'Essen', country: 'Germany', cityRu: 'Эссен' },
  { city: 'Leipzig', country: 'Germany', cityRu: 'Лейпциг' },
  { city: 'Bremen', country: 'Germany', cityRu: 'Бремен' },
  { city: 'Dresden', country: 'Germany', cityRu: 'Дрезден' },
  { city: 'Hannover', country: 'Germany', cityRu: 'Ганновер' },
  { city: 'Nürnberg', country: 'Germany', cityRu: 'Нюрнберг' },
  { city: 'Duisburg', country: 'Germany', cityRu: 'Дуйсбург' },
  { city: 'Bochum', country: 'Germany', cityRu: 'Бохум' },
  { city: 'Wuppertal', country: 'Germany', cityRu: 'Вупперталь' },
  { city: 'Bielefeld', country: 'Germany', cityRu: 'Билефельд' },
  { city: 'Bonn', country: 'Germany', cityRu: 'Бонн' },
  { city: 'Münster', country: 'Germany', cityRu: 'Мюнстер' },
  { city: 'Karlsruhe', country: 'Germany', cityRu: 'Карлсруэ' },
  { city: 'Mannheim', country: 'Germany', cityRu: 'Мангейм' },
  { city: 'Augsburg', country: 'Germany', cityRu: 'Аугсбург' },
  { city: 'Wiesbaden', country: 'Germany', cityRu: 'Висбаден' },
  { city: 'Gelsenkirchen', country: 'Germany', cityRu: 'Гельзенкирхен' },
  { city: 'Mönchengladbach', country: 'Germany', cityRu: 'Мёнхенгладбах' },
  { city: 'Braunschweig', country: 'Germany', cityRu: 'Брауншвейг' },
  { city: 'Chemnitz', country: 'Germany', cityRu: 'Хемниц' },
  { city: 'Kiel', country: 'Germany', cityRu: 'Киль' },
  { city: 'Aachen', country: 'Germany', cityRu: 'Ахен' },
  { city: 'Halle', country: 'Germany', cityRu: 'Галле' },
  { city: 'Magdeburg', country: 'Germany', cityRu: 'Магдебург' },
  { city: 'Freiburg im Breisgau', country: 'Germany', cityRu: 'Фрайбург-в-Брайсгау' },
  { city: 'Krefeld', country: 'Germany', cityRu: 'Крефельд' },
  { city: 'Lübeck', country: 'Germany', cityRu: 'Любек' },
  { city: 'Oberhausen', country: 'Germany', cityRu: 'Оберхаузен' },
  { city: 'Erfurt', country: 'Germany', cityRu: 'Эрфурт' },
  { city: 'Mainz', country: 'Germany', cityRu: 'Майнц' },
  { city: 'Rostock', country: 'Germany', cityRu: 'Росток' },
  { city: 'Kassel', country: 'Germany', cityRu: 'Кассель' },
  { city: 'Hagen', country: 'Germany', cityRu: 'Хаген' },
  { city: 'Potsdam', country: 'Germany', cityRu: 'Потсдам' },
  { city: 'Saarbrücken', country: 'Germany', cityRu: 'Саарбрюккен' },
  { city: 'Hamm', country: 'Germany', cityRu: 'Хамм' },
  { city: 'Mülheim an der Ruhr', country: 'Germany', cityRu: 'Мюльхайм-на-Руре' },
  { city: 'Ludwigshafen', country: 'Germany', cityRu: 'Людвигсхафен' },
  { city: 'Leverkusen', country: 'Germany', cityRu: 'Леверкузен' },
  { city: 'Oldenburg', country: 'Germany', cityRu: 'Ольденбург' },
  { city: 'Neuss', country: 'Germany', cityRu: 'Нойс' },
  { city: 'Solingen', country: 'Germany', cityRu: 'Золинген' },
  { city: 'Heidelberg', country: 'Germany', cityRu: 'Гейдельберг' },
  { city: 'Herne', country: 'Germany', cityRu: 'Херне' },
  { city: 'Darmstadt', country: 'Germany', cityRu: 'Дармштадт' },
  { city: 'Paderborn', country: 'Germany', cityRu: 'Падерборн' },
  { city: 'Regensburg', country: 'Germany', cityRu: 'Регенсбург' },
  { city: 'Ingolstadt', country: 'Germany', cityRu: 'Ингольштадт' },
  { city: 'Würzburg', country: 'Germany', cityRu: 'Вюрцбург' },
  { city: 'Fürth', country: 'Germany', cityRu: 'Фюрт' },
  { city: 'Wolfsburg', country: 'Germany', cityRu: 'Вольфсбург' },
  { city: 'Offenbach am Main', country: 'Germany', cityRu: 'Оффенбах-на-Майне' },
  { city: 'Ulm', country: 'Germany', cityRu: 'Ульм' },
  { city: 'Heilbronn', country: 'Germany', cityRu: 'Хайльбронн' },
  { city: 'Pforzheim', country: 'Germany', cityRu: 'Пфорцхайм' },
  { city: 'Göttingen', country: 'Germany', cityRu: 'Гёттинген' },
  { city: 'Bottrop', country: 'Germany', cityRu: 'Ботроп' },
  { city: 'Trier', country: 'Germany', cityRu: 'Трир' },
  { city: 'Recklinghausen', country: 'Germany', cityRu: 'Реклингхаузен' },
  { city: 'Reutlingen', country: 'Germany', cityRu: 'Ройтлинген' },
  { city: 'Bremerhaven', country: 'Germany', cityRu: 'Бремерхафен' },
  { city: 'Koblenz', country: 'Germany', cityRu: 'Кобленц' },
  { city: 'Bergisch Gladbach', country: 'Germany', cityRu: 'Бергиш-Гладбах' },
  { city: 'Jena', country: 'Germany', cityRu: 'Йена' },
  { city: 'Remscheid', country: 'Germany', cityRu: 'Ремшайд' },
  { city: 'Erlangen', country: 'Germany', cityRu: 'Эрланген' },
  { city: 'Moers', country: 'Germany', cityRu: 'Мёрс' },
  { city: 'Siegen', country: 'Germany', cityRu: 'Зиген' },
  { city: 'Hildesheim', country: 'Germany', cityRu: 'Хильдесхайм' },
  { city: 'Salzgitter', country: 'Germany', cityRu: 'Зальцгиттер' },

  // France
  { city: 'Paris', country: 'France', cityRu: 'Париж' },
  { city: 'Marseille', country: 'France', cityRu: 'Марсель' },
  { city: 'Lyon', country: 'France', cityRu: 'Лион' },
  { city: 'Toulouse', country: 'France', cityRu: 'Тулуза' },
  { city: 'Nice', country: 'France', cityRu: 'Ницца' },
  { city: 'Nantes', country: 'France', cityRu: 'Нант' },
  { city: 'Strasbourg', country: 'France', cityRu: 'Страсбург' },
  { city: 'Montpellier', country: 'France', cityRu: 'Монпелье' },
  { city: 'Bordeaux', country: 'France', cityRu: 'Бордо' },
  { city: 'Lille', country: 'France', cityRu: 'Лилль' },
  { city: 'Rennes', country: 'France', cityRu: 'Ренн' },
  { city: 'Reims', country: 'France', cityRu: 'Реймс' },
  { city: 'Le Havre', country: 'France', cityRu: 'Гавр' },
  { city: 'Saint-Étienne', country: 'France', cityRu: 'Сент-Этьен' },
  { city: 'Toulon', country: 'France', cityRu: 'Тулон' },
  { city: 'Angers', country: 'France', cityRu: 'Анже' },
  { city: 'Grenoble', country: 'France', cityRu: 'Гренобль' },
  { city: 'Dijon', country: 'France', cityRu: 'Дижон' },
  { city: 'Nîmes', country: 'France', cityRu: 'Ним' },
  { city: 'Aix-en-Provence', country: 'France', cityRu: 'Экс-ан-Прованс' },

  // United Kingdom
  { city: 'London', country: 'United Kingdom', cityRu: 'Лондон' },
  { city: 'Birmingham', country: 'United Kingdom', cityRu: 'Бирмингем' },
  { city: 'Manchester', country: 'United Kingdom', cityRu: 'Манчестер' },
  { city: 'Glasgow', country: 'United Kingdom', cityRu: 'Глазго' },
  { city: 'Liverpool', country: 'United Kingdom', cityRu: 'Ливерпуль' },
  { city: 'Leeds', country: 'United Kingdom', cityRu: 'Лидс' },
  { city: 'Sheffield', country: 'United Kingdom', cityRu: 'Шеффилд' },
  { city: 'Edinburgh', country: 'United Kingdom', cityRu: 'Эдинбург' },
  { city: 'Bristol', country: 'United Kingdom', cityRu: 'Бристоль' },
  { city: 'Cardiff', country: 'United Kingdom', cityRu: 'Кардифф' },

  // Italy
  { city: 'Roma', country: 'Italy', cityRu: 'Рим' },
  { city: 'Milano', country: 'Italy', cityRu: 'Милан' },
  { city: 'Napoli', country: 'Italy', cityRu: 'Неаполь' },
  { city: 'Torino', country: 'Italy', cityRu: 'Турин' },
  { city: 'Palermo', country: 'Italy', cityRu: 'Палермо' },
  { city: 'Genova', country: 'Italy', cityRu: 'Генуя' },
  { city: 'Bologna', country: 'Italy', cityRu: 'Болонья' },
  { city: 'Firenze', country: 'Italy', cityRu: 'Флоренция' },
  { city: 'Bari', country: 'Italy', cityRu: 'Бари' },
  { city: 'Catania', country: 'Italy', cityRu: 'Катания' },

  // Spain
  { city: 'Madrid', country: 'Spain', cityRu: 'Мадрид' },
  { city: 'Barcelona', country: 'Spain', cityRu: 'Барселона' },
  { city: 'Valencia', country: 'Spain', cityRu: 'Валенсия' },
  { city: 'Sevilla', country: 'Spain', cityRu: 'Севилья' },
  { city: 'Zaragoza', country: 'Spain', cityRu: 'Сарагоса' },
  { city: 'Málaga', country: 'Spain', cityRu: 'Малага' },
  { city: 'Murcia', country: 'Spain', cityRu: 'Мурсия' },
  { city: 'Palma', country: 'Spain', cityRu: 'Пальма' },
  { city: 'Las Palmas', country: 'Spain', cityRu: 'Лас-Пальмас' },
  { city: 'Bilbao', country: 'Spain', cityRu: 'Бильбао' },

  // Poland
  { city: 'Warszawa', country: 'Poland', cityRu: 'Варшава' },
  { city: 'Kraków', country: 'Poland', cityRu: 'Краков' },
  { city: 'Łódź', country: 'Poland', cityRu: 'Лодзь' },
  { city: 'Wrocław', country: 'Poland', cityRu: 'Вроцлав' },
  { city: 'Poznań', country: 'Poland', cityRu: 'Познань' },
  { city: 'Gdańsk', country: 'Poland', cityRu: 'Гданьск' },
  { city: 'Szczecin', country: 'Poland', cityRu: 'Щецин' },
  { city: 'Bydgoszcz', country: 'Poland', cityRu: 'Быдгощ' },
  { city: 'Lublin', country: 'Poland', cityRu: 'Люблин' },
  { city: 'Białystok', country: 'Poland', cityRu: 'Белосток' },

  // Netherlands
  { city: 'Amsterdam', country: 'Netherlands', cityRu: 'Амстердам' },
  { city: 'Rotterdam', country: 'Netherlands', cityRu: 'Роттердам' },
  { city: 'Den Haag', country: 'Netherlands', cityRu: 'Гаага' },
  { city: 'Utrecht', country: 'Netherlands', cityRu: 'Утрехт' },
  { city: 'Eindhoven', country: 'Netherlands', cityRu: 'Эйндховен' },
  { city: 'Tilburg', country: 'Netherlands', cityRu: 'Тилбург' },
  { city: 'Groningen', country: 'Netherlands', cityRu: 'Гронинген' },
  { city: 'Almere', country: 'Netherlands', cityRu: 'Алмере' },
  { city: 'Breda', country: 'Netherlands', cityRu: 'Бреда' },
  { city: 'Nijmegen', country: 'Netherlands', cityRu: 'Неймеген' },

  // Belgium
  { city: 'Bruxelles', country: 'Belgium', cityRu: 'Брюссель' },
  { city: 'Antwerpen', country: 'Belgium', cityRu: 'Антверпен' },
  { city: 'Gent', country: 'Belgium', cityRu: 'Гент' },
  { city: 'Charleroi', country: 'Belgium', cityRu: 'Шарлеруа' },
  { city: 'Liège', country: 'Belgium', cityRu: 'Льеж' },
  { city: 'Brugge', country: 'Belgium', cityRu: 'Брюгге' },
  { city: 'Namur', country: 'Belgium', cityRu: 'Намюр' },
  { city: 'Leuven', country: 'Belgium', cityRu: 'Лёвен' },
  { city: 'Mons', country: 'Belgium', cityRu: 'Монс' },
  { city: 'Aalst', country: 'Belgium', cityRu: 'Алст' },

  // Austria
  { city: 'Wien', country: 'Austria', cityRu: 'Вена' },
  { city: 'Graz', country: 'Austria', cityRu: 'Грац' },
  { city: 'Linz', country: 'Austria', cityRu: 'Линц' },
  { city: 'Salzburg', country: 'Austria', cityRu: 'Зальцбург' },
  { city: 'Innsbruck', country: 'Austria', cityRu: 'Инсбрук' },
  { city: 'Klagenfurt', country: 'Austria', cityRu: 'Клагенфурт' },
  { city: 'Villach', country: 'Austria', cityRu: 'Филлах' },
  { city: 'Wels', country: 'Austria', cityRu: 'Вельс' },
  { city: 'Sankt Pölten', country: 'Austria', cityRu: 'Санкт-Пёльтен' },
  { city: 'Dornbirn', country: 'Austria', cityRu: 'Дорнбирн' },

  // Switzerland
  { city: 'Zürich', country: 'Switzerland', cityRu: 'Цюрих' },
  { city: 'Genève', country: 'Switzerland', cityRu: 'Женева' },
  { city: 'Basel', country: 'Switzerland', cityRu: 'Базель' },
  { city: 'Bern', country: 'Switzerland', cityRu: 'Берн' },
  { city: 'Lausanne', country: 'Switzerland', cityRu: 'Лозанна' },
  { city: 'Winterthur', country: 'Switzerland', cityRu: 'Винтертур' },
  { city: 'Luzern', country: 'Switzerland', cityRu: 'Люцерн' },
  { city: 'St. Gallen', country: 'Switzerland', cityRu: 'Санкт-Галлен' },
  { city: 'Lugano', country: 'Switzerland', cityRu: 'Лугано' },
  { city: 'Biel/Bienne', country: 'Switzerland', cityRu: 'Биль' },

  // Czech Republic
  { city: 'Praha', country: 'Czechia', cityRu: 'Прага' },
  { city: 'Brno', country: 'Czechia', cityRu: 'Брно' },
  { city: 'Ostrava', country: 'Czechia', cityRu: 'Острава' },
  { city: 'Plzeň', country: 'Czechia', cityRu: 'Пльзень' },
  { city: 'Liberec', country: 'Czechia', cityRu: 'Либерец' },
  { city: 'Olomouc', country: 'Czechia', cityRu: 'Оломоуц' },
  { city: 'Ústí nad Labem', country: 'Czechia', cityRu: 'Усти-над-Лабем' },
  { city: 'České Budějovice', country: 'Czechia', cityRu: 'Ческе-Будеёвице' },
  { city: 'Hradec Králové', country: 'Czechia', cityRu: 'Градец-Кралове' },
  { city: 'Pardubice', country: 'Czechia', cityRu: 'Пардубице' },

  // Slovakia
  { city: 'Bratislava', country: 'Slovakia', cityRu: 'Братислава' },
  { city: 'Košice', country: 'Slovakia', cityRu: 'Кошице' },
  { city: 'Prešov', country: 'Slovakia', cityRu: 'Прешов' },
  { city: 'Žilina', country: 'Slovakia', cityRu: 'Жилина' },
  { city: 'Banská Bystrica', country: 'Slovakia', cityRu: 'Банска-Бистрица' },
  { city: 'Nitra', country: 'Slovakia', cityRu: 'Нитра' },
  { city: 'Trnava', country: 'Slovakia', cityRu: 'Трнава' },
  { city: 'Trenčín', country: 'Slovakia', cityRu: 'Тренчин' },
  { city: 'Martin', country: 'Slovakia', cityRu: 'Мартин' },
  { city: 'Poprad', country: 'Slovakia', cityRu: 'Попрад' },

  // Hungary
  { city: 'Budapest', country: 'Hungary', cityRu: 'Будапешт' },
  { city: 'Debrecen', country: 'Hungary', cityRu: 'Дебрецен' },
  { city: 'Szeged', country: 'Hungary', cityRu: 'Сегед' },
  { city: 'Miskolc', country: 'Hungary', cityRu: 'Мишкольц' },
  { city: 'Pécs', country: 'Hungary', cityRu: 'Печ' },
  { city: 'Győr', country: 'Hungary', cityRu: 'Дьёр' },
  { city: 'Nyíregyháza', country: 'Hungary', cityRu: 'Ниредьхаза' },
  { city: 'Kecskemét', country: 'Hungary', cityRu: 'Кечкемет' },
  { city: 'Székesfehérvár', country: 'Hungary', cityRu: 'Секешфехервар' },
  { city: 'Szombathely', country: 'Hungary', cityRu: 'Сомбатхей' },

  // Romania
  { city: 'București', country: 'Romania', cityRu: 'Бухарест' },
  { city: 'Cluj-Napoca', country: 'Romania', cityRu: 'Клуж-Напока' },
  { city: 'Timișoara', country: 'Romania', cityRu: 'Тимишоара' },
  { city: 'Iași', country: 'Romania', cityRu: 'Яссы' },
  { city: 'Constanța', country: 'Romania', cityRu: 'Констанца' },
  { city: 'Craiova', country: 'Romania', cityRu: 'Крайова' },
  { city: 'Brașov', country: 'Romania', cityRu: 'Брашов' },
  { city: 'Galați', country: 'Romania', cityRu: 'Галац' },
  { city: 'Ploiești', country: 'Romania', cityRu: 'Плоешти' },
  { city: 'Oradea', country: 'Romania', cityRu: 'Орадя' },

  // Russia
  { city: 'Москва', country: 'Russia', cityEn: 'Moscow' },
  { city: 'Санкт-Петербург', country: 'Russia', cityEn: 'Saint Petersburg' },
  { city: 'Новосибирск', country: 'Russia', cityEn: 'Novosibirsk' },
  { city: 'Екатеринбург', country: 'Russia', cityEn: 'Yekaterinburg' },
  { city: 'Нижний Новгород', country: 'Russia', cityEn: 'Nizhny Novgorod' },
  { city: 'Казань', country: 'Russia', cityEn: 'Kazan' },
  { city: 'Челябинск', country: 'Russia', cityEn: 'Chelyabinsk' },
  { city: 'Омск', country: 'Russia', cityEn: 'Omsk' },
  { city: 'Самара', country: 'Russia', cityEn: 'Samara' },
  { city: 'Ростов-на-Дону', country: 'Russia', cityEn: 'Rostov-on-Don' },
  { city: 'Уфа', country: 'Russia', cityEn: 'Ufa' },
  { city: 'Красноярск', country: 'Russia', cityEn: 'Krasnoyarsk' },
  { city: 'Пермь', country: 'Russia', cityEn: 'Perm' },
  { city: 'Воронеж', country: 'Russia', cityEn: 'Voronezh' },
  { city: 'Волгоград', country: 'Russia', cityEn: 'Volgograd' },
  { city: 'Краснодар', country: 'Russia', cityEn: 'Krasnodar' },
  { city: 'Саратов', country: 'Russia', cityEn: 'Saratov' },
  { city: 'Тюмень', country: 'Russia', cityEn: 'Tyumen' },
  { city: 'Тольятти', country: 'Russia', cityEn: 'Tolyatti' },
  { city: 'Ижевск', country: 'Russia', cityEn: 'Izhevsk' },
  { city: 'Махачкала', country: 'Russia', cityEn: 'Makhachkala' },
  { city: 'Владикавказ', country: 'Russia', cityEn: 'Vladikavkaz' },
  { city: 'Нальчик', country: 'Russia', cityEn: 'Nalchik' },
  { city: 'Черкесск', country: 'Russia', cityEn: 'Cherkessk' },
  { city: 'Майкоп', country: 'Russia', cityEn: 'Maykop' },
  { city: 'Элиста', country: 'Russia', cityEn: 'Elista' },
  { city: 'Дербент', country: 'Russia', cityEn: 'Derbent' },
  { city: 'Хасавюрт', country: 'Russia', cityEn: 'Khasavyurt' },
  { city: 'Буйнакск', country: 'Russia', cityEn: 'Buynaksk' },
  { city: 'Пятигорск', country: 'Russia', cityEn: 'Pyatigorsk' },
  { city: 'Магас', country: 'Russia', cityEn: 'Magas' },
  { city: 'Назрань', country: 'Russia', cityEn: 'Nazran' },
  { city: 'Домбай', country: 'Russia', cityEn: 'Dombay' },
  { city: 'Ессентуки', country: 'Russia', cityEn: 'Essentuki' },
  { city: 'Минеральные Воды', country: 'Russia', cityEn: 'Mineralnye Vody' },
  { city: 'Кисловодск', country: 'Russia', cityEn: 'Kislovodsk' },
  { city: 'Наурская', country: 'Russia', cityEn: 'Naurskaya' },
  { city: 'Избербаш', country: 'Russia', cityEn: 'Izberbash' },
  { city: 'Кизляр', country: 'Russia', cityEn: 'Kizlyar' },
  { city: 'Прохладный', country: 'Russia', cityEn: 'Prokhladny' },
  { city: 'Сочи', country: 'Russia', cityEn: 'Sochi' },
  { city: 'Геленджик', country: 'Russia', cityEn: 'Gelendzhik' },
  { city: 'Буденновск', country: 'Russia', cityEn: 'Budyonnovsk' },
  { city: 'Шахты', country: 'Russia', cityEn: 'Shakhty' },
  { city: 'Ейск', country: 'Russia', cityEn: 'Yeysk' },
  { city: 'Волгодонск', country: 'Russia', cityEn: 'Volgodonsk' },
  { city: 'Лиски', country: 'Russia', cityEn: 'Liski' },
  { city: 'Липецк', country: 'Russia', cityEn: 'Lipetsk' },
  { city: 'Тамбов', country: 'Russia', cityEn: 'Tambov' },
  { city: 'Старый Оскол', country: 'Russia', cityEn: 'Stary Oskol' },
  { city: 'Тула', country: 'Russia', cityEn: 'Tula' },
  { city: 'Курск', country: 'Russia', cityEn: 'Kursk' },
  { city: 'Брянск', country: 'Russia', cityEn: 'Bryansk' },
  { city: 'Орёл', country: 'Russia', cityEn: 'Oryol' },
  { city: 'Калуга', country: 'Russia', cityEn: 'Kaluga' },
  { city: 'Смоленск', country: 'Russia', cityEn: 'Smolensk' },
  { city: 'Улан-Удэ', country: 'Russia', cityEn: 'Ulan-Ude' },
  { city: 'Чита', country: 'Russia', cityEn: 'Chita' },
  { city: 'Якутск', country: 'Russia', cityEn: 'Yakutsk' },

  // Chechnya
  { city: 'Грозный', country: 'Chechnya', cityRu: 'Грозный', cityEn: 'Grozny' },
  { city: 'Урус-Мартан', country: 'Chechnya', cityRu: 'Урус-Мартан', cityEn: 'Urus-Martan' },
  { city: 'Аргун', country: 'Chechnya', cityRu: 'Аргун', cityEn: 'Argun' },
  { city: 'Гудермес', country: 'Chechnya', cityRu: 'Гудермес', cityEn: 'Gudermes' },
  { city: 'Катыр-Юрт', country: 'Chechnya', cityRu: 'Катыр-Юрт', cityEn: 'Katyr-Yurt' },
  { city: 'Ведучи', country: 'Chechnya', cityRu: 'Ведучи', cityEn: 'Veduchi' },
  { city: 'Шали', country: 'Chechnya', cityRu: 'Шали', cityEn: 'Shali' },
  { city: 'Ачхой-Мартан', country: 'Chechnya', cityRu: 'Ачхой-Мартан', cityEn: 'Achkhoy-Martan' },
  { city: 'Курчалой', country: 'Chechnya', cityRu: 'Курчалой', cityEn: 'Kurchaloy' },
  { city: 'Ойсхара', country: 'Chechnya', cityRu: 'Ойсхара', cityEn: 'Oiskhara' },
  { city: 'Серноводское', country: 'Chechnya', cityRu: 'Серноводское', cityEn: 'Sernovodskoye' },
  { city: 'Шалажи', country: 'Chechnya', cityRu: 'Шалажи', cityEn: 'Shalazhi' },

  // Belarus
  { city: 'Минск', country: 'Belarus', cityEn: 'Minsk' },
  { city: 'Гомель', country: 'Belarus', cityEn: 'Gomel' },
  { city: 'Могилёв', country: 'Belarus', cityEn: 'Mogilev' },
  { city: 'Витебск', country: 'Belarus', cityEn: 'Vitebsk' },
  { city: 'Гродно', country: 'Belarus', cityEn: 'Grodno' },
  { city: 'Брест', country: 'Belarus', cityEn: 'Brest' },
  { city: 'Бобруйск', country: 'Belarus', cityEn: 'Bobruisk' },
  { city: 'Барановичи', country: 'Belarus', cityEn: 'Baranovichi' },
  { city: 'Борисов', country: 'Belarus', cityEn: 'Borisov' },
  { city: 'Пинск', country: 'Belarus', cityEn: 'Pinsk' },
  { city: 'Орша', country: 'Belarus', cityEn: 'Orsha' },

  // Jordan
  { city: 'Аммон', country: 'Jordan', cityEn: 'Amman' },
  { city: 'Сувейлех', country: 'Jordan', cityEn: 'Suweileh' },
  { city: 'Эз-Зарка', country: 'Jordan', cityEn: 'Zarqa' },

  // Turkey
  { city: 'İstanbul', country: 'Turkey', cityRu: 'Стамбул' },
  { city: 'Ankara', country: 'Turkey', cityRu: 'Анкара' },
  { city: 'İzmir', country: 'Turkey', cityRu: 'Измир' },
  { city: 'Bursa', country: 'Turkey', cityRu: 'Бурса' },
  { city: 'Adana', country: 'Turkey', cityRu: 'Адана' },
  { city: 'Gaziantep', country: 'Turkey', cityRu: 'Газиантеп' },
  { city: 'Konya', country: 'Turkey', cityRu: 'Конья' },
  { city: 'Antalya', country: 'Turkey', cityRu: 'Анталья' },
  { city: 'Kayseri', country: 'Turkey', cityRu: 'Кайсери' },
  { city: 'Mersin', country: 'Turkey', cityRu: 'Мерсин' },
  { city: 'Kahramanmaraş', country: 'Turkey', cityRu: 'Кахраманмараш', cityEn: 'Kahramanmaras' },
  { city: 'Kars', country: 'Turkey', cityRu: 'Карс', cityEn: 'Kars' },
  { city: 'Sivas', country: 'Turkey', cityRu: 'Сивас', cityEn: 'Sivas' },
  { city: 'Mardin', country: 'Turkey', cityRu: 'Мардин', cityEn: 'Mardin' },

  // Georgia
  { city: 'თბილისი', country: 'Georgia', cityEn: 'Tbilisi' },
  { city: 'ბათუმი', country: 'Georgia', cityEn: 'Batumi' },
  { city: 'ქუთაისი', country: 'Georgia', cityEn: 'Kutaisi' },
  { city: 'რუსთავი', country: 'Georgia', cityEn: 'Rustavi' },
  { city: 'გორი', country: 'Georgia', cityEn: 'Gori' },
  { city: 'ზუგდიდი', country: 'Georgia', cityEn: 'Zugdidi' },
  { city: 'ფოთი', country: 'Georgia', cityEn: 'Poti' },
  { city: 'ხაშური', country: 'Georgia', cityEn: 'Khashuri' },
  { city: 'სამტრედია', country: 'Georgia', cityEn: 'Samtredia' },
  { city: 'სენაკი', country: 'Georgia', cityEn: 'Senaki' },

  // Sweden
  { city: 'Stockholm', country: 'Sweden', cityRu: 'Стокгольм' },
  { city: 'Göteborg', country: 'Sweden', cityRu: 'Гётеборг' },
  { city: 'Malmö', country: 'Sweden', cityRu: 'Мальмё' },
  { city: 'Uppsala', country: 'Sweden', cityRu: 'Уппсала' },
  { city: 'Västerås', country: 'Sweden', cityRu: 'Вестерос' },
  { city: 'Örebro', country: 'Sweden', cityRu: 'Эребру' },
  { city: 'Linköping', country: 'Sweden', cityRu: 'Линчёпинг' },
  { city: 'Helsingborg', country: 'Sweden', cityRu: 'Хельсингборг' },
  { city: 'Jönköping', country: 'Sweden', cityRu: 'Йёнчёпинг' },
  { city: 'Norrköping', country: 'Sweden', cityRu: 'Норрчёпинг' },

  // Norway
  { city: 'Oslo', country: 'Norway', cityRu: 'Осло' },
  { city: 'Bergen', country: 'Norway', cityRu: 'Берген' },
  { city: 'Stavanger', country: 'Norway', cityRu: 'Ставангер' },
  { city: 'Trondheim', country: 'Norway', cityRu: 'Тронхейм' },
  { city: 'Fredrikstad', country: 'Norway', cityRu: 'Фредрикстад' },
  { city: 'Drammen', country: 'Norway', cityRu: 'Драммен' },
  { city: 'Skien', country: 'Norway', cityRu: 'Шиен' },
  { city: 'Kristiansand', country: 'Norway', cityRu: 'Кристиансанн' },
  { city: 'Ålesund', country: 'Norway', cityRu: 'Олесунн' },
  { city: 'Tønsberg', country: 'Norway', cityRu: 'Тёнсберг' },

  // Finland
  { city: 'Helsinki', country: 'Finland', cityRu: 'Хельсинки' },
  { city: 'Espoo', country: 'Finland', cityRu: 'Эспоо' },
  { city: 'Tampere', country: 'Finland', cityRu: 'Тампере' },
  { city: 'Vantaa', country: 'Finland', cityRu: 'Вантаа' },
  { city: 'Oulu', country: 'Finland', cityRu: 'Оулу' },
  { city: 'Turku', country: 'Finland', cityRu: 'Турку' },
  { city: 'Jyväskylä', country: 'Finland', cityRu: 'Ювяскюля' },
  { city: 'Lahti', country: 'Finland', cityRu: 'Лахти' },
  { city: 'Kuopio', country: 'Finland', cityRu: 'Куопио' },
  { city: 'Pori', country: 'Finland', cityRu: 'Пори' },

  // Denmark
  { city: 'København', country: 'Denmark', cityRu: 'Копенгаген' },
  { city: 'Aarhus', country: 'Denmark', cityRu: 'Орхус' },
  { city: 'Odense', country: 'Denmark', cityRu: 'Оденсе' },
  { city: 'Aalborg', country: 'Denmark', cityRu: 'Олборг' },
  { city: 'Esbjerg', country: 'Denmark', cityRu: 'Эсбьерг' },
  { city: 'Randers', country: 'Denmark', cityRu: 'Раннерс' },
  { city: 'Kolding', country: 'Denmark', cityRu: 'Колдинг' },
  { city: 'Horsens', country: 'Denmark', cityRu: 'Хорсенс' },
  { city: 'Vejle', country: 'Denmark', cityRu: 'Вайле' },
  { city: 'Roskilde', country: 'Denmark', cityRu: 'Роскилле' },

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
  { city: 'Medina', country: 'Saudi Arabia', cityRu: 'Медина' },
  { city: 'Mekka', country: 'Saudi Arabia', cityRu: 'Мекка' },
  { city: 'Riad', country: 'Saudi Arabia', cityRu: 'Эр-Рияд' },
  { city: 'Kuwait', country: 'Kuwait', cityRu: 'Эль-Кувейт' },
  { city: 'Dschidda', country: 'Saudi Arabia', cityRu: 'Джидда', cityEn: 'Jeddah' },
  { city: 'Kairo', country: 'Egypt', cityRu: 'Каир' },
  { city: 'Alexandria', country: 'Egypt', cityRu: 'Александрия' },
  { city: 'Luxor', country: 'Egypt', cityRu: 'Луксор' },
  { city: 'Hurghada', country: 'Egypt', cityRu: 'Хургада' },
  { city: 'Marrakesch', country: 'Morocco', cityRu: 'Марракеш' },
  { city: 'Damaskus', country: 'Syria', cityRu: 'Дамаск' },
  { city: 'Bagdad', country: 'Iraq', cityRu: 'Багдад' },
  { city: 'Beirut', country: 'Lebanon', cityRu: 'Бейрут' },
  { city: 'Baku', country: 'Azerbaijan', cityRu: 'Баку' },

  // Ukraine
  { city: 'Kyjiw', country: 'Ukraine', cityRu: 'Киев' },
  { city: 'Charkiw', country: 'Ukraine', cityRu: 'Харьков' },
  { city: 'Dnipro', country: 'Ukraine', cityRu: 'Днепр' },
  { city: 'Lwiw', country: 'Ukraine', cityRu: 'Львов' },
  { city: 'Odessa', country: 'Ukraine', cityRu: 'Одесса' },

  // Greece
  { city: 'Athen', country: 'Greece', cityRu: 'Афины' },

  // Balkan cities
  { city: 'Pristina', country: 'Kosovo', cityRu: 'Приштина' },
  { city: 'Skopje', country: 'North Macedonia', cityRu: 'Скопье' },
  { city: 'Podgorica', country: 'Montenegro', cityRu: 'Подгорица' },
  { city: 'Belgrad', country: 'Serbia', cityRu: 'Белград' },
  { city: 'Dubrovnik', country: 'Croatia', cityRu: 'Дубровник' },
  { city: 'Split', country: 'Croatia', cityRu: 'Сплит' },
  { city: 'Tirana', country: 'Albania', cityRu: 'Тирана' },
  { city: 'Sofia', country: 'Bulgaria', cityRu: 'София' },

  // Baltic cities
  { city: 'Vilnius', country: 'Lithuania', cityRu: 'Вильнюс' },
  { city: 'Riga', country: 'Latvia', cityRu: 'Рига' },
  { city: 'Kaunas', country: 'Lithuania', cityRu: 'Каунас' }
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
      const cityEnMatch = item.cityEn?.toLowerCase().includes(searchTerm);
      return cityMatch || cityRuMatch || cityEnMatch;
    })
    .sort((a, b) => {
      const aLower = a.city.toLowerCase();
      const bLower = b.city.toLowerCase();
      const aRuLower = a.cityRu?.toLowerCase() || '';
      const bRuLower = b.cityRu?.toLowerCase() || '';
      const aEnLower = a.cityEn?.toLowerCase() || '';
      const bEnLower = b.cityEn?.toLowerCase() || '';

      // Prioritize exact matches (original, Russian, or English)
      if (aLower === searchTerm || aRuLower === searchTerm || aEnLower === searchTerm) return -1;
      if (bLower === searchTerm || bRuLower === searchTerm || bEnLower === searchTerm) return 1;

      // Then prioritize cities that start with the search term
      const aStarts = aLower.startsWith(searchTerm) || aRuLower.startsWith(searchTerm) || aEnLower.startsWith(searchTerm);
      const bStarts = bLower.startsWith(searchTerm) || bRuLower.startsWith(searchTerm) || bEnLower.startsWith(searchTerm);
      if (aStarts && !bStarts) return -1;
      if (bStarts && !aStarts) return 1;

      // Finally sort alphabetically
      return a.city.localeCompare(b.city);
    })
    .slice(0, limit);
};