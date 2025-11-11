import React from 'react';

export const LoadingSpinner = () => (
  <div className="h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
      <p className="text-xl text-primary-800 font-medium">Memuat data rapat...</p>
    </div>
  </div>
);

export const ErrorDisplay = ({ error }) => (
  <div className="h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md border border-primary-200">
      <div className="text-center">
        <svg className="mx-auto h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-primary-900 mb-2">Terjadi Kesalahan</h2>
        <p className="text-primary-700">{error}</p>
      </div>
    </div>
  </div>
);