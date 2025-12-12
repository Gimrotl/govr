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
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-cyan-500/20 hover:shadow-2xl transform hover:-translate-y-1 hover:border-cyan-500/50">
      {(ride.carImage || (ride.additionalImages && ride.additionalImages.length > 0)) && (
        <div className="p-3">
          <img
            src={ride.carImage || ride.additionalImages?.[0] || 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg'}
            alt={`${ride.driver}'s car`}
            className="w-full h-32 object-cover rounded-lg border-2 border-slate-700 shadow-sm"
          />
        </div>
      )}


      <div className="p-5 flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col">
            <h3 className="font-semibold text-slate-100">{ride.from} → {ride.to}</h3>
            <div className="flex items-center mt-1 text-slate-400">
              <Calendar size={16} className="mr-1" />
              <span className="text-sm">{ride.date}</span>
              <Clock size={16} className="ml-3 mr-1" />
              <span className="text-sm">{ride.time}</span>
            </div>
          </div>
          <span className="font-bold text-cyan-400">{ride.price}</span>
        </div>

        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mr-2 text-white font-semibold">
            {ride.driver.charAt(0).toUpperCase()}
          </div>
          <div>
            <button
              onClick={handleDriverClick}
              className="text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            >
              {ride.driver}
            </button>
            <StarRating rating={ride.rating} onClick={handleRatingClick} />
          </div>
        </div>

        <div className="flex items-center text-sm text-slate-400 mb-3">
          <Users size={16} className="mr-1" />
          <span>{availableSeats} {availableSeats === 1 ? 'seat' : 'seats'} available</span>
        </div>
      </div>

      <div className="px-5 pb-4">
        <button
          onClick={() => openRideDetails(ride)}
          className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
};