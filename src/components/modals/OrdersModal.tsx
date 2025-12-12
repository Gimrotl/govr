import React from 'react';
import { X, CheckCheck, XCircle } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useOrders } from '../../hooks/useOrders';
import { Order } from '../../types';

export const OrdersModal: React.FC = () => {
  const { closeModal } = useModals();
  const { orders, acceptOrder, rejectOrder } = useOrders();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 max-h-[80vh] animate-scaleIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Orders</h2>
          <button
            onClick={() => closeModal('orders')}
            className="text-red-500 hover:text-red-700 transition duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {orders.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No orders found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{order.client}</h3>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status === 'pending' ? 'Pending' : 
                       order.status === 'accepted' ? 'Accepted' : 'Rejected'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mt-2">{order.details}</p>
                  
                  {order.status === 'pending' && (
                    <div className="flex mt-3 space-x-2">
                      <button
                        onClick={() => acceptOrder(order.id)}
                        className="flex items-center justify-center bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition duration-200"
                      >
                        <CheckCheck size={16} className="mr-1" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => rejectOrder(order.id)}
                        className="flex items-center justify-center bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-200"
                      >
                        <XCircle size={16} className="mr-1" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};