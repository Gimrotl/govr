import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { RideSearch } from './components/RideSearch';
import { RidesList } from './components/RidesList';
import { OfferRideForm } from './components/OfferRideForm';
import { RestStops } from './components/RestStops';
import { InfoCards } from './components/InfoCards';
import { useRides } from './hooks/useRides';
import { useAuth } from './hooks/useAuth';
import { useModals } from './hooks/useModals';
import { Search, Plus, Instagram } from 'lucide-react';

// TikTok icon component (since it's not in lucide-react)
const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.1z"/>
  </svg>
);

function App() {
  const { isLoggedIn } = useAuth();
  const { filteredRides, setSearchParams, resetSearch, searchParams } = useRides();
  const { isAnyModalOpen, openModal } = useModals();
  const [activeSection, setActiveSection] = useState<'search' | 'offer' | null>('search');

  const handleOfferRide = () => {
    if (!isLoggedIn) {
      alert('Please log in first to offer a ride.');
      openModal('login');
      return;
    }
    setActiveSection('offer');
  };

  return (
    <Layout>
      <div className="relative">
        <div
          className="relative min-h-[500px] md:min-h-[600px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/bildschirmfoto_2025-12-14_um_03.47.46.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-gray-50"></div>

          <div className="relative z-10 pt-24 md:pt-32 pb-16 md:pb-24">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4">
                Caucasian Mobility Network
              </h1>
              <p className="text-xl md:text-2xl text-white/90 drop-shadow-md mb-12">
                ẊAN VORD - ẊAN NEQ̇
              </p>

              {(activeSection === 'search') && (
                <div className="max-w-5xl mx-auto">
                  <RideSearch
                    searchParams={searchParams}
                    onSearch={setSearchParams}
                    onReset={resetSearch}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 mb-64 -mt-8">
        {false && (
          <div className="grid grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => setActiveSection('search')}
              className="bg-gray-200 hover:bg-gray-300 rounded-lg p-8 text-center transition-all duration-300 flex flex-col items-center justify-center space-y-4"
            >
              <Search size={48} className="text-gray-700" />
              <span className="text-xl font-semibold text-gray-700">Search Ride</span>
            </button>
            
            <button
              onClick={() => setActiveSection('offer')}
              className="bg-gray-200 hover:bg-gray-300 rounded-lg p-8 text-center transition-all duration-300 flex flex-col items-center justify-center space-y-4"
            >
              <Plus size={48} className="text-gray-700" />
              <span className="text-xl font-semibold text-gray-700">Offer Ride</span>
            </button>
          </div>
        )}

        {(activeSection === 'search') && (
          <>
            <section className="mt-4">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                <span className="text-red-600 font-bold mr-2">{filteredRides.length}</span>
                Available Rides
              </h2>
              <RidesList rides={filteredRides} />
            </section>

            <InfoCards />

            <RestStops />
          </>
        )}
        
        {activeSection === 'offer' && (
          <>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <button
                onClick={() => setActiveSection('search')}
                className="bg-gray-200 hover:bg-gray-300 rounded-lg p-8 text-center transition-all duration-300 flex flex-col items-center justify-center space-y-4"
              >
                <Search size={48} className="text-gray-700" />
                <span className="text-xl font-semibold text-gray-700">Search Ride</span>
              </button>
              
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    alert('Please log in first to offer a ride.');
                    openModal('login');
                    return;
                  }
                  // Stay on offer section - user can use the form below
                }}
                className="bg-gray-200 hover:bg-gray-300 rounded-lg p-8 text-center transition-all duration-300 flex flex-col items-center justify-center space-y-4"
              >
                <Plus size={48} className="text-gray-700" />
                <span className="text-xl font-semibold text-gray-700">Offer Ride</span>
              </button>
            </div>
            
            {isLoggedIn && <OfferRideForm onBack={() => setActiveSection(null)} />}
          </>
        )}
      </main>

    </Layout>
  );
}

export default App;