import React from 'react';
import { X } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { OfferRideForm } from '../OfferRideForm';

export const OfferRideModal: React.FC = () => {
  const { closeModal } = useModals();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gray-100 rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-auto animate-scaleIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Offer a Ride</h2>
          <button
            onClick={() => closeModal('offerRide')}
            className="text-red-500 hover:text-red-700 transition duration-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <OfferRideForm onBack={() => closeModal('offerRide')} />
      </div>
    </div>
  );
};