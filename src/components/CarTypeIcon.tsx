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

  switch (iconType) {
    case 'van':
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <Bus size={size} className="text-blue-500" strokeWidth={1.5} />
        </div>
      );
    case 'truck':
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <Truck size={size} className="text-orange-500" strokeWidth={1.5} />
        </div>
      );
    default:
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-emerald-500"
          >
            <path
              d="M16 40C14.9 40 14 40.9 14 42C14 43.1 14.9 44 16 44C17.1 44 18 43.1 18 42C18 40.9 17.1 40 16 40ZM48 40C46.9 40 46 40.9 46 42C46 43.1 46.9 44 48 44C49.1 44 50 43.1 50 42C50 40.9 49.1 40 48 40Z"
              fill="currentColor"
            />
            <path
              d="M50 18H14C12.89 18 12 18.9 12 20V38C12 39.1 12.89 40 14 40H16V36H18V40H46V36H48V40H50C51.1 40 52 39.1 52 38V20C52 18.9 51.1 18 50 18ZM50 36H14V20H50V36Z"
              fill="currentColor"
              opacity="0.7"
            />
            <path
              d="M32 22C25.37 22 20 27.37 20 34H44C44 27.37 38.63 22 32 22Z"
              fill="currentColor"
              opacity="0.5"
            />
          </svg>
        </div>
      );
  }
};
