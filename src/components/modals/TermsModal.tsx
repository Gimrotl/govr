import React from 'react';
import { X } from 'lucide-react';
import { useModals } from '../../hooks/useModals';

export const TermsModal: React.FC = () => {
  const { closeModal } = useModals();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto animate-scaleIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Terms of Service</h2>
          <button
            onClick={() => closeModal('terms')}
            className="text-gray-500 hover:text-gray-700 transition duration-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="prose prose-sm max-w-none text-gray-700">
          <p>
            The Word Platform (which translates from Chechen as "Car") has been developed to simplify finding fellow travelers 
            and transporting parcels between the Caucasus and Europe, as well as for use in other regions of the world. 
            The organization is not a party to any agreements, contracts, or other obligations that may arise between 
            Platform Users and is not responsible for their fulfillment or consequences.
          </p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">1. General Provisions</h3>
          <p>
            The Word Platform was created to facilitate the search for travel companions and the transportation of parcels 
            between the Caucasus and Europe, as well as for use in other regions. The organization is not responsible for 
            agreements, contracts, or other obligations arising between Users.
          </p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">2. Registration and Age Restrictions</h3>
          <p>
            The platform can only be used by persons aged 18 and over. By registering and creating an account, 
            you confirm that you are of legal age and have full legal capacity.
          </p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">3. Account Creation</h3>
          <p>
            Registration is required to publish rides and book seats. Viewing listings is available without registration.
          </p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">4. Ride Publication</h3>
          <p>
            A driver-user can post listings with all trip details. Publication requires a driver's license, 
            insurance, a technically sound vehicle, and compliance with platform rules. The driver is responsible 
            for the accuracy of information and trip execution.
          </p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">5. Driver Obligations</h3>
          <p>The driver must:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Have necessary documents (driver's license, insurance)</li>
            <li>Comply with traffic rules and safety standards</li>
            <li>Fulfill the trip according to stated conditions</li>
            <li>Not exceed the number of seats</li>
            <li>Use a roadworthy vehicle</li>
            <li>Maintain proper conduct and be in contact with Passengers</li>
          </ul>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">6. Passenger Obligations</h3>
          <p>The passenger must:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Treat the driver and vehicle with respect</li>
            <li>Not interfere with vehicle operation</li>
            <li>Arrive on time</li>
            <li>Pay for the trip as agreed</li>
            <li>Not transport prohibited or dangerous items</li>
          </ul>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">7. Financial Terms</h3>
          <p>
            Registration, posting, and viewing listings on the platform are free. Financial transactions between 
            Users are made directly.
          </p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">8. Liability</h3>
          <p>
            Word is not a party to agreements between Users and does not participate in payments, bookings, 
            or trip execution. Violation of terms may result in account blocking.
          </p>
        </div>
      </div>
    </div>
  );
};