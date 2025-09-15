import { useContext } from 'react';
import { ModalsContext } from '../contexts/ModalsContext';

export const useModals = () => {
  return useContext(ModalsContext);
};