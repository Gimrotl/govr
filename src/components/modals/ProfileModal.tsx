import React, { useState } from 'react';
import { X, Pencil, Check, Upload, ChevronLeft, ChevronRight, MessageCircle, Car, Search } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useRides } from '../../hooks/useRides';
import { useAuth } from '../../hooks/useAuth';
import { UserProfile } from '../../types';
import { StarRating } from '../StarRating';

export const ProfileModal: React.FC = () => {
  const { closeModal, selectedUser, openModal } = useModals();
  const { rides } = useRides();
  const { isLoggedIn, userEmail } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'John Doe',
    age: '30',
    mobile: '+1234567890',
    whatsapp: '+1234567890',
    telegram: '@johndoe',
    instagram: '@johndoe',
    bio: '',
    carImages: [],
    carModel: '',
    carYear: ''
  });

  // Use selectedUser data if viewing another user's profile
  const displayProfile = selectedUser || profile;
  const isViewingOtherUser = !!selectedUser;
  
  // Get current rides for the user
  const currentUserRides = isViewingOtherUser 
    ? rides.filter(ride => ride.driver === displayProfile.firstName)
    : rides.filter(ride => ride.driver === (userEmail?.split('@')[0] || profile.firstName));
  
  // Filter for current/future rides only
  const currentRides = currentUserRides.filter(ride => {
    const rideDate = new Date(ride.date.split('.').reverse().join('-'));
    const today = new Date();
    return rideDate >= today;
  });

  const handleSave = () => {
    if (isViewingOtherUser) return; // Can't save other user's profile
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isViewingOtherUser) return; // Can't upload to other user's profile
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).slice(0, 5).map(file => URL.createObjectURL(file));
      setProfile(prev => ({
        ...prev,
        carImages: [...prev.carImages, ...newImages].slice(0, 5)
      }));
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayProfile.carImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayProfile.carImages.length) % displayProfile.carImages.length);
  };

  const handleContact = () => {
    if (!isLoggedIn) {
      alert('Bitte loggen Sie sich ein, um Nachrichten zu senden.');
      return;
    }
    // Open contact modal
    openModal('contact');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-2 md:p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[95vh] md:h-auto animate-scaleIn">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left side - Profile information */}
          <div className="flex-1 p-4 md:p-6 md:border-r border-b md:border-b-0 overflow-y-auto">
            <div className="relative mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                {isViewingOtherUser ? `${displayProfile.firstName}'s Profile` : 'Profile'}
              </h2>
              
              {/* Fixed buttons in header */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                {!isViewingOtherUser && (
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-green-600 hover:text-green-700 transition duration-200"
                  >
                    {isEditing ? (
                      <Check size={24} onClick={handleSave} />
                    ) : (
                      <Pencil size={24} />
                    )}
                  </button>
                )}
              </div>
              
              <div className="absolute top-0 right-0">
                <button
                  onClick={() => closeModal('profile')}
                  className="text-red-500 hover:text-red-700 transition duration-200 p-1"
                >
                  <X size={20} className="md:hidden" />
                  <X size={24} className="hidden md:block" />
                </button>
              </div>
            </div>

            {/* Show rating for other users */}
            {isViewingOtherUser && displayProfile.rating && (
              <div className="mb-3 md:mb-4">
                <button
                  onClick={() => openModal('reviews')}
                  className="hover:bg-gray-100 rounded-lg p-1 md:p-2 transition-colors"
                >
                  <StarRating rating={displayProfile.rating} size={16} />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={displayProfile.firstName}
                  onChange={(e) => !isViewingOtherUser && setProfile({ ...profile, firstName: e.target.value })}
                  disabled={isViewingOtherUser || !isEditing}
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-md text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="text"
                  value={displayProfile.age}
                  onChange={(e) => !isViewingOtherUser && setProfile({ ...profile, age: e.target.value })}
                  disabled={isViewingOtherUser || !isEditing}
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-md text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Mobile
                </label>
                <input
                  type="text"
                  value={displayProfile.mobile}
                  onChange={(e) => !isViewingOtherUser && setProfile({ ...profile, mobile: e.target.value })}
                  disabled={isViewingOtherUser || !isEditing}
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-md text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  WhatsApp
                </label>
                <input
                  type="text"
                  value={displayProfile.whatsapp}
                  onChange={(e) => !isViewingOtherUser && setProfile({ ...profile, whatsapp: e.target.value })}
                  disabled={isViewingOtherUser || !isEditing}
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-md text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Auto Modell
                </label>
                <input
                  type="text"
                  value={displayProfile.carModel || ''}
                  onChange={(e) => !isViewingOtherUser && setProfile({ ...profile, carModel: e.target.value })}
                  disabled={isViewingOtherUser || !isEditing}
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-md text-sm md:text-base"
                  placeholder="z.B. Mercedes Vito"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Baujahr
                </label>
                <input
                  type="text"
                  value={displayProfile.carYear || ''}
                  onChange={(e) => !isViewingOtherUser && setProfile({ ...profile, carYear: e.target.value })}
                  disabled={isViewingOtherUser || !isEditing}
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-md text-sm md:text-base"
                  placeholder="z.B. 2020"
                />
              </div>
            </div>
            
            {/* Bio section */}
            <div className="mt-3 md:mt-4">
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                About Me
              </label>
              <textarea
                value={displayProfile.bio || ''}
                onChange={(e) => !isViewingOtherUser && setProfile({ ...profile, bio: e.target.value })}
                disabled={isViewingOtherUser || !isEditing}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-md h-16 md:h-20 resize-none text-sm md:text-base"
                placeholder="Tell others about yourself..."
              />
            </div>
            
            {/* Contact and Current Rides buttons - only for other users */}
            {isViewingOtherUser && (
              <div className="mt-4 md:mt-6 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <button
                  onClick={handleContact}
                  className="flex-1 flex items-center justify-center bg-blue-600 text-white py-2 md:py-3 px-3 md:px-4 rounded-lg hover:bg-blue-700 transition duration-200 text-sm md:text-base"
                >
                  <MessageCircle size={16} className="mr-2 md:hidden" />
                  <MessageCircle size={18} className="mr-2 hidden md:block" />
                  Kontaktieren
                </button>
                <button
                  onClick={() => {/* Show current rides */}}
                  className="flex-1 flex items-center justify-center bg-green-600 text-white py-2 md:py-3 px-3 md:px-4 rounded-lg hover:bg-green-700 transition duration-200 text-sm md:text-base"
                >
                  <Car size={16} className="mr-2 md:hidden" />
                  <Car size={18} className="mr-2 hidden md:block" />
                  Aktuelle Angebote
                </button>
              </div>
            )}
            
            {/* Current Rides Section - only for other users */}
            {currentRides.length > 0 && (
              <div className="mt-4 md:mt-6">
                <h3 className="text-base md:text-lg font-medium text-gray-800 mb-3 md:mb-4 flex items-center">
                  <Car size={18} className="mr-2 text-green-600 md:hidden" />
                  <Car size={20} className="mr-2 text-green-600 hidden md:block" />
                  {isViewingOtherUser ? 'Aktuelle Fahrten' : 'Meine aktuellen Fahrten'}
                </h3>
                <div className="max-h-32 md:max-h-40 overflow-y-auto space-y-2">
                  {currentRides.map((ride) => (
                    <div key={ride.id} className="bg-gray-50 p-2 md:p-3 rounded-lg border hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800 text-sm md:text-base">
                            {ride.from} → {ride.to}
                          </p>
                          <p className="text-xs md:text-sm text-gray-600">
                            {ride.date} um {ride.time}
                          </p>
                          <p className="text-xs md:text-sm text-green-600 font-medium">
                            {ride.price}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <StarRating rating={ride.rating} size={12} />
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 md:mt-1">
                            {ride.availableSeats - ride.bookedSeats} Plätze frei
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right side - Car images */}
          <div className="w-full md:w-96 p-4 md:p-6 bg-gray-50 max-h-[40vh] md:max-h-none overflow-y-auto">
            {/* Vehicle info above car images */}
            {displayProfile.car && (
              <div className="mb-3 md:mb-4">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Vehicle
                </label>
                <input
                  type="text"
                  value={displayProfile.car}
                  disabled
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-md bg-gray-100 text-sm md:text-base"
                />
              </div>
            )}
            
            <h3 className="text-base md:text-lg font-medium text-gray-800 mb-3 md:mb-4">Car Images</h3>
            {!isViewingOtherUser && isEditing && displayProfile.carImages.length < 5 && (
              <div className="mb-3 md:mb-4">
                <label className="cursor-pointer flex items-center justify-center w-full h-24 md:h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload size={20} className="mx-auto text-gray-400 md:hidden" />
                    <Upload size={24} className="mx-auto text-gray-400 hidden md:block" />
                    <p className="mt-1 text-xs md:text-sm text-gray-500">Click to upload images (max 5)</p>
                  </div>
                </label>
              </div>
            )}
            
            {displayProfile.carImages.length > 0 && (
              <div className="relative group">
                <img
                  src={displayProfile.carImages[currentImageIndex]}
                  alt={`Car ${currentImageIndex + 1}`}
                  className="w-full h-32 md:h-48 object-cover rounded-lg cursor-pointer"
                  onClick={() => setShowGallery(true)}
                />
                {displayProfile.carImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-1 md:left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft size={16} className="md:hidden" />
                      <ChevronLeft size={20} className="hidden md:block" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight size={16} className="md:hidden" />
                      <ChevronRight size={20} className="hidden md:block" />
                    </button>
                  </>
                )}
                <p className="text-xs text-center mt-1 text-gray-500">
                  {currentImageIndex + 1} / {displayProfile.carImages.length}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-screen Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[70]">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-2 right-2 md:top-4 md:right-4 text-red-500 hover:text-red-700 transition-colors p-2"
          >
            <X size={20} className="md:hidden" />
            <X size={24} className="hidden md:block" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-2 md:left-4 text-white hover:text-gray-300 transition-colors p-2"
          >
            <ChevronLeft size={28} className="md:hidden" />
            <ChevronLeft size={36} className="hidden md:block" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 md:right-4 text-white hover:text-gray-300 transition-colors p-2"
          >
            <ChevronRight size={28} className="md:hidden" />
            <ChevronRight size={36} className="hidden md:block" />
          </button>
          <img
            src={displayProfile.carImages?.[currentImageIndex] || ''}
            alt={`Car image ${currentImageIndex + 1}`}
            className="max-h-[70vh] md:max-h-[80vh] max-w-[90vw] object-contain"
          />
          <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm md:text-base">
            {currentImageIndex + 1} / {displayProfile.carImages?.length || 0}
          </div>
        </div>
      )}
    </div>
  );
};