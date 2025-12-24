import React, { useState } from 'react';
import { X, MapPin, Star, Navigation, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useAuth } from '../../hooks/useAuth';
import { RestStopReviewsModal } from './RestStopReviewsModal';
import { RestStop } from '../../hooks/useRestStops';

interface RestStopDetailsModalProps {
  restStop: RestStop | null;
  onClose: () => void;
}

interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies: Reply[];
  userLiked?: boolean;
  userDisliked?: boolean;
}

interface Reply {
  id: number;
  userId: string;
  userName: string;
  comment: string;
  timestamp: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Raststätte':
      return '🚗';
    case 'Hotel':
      return '🏨';
    case 'Tankstelle':
      return '⛽';
    case 'Restaurant':
      return '🍽️';
    default:
      return '📍';
  }
};

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case 'WC':
      return { icon: '🚻', label: 'WC', color: 'bg-sky-100 text-sky-700' };
    case 'Kinder':
      return { icon: '👶', label: 'Kinderfreundlich', color: 'bg-pink-100 text-pink-800' };
    case 'Sport':
      return { icon: '⚽', label: 'Sport', color: 'bg-orange-100 text-orange-800' };
    case 'Essen':
      return { icon: '🍽️', label: 'Restaurant', color: 'bg-red-100 text-red-800' };
    case 'Grün':
      return { icon: '🌳', label: 'Grünfläche', color: 'bg-emerald-50 text-emerald-700' };
    case 'Parkplatz':
      return { icon: '🅿️', label: 'Parkplatz', color: 'bg-gray-100 text-gray-800' };
    case 'Duschen':
      return { icon: '🚿', label: 'Duschen', color: 'bg-cyan-100 text-cyan-800' };
    case 'Tankstelle':
      return { icon: '⛽', label: 'Tankstelle', color: 'bg-red-100 text-red-800' };
    case 'Autowaschen':
      return { icon: '🚗', label: 'Autowäsche', color: 'bg-sky-100 text-sky-700' };
    case 'Hotel':
      return { icon: '🏨', label: 'Hotel', color: 'bg-purple-100 text-purple-800' };
    case 'Strand':
      return { icon: '🏖️', label: 'Strand', color: 'bg-sky-100 text-sky-700' };
    case 'Esstisch':
      return { icon: '🪑', label: 'Picknickplatz', color: 'bg-amber-100 text-amber-800' };
    default:
      return { icon: '📍', label: amenity, color: 'bg-gray-100 text-gray-800' };
  }
};

