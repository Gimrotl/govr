import { useContext } from 'react';
import { RidesContext } from '../contexts/RidesContext';

export const useRides = () => {
  return useContext(RidesContext);
};