import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { RideSearch } from './components/RideSearch';
import { RidesList } from './components/RidesList';
import { OfferRideForm } from './components/OfferRideForm';
import { RestStops } from './components/RestStops';
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
      <header className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-center py-16 shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">Caucasus RideShare Network</h1>
        <p className="mt-2 text-xl md:text-2xl text-cyan-100 font-light">
          Han vord - han nekh
        </p>
      </header>

      <main className="container mx-auto px-4 py-8 mb-64">
        {false && (
          <div className="grid grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => setActiveSection('search')}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500 rounded-xl p-8 text-center transition-all duration-300 flex flex-col items-center justify-center space-y-4 shadow-lg hover:shadow-cyan-500/50"
            >
              <Search size={48} className="text-cyan-400" />
              <span className="text-xl font-semibold text-slate-200">Search Ride</span>
            </button>

            <button
              onClick={() => setActiveSection('offer')}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-500 rounded-xl p-8 text-center transition-all duration-300 flex flex-col items-center justify-center space-y-4 shadow-lg hover:shadow-teal-500/50"
            >
              <Plus size={48} className="text-teal-400" />
              <span className="text-xl font-semibold text-slate-200">Offer Ride</span>
            </button>
          </div>
        )}

        {(activeSection === 'search') && (
          <>
            <RideSearch 
              searchParams={searchParams} 
              onSearch={setSearchParams} 
              onReset={resetSearch} 
            />
            
            <section className="mt-10">
              <h2 className="text-2xl font-semibold mb-6 text-center text-slate-200">
                <span className="text-cyan-400 font-bold mr-2">{filteredRides.length}</span>
                Available Rides
              </h2>
              <RidesList rides={filteredRides} />
            </section>
            
            <RestStops />
          </>
        )}
        
        {activeSection === 'offer' && (
          <>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <button
                onClick={() => setActiveSection('search')}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500 rounded-xl p-8 text-center transition-all duration-300 flex flex-col items-center justify-center space-y-4 shadow-lg hover:shadow-cyan-500/50"
              >
                <Search size={48} className="text-cyan-400" />
                <span className="text-xl font-semibold text-slate-200">Search Ride</span>
              </button>

              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    alert('Please log in first to offer a ride.');
                    openModal('login');
                    return;
                  }
                }}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-500 rounded-xl p-8 text-center transition-all duration-300 flex flex-col items-center justify-center space-y-4 shadow-lg hover:shadow-teal-500/50"
              >
                <Plus size={48} className="text-teal-400" />
                <span className="text-xl font-semibold text-slate-200">Offer Ride</span>
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