import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star, Navigation, Car, Fuel, Utensils, Plus, Edit, Trash2, AlertCircle, Loader2 } from 'lucide-react';
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

const AMENITY_STYLES: Record<string, { icon: string; label: string; color: string }> = {
  WC: { icon: '🚻', label: 'WC', color: 'bg-sky-100 text-sky-700' },
  Kinderfreundlich: { icon: '👶', label: 'Kinderfreundlich', color: 'bg-pink-100 text-pink-800' },
  Sport: { icon: '⚽', label: 'Sport', color: 'bg-orange-100 text-orange-800' },
  Restaurant: { icon: '🍽️', label: 'Restaurant', color: 'bg-red-100 text-red-800' },
  Grün: { icon: '🌳', label: 'Grünfläche', color: 'bg-emerald-50 text-emerald-700' },
  Parkplatz: { icon: '🅿️', label: 'Parkplatz', color: 'bg-gray-100 text-gray-800' },
  Duschen: { icon: '🚿', label: 'Duschen', color: 'bg-cyan-100 text-cyan-800' },
  Tankstelle: { icon: '⛽', label: 'Tankstelle', color: 'bg-red-100 text-red-800' },
  Autowaschen: { icon: '🚗', label: 'Autowäsche', color: 'bg-sky-100 text-sky-700' },
  Hotel: { icon: '🏨', label: 'Hotel', color: 'bg-amber-100 text-amber-800' },
  Kinder: { icon: '👶', label: 'Kinderfreundlich', color: 'bg-pink-100 text-pink-800' },
  Essen: { icon: '🍽️', label: 'Restaurant', color: 'bg-red-100 text-red-800' },
  Esstisch: { icon: '🪑', label: 'Picknickplatz', color: 'bg-amber-100 text-amber-800' },
};

const AmenityBadge = React.memo(({ amenity }: { amenity: string }) => {
  const style = AMENITY_STYLES[amenity] || { icon: '📍', label: amenity, color: 'bg-gray-100 text-gray-800' };
  return (
    <div className={`${style.color} px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center`}>
      <span className="mr-1">{style.icon}</span> {style.label}
    </div>
  );
});

interface RestStopCardProps {
  stop: RestStop;
  isAdmin: boolean;
  onDetailsClick: (stop: RestStop) => void;
  onNavigationClick: (stop: RestStop) => void;
  onEditClick: (stop: RestStop, e: React.MouseEvent) => void;
  onDeleteClick: (id: string, e: React.MouseEvent) => void;
}

const RestStopCard = React.memo(({ stop, isAdmin, onDetailsClick, onNavigationClick, onEditClick, onDeleteClick }: RestStopCardProps) => (
  <div
    className="flex-shrink-0 w-72 sm:w-80 md:w-96 h-[500px] bg-gray-100 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border-2 border-gray-200 flex flex-col"
    onClick={() => onDetailsClick(stop)}
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={stop.image}
        alt={stop.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
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
            onClick={(e) => onEditClick(stop, e)}
            className="bg-sky-500 text-white p-2 rounded-full hover:bg-sky-600 transition duration-200"
            title="Rest Stop bearbeiten"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => onDeleteClick(stop.id, e)}
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
          <AmenityBadge key={index} amenity={amenity} />
        ))}
      </div>

      <div className="flex flex-col space-y-2 mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigationClick(stop);
          }}
          className="w-full bg-sky-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-sky-600 transition duration-200 flex items-center justify-center"
        >
          <Navigation size={18} className="mr-2" />
          Navigation
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDetailsClick(stop);
          }}
          className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition duration-200"
        >
          Details
        </button>
      </div>
    </div>
  </div>
));

interface SectionProps {
  title: string;
  description: string;
  borderColor: string;
  stops: RestStop[];
  isAdmin: boolean;
  onCreateClick: () => void;
  onDetailsClick: (stop: RestStop) => void;
  onNavigationClick: (stop: RestStop) => void;
  onEditClick: (stop: RestStop, e: React.MouseEvent) => void;
  onDeleteClick: (id: string, e: React.MouseEvent) => void;
}

