import React from 'react';
import { X, Edit, Trash } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useRides } from '../../hooks/useRides';
import { useAuth } from '../../hooks/useAuth';

export const MyRidesModal: React.FC = () => {
  const { closeModal } = useModals();
  const { rides, deleteRide, editRide } = useRides();
  const { userEmail } = useAuth();

  const myRides = rides.filter(ride => ride.driver === userEmail);

  const handleEdit = (rideId: number) => {
    const ride = rides.find(r => r.id === rideId);
    if (ride) {
      editRide(ride);
      closeModal('myRides');
    }
  };

  const handleDelete = (rideId: number) => {
    if (window.confirm('Are you sure you want to delete this ride?')) {
      deleteRide(rideId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gray-100 rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[80vh] animate-scaleIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">My Rides</h2>
          <button
            onClick={() => closeModal('myRides')}
            className="text-red-500 hover:text-red-700 transition duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
          {myRides.length === 0 ? (
            <p className="text-center text-gray-600 py-8">You haven't offered any rides yet.</p>
          ) : (
            <div className="space-y-4">
              {myRides.map((ride) => (
                <div key={ride.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{ride.from} → {ride.to}</h3>
                      <p className="text-gray-600">
                        {ride.date} at {ride.time}
                      </p>
                      <p className="text-gray-600">
                        Available seats: {ride.availableSeats - ride.bookedSeats} of {ride.availableSeats}
                      </p>
                      <p className="text-green-600 font-semibold mt-1">
                        {ride.price}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(ride.id)}
                        className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit ride"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(ride.id)}
                        className="p-2 text-red-600 hover:text-red-800 transition-colors"
                        title="Delete ride"
                      >
                        <Trash size={20} />
                      </button>
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