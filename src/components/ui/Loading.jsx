import React from 'react';
import { Spinner } from '@ui';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-lg">
        <Spinner size="large" />
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