export const RestStopDetailsModal: React.FC<RestStopDetailsModalProps> = ({ restStop, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const { isLoggedIn, userEmail } = useAuth();
  const { openModal } = useModals();

  if (!restStop) return null;

  // Create up to 10 images for slideshow
  const allImages = [
    restStop.image,
    'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpeg',
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg',
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg'
  ];

  const handleNavigateToGoogleMaps = () => {
    const query = encodeURIComponent(`${restStop.name}, ${restStop.address}`);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(googleMapsUrl, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleSubmitReview = () => {
    if (!isLoggedIn) {
      alert('Sie müssen eingeloggt sein, um eine Bewertung abzugeben.');
      openModal('login');
      return;
    }
    
    if (!newReview.comment.trim()) {
      alert('Bitte geben Sie einen Kommentar ein.');
      return;
    }
    
    const review: Review = {
      id: Date.now(),
      userId: userEmail || '',
      userName: userEmail?.split('@')[0] || 'Benutzer',
      rating: newReview.rating,
      comment: newReview.comment,
      timestamp: new Date().toLocaleDateString('de-DE'),
      likes: 0,
      dislikes: 0,
      replies: []
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    alert('Bewertung erfolgreich abgegeben!');
  };

  const handleLike = (reviewId: number) => {
    if (!isLoggedIn) {
      alert('Sie müssen eingeloggt sein, um zu bewerten.');
      openModal('login');
      return;
    }
    
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        if (review.userLiked) {
          return { ...review, likes: review.likes - 1, userLiked: false };
        } else {
          return { 
            ...review, 
            likes: review.likes + 1, 
            dislikes: review.userDisliked ? review.dislikes - 1 : review.dislikes,
            userLiked: true, 
            userDisliked: false 
          };
        }
      }
      return review;
    }));
  };

  const handleDislike = (reviewId: number) => {
    if (!isLoggedIn) {
      alert('Sie müssen eingeloggt sein, um zu bewerten.');
      openModal('login');
      return;
    }
    
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        if (review.userDisliked) {
          return { ...review, dislikes: review.dislikes - 1, userDisliked: false };
        } else {
          return { 
            ...review, 
            dislikes: review.dislikes + 1,
            likes: review.userLiked ? review.likes - 1 : review.likes,
            userDisliked: true, 
            userLiked: false 
          };
        }
      }
      return review;
    }));
  };

  const handleReply = (reviewId: number) => {
    if (!isLoggedIn) {
      alert('Sie müssen eingeloggt sein, um zu antworten.');
      openModal('login');
      return;
    }
    
    if (!replyText.trim()) {
      alert('Bitte geben Sie eine Antwort ein.');
      return;
    }
    
    // Check if user already replied to this review
    const review = reviews.find(r => r.id === reviewId);
    const existingReply = review?.replies.find(reply => reply.userId === userEmail);
    
    if (existingReply) {
      alert('Sie haben bereits auf diese Bewertung geantwortet.');
      return;
    }
    
    const reply: Reply = {
      id: Date.now(),
      userId: userEmail || '',
      userName: userEmail?.split('@')[0] || 'Benutzer',
      comment: replyText,
      timestamp: new Date().toLocaleDateString('de-DE')
    };
    
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        return { ...review, replies: [...review.replies, reply] };
      }
      return review;
    }));
    
    setReplyText('');
    setReplyingTo(null);
    alert('Antwort erfolgreich abgegeben!');
  };

  const handleEditReply = (replyId: number) => {
    if (!editReplyText.trim()) {
      alert('Bitte geben Sie eine Antwort ein.');
      return;
    }
    
    setReviews(reviews.map(review => ({
      ...review,
      replies: review.replies.map(reply => 
        reply.id === replyId 
          ? { ...reply, comment: editReplyText }
          : reply
      )
    })));
    
    setEditingReply(null);
    setEditReplyText('');
    alert('Antwort erfolgreich bearbeitet!');
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden animate-scaleIn relative">
        {/* Close button - fixed top right, aligned with type badge */}
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 rounded-full p-2 text-white transition-colors shadow-lg"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
          {/* Left side - Image slideshow */}
          <div className="lg:w-1/2 relative bg-gray-50">
            {/* Type badge */}
            <div className="absolute top-4 left-4 z-20 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg">
              <span className="text-xl">{getTypeIcon(restStop.type)}</span>
              <span className="text-sm font-semibold text-gray-800">{restStop.type}</span>
            </div>

            {/* Main image with navigation */}
            <div className="relative h-64 lg:h-80">
              <img
                src={allImages[currentImageIndex]}
                alt={`${restStop.name} ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-50 bg-opacity-80 backdrop-blur-sm rounded-full p-3 text-gray-600 hover:bg-opacity-100 transition-all shadow-lg"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-50 bg-opacity-80 backdrop-blur-sm rounded-full p-3 text-gray-600 hover:bg-opacity-100 transition-all shadow-lg"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </div>

            {/* Thumbnail navigation */}
            <div className="p-3 bg-gray-100">
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-sky-400 shadow-lg'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities below images */}
            <div className="p-4 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ausstattung</h3>
              <div className="grid grid-cols-2 gap-2">
                {restStop.amenities.map((amenity, index) => {
                  const amenityInfo = getAmenityIcon(amenity);
                  return (
                    <div key={index} className={`${amenityInfo.color} px-3 py-2 rounded-xl flex items-center shadow-sm`}>
                      <span className="text-lg mr-2">{amenityInfo.icon}</span>
                      <span className="font-medium text-sm">{amenityInfo.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address section moved here */}
          </div>

          {/* Right side - Details */}
          <div className="lg:w-1/2 flex flex-col overflow-y-auto relative">
            <div className="p-4 lg:p-6 pt-16 flex-1">
              {/* Header */}
              <div className="mb-6 relative">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h1 className="text-xl lg:text-3xl font-bold text-gray-900 mb-3">{restStop.name}</h1>
                  </div>
                </div>
                
                {/* Star rating above description */}
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => setShowReviewsModal(true)}
                    className="flex items-center hover:bg-gray-100 rounded-lg p-2 transition-colors"
                  >
                    <div className="flex items-center mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={20}
                          className={`${
                            star <= restStop.rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-bold text-gray-800 mr-1">{restStop.rating}</span>
                    <span className="text-gray-600">(0 Bewertungen)</span>
                  </button>
                </div>
              </div>

              {/* Description section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Beschreibung</h3>
                <div className="bg-gray-50 p-4 lg:p-6 rounded-xl">
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                    {restStop.full_description || restStop.description}
                  </p>
                </div>
              </div>

              {/* Separator line */}
              <hr className="border-gray-300 mb-6" />

              {/* Address section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Adresse</h3>
                <div className="bg-gray-50 p-4 lg:p-6 rounded-xl">
                  <div className="flex items-start text-gray-700">
                    <MapPin size={20} className="mr-3 mt-1 text-sky-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm lg:text-base">{restStop.address}</p>
                      <p className="text-sm text-gray-600 mt-1">{restStop.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps button */}
              <div className="mb-6">
                <button
                  onClick={handleNavigateToGoogleMaps}
                  className="w-full bg-sky-500 text-white py-3 lg:py-4 px-6 rounded-xl font-semibold hover:bg-sky-600 transition duration-200 flex items-center justify-center shadow-lg"
                >
                  <Navigation size={20} className="mr-3" />
                  In Google Maps öffnen
                  <ExternalLink size={18} className="ml-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rest Stop Reviews Modal */}
      {showReviewsModal && (
        <RestStopReviewsModal 
          restStop={restStop} 
          onClose={() => setShowReviewsModal(false)} 
        />
      )}
    </div>
  );
};