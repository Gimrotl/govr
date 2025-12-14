import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useInfoCards } from '../hooks/useInfoCards';

const borderColors = [
  'border-t-blue-500',
  'border-t-green-500',
  'border-t-orange-500'
];

const hoverTitleColors = [
  'group-hover:text-blue-600',
  'group-hover:text-green-600',
  'group-hover:text-orange-600'
];

export const InfoCards: React.FC = () => {
  const { cards, loading } = useInfoCards();

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
    <section className="my-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/15 via-gray-600/5 to-transparent rounded-lg pointer-events-none"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40 rounded-lg pointer-events-none"></div>
    </section>
  );
};
