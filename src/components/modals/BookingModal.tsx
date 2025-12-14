import React, { useState } from 'react';
import { X, Users, MessageSquare } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useAuth } from '../../hooks/useAuth';
import { useRides } from '../../hooks/useRides';

export const BookingModal: React.FC = () => {
  const { selectedRide, closeModal } = useModals();
  const { isLoggedIn } = useAuth();
  const { bookRide } = useRides();
  const [bookingSeats, setBookingSeats] = useState(1);
  const [message, setMessage] = useState('');

  if (!selectedRide) return null;

  const availableSeats = selectedRide.availableSeats - selectedRide.bookedSeats;

  const handleBooking = () => {
    if (!isLoggedIn) {
      alert('Bitte loggen Sie sich ein, um eine Fahrt zu buchen.');
      return;
    }

    if (bookingSeats > availableSeats) {
      alert(`Nur ${availableSeats} Plätze verfügbar.`);
      return;
    }

    // Book the ride
    bookRide(selectedRide.id, bookingSeats);
    
    // Show confirmation with message if provided
    const confirmationText = message 
      ? `Buchung erfolgreich! Ihre Nachricht "${message}" wurde an ${selectedRide.driver} gesendet.`
      : `Buchung erfolgreich! ${bookingSeats} Platz${bookingSeats > 1 ? 'ätze' : ''} gebucht.`;
    
    alert(confirmationText);
    closeModal('booking');
    closeModal('rideDetails');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-scaleIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Fahrt buchen</h2>
          <button
            onClick={() => closeModal('booking')}
            className="text-red-500 hover:text-red-700 transition duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Ride info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">
              {selectedRide.from} → {selectedRide.to}
            </h3>
            <p className="text-sm text-gray-600">
              {selectedRide.date} um {selectedRide.time}
            </p>
            <p className="text-lg font-bold text-emerald-500 mt-1">
              {selectedRide.price}
            </p>
          </div>

          {/* Seat selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anzahl Plätze
            </label>
            <div className="flex items-center space-x-3">
              <Users size={20} className="text-gray-400" />
              <select
                value={bookingSeats}
                onChange={(e) => setBookingSeats(Number(e.target.value))}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              >
                {[...Array(Math.min(availableSeats, 8))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Platz{i > 0 ? 'ätze' : ''}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {availableSeats} Plätze verfügbar
            </p>
          </div>

          {/* Optional message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nachricht an Fahrer (optional)
            </label>
            <div className="relative">
              <MessageSquare size={20} className="absolute left-3 top-3 text-gray-400" />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hallo, ich möchte gerne mitfahren..."
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent h-20 resize-none"
                maxLength={200}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {message.length}/200 Zeichen
            </p>
          </div>

          {/* Total price */}
          <div className="bg-sky-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">Gesamtpreis:</span>
              <span className="text-xl font-bold text-sky-500">
                {selectedRide.price.includes('€') 
                  ? `€${(parseInt(selectedRide.price.replace('€', '')) * bookingSeats)}`
                  : `${bookingSeats} × ${selectedRide.price}`
                }
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={() => closeModal('booking')}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              Abbrechen
            </button>
            <button
              onClick={handleBooking}
              className="flex-1 bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-600 transition duration-200 font-medium"
            >
              Jetzt buchen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};