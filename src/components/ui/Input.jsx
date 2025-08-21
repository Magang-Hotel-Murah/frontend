import React from 'react';

const Input = ({ 
  label, 
  error, 
  icon: Icon,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={`
            block w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            transition-colors
            ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
            ${className}
          `.trim().replace(/\s+/g, ' ')}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;