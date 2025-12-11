import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  onClick?: () => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 16,
  interactive = false,
  onChange,
  onClick
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <div
      className={`flex items-center ${onClick ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      {[...Array(5)].map((_, index) => {
        // Determine if this star should be filled, half-filled, or empty
        const isFilled = index < fullStars;
        const isHalf = !isFilled && index === fullStars && hasHalfStar;

        return (
          <span
            key={index}
            className={`
              ${interactive ? 'cursor-pointer' : ''}
              ${isFilled ? 'text-yellow-400' : isHalf ? 'text-yellow-300' : 'text-gray-300'}
            `}
            onClick={(e) => {
              if (interactive && onChange) {
                e.stopPropagation();
                onChange(index + 1);
              }
            }}
          >
            <Star
              size={size}
              fill={isFilled || isHalf ? 'currentColor' : 'none'}
              strokeWidth={1.5}
            />
          </span>
        );
      })}
      <span className="text-sm ml-1 text-gray-600 font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};