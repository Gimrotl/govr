import React from 'react';
import { X } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { Ride } from '../../types';
import { StarRating } from '../StarRating';
import { CarTypeIcon } from '../CarTypeIcon';

interface CurrentRidesModalProps {
  rides: Ride[];
  driverName: string;
}

export const CurrentRidesModal: React.FC<CurrentRidesModalProps> = ({ rides, driverName }) => {
  const { closeModal, activeModals } = useModals();

  if (!activeModals.currentRides) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-2 md:p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[85vh] overflow-auto animate-scaleIn">
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center">
              <CarTypeIcon size={24} className="mr-2 text-emerald-500" />
              Aktuelle Fahrten
            </h2>
            <button
              onClick={() => closeModal('currentRides')}
              className="text-red-500 hover:text-red-700 transition duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {rides.length > 0 ? (
            <div className="space-y-3">
              {rides.map((ride) => (
                <div
                  key={ride.id}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 md:p-5 rounded-lg border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-base md:text-lg">
                        {ride.from} → {ride.to}
                      </p>
                      <div className="flex flex-col gap-1 mt-2 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Datum:</span> {ride.date}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Zeit:</span> {ride.time} Uhr
                        </p>
                        <p className="text-emerald-600 font-semibold mt-1">
                          {ride.price}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center">
                          <StarRating rating={ride.rating} size={14} />
                          <span className="text-xs md:text-sm text-gray-600 ml-1">
                            {ride.rating}
                          </span>
                        </div>
                        <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                          {ride.availableSeats - ride.bookedSeats} Plätze
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <CarTypeIcon size={48} className="text-gray-300 mb-3" />
              <p className="text-gray-600 text-center">
                Keine aktuellen Fahrten verfügbar
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
