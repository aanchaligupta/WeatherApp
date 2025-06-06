import React, { useState } from 'react';
import { Search, MapPin, Loader } from 'lucide-react';

interface SearchLocationProps {
  onLocationSelect: (location: string) => void;
  onSearch: (query: string) => Promise<string[]>;
  loading?: boolean;
}

export const SearchLocation: React.FC<SearchLocationProps> = ({ 
  onLocationSelect, 
  onSearch,
  loading = false 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.length > 2) {
      const results = await onSearch(searchQuery);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleLocationSelect = (location: string) => {
    const city = location.split(',')[0];
    setQuery(city);
    setShowSuggestions(false);
    onLocationSelect(city);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          onLocationSelect('Current Location');
          setQuery('Current Location');
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {loading ? (
              <Loader className="h-5 w-5 text-blue-400 animate-spin" />
            ) : (
              <Search className="h-5 w-5 text-blue-400" />
            )}
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-blue-900 placeholder-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg z-10">
              {suggestions.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 first:rounded-t-xl last:rounded-b-xl flex items-center gap-2 text-blue-900"
                >
                  <MapPin size={16} className="text-blue-600" />
                  {location}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button
          onClick={handleCurrentLocation}
          className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors flex items-center gap-2"
        >
          <MapPin size={16} />
          <span className="hidden sm:inline">Current</span>
        </button>
      </div>
    </div>
  );
};