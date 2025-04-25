import { useState, useEffect, useRef } from 'react';

function SearchBar({ searchTerm, doctors, onSearchChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);

  // Generate suggestions based on input
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = doctors
      .filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 3)
      .map(doctor => doctor.name);

    setSuggestions(filtered);
    setActiveIndex(-1); // reset active index when new suggestions come
  }, [searchTerm, doctors]);

  // Handle input change
  const handleInputChange = (e) => {
    onSearchChange(e.target.value.trimStart());
    setShowSuggestions(true);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion.trim());
    setShowSuggestions(false);
    inputRef.current.blur();
  };

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSuggestionClick(suggestions[activeIndex]);
      }
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          className="w-full p-3 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          data-testid="autocomplete-input"
          ref={inputRef}
          onFocus={() => setShowSuggestions(true)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Autocomplete Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          <ul
            role="listbox"
            className="max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                role="option"
                aria-selected={activeIndex === index}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${activeIndex === index ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => handleSuggestionClick(suggestion)}
                data-testid="suggestion-item"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
