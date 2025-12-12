import React, { useState } from 'react';
import { X, Edit, Trash, Car, Package, CheckCheck, XCircle } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useRides } from '../../hooks/useRides';
import { useAuth } from '../../hooks/useAuth';
import { useOrders } from '../../hooks/useOrders';

export const MyRidesModal: React.FC = () => {
  const { closeModal } = useModals();
  const { rides, deleteRide, editRide } = useRides();
  const { userEmail } = useAuth();
  const { orders, acceptOrder, rejectOrder } = useOrders();
  const [activeTab, setActiveTab] = useState<'rides' | 'orders'>('rides');

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
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full animate-scaleIn overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Meine Fahrten & Bestellungen</h2>
            <button
              onClick={() => closeModal('myRides')}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition duration-200"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex mt-6 space-x-2">
            <button
              onClick={() => setActiveTab('rides')}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'rides'
                  ? 'bg-white text-blue-700 shadow-lg'
                  : 'bg-blue-500 bg-opacity-30 text-white hover:bg-opacity-50'
              }`}
            >
              <Car size={20} className="mr-2" />
              Meine Fahrten
              {myRides.length > 0 && (
                <span className="ml-2 bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {myRides.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'orders'
                  ? 'bg-white text-blue-700 shadow-lg'
                  : 'bg-blue-500 bg-opacity-30 text-white hover:bg-opacity-50'
              }`}
            >
              <Package size={20} className="mr-2" />
              Bestellungen
              {orders.filter(o => o.status === 'pending').length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {orders.filter(o => o.status === 'pending').length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto h-[500px]">
          {activeTab === 'rides' ? (
            <div>
              {myRides.length === 0 ? (
                <div className="text-center py-12">
                  <Car size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Sie haben noch keine Fahrten angeboten.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {myRides.map((ride) => (
                    <div
                      key={ride.id}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                              <Car size={24} className="text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">
                                {ride.from} → {ride.to}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {ride.date} um {ride.time}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="bg-blue-50 rounded-lg p-3">
                              <p className="text-xs text-gray-600 mb-1">Verfügbare Plätze</p>
                              <p className="text-lg font-bold text-blue-700">
                                {ride.availableSeats - ride.bookedSeats} / {ride.availableSeats}
                              </p>
                            </div>
                            <div className="bg-moonlit-50 rounded-lg p-3">
                              <p className="text-xs text-gray-600 mb-1">Preis</p>
                              <p className="text-lg font-bold text-moonlit-700">{ride.price}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleEdit(ride.id)}
                            className="p-3 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors"
                            title="Fahrt bearbeiten"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(ride.id)}
                            className="p-3 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors"
                            title="Fahrt löschen"
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
          ) : (
            <div>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Keine Bestellungen gefunden.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-3 rounded-full mr-3">
                            <Package size={20} className="text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{order.client}</h3>
                            <p className="text-sm text-gray-500">{order.clientEmail}</p>
                          </div>
                        </div>
                        <span
                          className={`text-sm font-semibold px-4 py-2 rounded-full ${
                            order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'accepted'
                              ? 'bg-moonlit-100 text-moonlit-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {order.status === 'pending'
                            ? 'Ausstehend'
                            : order.status === 'accepted'
                            ? 'Angenommen'
                            : 'Abgelehnt'}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-gray-700">{order.details}</p>
                      </div>

                      {order.status === 'pending' && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => acceptOrder(order.id)}
                            className="flex-1 flex items-center justify-center bg-moonlit-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-moonlit-700 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            <CheckCheck size={20} className="mr-2" />
                            Annehmen
                          </button>
                          <button
                            onClick={() => rejectOrder(order.id)}
                            className="flex-1 flex items-center justify-center bg-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            <XCircle size={20} className="mr-2" />
                            Ablehnen
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};