import React, { useState } from 'react';
import NavbarBooking from '@components/NavbarBooking';

const Transactions = () => {
  const [activeTab, setActiveTab] = React.useState('hotel');
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <NavbarBooking activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {activeTab === 'hotel' && 'Booking Hotel'}
              {activeTab === 'flight' && 'Booking Tiket Pesawat'}
              {activeTab === 'train' && 'Booking Tiket Kereta'}
              {activeTab === 'ppob' && 'Layanan PPOB'}
            </h2>
            <p className="text-gray-600">
              Konten untuk tab {activeTab} akan ditampilkan di sini
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
