import { Ride } from '../types';

export const mockRides: Ride[] = [
  {
    id: 1,
    from: 'Berlin',
    to: 'London',
    date: '20.04.2025',
    time: '14:00',
    price: '5€',
    driver: 'Anna',
    rating: 4.5,
    hasRidden: true,
    driverInfo: 'Anna, 32 years old, 5 years driving experience',
    whatsapp: '+491234567890',
    telegram: '@AnnaDriver',
    mobile: '+491234567891',
    car: 'Mercedes Vito - Black',
    availableSeats: 8,
    bookedSeats: 0,
    carImage: 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg',
    additionalImages: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg'
    ],
    reviews: [
      {
        id: 1,
        user: 'Ivan',
        rating: 4.5,
        comment: 'Great driver, comfortable ride!'
      },
      {
        id: 2,
        user: 'Maria',
        rating: 4.0,
        comment: 'All good, but we were a bit late.'
      }
    ]
  },
  {
    id: 2,
    from: 'Prenzlauer Berg',
    to: 'Neukölln',
    date: '21.04.2025',
    time: '09:00',
    price: '6€',
    driver: 'Tom',
    rating: 4.8,
    hasRidden: false,
    driverInfo: 'Tom, 28 years old, 3 years driving experience',
    whatsapp: '+491234567892',
    telegram: '@TomDriver',
    mobile: '+491234567893',
    car: 'Mercedes Vito - Black',
    availableSeats: 8,
    bookedSeats: 0,
    carImage: 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg',
    additionalImages: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg'
    ],
    reviews: [
      {
        id: 1,
        user: 'Alex',
        rating: 4.8,
        comment: 'Tom is a super driver, recommend!'
      }
    ]
  },
  {
    id: 3,
    from: 'Charlottenburg',
    to: 'Mitte',
    date: '18.04.2025',
    time: '12:00',
    price: '4€',
    driver: 'Lisa',
    rating: 4.2,
    hasRidden: true,
    driverInfo: 'Lisa, 35 years old, 7 years driving experience',
    whatsapp: '+491234567894',
    telegram: '@LisaDriver',
    mobile: '+491234567895',
    car: 'Mercedes Vito - Black',
    availableSeats: 8,
    bookedSeats: 0,
    carImage: 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg',
    additionalImages: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg'
    ],
    reviews: [
      {
        id: 1,
        user: 'Olga',
        rating: 4.2,
        comment: 'Pleasant ride, everything on schedule.'
      }
    ]
  },
  {
    id: 4,
    from: 'Kreuzberg',
    to: 'Friedrichshain',
    date: '23.04.2025',
    time: '15:00',
    price: '5€',
    driver: 'Mark',
    rating: 4.7,
    hasRidden: false,
    driverInfo: 'Mark, 40 years old, 10 years driving experience',
    whatsapp: '+491234567896',
    telegram: '@MarkDriver',
    mobile: '+491234567897',
    car: 'Mercedes Vito - Black',
    availableSeats: 8,
    bookedSeats: 0,
    carImage: 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg',
    additionalImages: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg'
    ],
    reviews: [
      {
        id: 1,
        user: 'Sergey',
        rating: 4.7,
        comment: 'Mark is a professional, everything was excellent!'
      }
    ]
  },
  {
    id: 5,
    from: 'Berlin',
    to: 'Paris',
    date: '24.04.2025',
    time: '16:00',
    price: '7€',
    driver: 'Elena',
    rating: 4.0,
    hasRidden: true,
    driverInfo: 'Elena, 29 years old, 4 years driving experience',
    whatsapp: '+491234567898',
    telegram: '@ElenaDriver',
    mobile: '+491234567899',
    car: 'Mercedes Vito - Black',
    availableSeats: 8,
    bookedSeats: 0,
    carImage: 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg',
    additionalImages: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg'
    ],
    reviews: [
      {
        id: 1,
        user: 'Dmitry',
        rating: 4.0,
        comment: 'Good ride, thanks Elena!'
      }
    ]
  }
];