const RestStopSection = React.memo(({
  title,
  description,
  borderColor,
  stops,
  isAdmin,
  onCreateClick,
  onDetailsClick,
  onNavigationClick,
  onEditClick,
  onDeleteClick,
}: SectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback((index: number) => {
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
  }, []);

  const handleScroll = useCallback(() => {
    if (isScrolling || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = 312;
    const gap = 24;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < stops.length) {
      setCurrentIndex(newIndex);
    }
  }, [currentIndex, isScrolling, stops.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) scrollToIndex(currentIndex - 1);
  }, [currentIndex, scrollToIndex]);

  const goToNext = useCallback(() => {
    if (currentIndex < stops.length - 1) scrollToIndex(currentIndex + 1);
  }, [currentIndex, stops.length, scrollToIndex]);

  if (stops.length === 0) return null;

  return (
    <section className={`w-full mt-20 mb-20 bg-gray-100 py-12 px-6 rounded-3xl border-t-4 ${borderColor}`}>
      <div className="flex items-start justify-between mb-10">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 text-base max-w-2xl leading-relaxed">{description}</p>
        </div>
        {isAdmin && (
          <button
            onClick={onCreateClick}
            className="ml-4 bg-emerald-500 text-white p-3 rounded-full hover:bg-emerald-600 transition duration-200 flex-shrink-0"
            title="Neuen Rest Stop erstellen"
          >
            <Plus size={24} />
          </button>
        )}
      </div>

      <div className="relative">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg transition-all duration-200 ${
            currentIndex === 0
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-gray-100 hover:shadow-xl opacity-90 hover:opacity-100'
          }`}
          style={{ marginLeft: '-20px' }}
        >
          <ChevronLeft size={28} className={currentIndex === 0 ? 'text-gray-400' : 'text-[#c51d34]'} />
        </button>

        <button
          onClick={goToNext}
          disabled={currentIndex >= stops.length - 1}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg transition-all duration-200 ${
            currentIndex >= stops.length - 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-gray-100 hover:shadow-xl opacity-90 hover:opacity-100'
          }`}
          style={{ marginRight: '-20px' }}
        >
          <ChevronRight size={28} className={currentIndex >= stops.length - 1 ? 'text-gray-400' : 'text-[#c51d34]'} />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide px-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {stops.map((stop) => (
            <div key={stop.id} style={{ scrollSnapAlign: 'start' }}>
              <RestStopCard
                stop={stop}
                isAdmin={isAdmin}
                onDetailsClick={onDetailsClick}
                onNavigationClick={onNavigationClick}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10 space-x-3">
          {stops.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-sky-500 w-10'
                  : 'bg-gray-300 w-3 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-6 text-sm text-gray-500 md:hidden">
          Wischen zum Blaettern
        </div>
      </div>
    </section>
  );
});

export const RestStops: React.FC = () => {
  const [selectedRestStop, setSelectedRestStop] = useState<RestStop | null>(null);
  const { isAdmin } = useAuth();
  const { openRestStopEdit, openModal } = useModals();
  const { restStops: restStopsData, loading, error, deleteRestStop, refetch } = useRestStops();

  const restStopsEastern = useMemo(() =>
    restStopsData.filter(stop => stop.route === 'eastern'),
    [restStopsData]
  );
  const restStopsBaltic = useMemo(() =>
    restStopsData.filter(stop => stop.route === 'baltic'),
    [restStopsData]
  );
  const restStopsSouthern = useMemo(() =>
    restStopsData.filter(stop => stop.route === 'southern'),
    [restStopsData]
  );

  const handleDetailsClick = useCallback((restStop: RestStop) => {
    setSelectedRestStop(restStop);
  }, []);

  const handleNavigationClick = useCallback((restStop: RestStop) => {
    const query = encodeURIComponent(`${restStop.name}, ${restStop.address}`);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(googleMapsUrl, '_blank');
  }, []);

  const handleCreateRestStop = useCallback(() => {
    openModal('createRestStop');
  }, [openModal]);

  const handleEditRestStop = useCallback((restStop: RestStop, e: React.MouseEvent) => {
    e.stopPropagation();
    openRestStopEdit(restStop);
  }, [openRestStopEdit]);

  const handleDeleteRestStop = useCallback(async (restStopId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Sind Sie sicher, dass Sie diesen Rest Stop loeschen moechten?')) {
      await deleteRestStop(restStopId);
    }
  }, [deleteRestStop]);

  if (loading) {
    return (
      <div className="w-full mt-20 mb-20 flex items-center justify-center py-20">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 size={48} className="text-sky-500 animate-spin" />
          <p className="text-gray-600 text-lg">Raststätten werden geladen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mt-20 mb-20 flex items-center justify-center py-20">
        <div className="flex flex-col items-center space-y-4 bg-red-50 p-8 rounded-2xl border border-red-200 max-w-md">
          <AlertCircle size={48} className="text-red-500" />
          <p className="text-red-700 text-lg font-medium text-center">Fehler beim Laden der Raststätten</p>
          <p className="text-red-600 text-sm text-center">{error}</p>
          <button
            onClick={() => refetch()}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    {
      title: 'Восточные маршруты',
      description: 'Места отдыха и ночлега на пути в Грозный через Польшу, Беларусь, Москва, Грозный.',
      borderColor: 'border-sky-400',
      stops: restStopsEastern,
    },
    {
      title: 'Балтийские и восточные страны',
      description: 'Комфортные остановки через в Польшу, Литву, Латвию, Белорусия и далее.',
      borderColor: 'border-emerald-400',
      stops: restStopsBaltic,
    },
    {
      title: 'Южные маршруты',
      description: 'Открой для себя удобный места отдыха и отели на маршруте в Грозный через Венгрию, Сербию, Болгарию, Турцию и Грузию.',
      borderColor: 'border-orange-500',
      stops: restStopsSouthern,
    },
  ];

  return (
    <>
      {sections.map((section, index) => (
        <RestStopSection
          key={index}
          title={section.title}
          description={section.description}
          borderColor={section.borderColor}
          stops={section.stops}
          isAdmin={isAdmin}
          onCreateClick={handleCreateRestStop}
          onDetailsClick={handleDetailsClick}
          onNavigationClick={handleNavigationClick}
          onEditClick={handleEditRestStop}
          onDeleteClick={handleDeleteRestStop}
        />
      ))}

      <RestStopDetailsModal
        restStop={selectedRestStop}
        onClose={() => setSelectedRestStop(null)}
      />
    </>
  );
};
