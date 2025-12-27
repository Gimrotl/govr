import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Car, Shield, Luggage } from 'lucide-react';
import { useInfoCards } from '../hooks/useInfoCards';
import { useModals } from '../hooks/useModals';
import { InfoCardData } from '../contexts/ModalsContext';

const iconComponents = [Car, Luggage, Luggage];

const iconColors = [
  'text-terracotta-600',
  'text-deep-slate-600',
  'text-terracotta-500'
];

const iconBgColors = [
  'bg-terracotta-100',
  'bg-deep-slate-100',
  'bg-terracotta-50'
];

const borderColors = [
  'border-t-terracotta-500',
  'border-t-deep-slate-500',
  'border-t-terracotta-400'
];

const hoverBorderColors = [
  'hover:border-terracotta-600',
  'hover:border-deep-slate-600',
  'hover:border-terracotta-500'
];

const iconTypes: Array<'car' | 'luggage' | 'luggage'> = ['car', 'luggage', 'luggage'];

export const InfoCards: React.FC = () => {
  const { cards, loading } = useInfoCards();
  const { openInfoCard } = useModals();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleCardClick = (card: typeof cards[0], index: number) => {
    const cardData: InfoCardData = {
      id: card.id,
      title: card.title,
      description: card.description,
      iconType: iconTypes[index % iconTypes.length]
    };
    openInfoCard(cardData);
  };

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
      <div className="absolute inset-0 bg-gradient-to-b from-deep-slate-700/10 via-terracotta-500/5 to-transparent pointer-events-none -z-10"></div>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const IconComponent = iconComponents[index % iconComponents.length];
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card, index)}
              className={`bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group border-t-4 ${borderColors[index % borderColors.length]} border border-gray-100 ${hoverBorderColors[index % hoverBorderColors.length]}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full ${iconBgColors[index % iconBgColors.length]} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <IconComponent size={32} className={`${iconColors[index % iconColors.length]} transition-colors`} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-deep-slate-700 mb-3 transition-colors group-hover:text-deep-slate-800">
                  {card.title}
                </h3>
                <div className="flex items-center text-terracotta-600 font-medium text-sm group-hover:text-terracotta-700 transition-colors">
                  <span>{card.link_text}</span>
                  <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
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
            {cards.map((card, index) => {
              const IconComponent = iconComponents[index % iconComponents.length];
              return (
                <div
                  key={card.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div
                    onClick={() => handleCardClick(card, index)}
                    className={`bg-white rounded-xl p-6 transition-all duration-300 border-t-4 ${borderColors[index % borderColors.length]} border border-gray-100 cursor-pointer`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-14 h-14 rounded-full ${iconBgColors[index % iconBgColors.length]} flex items-center justify-center mb-4`}>
                        <IconComponent size={28} className={iconColors[index % iconColors.length]} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg font-bold text-deep-slate-700 mb-3">
                        {card.title}
                      </h3>
                      <div className="flex items-center text-terracotta-600 font-medium text-sm">
                        <span>{card.link_text}</span>
                        <ChevronRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-white shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 hover:shadow-lg"
            aria-label="Vorherige Karte"
          >
            <ChevronLeft size={20} className={currentIndex === 0 ? 'text-gray-400' : 'text-terracotta-600'} />
          </button>

          <div className="flex gap-2">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-terracotta-500 w-6'
                    : 'bg-gray-300 w-2'
                }`}
                aria-label={`Gehe zu Karte ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={currentIndex === cards.length - 1}
            className="p-2 rounded-full bg-white shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 hover:shadow-lg"
            aria-label="Nächste Karte"
          >
            <ChevronRight size={20} className={currentIndex === cards.length - 1 ? 'text-gray-400' : 'text-terracotta-600'} />
          </button>
        </div>
      </div>
    </section>
  );
};
