import React, { useState } from 'react';
import { Plus, Minus, ChevronLeft } from 'lucide-react';
import { useRides } from '../hooks/useRides';
import { CityAutocomplete } from './CityAutocomplete';

// Currency options with priority currencies first
const currencies = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'RUB', symbol: '₽', name: 'Russischer Rubel' },
  { code: 'PLN', symbol: 'zł', name: 'Polnischer Złoty' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegische Krone' },
  { code: 'GBP', symbol: '£', name: 'Britisches Pfund' },
  { code: 'CHF', symbol: 'CHF', name: 'Schweizer Franken' },
  { code: 'SEK', symbol: 'kr', name: 'Schwedische Krone' },
  { code: 'DKK', symbol: 'kr', name: 'Dänische Krone' },
  { code: 'CZK', symbol: 'Kč', name: 'Tschechische Krone' },
  { code: 'HUF', symbol: 'Ft', name: 'Ungarischer Forint' },
  { code: 'RON', symbol: 'lei', name: 'Rumänischer Leu' },
  { code: 'BGN', symbol: 'лв', name: 'Bulgarischer Lew' },
  { code: 'HRK', symbol: 'kn', name: 'Kroatische Kuna' },
  { code: 'TRY', symbol: '₺', name: 'Türkische Lira' },
  { code: 'UAH', symbol: '₴', name: 'Ukrainische Hrywnja' },
  { code: 'BYN', symbol: 'Br', name: 'Belarussischer Rubel' },
  { code: 'GEL', symbol: '₾', name: 'Georgischer Lari' },
  { code: 'AZN', symbol: '₼', name: 'Aserbaidschanischer Manat' },
  { code: 'KZT', symbol: '₸', name: 'Kasachischer Tenge' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi-Riyal' },
  { code: 'AED', symbol: 'د.إ', name: 'VAE Dirham' },
  { code: 'EGP', symbol: '£', name: 'Ägyptisches Pfund' },
  { code: 'MAD', symbol: 'د.م.', name: 'Marokkanischer Dirham' }
];
interface OfferRideFormProps {
  onBack: () => void;
}

export const OfferRideForm: React.FC<OfferRideFormProps> = ({ onBack }) => {
  const { offerRide } = useRides();
  const [stopovers, setStopovers] = useState<string[]>(['']);
  const [newRide, setNewRide] = useState({
    from: '',
    to: '',
    stopovers: [''],
    date: '',
    time: '',
    priceAmount: '',
    currency: 'EUR',
    availableSeats: 1,
    information: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRide({ ...newRide, [name]: value });
  };

  const handleStopoverChange = (index: number, value: string) => {
    const newStopovers = [...stopovers];
    newStopovers[index] = value;
    setStopovers(newStopovers);
    setNewRide({ ...newRide, stopovers: newStopovers });
  };

  const addStopover = () => {
    setStopovers([...stopovers, '']);
  };

  const removeStopover = (index: number) => {
    const newStopovers = stopovers.filter((_, i) => i !== index);
    setStopovers(newStopovers);
    setNewRide({ ...newRide, stopovers: newStopovers });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get selected currency info
    const selectedCurrency = currencies.find(c => c.code === newRide.currency);
    const priceWithCurrency = `${newRide.priceAmount}${selectedCurrency?.symbol || '€'}`;
    
    // Create ride object with formatted price
    const rideData = {
      ...newRide,
      price: priceWithCurrency
    };
    
    offerRide(rideData);
    setNewRide({
      from: '',
      to: '',
      stopovers: [''],
      date: '',
      time: '',
      priceAmount: '',
      currency: 'EUR',
      availableSeats: 1,
      information: ''
    });
    setStopovers(['']);
    onBack();
  };

  return (
    <section className="mt-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-cyan-400 transition-colors mr-4"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-slate-100">Offer a Ride</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-slate-300 mb-1">From</label>
            <CityAutocomplete
              name="from"
              placeholder="City of departure"
              className="w-full p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-900 text-slate-200 placeholder-slate-500"
              value={newRide.from}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="to" className="block text-sm font-medium text-slate-300 mb-1">To</label>
            <CityAutocomplete
              name="to"
              placeholder="Destination city"
              className="w-full p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-900 text-slate-200 placeholder-slate-500"
              value={newRide.to}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-300 mb-1">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-900 text-slate-200"
              value={newRide.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-slate-300 mb-1">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              className="w-full p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-900 text-slate-200"
              value={newRide.time}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="priceAmount" className="block text-sm font-medium text-slate-300 mb-1">Preis pro Platz</label>
            <div className="flex space-x-2">
              <input
                type="number"
                id="priceAmount"
                name="priceAmount"
                placeholder="Betrag"
                min="0"
                step="0.01"
                className="w-[48%] p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-900 text-slate-200 placeholder-slate-500"
                value={newRide.priceAmount}
                onChange={handleChange}
                required
              />
              <select
                name="currency"
                value={newRide.currency}
                onChange={handleChange}
                className="w-[45%] p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-900 text-slate-200"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="availableSeats" className="block text-sm font-medium text-slate-300 mb-1">Available Seats</label>
            <input
              type="number"
              id="availableSeats"
              name="availableSeats"
              min="1"
              max="8"
              className="w-full p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-900 text-slate-200"
              value={newRide.availableSeats}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-300 mb-1">Stopovers</label>
          {stopovers.map((stopover, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <CityAutocomplete
                name={`stopover-${index}`}
                placeholder="Enter stopover city"
                className="flex-1 p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-900 text-slate-200 placeholder-slate-500"
                value={stopover}
                onChange={(e) => handleStopoverChange(index, e.target.value)}
              />
              {index === stopovers.length - 1 ? (
                <button
                  type="button"
                  onClick={addStopover}
                  className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Plus size={24} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => removeStopover(index)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Minus size={24} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="information" className="block text-sm font-medium text-slate-300 mb-1">Additional Information</label>
          <textarea
            id="information"
            name="information"
            placeholder="Add any additional information about the ride..."
            className="w-full p-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-900 text-slate-200 placeholder-slate-500 h-32"
            value={newRide.information}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 font-medium"
        >
          Offer Ride
        </button>
      </form>
    </section>
  );
};