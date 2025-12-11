import React from 'react';
import { useState, useContext, createContext, ReactNode } from 'react';
import { Notification } from '../types';
import { useMessages } from './useMessages';

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (notificationId: number) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearNotifications: () => {}
});

export const useNotifications = () => {
  return useContext(NotificationsContext);
};

export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const messagesContext = useMessages();

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    if (messagesContext.addNotificationMessage) {
      messagesContext.addNotificationMessage({
        from: notification.userId,
        content: notification.message,
        notificationType: notification.type
      });
    }
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};