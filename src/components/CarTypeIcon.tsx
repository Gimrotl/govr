import React from 'react';
import { Car, Bus, Truck } from 'lucide-react';

interface CarTypeIconProps {
  carModel?: string;
  size?: number;
  className?: string;
}

const getCarIcon = (carModel?: string) => {
  if (!carModel) return 'car';

  const model = carModel.toLowerCase();

  if (
    model.includes('vito') ||
    model.includes('transporter') ||
    model.includes('transit') ||
    model.includes('sprinter') ||
    model.includes('minibus') ||
    model.includes('van') ||
    model.includes('bulli')
  ) {
    return 'van';
  }

  if (
    model.includes('truck') ||
    model.includes('laster') ||
    model.includes('lastkraftwagen')
  ) {
    return 'truck';
  }

  return 'car';
};

export const CarTypeIcon: React.FC<CarTypeIconProps> = ({
  carModel,
  size = 48,
  className = ''
}) => {
  const iconType = getCarIcon(carModel);
  const baseClassName = `text-gray-600 ${className}`;

  switch (iconType) {
    case 'van':
      return <Bus size={size} className={baseClassName} />;
    case 'truck':
      return <Truck size={size} className={baseClassName} />;
    default:
      return <Car size={size} className={baseClassName} />;
  }
};
