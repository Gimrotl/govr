import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Ride, SearchParams, NewRideInput } from '../types';
import { mockRides } from '../data/mockRides';
import { useAuth } from '../hooks/useAuth';

interface RidesContextType {
  rides: Ride[];
  filteredRides: Ride[];
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
  resetSearch: () => void;
  offerRide: (newRide: NewRideInput) => void;
  bookRide: (rideId: number, seats: number) => void;
  rateRide: (rideId: number, rating: number, comment: string) => void;
  deleteRide: (rideId: number) => void;
  editRide: (ride: Ride) => void;
}

export const RidesContext = createContext<RidesContextType>({
  rides: [],
  filteredRides: [],
  searchParams: { from: '', to: '', date: '' },
  setSearchParams: () => {},
  resetSearch: () => {},
  offerRide: () => {},
  bookRide: () => {},
  rateRide: () => {},
  deleteRide: () => {},
  editRide: () => {}
});

interface RidesProviderProps {
  children: ReactNode;
}

export const RidesProvider: React.FC<RidesProviderProps> = ({ children }) => {
  const { isLoggedIn, userEmail } = useAuth();
  const [rides, setRides] = useState<Ride[]>(mockRides.sort((a, b) => {
    const dateA = new Date(a.date.split('.').reverse().join('-'));
    const dateB = new Date(b.date.split('.').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  }));
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: '',
    to: '',
    date: ''
  });

  const formatDateForComparison = (dateStr: string): string => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-').map(Number);
    return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
  };

  const filteredRides = rides.filter(ride => {
    const matchesFrom = !searchParams.from || 
      ride.from.toLowerCase().includes(searchParams.from.toLowerCase().trim());
    
    const matchesTo = !searchParams.to || 
      ride.to.toLowerCase().includes(searchParams.to.toLowerCase().trim());
    
    const formattedSearchDate = searchParams.date ? formatDateForComparison(searchParams.date) : '';
    const matchesDate = !formattedSearchDate || ride.date === formattedSearchDate;
    
    return matchesFrom && matchesTo && matchesDate;
  });

  const resetSearch = () => {
    setSearchParams({ from: '', to: '', date: '' });
  };

  const offerRide = (newRideInput: NewRideInput) => {
    if (!isLoggedIn) {
      alert('Please log in to offer a ride.');
      return;
    }
    
    const formattedDate = formatDateForComparison(newRideInput.date);
    
    const newRide: Ride = {
      id: rides.length + 1,
      from: newRideInput.from,
      to: newRideInput.to,
      stopovers: newRideInput.stopovers,
      date: formattedDate,
      time: newRideInput.time,
      price: newRideInput.price,
      driver: userEmail || 'User',
      rating: 0,
      hasRidden: false,
      driverInfo: `${userEmail || 'User'}, age not specified, experience not specified`,
      whatsapp: '',
      telegram: '',
      mobile: '',
      car: 'Not specified',
      availableSeats: Number(newRideInput.availableSeats),
      bookedSeats: 0,
      carImage: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
      additionalImages: [
        'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
        'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg'
      ],
      information: newRideInput.information,
      reviews: []
    };
    
    setRides(prevRides => [newRide, ...prevRides]);
    alert(`Ride from ${newRide.from} to ${newRide.to} on ${newRide.date} has been added!`);
  };

  const deleteRide = (rideId: number) => {
    if (!isLoggedIn) {
      alert('Please log in to delete a ride.');
      return;
    }
    
    setRides(prevRides => prevRides.filter(ride => ride.id !== rideId));
    alert('Ride has been deleted successfully.');
  };

  const editRide = (updatedRide: Ride) => {
    if (!isLoggedIn) {
      alert('Please log in to edit a ride.');
      return;
    }
    
    setRides(prevRides => prevRides.map(ride => 
      ride.id === updatedRide.id ? updatedRide : ride
    ));
    alert('Ride has been updated successfully.');
  };

  const bookRide = (rideId: number, seats: number) => {
    if (!isLoggedIn) {
      alert('Please log in to book a ride.');
      return;
    }
    
    const updatedRides = rides.map(ride => {
      if (ride.id === rideId) {
        const availableSeats = ride.availableSeats - ride.bookedSeats;
        
        if (seats > availableSeats) {
          alert(`Only ${availableSeats} seats available for this ride.`);
          return ride;
        }
        
        return {
          ...ride,
          bookedSeats: ride.bookedSeats + seats
        };
      }
      return ride;
    });
    
    setRides(updatedRides);
    
    const bookedRide = rides.find(ride => ride.id === rideId);
    if (bookedRide) {
      alert(`Successfully booked ${seats} seat(s) from ${bookedRide.from} to ${bookedRide.to} on ${bookedRide.date}`);
    }
  };

  const rateRide = (rideId: number, rating: number, comment: string) => {
    if (!isLoggedIn) {
      alert('Please log in to rate a ride.');
      return;
    }
    
    // Check if user has booked this ride (in a real app, this would be tracked properly)
    const ride = rides.find(r => r.id === rideId);
    if (!ride) return;
    
    // Simulate checking if enough time has passed since booking (1 day)
    const bookingDate = new Date(); // In real app, this would be the actual booking date
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - bookingDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    
    if (daysDiff < 1) {
      alert('You can only rate a ride 1 day after booking it.');
      return;
    }
    
    const updatedRides = rides.map(ride => {
      if (ride.id === rideId) {
        const newReview = {
          id: ride.reviews.length + 1,
          user: userEmail || 'User',
          rating,
          comment
        };
        
        const totalRatings = ride.reviews.reduce((sum, review) => sum + review.rating, 0) + rating;
        const newAverageRating = totalRatings / (ride.reviews.length + 1);
        
        return {
          ...ride,
          rating: parseFloat(newAverageRating.toFixed(1)),
          reviews: [...ride.reviews, newReview]
        };
      }
      return ride;
    });
    
    setRides(updatedRides);
    alert(`Thank you for rating your ride from ${rides.find(r => r.id === rideId)?.from} to ${rides.find(r => r.id === rideId)?.to}`);
  };

  return (
    <RidesContext.Provider
      value={{
        rides,
        filteredRides,
        searchParams,
        setSearchParams,
        resetSearch,
        offerRide,
        bookRide,
        rateRide,
        deleteRide,
        editRide
      }}
    >
      {children}
    </RidesContext.Provider>
  );
};