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

const backgroundImages = [
  'https://images.pexels.com/photos/163739/car-vehicle-road-street-163739.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/205419/pexels-photo-205419.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1181572/pexels-photo-1181572.jpeg?auto=compress&cs=tinysrgb&w=800'
];

export const InfoCards: React.FC = () => {
  const { cards, loading } = useInfoCards();

  if (loading) {
    return (
      <section className="my-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-700 rounded-lg p-6 animate-pulse h-48" />
          ))}
        </div>
      </section>
    );
  }

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group border-t-2 ${borderColors[index % borderColors.length]} border border-gray-200 hover:border-gray-300`}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%), url('${backgroundImages[index % backgroundImages.length]}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="p-6 relative z-10">
              <h3 className={`text-xl font-bold text-white mb-4 transition-colors ${hoverTitleColors[index % hoverTitleColors.length]}`}>
                {card.title}
              </h3>
              <p className="text-gray-100 text-sm leading-relaxed mb-6 min-h-[80px]">
                {card.description}
              </p>
              <div className="flex items-center text-red-400 font-medium text-sm group-hover:text-red-300 transition-colors">
                <span>{card.link_text}</span>
                <ChevronRight size={18} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
