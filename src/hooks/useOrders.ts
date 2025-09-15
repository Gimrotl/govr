import { useState } from 'react';
import { Order } from '../types';
import { useNotifications } from './useNotifications.tsx';
import { useAuth } from './useAuth';

// Initial mock data for orders
const initialOrders: Order[] = [
  {
    id: 1,
    client: 'Ivan',
    clientEmail: 'ivan@example.com',
    details: 'Ride from Berlin to London',
    status: 'pending'
  },
  {
    id: 2,
    client: 'Maria',
    clientEmail: 'maria@example.com',
    details: 'Ride from Prenzlauer Berg to Neukölln',
    status: 'pending'
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
  
  const acceptOrder = (orderId: number) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'accepted' } : order
    ));
    
    // Send email notification
    sendEmail(
      order.clientEmail,
      'Ride Booking Accepted',
      `Great news! Your ride booking "${order.details}" has been accepted by the driver. Please check your account for more details.`
    );
    
    // Add in-app notification for the client
    addNotification({
      userId: order.clientEmail,
      title: 'Booking Accepted! ✅',
      message: `Your ride booking "${order.details}" has been accepted.`,
      type: 'order_accepted',
      orderId: orderId
    });
    
    alert(`Order ${orderId} has been accepted.`);
  };
  
  const rejectOrder = (orderId: number) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'rejected' } : order
    ));
    
    // Send email notification
    sendEmail(
      order.clientEmail,
      'Ride Booking Declined',
      `We're sorry to inform you that your ride booking "${order.details}" has been declined by the driver. Please look for alternative rides.`
    );
    
    // Add in-app notification for the client
    addNotification({
      userId: order.clientEmail,
      title: 'Booking Declined ❌',
      message: `Your ride booking "${order.details}" has been declined.`,
      type: 'order_rejected',
      orderId: orderId
    });
    
    alert(`Order ${orderId} has been rejected.`);
  };
  
  return {
    orders,
    acceptOrder,
    rejectOrder
  };
};