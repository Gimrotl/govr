import React from 'react';

interface CarTypeIconProps {
  carModel?: string;
  size?: number;
  className?: string;
}

const getCarIcon = (carModel?: string) => {
  if (!carModel) return 'sedan';

  const model = carModel.toLowerCase();

  if (
    model.includes('golf') ||
    model.includes('polo') ||
    model.includes('fiesta') ||
    model.includes('focus') ||
    model.includes('i30') ||
    model.includes('civic') ||
    model.includes('corolla') ||
    model.includes('hatchback') ||
    model.includes('compact')
  ) {
    return 'hatchback';
  }

  if (
    model.includes('passat') ||
    model.includes('accord') ||
    model.includes('mondeo') ||
    model.includes('sonata') ||
    model.includes('estate') ||
    model.includes('break') ||
    model.includes('kombi') ||
    model.includes('wagon')
  ) {
    return 'stationwagon';
  }

  if (
    model.includes('cabriolet') ||
    model.includes('convertible') ||
    model.includes('roadster') ||
    model.includes('spider') ||
    model.includes('cabrio')
  ) {
    return 'convertible';
  }

  return 'sedan';
};

export const CarTypeIcon: React.FC<CarTypeIconProps> = ({
  carModel,
  size = 48,
  className = ''
}) => {
  const iconType = getCarIcon(carModel);

  switch (iconType) {
    case 'hatchback':
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-purple-500"
          >
            <path d="M18 45C16.9 45 16 45.9 16 47C16 48.1 16.9 49 18 49C19.1 49 20 48.1 20 47C20 45.9 19.1 45 18 45Z" fill="currentColor"/>
            <path d="M46 45C44.9 45 44 45.9 44 47C44 48.1 44.9 49 46 49C47.1 49 48 48.1 48 47C48 45.9 47.1 45 46 45Z" fill="currentColor"/>
            <path d="M48 22H16C14.9 22 14 22.9 14 24V42C14 43.1 14.9 44 16 44H20V40H44V44H48C49.1 44 50 43.1 50 42V24C50 22.9 49.1 22 48 22ZM48 40H16V24H48V40Z" fill="currentColor" opacity="0.8"/>
            <path d="M32 24C28 24 24 26.5 24 32H40C40 26.5 36 24 32 24Z" fill="currentColor" opacity="0.6"/>
          </svg>
        </div>
      );
    case 'stationwagon':
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-cyan-500"
          >
            <path d="M16 45C14.9 45 14 45.9 14 47C14 48.1 14.9 49 16 49C17.1 49 18 48.1 18 47C18 45.9 17.1 45 16 45Z" fill="currentColor"/>
            <path d="M48 45C46.9 45 46 45.9 46 47C46 48.1 46.9 49 48 49C49.1 49 50 48.1 50 47C50 45.9 49.1 45 48 45Z" fill="currentColor"/>
            <path d="M50 22H14C12.9 22 12 22.9 12 24V42C12 43.1 12.9 44 14 44H18V40H46V44H50C51.1 44 52 43.1 52 42V24C52 22.9 51.1 22 50 22ZM50 40H14V24H50V40Z" fill="currentColor" opacity="0.8"/>
            <path d="M28 24C24 24 20 26.5 20 32H36C36 26.5 32 24 28 24Z" fill="currentColor" opacity="0.6"/>
            <path d="M52 26H56C56.55 26 57 26.45 57 27V37C57 37.55 56.55 38 56 38H52V26Z" fill="currentColor" opacity="0.5"/>
          </svg>
        </div>
      );
    case 'convertible':
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-red-500"
          >
            <path d="M16 42C14.9 42 14 42.9 14 44C14 45.1 14.9 46 16 46C17.1 46 18 45.1 18 44C18 42.9 17.1 42 16 42Z" fill="currentColor"/>
            <path d="M48 42C46.9 42 46 42.9 46 44C46 45.1 46.9 46 48 46C49.1 46 50 45.1 50 44C50 42.9 49.1 42 48 42Z" fill="currentColor"/>
            <path d="M50 20H14C12.9 20 12 20.9 12 22V40C12 41.1 12.9 42 14 42H18V38H46V42H50C51.1 42 52 41.1 52 40V22C52 20.9 51.1 20 50 20ZM50 38H14V22H50V38Z" fill="currentColor" opacity="0.8"/>
            <path d="M26 24L20 30H44L38 24H26Z" fill="currentColor" opacity="0.6"/>
            <path d="M28 20C28 20 26 18 24 18C22 18 20 20 20 22L44 22C44 20 42 18 40 18C38 18 36 20 36 20H28Z" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>
      );
    case 'sedan':
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
            <path d="M16 40C14.9 40 14 40.9 14 42C14 43.1 14.9 44 16 44C17.1 44 18 43.1 18 42C18 40.9 17.1 40 16 40Z" fill="currentColor"/>
            <path d="M48 40C46.9 40 46 40.9 46 42C46 43.1 46.9 44 48 44C49.1 44 50 43.1 50 42C50 40.9 49.1 40 48 40Z" fill="currentColor"/>
            <path d="M50 18H14C12.89 18 12 18.9 12 20V38C12 39.1 12.89 40 14 40H16V36H18V40H46V36H48V40H50C51.1 40 52 39.1 52 38V20C52 18.9 51.1 18 50 18ZM50 36H14V20H50V36Z" fill="currentColor" opacity="0.7"/>
            <path d="M32 22C25.37 22 20 27.37 20 34H44C44 27.37 38.63 22 32 22Z" fill="currentColor" opacity="0.5"/>
          </svg>
        </div>
      );
  }
};
