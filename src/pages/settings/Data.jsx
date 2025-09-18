import React from 'react';
import { Download, Upload } from 'lucide-react';

const Data = () => {
  return (
    <div className="space-y-6 mt-4 mb-4 mr-4 ml-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ekspor Data</h3>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Data Profil</p>
                <p className="text-sm text-gray-500">Export data profil dan pengaturan akun</p>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Data Transaksi</p>
                <p className="text-sm text-gray-500">Export semua data transaksi</p>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Import Data</h3>
        <div className="space-y-4">
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2">Drop files here atau klik untuk upload</p>
            <input type="file" className="hidden" id="import-file" />
            <label htmlFor="import-file" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 cursor-pointer">
              Pilih File
            </label>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-red-600 mb-4">Zona Bahaya</h3>
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-red-300 rounded-lg hover:bg-red-50">
            <p className="font-medium text-red-700">Hapus Akun</p>
            <p className="text-sm text-red-600 mt-1">Hapus permanen akun dan semua data terkait</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Data;