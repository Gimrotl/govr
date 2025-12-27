import React from 'react';
import { X, Car, Shield, Luggage } from 'lucide-react';
import { useModals } from '../../hooks/useModals';

const iconComponents = {
  car: Car,
  shield: Shield,
  luggage: Luggage
};

const iconColors = {
  car: 'text-terracotta-600',
  shield: 'text-deep-slate-600',
  luggage: 'text-terracotta-500'
};

const iconBgColors = {
  car: 'bg-terracotta-100',
  shield: 'bg-deep-slate-100',
  luggage: 'bg-terracotta-50'
};

export const InfoCardModal: React.FC = () => {
  const { activeModals, selectedInfoCard, closeModal } = useModals();

  if (!activeModals.infoCard || !selectedInfoCard) return null;

  const IconComponent = iconComponents[selectedInfoCard.iconType];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
        <div className="relative bg-gradient-to-br from-deep-slate-700 to-deep-slate-800 pt-12 pb-16 px-6">
          <button
            onClick={() => closeModal('infoCard')}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full ${iconBgColors[selectedInfoCard.iconType]} flex items-center justify-center mb-4 shadow-lg`}>
              <IconComponent size={40} className={iconColors[selectedInfoCard.iconType]} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-white text-center">
              {selectedInfoCard.title}
            </h2>
          </div>
        </div>

        <div className="p-6 -mt-8">
          <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
            <p className="text-deep-slate-600 leading-relaxed text-center">
              {selectedInfoCard.description}
            </p>
          </div>

          <button
            onClick={() => closeModal('infoCard')}
            className="w-full mt-6 bg-terracotta-600 hover:bg-terracotta-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
