import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star, Navigation, Info, Car, Coffee, Utensils, Fuel, Plus, Edit, Trash2 } from 'lucide-react';
import { RestStopDetailsModal } from './modals/RestStopDetailsModal';
import { useAuth } from '../hooks/useAuth';
import { useModals } from '../hooks/useModals';

interface RestStop {
  id: number;
  name: string;
  type: 'Raststätte' | 'Hotel' | 'Tankstelle' | 'Restaurant';
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
      return <Car size={16} className="text-green-600" />;
    case 'Hotel':
      return <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">H</div>;
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
      return <div className="bg-blue-100 text-blue-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
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
    case 'Grünfläche':
      return <div className="bg-green-100 text-green-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
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
    case 'Autowäsche':
      return <div className="bg-indigo-100 text-indigo-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">🚗</span> Autowäsche
      </div>;
    case 'Hotel':
      return <div className="bg-purple-100 text-purple-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs flex items-center">
        <span className="mr-1">🏨</span> Hotel
      </div>;
    case 'Picknickplatz':
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
      const cardWidth = 380; // Width of each card
      const gap = 20; // Gap between cards
      const scrollPosition = index * (cardWidth + gap);
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
      
      // Reset scrolling flag after animation
      setTimeout(() => setIsScrolling(false), 300);
    }
  };
  
  const scrollToIndex2 = (index: number) => {
    if (scrollContainerRef2.current) {
      setIsScrolling2(true);
      const cardWidth = 380; // Width of each card
      const gap = 20; // Gap between cards
      const scrollPosition = index * (cardWidth + gap);
      
      scrollContainerRef2.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex2(index);
      
      // Reset scrolling flag after animation
      setTimeout(() => setIsScrolling2(false), 300);
    }
  };
  
  const scrollToIndex3 = (index: number) => {
    if (scrollContainerRef3.current) {
      setIsScrolling3(true);
      const cardWidth = 380; // Width of each card
      const gap = 20; // Gap between cards
      const scrollPosition = index * (cardWidth + gap);
      
      scrollContainerRef3.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex3(index);
      
      // Reset scrolling flag after animation
      setTimeout(() => setIsScrolling3(false), 300);
    }
  };
  
  const handleScroll = () => {
    if (isScrolling || !scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = 380;
    const gap = 20;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < restStopsData.length) {
      setCurrentIndex(newIndex);
    }
  };
  
  const handleScroll2 = () => {
    if (isScrolling2 || !scrollContainerRef2.current) return;
    
    const container = scrollContainerRef2.current;
    const cardWidth = 380;
    const gap = 20;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    
    if (newIndex !== currentIndex2 && newIndex >= 0 && newIndex < restStopsData.length) {
      setCurrentIndex2(newIndex);
    }
  };
  
  const handleScroll3 = () => {
    if (isScrolling3 || !scrollContainerRef3.current) return;
    
    const container = scrollContainerRef3.current;
    const cardWidth = 380;
    const gap = 20;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    
    if (newIndex !== currentIndex3 && newIndex >= 0 && newIndex < restStopsData.length) {
      setCurrentIndex3(newIndex);
    }
  };
  
  const goToPrevious = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };
  
  const goToNext = () => {
    if (currentIndex < restStopsData.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };
  
  const goToPrevious2 = () => {
    if (currentIndex2 > 0) {
      scrollToIndex2(currentIndex2 - 1);
    }
  };
  
  const goToNext2 = () => {
    if (currentIndex2 < restStopsData.length - 1) {
      scrollToIndex2(currentIndex2 + 1);
    }
  };
  
  const goToPrevious3 = () => {
    if (currentIndex3 > 0) {
      scrollToIndex3(currentIndex3 - 1);
    }
  };
  
  const goToNext3 = () => {
    if (currentIndex3 < restStopsData.length - 1) {
      scrollToIndex3(currentIndex3 + 1);
    }
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
    setSelectedRestStop(restStop);
    openModal('editRestStop');
  };

  const handleDeleteRestStop = (restStopId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Sind Sie sicher, dass Sie diesen Rest Stop löschen möchten?')) {
      setRestStopsData(prev => prev.filter(stop => stop.id !== restStopId));
      // Adjust current index if necessary
      if (currentIndex >= restStopsData.length - 1 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  return (
    <>
      <section className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Stops richtung Polen, Weißrussland, Russland, Kaukasus</h2>
          {isAdmin && (
            <button
              onClick={handleCreateRestStop}
              className="ml-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition duration-200"
              title="Neuen Rest Stop erstellen"
            >
              <Plus size={20} />
            </button>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full transition-all duration-200 ${
              currentIndex === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white shadow-md hover:shadow-lg text-gray-700 hover:text-gray-900'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= restStopsData.length - 1}
            className={`p-2 rounded-full transition-all duration-200 ${
              currentIndex >= restStopsData.length - 1 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white shadow-md hover:shadow-lg text-gray-700 hover:text-gray-900'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-all duration-200 ${
            currentIndex === 0 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100 hover:shadow-xl'
          }`}
          style={{ marginLeft: '-12px' }}
        >
          <ChevronLeft size={24} className={currentIndex === 0 ? 'text-gray-400' : 'text-gray-700'} />
        </button>
        
        {/* Right Arrow */}
        <button
          onClick={goToNext}
          disabled={currentIndex >= restStopsData.length - 1}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-all duration-200 ${
            currentIndex >= restStopsData.length - 1 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100 hover:shadow-xl'
          }`}
          style={{ marginRight: '-12px' }}
        >
          <ChevronRight size={24} className={currentIndex >= restStopsData.length - 1 ? 'text-gray-400' : 'text-gray-700'} />
        </button>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-5 pb-4 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {restStopsData.map((stop) => (
            <div 
              key={stop.id} 
              className="flex-shrink-0 w-96 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleDetailsClick(stop)}
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Image with overlay */}
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={stop.image}
                  alt={stop.name}
                  className="w-full h-full object-cover"
                />
                {/* Type badge */}
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
                  {getTypeIcon(stop.type)}
                  <span className="text-sm font-medium text-gray-800">{stop.type}</span>
                </div>
                {/* Rating badge */}
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span className="text-sm font-bold text-gray-800">{stop.rating}</span>
                </div>
                
                {/* Admin controls */}
                {isAdmin && (
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleEditRestStop(stop, e)}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-200"
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

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{stop.name}</h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{stop.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {stop.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {stop.amenities.map((amenity, index) => (
                    <div key={index}>
                      {getAmenityIcon(amenity)}
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex space-x-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigationClick(stop);
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                  >
                    <Navigation size={18} className="mr-2" />
                    Navigation
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDetailsClick(stop);
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition duration-200">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {restStopsData.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
        
        <div className="text-center mt-4 text-sm text-gray-500 md:hidden">
          ← Wischen Sie nach links/rechts für mehr Stops →
        </div>
      </div>
      </section>

      {/* Second Rest Stops Section */}
      <section className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Stops richtung Polen,Litauen, Lettland, Weißrussland, Russland, Kaukasus</h2>
          {isAdmin && (
            <button
              onClick={handleCreateRestStop}
              className="ml-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition duration-200"
              title="Neuen Rest Stop erstellen"
            >
              <Plus size={20} />
            </button>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={goToPrevious2}
            disabled={currentIndex2 === 0}
            className={`p-2 rounded-full transition-all duration-200 ${
              currentIndex2 === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white shadow-md hover:shadow-lg text-gray-700 hover:text-gray-900'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext2}
            disabled={currentIndex2 >= restStopsData.length - 1}
            className={`p-2 rounded-full transition-all duration-200 ${
              currentIndex2 >= restStopsData.length - 1 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white shadow-md hover:shadow-lg text-gray-700 hover:text-gray-900'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={goToPrevious2}
          disabled={currentIndex2 === 0}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-all duration-200 ${
            currentIndex2 === 0 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100 hover:shadow-xl'
          }`}
          style={{ marginLeft: '-12px' }}
        >
          <ChevronLeft size={24} className={currentIndex2 === 0 ? 'text-gray-400' : 'text-gray-700'} />
        </button>
        
        {/* Right Arrow */}
        <button
          onClick={goToNext2}
          disabled={currentIndex2 >= restStopsData.length - 1}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-all duration-200 ${
            currentIndex2 >= restStopsData.length - 1 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100 hover:shadow-xl'
          }`}
          style={{ marginRight: '-12px' }}
        >
          <ChevronRight size={24} className={currentIndex2 >= restStopsData.length - 1 ? 'text-gray-400' : 'text-gray-700'} />
        </button>
        
        <div 
          ref={scrollContainerRef2}
          className="flex overflow-x-auto space-x-5 pb-4 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {restStopsData.map((stop) => (
            <div 
              key={`section2-${stop.id}`} 
              className="flex-shrink-0 w-96 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleDetailsClick(stop)}
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Image with overlay */}
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={stop.image}
                  alt={stop.name}
                  className="w-full h-full object-cover"
                />
                {/* Type badge */}
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
                  {getTypeIcon(stop.type)}
                  <span className="text-sm font-medium text-gray-800">{stop.type}</span>
                </div>
                {/* Rating badge */}
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span className="text-sm font-bold text-gray-800">{stop.rating}</span>
                </div>
                
                {/* Admin controls */}
                {isAdmin && (
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleEditRestStop(stop, e)}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-200"
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

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{stop.name}</h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{stop.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {stop.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {stop.amenities.map((amenity, index) => (
                    <div key={index}>
                      {getAmenityIcon(amenity)}
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex space-x-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigationClick(stop);
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                  >
                    <Navigation size={18} className="mr-2" />
                    Navigation
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDetailsClick(stop);
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition duration-200">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {restStopsData.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex2(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex2 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
        
        <div className="text-center mt-4 text-sm text-gray-500 md:hidden">
          ← Wischen Sie nach links/rechts für mehr Stops →
        </div>
      </div>
      </section>

      {/* Third Rest Stops Section */}
      <section className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Stops richtung Ungarn, Serbein, Bulgarien, Türkei, Georgien, Kausasus </h2>
          {isAdmin && (
            <button
              onClick={handleCreateRestStop}
              className="ml-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition duration-200"
              title="Neuen Rest Stop erstellen"
            >
              <Plus size={20} />
            </button>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={goToPrevious3}
            disabled={currentIndex3 === 0}
            className={`p-2 rounded-full transition-all duration-200 ${
              currentIndex3 === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white shadow-md hover:shadow-lg text-gray-700 hover:text-gray-900'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext3}
            disabled={currentIndex3 >= restStopsData.length - 1}
            className={`p-2 rounded-full transition-all duration-200 ${
              currentIndex3 >= restStopsData.length - 1 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white shadow-md hover:shadow-lg text-gray-700 hover:text-gray-900'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={goToPrevious3}
          disabled={currentIndex3 === 0}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-all duration-200 ${
            currentIndex3 === 0 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100 hover:shadow-xl'
          }`}
          style={{ marginLeft: '-12px' }}
        >
          <ChevronLeft size={24} className={currentIndex3 === 0 ? 'text-gray-400' : 'text-gray-700'} />
        </button>
        
        {/* Right Arrow */}
        <button
          onClick={goToNext3}
          disabled={currentIndex3 >= restStopsData.length - 1}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-all duration-200 ${
            currentIndex3 >= restStopsData.length - 1 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100 hover:shadow-xl'
          }`}
          style={{ marginRight: '-12px' }}
        >
          <ChevronRight size={24} className={currentIndex3 >= restStopsData.length - 1 ? 'text-gray-400' : 'text-gray-700'} />
        </button>
        
        <div 
          ref={scrollContainerRef3}
          className="flex overflow-x-auto space-x-5 pb-4 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {restStopsData.map((stop) => (
            <div 
              key={`section3-${stop.id}`} 
              className="flex-shrink-0 w-96 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleDetailsClick(stop)}
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Image with overlay */}
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={stop.image}
                  alt={stop.name}
                  className="w-full h-full object-cover"
                />
                {/* Type badge */}
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
                  {getTypeIcon(stop.type)}
                  <span className="text-sm font-medium text-gray-800">{stop.type}</span>
                </div>
                {/* Rating badge */}
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span className="text-sm font-bold text-gray-800">{stop.rating}</span>
                </div>
                
                {/* Admin controls */}
                {isAdmin && (
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleEditRestStop(stop, e)}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-200"
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

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{stop.name}</h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{stop.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {stop.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {stop.amenities.map((amenity, index) => (
                    <div key={index}>
                      {getAmenityIcon(amenity)}
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex space-x-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigationClick(stop);
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                  >
                    <Navigation size={18} className="mr-2" />
                    Navigation
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDetailsClick(stop);
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition duration-200">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {restStopsData.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex3(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex3 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
        
        <div className="text-center mt-4 text-sm text-gray-500 md:hidden">
          ← Wischen Sie nach links/rechts für mehr Stops →
        </div>
      </div>
      </section>

      {/* Rest Stop Details Modal */}
      <RestStopDetailsModal 
        restStop={selectedRestStop} 
        onClose={() => setSelectedRestStop(null)} 
      />
    </>
  );
};