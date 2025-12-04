import React, { useState } from 'react';
import { Users, Briefcase, UserCheck, Building2 } from 'lucide-react';

const DivisionPositionForm = ({
  divisions,
  positions,
  toggleDivision,
  togglePosition,
  handleInputChange,
  formData,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      

      {/* Quick Invite Section */}
      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg shadow-sm">
            <UserCheck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-gray-700 mb-1">
              Undang Cepat
            </h5>
            <p className="text-xs text-gray-500 mb-3">
              Aktifkan untuk mengundang semua karyawan sekaligus
            </p>
            <label className="group flex items-center gap-3 cursor-pointer w-fit">
              <div className="relative">
                <input
                  type="checkbox"
                  name="all_users"
                  checked={formData.all_users}
                  onChange={handleInputChange}
                  className="peer sr-only"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-500 transition-all duration-300 ease-in-out"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ease-in-out peer-checked:translate-x-5 shadow-md"></div>
              </div>
              <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600 transition-colors">
                Undang semua karyawan
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Division & Position Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Divisions Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-blue-50 px-5 py-4 flex items-center gap-3 border-b border-blue-100">
            <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg shadow-sm">
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Divisi</h4>
              <p className="text-xs text-gray-500">
                {formData.division_ids.length} dipilih
              </p>
            </div>
          </div>
          <div className="p-4 space-y-1.5 max-h-80 overflow-y-auto">
            {divisions.map((div) => (
              <label
                key={div.id}
                className="group flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200"
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={formData.division_ids.includes(div.id)}
                    onChange={() => toggleDivision(div.id)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all duration-200 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                  {div.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Positions Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-indigo-50 px-5 py-4 flex items-center gap-3 border-b border-indigo-100">
            <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg shadow-sm">
              <Briefcase className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Posisi</h4>
              <p className="text-xs text-gray-500">
                {formData.position_ids.length} dipilih
              </p>
            </div>
          </div>
          <div className="p-4 space-y-1.5 max-h-80 overflow-y-auto">
            {positions.map((pos) => (
              <label
                key={pos.id}
                className="group flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-indigo-200"
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={formData.position_ids.includes(pos.id)}
                    onChange={() => togglePosition(pos.id)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-indigo-600 peer-checked:bg-indigo-600 transition-all duration-200 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 transition-colors">
                  {pos.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivisionPositionForm;