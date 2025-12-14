import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RideCard } from './RideCard';
import { Ride } from '../types';

interface RidesListProps {
  rides: Ride[];
}

export const RidesList: React.FC<RidesListProps> = ({ rides }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = React.useState(false);
  
  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      setIsScrolling(true);
      const cardWidth = 320; // Width of each card
      const gap = 16; // Gap between cards
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
  
  const handleScroll = () => {
    if (isScrolling || !scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = 320;
    const gap = 16;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < rides.length) {
      setCurrentIndex(newIndex);
    }
  };
  
  const goToPrevious = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };
  
  const goToNext = () => {
    if (currentIndex < rides.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };
  
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentIndex, isScrolling]);

  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-6">
      {rides.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">No rides found matching your criteria.</p>
        </div>
      ) : (
        <>
          {/* Horizontal Scroll for all devices */}
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
              <ChevronLeft size={24} className={currentIndex === 0 ? 'text-gray-400' : 'text-[#c51d34]'} />
            </button>
            
            {/* Right Arrow */}
            <button
              onClick={goToNext}
              disabled={currentIndex >= rides.length - 1}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-all duration-200 ${
                currentIndex >= rides.length - 1 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-100 hover:shadow-xl'
              }`}
              style={{ marginRight: '-12px' }}
            >
              <ChevronRight size={24} className={currentIndex >= rides.length - 1 ? 'text-gray-400' : 'text-[#c51d34]'} />
            </button>
            
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {rides.map((ride) => (
                <div 
                  key={ride.id} 
                  className="flex-shrink-0 w-80 md:w-72"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <RideCard ride={ride} />
                </div>
              ))}
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {rides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-emerald-500 w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <div className="text-center mt-4 text-sm text-gray-500 md:hidden">
              ← Wischen Sie nach links/rechts für mehr Fahrten →
            </div>
          </div>
        </>
      )}
    </div>
  );
};