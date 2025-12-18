import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star, Navigation, Car, Fuel, Utensils, Plus, Edit, Trash2 } from 'lucide-react';
import { RestStopDetailsModal } from './modals/RestStopDetailsModal';
import { useAuth } from '../hooks/useAuth';
import { useModals } from '../hooks/useModals';
import { useRestStops, RestStop } from '../hooks/useRestStops';

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

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case 'WC':
      return <div className="bg-sky-100 text-sky-700 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">🚻</span> WC
      </div>;
    case 'Kinderfreundlich':
      return <div className="bg-pink-100 text-pink-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">👶</span> Kinderfreundlich
      </div>;
    case 'Sport':
      return <div className="bg-orange-100 text-orange-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">⚽</span> Sport
      </div>;
    case 'Restaurant':
      return <div className="bg-red-100 text-red-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">🍽️</span> Restaurant
      </div>;
    case 'Grün':
      return <div className="bg-emerald-50 text-emerald-700 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">🌳</span> Grünfläche
      </div>;
    case 'Parkplatz':
      return <div className="bg-gray-100 text-gray-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">🅿️</span> Parkplatz
      </div>;
    case 'Duschen':
      return <div className="bg-cyan-100 text-cyan-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">🚿</span> Duschen
      </div>;
    case 'Tankstelle':
      return <div className="bg-red-100 text-red-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">⛽</span> Tankstelle
      </div>;
    case 'Autowaschen':
      return <div className="bg-sky-100 text-sky-700 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">🚗</span> Autowäsche
      </div>;
    case 'Hotel':
      return <div className="bg-amber-100 text-amber-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">🏨</span> Hotel
      </div>;
    case 'Kinder':
      return <div className="bg-pink-100 text-pink-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">👶</span> Kinderfreundlich
      </div>;
    case 'Essen':
      return <div className="bg-red-100 text-red-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">🍽️</span> Restaurant
      </div>;
    case 'Esstisch':
      return <div className="bg-amber-100 text-amber-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">🪑</span> Picknickplatz
      </div>;
    default:
      return <div className="bg-gray-100 text-gray-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">📍</span> {amenity}
      </div>;
  }
};

export const RestStops: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [currentIndex3, setCurrentIndex3] = useState(0);
  const [selectedRestStop, setSelectedRestStop] = useState<RestStop | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef2 = useRef<HTMLDivElement>(null);
  const scrollContainerRef3 = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isScrolling2, setIsScrolling2] = useState(false);
  const [isScrolling3, setIsScrolling3] = useState(false);
  const { isAdmin } = useAuth();
  const { openRestStopEdit, openModal } = useModals();
  const { restStops: restStopsData, loading, deleteRestStop } = useRestStops();

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

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < restStopsEastern.length) {
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

    if (newIndex !== currentIndex2 && newIndex >= 0 && newIndex < restStopsBaltic.length) {
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

    if (newIndex !== currentIndex3 && newIndex >= 0 && newIndex < restStopsSouthern.length) {
      setCurrentIndex3(newIndex);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) scrollToIndex(currentIndex - 1);
  };

  const goToNext = () => {
    if (currentIndex < restStopsEastern.length - 1) scrollToIndex(currentIndex + 1);
  };

  const goToPrevious2 = () => {
    if (currentIndex2 > 0) scrollToIndex2(currentIndex2 - 1);
  };

  const goToNext2 = () => {
    if (currentIndex2 < restStopsBaltic.length - 1) scrollToIndex2(currentIndex2 + 1);
  };

  const goToPrevious3 = () => {
    if (currentIndex3 > 0) scrollToIndex3(currentIndex3 - 1);
  };

  const goToNext3 = () => {
    if (currentIndex3 < restStopsSouthern.length - 1) scrollToIndex3(currentIndex3 + 1);
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
    openRestStopEdit(restStop);
  };

  const handleDeleteRestStop = async (restStopId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Sind Sie sicher, dass Sie diesen Rest Stop löschen möchten?')) {
      await deleteRestStop(restStopId);
      if (currentIndex >= restStopsData.length - 1 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const restStopsEastern = restStopsData.filter(stop => stop.route === 'eastern');
  const restStopsBaltic = restStopsData.filter(stop => stop.route === 'baltic');
  const restStopsSouthern = restStopsData.filter(stop => stop.route === 'southern');

  const RestStopCard = ({ stop }: { stop: RestStop }) => (
    <div
      className="flex-shrink-0 w-72 sm:w-80 md:w-96 h-[500px] bg-gray-100 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border-2 border-gray-200 flex flex-col"
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
              title="Rest Stop bearbeiten"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={(e) => handleDeleteRestStop(stop.id, e)}
              className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-200"
              title="Rest Stop löschen"
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
              {getAmenityIcon(amenity)}
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
            Navigation
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDetailsClick(stop);
            }}
            className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition duration-200"
          >
            Details
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
    borderColor: string,
    stops: RestStop[]
  ) => (
    <section className={`w-full mt-20 mb-20 bg-gray-100 py-12 px-6 rounded-3xl border-t-4 ${borderColor}`}>
      <div className="flex items-start justify-between mb-10">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 text-base max-w-2xl leading-relaxed">{description}</p>
        </div>
        {isAdmin && (
          <button
            onClick={handleCreateRestStop}
            className="ml-4 bg-emerald-500 text-white p-3 rounded-full hover:bg-emerald-600 transition duration-200 flex-shrink-0"
            title="Neuen Rest Stop erstellen"
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
          disabled={currentIdx >= stops.length - 1}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg transition-all duration-200 ${
            currentIdx >= stops.length - 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-gray-100 hover:shadow-xl opacity-90 hover:opacity-100'
          }`}
          style={{ marginRight: '-20px' }}
        >
          <ChevronRight size={28} className={currentIdx >= stops.length - 1 ? 'text-gray-400' : 'text-[#c51d34]'} />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide px-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {stops.map((stop) => (
            <div key={stop.id} style={{ scrollSnapAlign: 'start' }}>
              <RestStopCard stop={stop} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10 space-x-3">
          {stops.map((_, index) => (
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
          ← Wischen zum Blättern →
        </div>
      </div>
    </section>
  );

  return (
    <>
      {renderSection(
        'Восточные маршруты',
        'Места отдыха и варианты ночлега на пути в Польшу, Беларусь и на Кавказ. Найдите всё необходимое для комфортной поездки'.,
        currentIndex,
        goToPrevious,
        goToNext,
        scrollContainerRef,
        'border-sky-400',
        restStopsEastern
      )}

      {renderSection(
        'Балтийские и восточные страны',
        'Комфортные остановки через в Польшу, Литву, Латвию, Белорусия и далее.
      
        currentIndex2,
        goToPrevious2,
        goToNext2,
        scrollContainerRef2,
        'border-emerald-400',
        restStopsBaltic
      )}

      {renderSection(
        'Южные маршруты',
        'Открой для себя удобный места отдыха и отели на маршруте в Грозный через Венгрию, Сербию, Болгарию, Турцию и Грузию.',
        currentIndex3,
        goToPrevious3,
        goToNext3,
        scrollContainerRef3,
        'border-orange-500',
        restStopsSouthern
      )}

      <RestStopDetailsModal
        restStop={selectedRestStop}
        onClose={() => setSelectedRestStop(null)}
      />
    </>
  );
};
