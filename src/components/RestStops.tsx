import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star, Navigation, Car, Fuel, Utensils, Plus, Edit, Trash2 } from 'lucide-react';
import { RestStopDetailsModal } from './modals/RestStopDetailsModal';
import { useAuth } from '../hooks/useAuth';
import { useModals } from '../hooks/useModals';
import { useLanguage } from '../hooks/useLanguage';

interface RestStop {
  id: number;
  name: string;
  type: 'Raststätte' | 'Hotel' | 'Tankstelle' | 'Restaurant' | 'Route';
  location: string;
  address: string;
  rating: number;
  description: string;
  fullDescription: string;
  image: string;
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

const restStops: RestStop[] = [
  {
    id: 1,
    name: 'Raststätte Geiselwind',
    type: 'Raststätte',
    location: 'Geiselwind',
    address: 'A3 Raststätte Geiselwind, 96160 Geiselwind',
    rating: 4.3,
    description: 'Große Raststätte mit Restaurant, Tankstelle und Spielplatz. Perfekt für...',
    fullDescription: 'Große Raststätte mit Restaurant, Tankstelle und Spielplatz. Perfekt für Familien mit Kindern. Die Raststätte bietet eine Vielzahl von Restaurants und Imbissen, saubere Sanitäranlagen und einen großen Parkplatz für PKW und LKW. Der Spielplatz ist modern ausgestattet und bietet Kindern verschiedene Spielmöglichkeiten.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    amenities: ['WC', 'Kinder', 'Sport', 'Grün'],
    coordinates: { lat: 49.7667, lng: 10.4667 }
  },
  {
    id: 2,
    name: 'Hotel Gasthof Zur Post',
    type: 'Hotel',
    location: 'Lauf an der Pegnitz',
    address: 'Hauptstraße 12, 91207 Lauf an der Pegnitz',
    rating: 4.7,
    description: 'Gemütliches Hotel mit Restaurant und Biergarten. Ideal für Übernachtungen auf...',
    fullDescription: 'Gemütliches Hotel mit Restaurant und Biergarten. Ideal für Übernachtungen auf längeren Reisen. Das traditionelle Gasthaus bietet komfortable Zimmer, regionale Küche und einen schönen Biergarten. Die Lage ist ruhig und dennoch verkehrsgünstig gelegen.',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    amenities: ['WC', 'Hotel', 'Essen', 'Parkplatz'],
    coordinates: { lat: 49.5167, lng: 11.2833 }
  },
  {
    id: 3,
    name: 'Shell Tankstelle Würzburg',
    type: 'Tankstelle',
    location: 'Würzburg',
    address: 'Würzburger Straße 45, 97082 Würzburg',
    rating: 4.1,
    description: 'Moderne Tankstelle mit Shop, Café und sauberen Sanitäranlagen.',
    fullDescription: 'Moderne Tankstelle mit Shop, Café und sauberen Sanitäranlagen. Die Tankstelle bietet alle gängigen Kraftstoffe, einen gut sortierten Shop mit Reiseproviant und warmen Snacks. Die Sanitäranlagen werden regelmäßig gereinigt und sind barrierefrei zugänglich.',
    image: 'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpeg',
    amenities: ['WC', 'Tankstelle', 'Essen', 'Autowaschen'],
    coordinates: { lat: 49.7913, lng: 9.9534 }
  },
  {
    id: 4,
    name: 'Restaurant Waldblick',
    type: 'Restaurant',
    location: 'Bad Hersfeld',
    address: 'Waldweg 8, 36251 Bad Hersfeld',
    rating: 4.5,
    description: 'Familienrestaurant mit regionaler Küche und herrlichem Blick in den...',
    fullDescription: 'Familienrestaurant mit regionaler Küche und herrlichem Blick in den Wald. Das Restaurant bietet traditionelle deutsche Küche mit frischen, regionalen Zutaten. Die Terrasse mit Waldblick lädt zum Verweilen ein. Besonders empfehlenswert sind die hausgemachten Kuchen und das Wild aus der Region.',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
    amenities: ['WC', 'Kinder', 'Essen', 'Esstisch', 'Parkplatz'],
    coordinates: { lat: 50.8667, lng: 9.7 }
  },
  {
    id: 5,
    name: 'Autohof München Süd',
    type: 'Raststätte',
    location: 'München',
    address: 'A8 Autohof München Süd, 85521 Ottobrunn',
    rating: 4.2,
    description: 'Großer Autohof mit vielen Restaurants und Einkaufsmöglichkeiten.',
    fullDescription: 'Großer Autohof mit vielen Restaurants und Einkaufsmöglichkeiten. Der Autohof bietet eine große Auswahl an Restaurants, von Fast Food bis hin zu gehobener Küche. Zusätzlich gibt es Einkaufsmöglichkeiten, eine Apotheke und verschiedene Dienstleistungen für Reisende.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    amenities: ['WC', 'Kinder', 'Sport', 'Essen', 'Tankstelle', 'Duschen', 'Parkplatz'],
    coordinates: { lat: 48.0667, lng: 11.6667 }
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Raststätte':
      return <Car size={16} className="text-emerald-500" />;
    case 'Hotel':
      return <div className="w-4 h-4 bg-sky-500 rounded flex items-center justify-center text-white text-xs font-bold">H</div>;
    case 'Tankstelle':
      return <Fuel size={16} className="text-red-600" />;
    case 'Restaurant':
      return <Utensils size={16} className="text-orange-600" />;
    default:
      return <MapPin size={16} className="text-gray-600" />;
  }
};

const getAmenityIcon = (amenity: string, t: (key: string) => string) => {
  const amenityMap: { [key: string]: { icon: string; labelKey: string; colorClass: string } } = {
    'WC': { icon: '🚻', labelKey: 'wc', colorClass: 'bg-sky-100 text-sky-700' },
    'Kinderfreundlich': { icon: '👶', labelKey: 'childFriendly', colorClass: 'bg-pink-100 text-pink-800' },
    'Kinder': { icon: '🚸', labelKey: 'childFriendly', colorClass: 'bg-pink-100 text-pink-800' },
    'Sport': { icon: '⚽', labelKey: 'sports', colorClass: 'bg-orange-100 text-orange-800' },
    'Restaurant': { icon: '🍽️', labelKey: 'restaurant', colorClass: 'bg-red-100 text-red-800' },
    'Essen': { icon: '🍽️', labelKey: 'restaurant', colorClass: 'bg-red-100 text-red-800' },
    'Grün': { icon: '🌳', labelKey: 'greenArea', colorClass: 'bg-emerald-50 text-emerald-700' },
    'Parkplatz': { icon: '🅿️', labelKey: 'parking', colorClass: 'bg-gray-100 text-gray-800' },
    'Duschen': { icon: '🚿', labelKey: 'showers', colorClass: 'bg-cyan-100 text-cyan-800' },
    'Tankstelle': { icon: '⛽', labelKey: 'gasStation', colorClass: 'bg-red-100 text-red-800' },
    'Autowaschen': { icon: '🚗', labelKey: 'carWash', colorClass: 'bg-sky-100 text-sky-700' },
    'Hotel': { icon: '🏨', labelKey: 'hotel', colorClass: 'bg-amber-100 text-amber-800' },
    'Esstisch': { icon: '🪑', labelKey: 'picnicArea', colorClass: 'bg-amber-100 text-amber-800' },
    'Strand': { icon: '🏖️', labelKey: 'beach', colorClass: 'bg-sky-100 text-sky-700' },
  };

  const amenityInfo = amenityMap[amenity];

  if (amenityInfo) {
    return <div className={`${amenityInfo.colorClass} px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center`}>
      <span className="mr-1">{amenityInfo.icon}</span> {t(amenityInfo.labelKey)}
    </div>;
  }

  return <div className="bg-gray-100 text-gray-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
    <span className="mr-1">📍</span> {amenity}
  </div>;
};

export const RestStops: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [currentIndex3, setCurrentIndex3] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef2 = useRef<HTMLDivElement>(null);
  const scrollContainerRef3 = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isScrolling2, setIsScrolling2] = useState(false);
  const [isScrolling3, setIsScrolling3] = useState(false);
  const [selectedRestStop, setSelectedRestStop] = useState<RestStop | null>(null);
  const [restStopsData, setRestStopsData] = useState<RestStop[]>(restStops);
  const { isAdmin } = useAuth();
  const { openModal } = useModals();

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      setIsScrolling(true);
      const cardWidth = 312;
      const gap = 24;
      const scrollPosition = index * (cardWidth + gap);

      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
      setTimeout(() => setIsScrolling(false), 300);
    }
  };

  const scrollToIndex2 = (index: number) => {
    if (scrollContainerRef2.current) {
      setIsScrolling2(true);
      const cardWidth = 312;
      const gap = 24;
      const scrollPosition = index * (cardWidth + gap);

      scrollContainerRef2.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex2(index);
      setTimeout(() => setIsScrolling2(false), 300);
    }
  };

  const scrollToIndex3 = (index: number) => {
    if (scrollContainerRef3.current) {
      setIsScrolling3(true);
      const cardWidth = 312;
      const gap = 24;
      const scrollPosition = index * (cardWidth + gap);

      scrollContainerRef3.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex3(index);
      setTimeout(() => setIsScrolling3(false), 300);
    }
  };

  const handleScroll = () => {
    if (isScrolling || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = 312;
    const gap = 24;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < restStopsData.length) {
      setCurrentIndex(newIndex);
    }
  };

  const handleScroll2 = () => {
    if (isScrolling2 || !scrollContainerRef2.current) return;
    const container = scrollContainerRef2.current;
    const cardWidth = 312;
    const gap = 24;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));

    if (newIndex !== currentIndex2 && newIndex >= 0 && newIndex < restStopsData.length) {
      setCurrentIndex2(newIndex);
    }
  };

  const handleScroll3 = () => {
    if (isScrolling3 || !scrollContainerRef3.current) return;
    const container = scrollContainerRef3.current;
    const cardWidth = 312;
    const gap = 24;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));

    if (newIndex !== currentIndex3 && newIndex >= 0 && newIndex < restStopsData.length) {
      setCurrentIndex3(newIndex);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) scrollToIndex(currentIndex - 1);
  };

  const goToNext = () => {
    if (currentIndex < restStopsData.length - 1) scrollToIndex(currentIndex + 1);
  };

  const goToPrevious2 = () => {
    if (currentIndex2 > 0) scrollToIndex2(currentIndex2 - 1);
  };

  const goToNext2 = () => {
    if (currentIndex2 < restStopsData.length - 1) scrollToIndex2(currentIndex2 + 1);
  };

  const goToPrevious3 = () => {
    if (currentIndex3 > 0) scrollToIndex3(currentIndex3 - 1);
  };

  const goToNext3 = () => {
    if (currentIndex3 < restStopsData.length - 1) scrollToIndex3(currentIndex3 + 1);
  };

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentIndex, isScrolling]);

  React.useEffect(() => {
    const container = scrollContainerRef2.current;
    if (container) {
      container.addEventListener('scroll', handleScroll2);
      return () => container.removeEventListener('scroll', handleScroll2);
    }
  }, [currentIndex2, isScrolling2]);

  React.useEffect(() => {
    const container = scrollContainerRef3.current;
    if (container) {
      container.addEventListener('scroll', handleScroll3);
      return () => container.removeEventListener('scroll', handleScroll3);
    }
  }, [currentIndex3, isScrolling3]);

  const handleDetailsClick = (restStop: RestStop) => {
    setSelectedRestStop(restStop);
  };

  const handleRestStopUpdate = (updatedRestStop: RestStop) => {
    setRestStopsData(prev =>
      prev.map(stop => stop.id === updatedRestStop.id ? updatedRestStop : stop)
    );
    setSelectedRestStop(updatedRestStop);
  };

  const handleNavigationClick = (restStop: RestStop) => {
    const query = encodeURIComponent(`${restStop.name}, ${restStop.address}`);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleCreateRestStop = () => {
    openModal('createRestStop');
  };

  const handleEditRestStop = (restStop: RestStop, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRestStop(restStop);
    openModal('editRestStop');
  };

  const handleDeleteRestStop = (restStopId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(t('confirmDeleteRestStop'))) {
      setRestStopsData(prev => prev.filter(stop => stop.id !== restStopId));
      if (currentIndex >= restStopsData.length - 1 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const RestStopCard = ({ stop }: { stop: RestStop }) => (
    <div
      className="flex-shrink-0 w-72 sm:w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group flex flex-col"
      onClick={() => handleDetailsClick(stop)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={stop.image}
          alt={stop.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
          {getTypeIcon(stop.type)}
          <span className="text-sm font-medium text-gray-800">{stop.type}</span>
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Star size={14} className="text-yellow-500 fill-current" />
          <span className="text-sm font-bold text-gray-800">{stop.rating}</span>
        </div>

        {isAdmin && (
          <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => handleEditRestStop(stop, e)}
              className="bg-sky-500 text-white p-2 rounded-full hover:bg-sky-600 transition duration-200"
              title={t('editRestStop')}
            >
              <Edit size={16} />
            </button>
            <button
              onClick={(e) => handleDeleteRestStop(stop.id, e)}
              className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-200"
              title={t('deleteRestStop')}
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{stop.name}</h3>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <span className="text-sm truncate">{stop.location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {stop.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {stop.amenities.slice(0, 6).map((amenity, index) => (
            <div key={index}>
              {getAmenityIcon(amenity, t)}
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-2 mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNavigationClick(stop);
            }}
            className="w-full bg-sky-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-sky-600 transition duration-200 flex items-center justify-center"
          >
            <Navigation size={18} className="mr-2" />
            {t('navigation')}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDetailsClick(stop);
            }}
            className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition duration-200"
          >
            {t('details')}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSection = (
    title: string,
    description: string,
    currentIdx: number,
    goToPrev: () => void,
    goToNext: () => void,
    scrollRef: React.RefObject<HTMLDivElement>,
    borderColor: string
  ) => (
    <section className={`mt-20 mb-20 bg-gray-100 py-12 px-6 rounded-3xl border-t-4 ${borderColor}`}>
      <div className="flex items-start justify-between mb-10">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 text-base max-w-2xl leading-relaxed">{description}</p>
        </div>
        {isAdmin && (
          <button
            onClick={handleCreateRestStop}
            className="ml-4 bg-emerald-500 text-white p-3 rounded-full hover:bg-emerald-600 transition duration-200 flex-shrink-0"
            title={t('createRestStop')}
          >
            <Plus size={24} />
          </button>
        )}
      </div>

      <div className="relative">
        <button
          onClick={goToPrev}
          disabled={currentIdx === 0}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg transition-all duration-200 ${
            currentIdx === 0
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-gray-100 hover:shadow-xl opacity-90 hover:opacity-100'
          }`}
          style={{ marginLeft: '-20px' }}
        >
          <ChevronLeft size={28} className={currentIdx === 0 ? 'text-gray-400' : 'text-[#c51d34]'} />
        </button>

        <button
          onClick={goToNext}
          disabled={currentIdx >= restStopsData.length - 1}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg transition-all duration-200 ${
            currentIdx >= restStopsData.length - 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-gray-100 hover:shadow-xl opacity-90 hover:opacity-100'
          }`}
          style={{ marginRight: '-20px' }}
        >
          <ChevronRight size={28} className={currentIdx >= restStopsData.length - 1 ? 'text-gray-400' : 'text-[#c51d34]'} />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide px-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {restStopsData.map((stop) => (
            <div key={stop.id} style={{ scrollSnapAlign: 'start' }}>
              <RestStopCard stop={stop} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10 space-x-3">
          {restStopsData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollRef === scrollContainerRef) scrollToIndex(index);
                else if (scrollRef === scrollContainerRef2) scrollToIndex2(index);
                else scrollToIndex3(index);
              }}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIdx
                  ? 'bg-sky-500 w-10'
                  : 'bg-gray-300 w-3 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-6 text-sm text-gray-500 md:hidden">
          {t('swipeToScroll')}
        </div>
      </div>
    </section>
  );

  return (
    <>
      {renderSection(
        t('easternRoutes'),
        t('easternRoutesDesc'),
        currentIndex,
        goToPrevious,
        goToNext,
        scrollContainerRef,
        'border-sky-400'
      )}

      {renderSection(
        t('balticRoutes'),
        t('balticRoutesDesc'),
        currentIndex2,
        goToPrevious2,
        goToNext2,
        scrollContainerRef2,
        'border-emerald-400'
      )}

      {renderSection(
        t('southernRoutes'),
        t('southernRoutesDesc'),
        currentIndex3,
        goToPrevious3,
        goToNext3,
        scrollContainerRef3,
        'border-orange-500'
      )}

      <RestStopDetailsModal
        restStop={selectedRestStop}
        onClose={() => setSelectedRestStop(null)}
        onUpdate={handleRestStopUpdate}
      />
    </>
  );
};
