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
        className="text-blue-600"
      >
        <path d="M10 42C8.9 42 8 42.9 8 44C8 45.1 8.9 46 10 46C11.1 46 12 45.1 12 44C12 42.9 11.1 42 10 42Z" fill="currentColor"/>
        <path d="M54 42C52.9 42 52 42.9 52 44C52 45.1 52.9 46 54 46C55.1 46 56 45.1 56 44C56 42.9 55.1 42 54 42Z" fill="currentColor"/>
        <path d="M56 28H52C52 22 48.6 17 44 16H20C15.4 17 12 22 12 28H8C6.9 28 6 28.9 6 30V42C6 43.1 6.9 44 8 44H12V40H52V44H56C57.1 44 58 43.1 58 42V30C58 28.9 57.1 28 56 28ZM56 40H8V30H56V40Z" fill="currentColor" opacity="0.8"/>
        <path d="M20 18C20 18 18 20 18 24C18 25.1 18.9 26 20 26H28C28.6 26 29 25.6 29 25V18H20Z" fill="currentColor" opacity="0.6"/>
        <path d="M44 18V25C44 25.6 44.4 26 45 26H53C54.1 26 55 25.1 55 24C55 20 53 18 44 18Z" fill="currentColor" opacity="0.6"/>
        <path d="M30 22H34C34.55 22 35 21.55 35 21C35 20.45 34.55 20 34 20H30C29.45 20 29 20.45 29 21C29 21.55 29.45 22 30 22Z" fill="currentColor" opacity="0.4"/>
      </svg>
    </div>
  );
};
