export interface Ride {
  id: number;
  from: string;
  to: string;
  stopovers: string[];
  date: string;
  time: string;
  price: string;
  driver: string;
  rating: number;
  hasRidden: boolean;
  driverInfo: string;
  whatsapp: string;
  telegram: string;
  mobile: string;
  car: string;
  carModel?: string;
  carYear?: string;
  availableSeats: number;
  bookedSeats: number;
  carImage: string;
  additionalImages: string[];
  information: string;
  reviews: Review[];
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
}

export interface SearchParams {
  from: string;
  to: string;
  date: string;
  seats?: number;
}

export interface NewRideInput {
  from: string;
  to: string;
  stopovers: string[];
  date: string;
  time: string;
  price: string;
  availableSeats: number;
  information: string;
}

export interface Message {
  id: number;
  to?: string;
  from?: string;
  content: string;
  timestamp: string;
  sent: boolean;
  image?: string;
  replyTo?: number;
  mentions?: string[];
  notificationType?: 'order_accepted' | 'order_rejected' | 'booking_confirmed' | 'booking_request';
  read?: boolean;
}

export interface Order {
  id: number;
  client: string;
  clientEmail: string;
  details: string;
  status: 'pending' | 'accepted' | 'rejected';
  driverName?: string;
  from?: string;
  to?: string;
}

export interface Notification {
  id: number;
  userId: string;
  title: string;
  message: string;
  type: 'order_accepted' | 'order_rejected' | 'booking_confirmed';
  timestamp: string;
  read: boolean;
  orderId?: number;
}

export interface UserProfile {
  firstName: string;
  age: string;
  mobile: string;
  whatsapp: string;
  telegram: string;
  instagram?: string;
  bio?: string;
  carImages: string[];
  car?: string;
  carImage?: string;
  carModel?: string;
  carYear?: string;
  rating?: number;
  driverInfo?: string;
  userRides?: Ride[];
  reviews?: Review[];
}

export interface ChatMessage {
  id: number;
  user: string;
  content: string;
  timestamp: string;
  isLoggedIn: boolean;
}

export interface CarDetails {
  make: string;
  model: string;
  color: string;
  image: string | null;
}

export interface PersonalDetails {
  firstName: string;
  mobile: string;
  whatsapp: string;
  telegram: string;
  age: string;
}