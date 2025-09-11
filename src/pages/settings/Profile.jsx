import React from 'react';
import { User, Camera, Save } from 'lucide-react';

const Profile = ({ 
  profileData, 
  handleProfileChange, 
  handleAvatarChange, 
  handleSave, 
  isSaving 
}) => {
  return (
    <div className="space-y-6 mt-4 mb-4 mr-4 ml-4">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            {profileData.avatar ? (
              <img src={profileData.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-gray-600" />
            )}
          </div>
          <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors">
            <Camera className="w-4 h-4" />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Foto Profil</h3>
          <p className="text-sm text-gray-500">Upload foto profil baru</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={profileData.fullName}
            onChange={(e) => handleProfileChange('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => handleProfileChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nomor Telepon
          </label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => handleProfileChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Perusahaan
          </label>
          <input
            type="text"
            value={profileData.company}
            onChange={(e) => handleProfileChange('company', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Posisi
          </label>
          <input
            type="text"
            value={profileData.position}
            onChange={(e) => handleProfileChange('position', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={() => handleSave('profile')}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Menyimpan...' : 'Simpan Profil'}</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;