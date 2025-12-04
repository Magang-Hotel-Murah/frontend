
import React, { useState, useRef, useEffect } from "react";
import { Filter, ChevronDown, Check } from "lucide-react";
import SearchInput from "./SearchInput";

const CustomSelect = ({ value, onChange, options, placeholder = "Pilih opsi" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between transition-colors ${
                option.value === value ? "bg-primary-50 text-primary-700" : "text-gray-900"
              } ${index === 0 ? "rounded-t-lg" : ""} ${
                index === options.length - 1 ? "rounded-b-lg" : ""
              }`}
            >
              <span>{option.label}</span>
              {option.value === value && (
                <Check className="w-4 h-4 text-primary-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const BaseFilters = ({ 
  searchConfig,
  selectFilters = [],
  customFilters = [],
  resultCount,
  totalCount,
  className = "",
  ...props 
}) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${className}`} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {searchConfig && (
          <SearchInput
            placeholder={searchConfig.placeholder}
            value={searchConfig.value}
            onChange={searchConfig.onChange}
          />
        )}
        
        {selectFilters.map((filter, index) => (
          <CustomSelect
            key={index}
            value={filter.value}
            onChange={filter.onChange}
            options={filter.options}
            placeholder={filter.placeholder}
          />
        ))}
        
        {customFilters.map((CustomComponent, index) => (
          <CustomComponent key={index} />
        ))}
        
        {(resultCount !== undefined && totalCount !== undefined) && (
          <div className="flex items-center text-gray-600">
            <Filter className="w-4 h-4 mr-2" />
            {resultCount} dari {totalCount} items
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseFilters;