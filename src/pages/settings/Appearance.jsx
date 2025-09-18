import React from 'react';
import { Save } from 'lucide-react';

const Appearance = ({ 
  theme, 
  language, 
  setTheme, 
  setLanguage, 
  handleSave, 
  isSaving 
}) => {
  return (
    <div className="space-y-6 mt-4 mb-4 mr-4 ml-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['light', 'dark', 'auto'].map((themeOption) => (
            <div key={themeOption} className="relative">
              <input
                type="radio"
                name="theme"
                value={themeOption}
                checked={theme === themeOption}
                onChange={(e) => setTheme(e.target.value)}
                className="sr-only peer"
              />
              <label className="block p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50">
                <div className="text-center">
                  <div className={`w-16 h-10 mx-auto mb-2 rounded ${themeOption === 'light' ? 'bg-white border' : themeOption === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-white to-gray-800'}`}></div>
                  <p className="font-medium capitalize">{themeOption}</p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Bahasa</h3>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="id">Bahasa Indonesia</option>
          <option value="en">English</option>
          <option value="ms">Bahasa Malaysia</option>
        </select>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={() => handleSave('appearance')}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Menyimpan...' : 'Simpan Tampilan'}</span>
        </button>
      </div>
    </div>
  );
};

export default Appearance;