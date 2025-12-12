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
    <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 transition-all duration-300 hover:shadow-lg border border-slate-100">
      <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-y-0 md:space-x-4">
        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-slate-600 mb-2">From</label>
          <CityAutocomplete
            name="from"
            placeholder="e.g., Grozny"
            className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition duration-200 bg-slate-50 hover:bg-white"
            value={searchParams.from}
            onChange={handleChange}
          />
        </div>

        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-slate-600 mb-2">To</label>
          <CityAutocomplete
            name="to"
            placeholder="e.g., Mecca"
            className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition duration-200 bg-slate-50 hover:bg-white"
            value={searchParams.to}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-32 relative">
          <label className="block text-xs font-semibold text-slate-600 mb-2">Seats</label>
          <select
            name="seats"
            className="w-full px-4 py-3 pr-8 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition duration-200 appearance-none bg-slate-50 hover:bg-white"
            value={searchParams.seats}
            onChange={handleChange}
          >
            <option value="">Any</option>
            <option value="1">1 Seat</option>
            <option value="2">2 Seats</option>
            <option value="3">3 Seats</option>
            <option value="4">4 Seats</option>
            <option value="5">5 Seats</option>
            <option value="6">6 Seats</option>
            <option value="7">7 Seats</option>
            <option value="8">8 Seats</option>
          </select>
          <Users size={16} className="absolute left-4 top-9 text-slate-400 pointer-events-none" />
          <ChevronDown size={16} className="absolute right-3 top-9 text-slate-400 pointer-events-none" />
        </div>

        <div className="w-full md:w-32 relative">
          <label className="block text-xs font-semibold text-slate-600 mb-2">Date</label>
          <input
            type="date"
            name="date"
            className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition duration-200 date-input-custom bg-slate-50 hover:bg-white"
            value={searchParams.date}
            onChange={handleChange}
          />
        </div>

        <div className="w-full md:w-auto md:pt-6">
          <button
            onClick={() => onSearch(searchParams)}
            className="w-full md:w-auto inline-flex items-center justify-center bg-cyan-600 text-white px-8 py-3 text-sm font-semibold rounded-xl hover:bg-cyan-700 transition duration-200 shadow-md hover:shadow-lg"
          >
            <Search size={16} className="mr-2" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </section>
  );
};