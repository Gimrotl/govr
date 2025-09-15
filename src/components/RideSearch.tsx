import React from 'react';
import { Search, Users } from 'lucide-react';
import { SearchParams } from '../types';
import { CityAutocomplete } from './CityAutocomplete';

interface RideSearchProps {
  searchParams: SearchParams;
  onSearch: (params: SearchParams) => void;
  onReset: () => void;
}

export const RideSearch: React.FC<RideSearchProps> = ({
  searchParams,
  onSearch,
  onReset
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onSearch({ ...searchParams, [name]: value });
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="flex-1 w-full">
          <CityAutocomplete
            name="from"
            placeholder="From (e.g., Grozny)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
            value={searchParams.from}
            onChange={handleChange}
          />
        </div>
        
        <div className="flex-1 w-full">
          <CityAutocomplete
            name="to"
            placeholder="To (e.g., Mecca)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
            value={searchParams.to}
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-4 md:space-x-4">
          <div className="flex-1 md:w-32 relative">
            <input
              type="number"
              name="seats"
              min="1"
              max="8"
              placeholder="Seats"
              className="w-full p-3 pl-9 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              value={searchParams.seats}
              onChange={handleChange}
            />
            <Users size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex-1 md:w-40">
            <input
              type="date"
              name="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              value={searchParams.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-full md:w-auto">
          <button
            onClick={() => onSearch(searchParams)}
            className="w-full md:w-auto inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200 shadow-sm"
          >
            <Search size={18} className="mr-2" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </section>
  );
};