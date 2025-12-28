import React from 'react';
import { Car } from 'lucide-react';

interface CarTypeIconProps {
  carModel?: string;
  size?: number;
  className?: string;
}

export const CarTypeIcon: React.FC<CarTypeIconProps> = ({
  carModel,
  size = 48,
  className = ''
}) => {
  const baseClassName = `text-gray-600 ${className}`;
  return <Car size={size} className={baseClassName} />;
};
