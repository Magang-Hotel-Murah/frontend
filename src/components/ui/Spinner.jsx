import React, { useState } from 'react';

const Spinner = ({ size = 'medium', color = 'blue' }) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };
  
  const colors = {
    orange: 'border-orange-500',
    gray: 'border-gray-600',
    white: 'border-white'
  };
  
  return (
    <div className={`
      ${sizes[size]} ${colors[color]}
      border-4 border-t-transparent rounded-full animate-spin
    `} />
  );
};

export default Spinner;