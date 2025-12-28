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
        className="text-slate-500"
      >
        <path d="M16 40C14.9 40 14 40.9 14 42C14 43.1 14.9 44 16 44C17.1 44 18 43.1 18 42C18 40.9 17.1 40 16 40Z" fill="currentColor"/>
        <path d="M48 40C46.9 40 46 40.9 46 42C46 43.1 46.9 44 48 44C49.1 44 50 43.1 50 42C50 40.9 49.1 40 48 40Z" fill="currentColor"/>
        <path d="M50 18H14C12.89 18 12 18.9 12 20V38C12 39.1 12.89 40 14 40H16V36H18V40H46V36H48V40H50C51.1 40 52 39.1 52 38V20C52 18.9 51.1 18 50 18ZM50 36H14V20H50V36Z" fill="currentColor" opacity="0.7"/>
        <path d="M26 22H20C19.4 22 19 22.4 19 23V32C19 32.6 19.4 33 20 33H26C26.6 33 27 32.6 27 32V23C27 22.4 26.6 22 26 22Z" fill="currentColor" opacity="0.5"/>
        <path d="M44 22H38C37.4 22 37 22.4 37 23V32C37 32.6 37.4 33 38 33H44C44.6 33 45 32.6 45 32V23C45 22.4 44.6 22 44 22Z" fill="currentColor" opacity="0.5"/>
      </svg>
    </div>
  );
};
