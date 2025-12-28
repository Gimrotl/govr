import React from 'react';

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
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-500"
      >
        <rect x="12" y="26" width="40" height="14" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
        <rect x="18" y="18" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="36" y="18" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="44" r="4" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
        <circle cx="46" cy="44" r="4" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="44" r="2" fill="white"/>
        <circle cx="46" cy="44" r="2" fill="white"/>
      </svg>
    </div>
  );
};
