import React from 'react';
import { X, Check, CheckCheck, Trash2, Bell } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useNotifications } from '../../hooks/useNotifications.tsx';

export const NotificationsModal: React.FC = () => {
  const { closeModal } = useModals();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order_accepted':
        return '✅';
      case 'order_rejected':
        return '❌';
      case 'booking_confirmed':
        return '🎉';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order_accepted':
        return 'border-l-moonlit-500 bg-moonlit-50';
      case 'order_rejected':
        return 'border-l-red-500 bg-red-50';
      case 'booking_confirmed':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[80vh] animate-scaleIn">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Bell size={24} className="text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-sm rounded-full px-2 py-1">
                  {unreadCount} new
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={() => closeModal('notifications')}
            className="text-red-500 hover:text-red-700 transition duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {notifications.length > 0 && (
          <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  <CheckCheck size={16} className="mr-1" />
                  Mark all as read
                </button>
              )}
            </div>
            <button
              onClick={clearNotifications}
              className="flex items-center text-red-600 hover:text-red-800 text-sm"
            >
              <Trash2 size={16} className="mr-1" />
              Clear all
            </button>
          </div>
        )}
        
        <div className="max-h-[60vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No notifications yet</p>
              <p className="text-gray-400 text-sm mt-2">
                You'll receive notifications when drivers respond to your bookings
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border-l-4 p-4 rounded-r-lg transition-all duration-200 ${
                    getNotificationColor(notification.type)
                  } ${
                    !notification.read ? 'shadow-md' : 'opacity-75'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-2">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <h3 className="font-semibold text-gray-800">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.timestamp}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                      )}
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