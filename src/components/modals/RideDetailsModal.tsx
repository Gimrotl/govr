import React, { useState } from 'react';
import { Calendar, Clock, Phone, MessageCircle, Shield, X, Car, ChevronLeft, ChevronRight } from 'lucide-react';
import { StarRating } from '../StarRating';
import { useModals } from '../../hooks/useModals';
import { useAuth } from '../../hooks/useAuth';
import { useRides } from '../../hooks/useRides';

// TikTok icon component
const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.1z"/>
  </svg>
);

// Instagram icon component
const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// WhatsApp icon component
const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export const RideDetailsModal: React.FC = () => {
  const { selectedRide, closeModal, openModal } = useModals();
  const { isLoggedIn } = useAuth();
  const { bookRide } = useRides();
  const [showCarImages, setShowCarImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!selectedRide) return null;

  const availableSeats = selectedRide.availableSeats - selectedRide.bookedSeats;

  const handleContactDriver = () => {
    if (!isLoggedIn) {
      closeModal('rideDetails');
      openModal('login');
      return;
    }
    openModal('message');
  };
  
  const handleBookRide = () => {
    if (!isLoggedIn) {
      closeModal('rideDetails');
      openModal('login');
      return;
    }
    openModal('booking');
  };
  
  const handleComplaint = () => {
    if (!isLoggedIn) {
      closeModal('rideDetails');
      openModal('login');
      return;
    }
    openModal('complaint');
  };

  const handleShowCarImages = () => {
    setShowCarImages(true);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    const totalImages = getCarImages().length;
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    const totalImages = getCarImages().length;
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const getCarImages = () => {
    const images = [];
    if (selectedRide.carImage) images.push(selectedRide.carImage);
    if (selectedRide.additionalImages) images.push(...selectedRide.additionalImages);
    return images;
  };

  const handleDriverClick = () => {
    const userProfile = {
      firstName: selectedRide.driver,
      age: 'Not specified',
      mobile: selectedRide.mobile || 'Not provided',
      whatsapp: selectedRide.whatsapp || 'Not provided',
      telegram: selectedRide.telegram || 'Not provided',
      carImages: [
        ...(selectedRide.carImage ? [selectedRide.carImage] : []),
        ...(selectedRide.additionalImages || [])
      ].filter(Boolean),
      car: selectedRide.car,
      carImage: selectedRide.carImage,
      rating: selectedRide.rating,
      driverInfo: selectedRide.driverInfo
    };
    openModal('profile', userProfile);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-auto animate-scaleIn">
        <div className="flex flex-col md:flex-row">
          {/* Left column - Ride details and reviews */}
          <div className="flex-1 p-4 md:p-6 md:border-r border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Ride Details</h2>
              <button
                onClick={() => closeModal('rideDetails')}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Date and time */}
            <div className="flex flex-row items-center gap-3 mb-6">
              <div className="flex-1 flex items-center justify-center bg-green-100 rounded-md px-3 py-2">
                <Calendar size={18} className="mr-2 text-emerald-500" />
                <span className="font-medium">{selectedRide.date}</span>
              </div>
              <div className="flex-1 flex items-center justify-center bg-green-100 rounded-md px-3 py-2">
                <Clock size={18} className="mr-2 text-emerald-500" />
                <span className="font-medium">{selectedRide.time}</span>
              </div>
            </div>
            
            {/* Route */}
            <div className="mb-6">
              <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-base font-semibold text-gray-800 mb-4">Route</h3>
                <div className="relative">
                  {/* Background line */}
                  <div className="absolute top-3 left-3 right-3 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"></div>
                  
                  {/* Route points container */}
                  <div className="flex justify-between items-start relative z-10">
                    {/* Start point */}
                    <div className="flex flex-col items-center max-w-[120px]">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="mt-2 text-center">
                        <div className="font-medium text-gray-800 text-sm leading-tight">{selectedRide.from}</div>
                        <div className="text-sm text-emerald-500 mt-1">Start</div>
                      </div>
                    </div>
                    
                    {/* Intermediate stops */}
                    {selectedRide.stopovers && selectedRide.stopovers.filter(stop => stop.trim()).map((stop, index) => (
                      <div key={index} className="flex flex-col items-center max-w-[120px]">
                        <div className="w-6 h-6 bg-emerald-300 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <div className="mt-2 text-center">
                          <div className="font-medium text-gray-700 text-sm leading-tight">{stop}</div>
                          <div className="text-sm text-gray-500 mt-1">Stopp</div>
                        </div>
                      </div>
                    ))}
                    
                    {/* End point */}
                    <div className="flex flex-col items-center max-w-[120px]">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="mt-2 text-center">
                        <div className="font-medium text-gray-800 text-sm leading-tight">{selectedRide.to}</div>
                        <div className="text-sm text-emerald-500 mt-1">Ziel</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Section */}
            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-800 mb-3">Information</h3>
              {(selectedRide.carModel || selectedRide.carYear) && (
                <div className="mb-2 text-xs text-gray-500">
                  {selectedRide.carModel && <span>{selectedRide.carModel}</span>}
                  {selectedRide.carModel && selectedRide.carYear && <span> • </span>}
                  {selectedRide.carYear && <span>{selectedRide.carYear}</span>}
                </div>
              )}
              <div className="bg-gray-100 p-6 rounded-lg min-h-[120px]">
                <p className="text-sm md:text-base text-gray-700">{selectedRide.information || 'Keine zusätzlichen Informationen verfügbar.'}</p>
              </div>
            </div>
          </div>
          
          {/* Right column - Driver info and actions */}
          <div className="w-full md:w-96 p-4 md:p-6 bg-gray-50 md:border-t-0 border-t border-gray-200">
            {/* Driver Info */}
            <div className="text-center mb-6">
              <div
                onClick={handleDriverClick}
                className="w-16 h-16 md:w-20 md:h-20 bg-sky-200 rounded-full flex items-center justify-center mx-auto mb-3 cursor-pointer hover:bg-sky-300 transition-colors"
              >
                <span className="text-2xl font-bold text-sky-500">
                  {selectedRide.driver.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3
                onClick={handleDriverClick}
                className="text-xl md:text-2xl font-bold text-gray-800 mb-1 cursor-pointer hover:text-sky-500 transition-colors"
              >
                {selectedRide.driver}
              </h3>
              <p className="text-sm text-gray-600 mb-3">Mitglied seit 15.03.2023</p>
              <div className="flex items-center justify-center mb-4">
                <button
                  onClick={() => openModal('reviews')}
                  className="flex items-center hover:bg-gray-100 rounded-lg p-2 transition-colors"
                >
                  <span className="text-xl font-bold mr-2">{selectedRide.rating}</span>
                  <span className="text-yellow-400 text-xl">⭐</span>
                  <span className="text-gray-600 ml-1 text-sm md:text-base">({selectedRide.reviews?.length || 0} Bewertungen)</span>
                </button>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${selectedRide.mobile || '+49 555 123 4567'}`}
                  className="flex items-center hover:bg-gray-100 p-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Phone size={16} className="text-gray-600 mr-2" />
                  <span className="font-medium text-sm md:text-base">{selectedRide.mobile || '+49 555 123 4567'}</span>
                </a>
                <a
                  href={`https://wa.me/${(selectedRide.whatsapp || selectedRide.mobile || '+49 555 123 4567').replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:bg-green-50 p-2 rounded-lg transition-colors cursor-pointer"
                >
                  <WhatsAppIcon size={16} className="text-green-600 mr-2" />
                  <span className="font-medium text-sm md:text-base">{selectedRide.whatsapp || selectedRide.mobile || '+49 555 123 4567'}</span>
                </a>
              </div>
            </div>

            {/* Book ride button */}
            <button
              onClick={handleBookRide}
              className="w-full bg-sky-500 text-white py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-sky-600 transition duration-200 mb-2"
            >
              Jetzt buchen - {selectedRide.price}
            </button>

            {/* Car Images button */}
            <button
              onClick={handleShowCarImages}
              className="w-full flex items-center justify-center bg-gray-600 text-white py-3 rounded-lg text-base md:text-lg font-medium hover:bg-gray-700 transition duration-200 mb-2"
            >
              <Car size={18} className="mr-2" />
              Autobilder
            </button>

            {/* Contact button */}
            <button
              onClick={handleContactDriver}
              className="w-full flex items-center justify-center bg-gray-200 text-gray-700 py-3 rounded-lg text-base md:text-lg font-medium hover:bg-gray-300 transition duration-200 mb-2 border border-gray-400"
            >
              <MessageCircle size={18} className="mr-2" />
              Kontaktieren
            </button>

            {/* Report button */}
            <button
              onClick={handleComplaint}
              className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg text-base md:text-lg font-medium hover:bg-red-700 transition duration-200"
            >
              <Shield size={18} className="mr-2" />
              Report a Problem
            </button>
          </div>
        </div>
      </div>

      {/* Car Images Modal */}
      {showCarImages && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] p-4">
          <div className="relative w-full max-w-4xl">
            {/* Close button */}
            <button
              onClick={() => setShowCarImages(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Navigation arrows */}
            {getCarImages().length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <ChevronLeft size={48} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <ChevronRight size={48} />
                </button>
              </>
            )}

            {/* Car image */}
            <div className="flex justify-center items-center h-[80vh]">
              {getCarImages().length > 0 ? (
                <img
                  src={getCarImages()[currentImageIndex]}
                  alt={`${selectedRide.driver}'s car ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-white text-center">
                  <Car size={64} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-xl">Keine Autobilder verfügbar</p>
                </div>
              )}
            </div>

            {/* Image counter */}
            {getCarImages().length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
                {currentImageIndex + 1} / {getCarImages().length}
              </div>
            )}

            {/* Car info */}
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-lg font-semibold">{selectedRide.car}</p>
              <p className="text-sm text-gray-300">Fahrer: {selectedRide.driver}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};