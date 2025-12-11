import React from 'react';
import { X, Star } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { Review } from '../../types';

interface ReviewsModalProps {
  driverName: string;
  reviews: Review[];
  averageRating: number;
}

export const ReviewsModal: React.FC = () => {
  const { closeModal, selectedRide, selectedUser } = useModals();
  
  if (!selectedRide && !selectedUser) return null;
  
  const driverName = selectedRide?.driver || selectedUser?.firstName || 'Driver';
  const reviews = selectedRide?.reviews || selectedUser?.reviews || [];
  const averageRating = selectedRide?.rating || selectedUser?.rating || 0;
  const totalReviews = reviews.length;

  const getStarRating = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < rating ? '#FCD34D' : 'none'}
        stroke={index < rating ? '#FCD34D' : '#D1D5DB'}
        strokeWidth={1.5}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[80] p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] animate-scaleIn">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Bewertungen für {driverName}
            </h2>
            <div className="flex items-center mt-2">
              <div className="flex items-center mr-3">
                {getStarRating(Math.floor(averageRating))}
              </div>
              <span className="text-xl font-bold text-gray-800 mr-2">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-gray-600">
                ({totalReviews} {totalReviews === 1 ? 'Bewertung' : 'Bewertungen'})
              </span>
            </div>
          </div>
          <button
            onClick={() => closeModal('reviews')}
            className="text-red-500 hover:text-red-700 transition duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Reviews Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">Noch keine Bewertungen</p>
              <p className="text-gray-400 text-sm mt-2">
                Seien Sie der Erste, der {driverName} bewertet!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start space-x-4">
                    {/* User Avatar */}
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {review.user.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    
                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 text-lg">
                          {review.user}
                        </h4>
                        <div className="flex items-center">
                          {getStarRating(review.rating)}
                          <span className="ml-2 font-bold text-gray-700">
                            {review.rating}.0
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                      
                      {/* Review Date (if available) */}
                      <div className="mt-3 text-sm text-gray-500">
                        Bewertet am {new Date().toLocaleDateString('de-DE')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};