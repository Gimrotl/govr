import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Ride } from '../types';
import { StarRating } from './StarRating';
import { useModals } from '../hooks/useModals';

interface RideCardProps {
  ride: Ride;
}

export const RideCard: React.FC<RideCardProps> = ({ ride }) => {
  const { openRideDetails, openUserProfile, openUserReviews } = useModals();

  const availableSeats = ride.availableSeats - ride.bookedSeats;

  const handleDriverClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const userProfile = {
      firstName: ride.driver,
      age: 'Not specified',
      mobile: ride.mobile || 'Not provided',
      whatsapp: ride.whatsapp || 'Not provided',
      telegram: ride.telegram || 'Not provided',
      carImages: [
        ...(ride.carImage ? [ride.carImage] : []),
        ...(ride.additionalImages || [])
      ].filter(Boolean),
      car: ride.car,
      carImage: ride.carImage,
      rating: ride.rating,
      driverInfo: ride.driverInfo
    };
    openUserProfile(userProfile);
  };

  const handleRatingClick = () => {
    const userProfile = {
      firstName: ride.driver,
      age: 'Not specified',
      mobile: ride.mobile || 'Not provided',
      whatsapp: ride.whatsapp || 'Not provided',
      telegram: ride.telegram || 'Not provided',
      carImages: [
        ...(ride.carImage ? [ride.carImage] : []),
        ...(ride.additionalImages || [])
      ].filter(Boolean),
      car: ride.car,
      carImage: ride.carImage,
      rating: ride.rating,
      driverInfo: ride.driverInfo,
      reviews: ride.reviews
    };
    openUserReviews(userProfile);
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:border-cyan-200">
      {/* Car image at the top */}
      {(ride.carImage || (ride.additionalImages && ride.additionalImages.length > 0)) && (
        <div className="p-4">
          <img
            src={ride.carImage || ride.additionalImages?.[0] || 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg'}
            alt={`${ride.driver}'s car`}
            className="w-full h-40 object-cover rounded-xl shadow-md"
          />
        </div>
      )}

      <div className="px-5 py-4 flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col flex-1">
            <h3 className="font-bold text-lg text-slate-900">{ride.from} → {ride.to}</h3>
            <div className="flex items-center mt-2 text-slate-600 space-x-4">
              <div className="flex items-center text-sm">
                <Calendar size={14} className="mr-1.5 text-cyan-600" />
                <span>{ride.date}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock size={14} className="mr-1.5 text-cyan-600" />
                <span>{ride.time}</span>
              </div>
            </div>
          </div>
          <div className="ml-2">
            <span className="font-bold text-2xl text-cyan-600">{ride.price}</span>
          </div>
        </div>

        <div className="flex items-center mb-4 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">
            {ride.driver.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <button
              onClick={handleDriverClick}
              className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
            >
              {ride.driver}
            </button>
            <StarRating rating={ride.rating} onClick={handleRatingClick} />
          </div>
        </div>

        <div className="flex items-center text-sm text-slate-600">
          <Users size={16} className="mr-2 text-cyan-600" />
          <span className="font-medium">{availableSeats} {availableSeats === 1 ? 'seat' : 'seats'} available</span>
        </div>
      </div>

      <div className="px-5 pb-4">
        <button
          onClick={() => openRideDetails(ride)}
          className="w-full bg-cyan-600 text-white py-3 px-4 rounded-xl hover:bg-cyan-700 transition duration-200 font-semibold text-sm shadow-md hover:shadow-lg"
        >
          View Details
        </button>
      </div>
    </div>
  );
};