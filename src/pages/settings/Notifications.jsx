import React from 'react';
import { Save } from 'lucide-react';

const Notifications = ({ 
  notifications, 
  handleNotificationChange, 
  handleSave, 
  isSaving 
}) => {
  return (
    <div className="space-y-6 mt-4 mb-4 mr-4 ml-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preferensi Notifikasi</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => {
            const labels = {
              email: 'Email Notifications',
              push: 'Push Notifications',
              sms: 'SMS Notifications',
              newsletter: 'Newsletter'
            };
            const descriptions = {
              email: 'Terima notifikasi melalui email',
              push: 'Terima notifikasi push di browser',
              sms: 'Terima notifikasi melalui SMS',
              newsletter: 'Terima newsletter dan update produk'
            };
            
            return (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{labels[key]}</p>
                  <p className="text-sm text-gray-500">{descriptions[key]}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNotificationChange(key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={() => handleSave('notifications')}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Menyimpan...' : 'Simpan Notifikasi'}</span>
        </button>
      </div>
    </div>
  );
};

export default Notifications;