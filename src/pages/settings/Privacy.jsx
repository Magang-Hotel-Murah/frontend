import React from 'react';

const Privacy = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Pengaturan Privasi</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Profil Publik</p>
              <p className="text-sm text-gray-500">Izinkan orang lain melihat profil Anda</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Analytics</p>
              <p className="text-sm text-gray-500">Bantu kami meningkatkan layanan</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data Tracking</h3>
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <p className="font-medium text-gray-900">Lihat Data yang Dikumpulkan</p>
            <p className="text-sm text-gray-500 mt-1">Lihat semua data yang telah dikumpulkan tentang Anda</p>
          </button>
          
          <button className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 text-red-700">
            <p className="font-medium">Hapus Semua Data</p>
            <p className="text-sm mt-1 opacity-75">Hapus permanen semua data yang terkait dengan akun Anda</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Privacy;