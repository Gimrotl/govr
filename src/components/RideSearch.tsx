import React from 'react';
import { Search, Users, ChevronDown } from 'lucide-react';
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onSearch({ ...searchParams, [name]: value });
  };

  return (
    <section className="bg-white rounded-xl shadow-sm p-4 md:p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="flex-1 w-full">
          <CityAutocomplete
            name="from"
            placeholder="From (e.g., Grozny)"
            className="w-full p-2.5 md:p-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-moonlit-400 focus:border-transparent transition duration-200"
            value={searchParams.from}
            onChange={handleChange}
          />
        </div>

        <div className="flex-1 w-full">
          <CityAutocomplete
            name="to"
            placeholder="To (e.g., Mecca)"
            className="w-full p-2.5 md:p-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-moonlit-400 focus:border-transparent transition duration-200"
            value={searchParams.to}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-36 relative">
          <select
            name="seats"
            className="w-full p-2.5 md:p-3 pl-8 md:pl-9 pr-8 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-moonlit-400 focus:border-transparent transition duration-200 appearance-none bg-white"
            value={searchParams.seats}
            onChange={handleChange}
          >
            <option value="">Seats</option>
            <option value="1">1 Seat</option>
            <option value="2">2 Seats</option>
            <option value="3">3 Seats</option>
            <option value="4">4 Seats</option>
            <option value="5">5 Seats</option>
            <option value="6">6 Seats</option>
            <option value="7">7 Seats</option>
            <option value="8">8 Seats</option>
          </select>
          <Users size={16} className="absolute left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          <ChevronDown size={16} className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="w-full md:w-36 relative">
          <input
            type="date"
            name="date"
            placeholder="Datum"
            className="w-full p-2.5 md:p-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-moonlit-400 focus:border-transparent transition duration-200 date-input-custom"
            value={searchParams.date}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-auto">
          <button
            onClick={() => onSearch(searchParams)}
            className="w-full md:w-auto inline-flex items-center justify-center bg-moonlit-600 text-white px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base rounded-xl hover:bg-moonlit-700 transition duration-200 shadow-sm hover:shadow-md"
          >
            <Search size={16} className="mr-2" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </section>
  );
};