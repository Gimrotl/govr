import { useState } from 'react';
import { Order } from '../types';
import { useNotifications } from './useNotifications.tsx';
import { useAuth } from './useAuth';
import { useMessages } from './useMessages.tsx';

// Initial mock data for orders
const initialOrders: Order[] = [
  {
    id: 1,
    client: 'Ivan',
    clientEmail: 'ivan@example.com',
    details: 'Ride from Berlin to London',
    status: 'pending',
    driverName: 'Max Mustermann',
    from: 'Berlin',
    to: 'London'
  },
  {
    id: 2,
    client: 'Maria',
    clientEmail: 'maria@example.com',
    details: 'Ride from Prenzlauer Berg to Neukölln',
    status: 'pending',
    driverName: 'Anna Schmidt',
    from: 'Prenzlauer Berg',
    to: 'Neukölln'
  }
];

// Simulate email sending
const sendEmail = (to: string, subject: string, message: string) => {
  console.log(`📧 Email sent to ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);
  
  // In a real app, this would integrate with an email service like SendGrid, Mailgun, etc.
  return Promise.resolve();
};

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const { addNotification } = useNotifications();
  const { userEmail } = useAuth();
  const { addSystemMessage } = useMessages();

  const acceptOrder = (orderId: number) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'accepted' } : order
    ));

    const driverName = order.driverName || 'dem Fahrer';
    const rideDetails = order.from && order.to
      ? `Fahrt von ${order.from} nach ${order.to}`
      : order.details;

    // Send email notification
    sendEmail(
      order.clientEmail,
      'Fahrtbuchung angenommen',
      `Gute Nachrichten! Ihre Fahrtbuchung "${rideDetails}" von "${driverName}" wurde angenommen. Bitte überprüfen Sie Ihr Konto für weitere Details.`
    );

    // Add message notification
    addSystemMessage(
      `Ihre Fahrtbuchung „${rideDetails}" von „${driverName}" wurde angenommen.`,
      driverName
    );

    // Add in-app notification for the client
    addNotification({
      userId: order.clientEmail,
      title: 'Buchung angenommen! ✅',
      message: `Ihre Fahrtbuchung „${rideDetails}" von „${driverName}" wurde angenommen.`,
      type: 'order_accepted',
      orderId: orderId
    });

    alert(`Bestellung ${orderId} wurde angenommen.`);
  };

  const rejectOrder = (orderId: number) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'rejected' } : order
    ));

    const driverName = order.driverName || 'dem Fahrer';
    const rideDetails = order.from && order.to
      ? `Fahrt von ${order.from} nach ${order.to}`
      : order.details;

    // Send email notification
    sendEmail(
      order.clientEmail,
      'Fahrtbuchung abgelehnt',
      `Es tut uns leid Ihnen mitteilen zu müssen, dass Ihre Fahrtbuchung "${rideDetails}" von "${driverName}" abgelehnt wurde. Bitte suchen Sie nach alternativen Fahrten.`
    );

    // Add message notification
    addSystemMessage(
      `Ihre Fahrtbuchung „${rideDetails}" von „${driverName}" wurde abgelehnt.`,
      driverName
    );

    // Add in-app notification for the client
    addNotification({
      userId: order.clientEmail,
      title: 'Buchung abgelehnt ❌',
      message: `Ihre Fahrtbuchung „${rideDetails}" von „${driverName}" wurde abgelehnt.`,
      type: 'order_rejected',
      orderId: orderId
    });

    alert(`Bestellung ${orderId} wurde abgelehnt.`);
  };

  return {
    orders,
    acceptOrder,
    rejectOrder
  };
};