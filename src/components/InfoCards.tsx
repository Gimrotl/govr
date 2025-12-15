import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useInfoCards } from '../hooks/useInfoCards';

const borderColors = [
  'border-t-sky-400',
  'border-t-green-500',
  'border-t-orange-500'
];

const hoverTitleColors = [
  'group-hover:text-sky-500',
  'group-hover:text-green-600',
  'group-hover:text-orange-600'
];

export const InfoCards: React.FC = () => {
  const { cards, loading } = useInfoCards();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(distance) > threshold) {
      if (distance > 0 && currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (distance < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (loading) {
    return (
      <section className="my-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-6 animate-pulse h-48" />
          ))}
        </div>
      </section>
    );
  }

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="my-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/25 via-gray-400/10 to-transparent pointer-events-none -z-10"></div>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`bg-gray-100 rounded-lg p-6 transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1 cursor-pointer group border-t-2 ${borderColors[index % borderColors.length]} border border-gray-200 hover:border-gray-300`}
          >
            <h3 className={`text-xl font-bold text-gray-900 mb-4 transition-colors ${hoverTitleColors[index % hoverTitleColors.length]}`}>
              {card.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 min-h-[80px]">
              {card.description}
            </p>
            <div className="flex items-center text-red-500 font-medium text-sm group-hover:text-red-600 transition-colors">
              <span>{card.link_text}</span>
              <ChevronRight size={18} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      <div className="md:hidden relative">
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="w-full flex-shrink-0 px-4"
              >
                <div
                  className={`bg-gray-100 rounded-lg p-6 transition-all duration-300 border-t-2 ${borderColors[index % borderColors.length]} border border-gray-200`}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 min-h-[80px]">
                    {card.description}
                  </p>
                  <div className="flex items-center text-red-500 font-medium text-sm">
                    <span>{card.link_text}</span>
                    <ChevronRight size={18} className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed left-0 right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-between px-4 pointer-events-none z-40">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="pointer-events-auto p-2 rounded-full bg-white shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 hover:shadow-lg"
            aria-label="Vorherige Karte"
          >
            <ChevronLeft size={20} className={currentIndex === 0 ? 'text-gray-400' : 'text-red-500'} />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex === cards.length - 1}
            className="pointer-events-auto p-2 rounded-full bg-white shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 hover:shadow-lg"
            aria-label="Nächste Karte"
          >
            <ChevronRight size={20} className={currentIndex === cards.length - 1 ? 'text-gray-400' : 'text-red-500'} />
          </button>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-emerald-500 w-6'
                  : 'bg-gray-300 w-2'
              }`}
              aria-label={`Gehe zu Karte ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
