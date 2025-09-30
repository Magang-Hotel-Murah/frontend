import React from "react";
import { Filter } from "lucide-react";
import SearchInput from "./SearchInput";

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
          <select
            key={index}
            value={filter.value}
            onChange={filter.onChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {filter.options.map((option, optIndex) => (
              <option key={optIndex} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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