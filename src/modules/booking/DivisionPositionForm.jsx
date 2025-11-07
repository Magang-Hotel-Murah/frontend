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
    <div className="mx-auto">
      <div className="mb-4 bg-primary-50 rounded-xl p-2 border border-primary-100">
        <div className="flex items-start gap-2">
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <UserCheck className="w-4 h-4 text-primary-600" />
          </div>
          <div className="flex-1">
            <h5 className="text-lg font-semibold text-gray-600 mb-1">
              Undang Cepat
            </h5>
            <p className="text-xs text-gray-400 mb-3">
              Pilih semua karyawan
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
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-primary-500 transition-all duration-300 ease-in-out"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ease-in-out peer-checked:translate-x-5 shadow-md"></div>
              </div>
              <span className="text-xs font-medium text-gray-500 group-hover:text-primary-600 transition-colors">
                Undang semua karyawan
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-l overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 flex items-center gap-2 border-b">
            <div className="backdrop-blur-sm rounded-lg p-2">
              <Building2 className="w-5 h-5 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">Divisi</h3>
          </div>
          <div className="p-6 space-y-2 max-h-96 overflow-y-auto">
            {divisions.map((div) => (
              <label
                key={div.id}
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 transition-all duration-200 cursor-pointer"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.division_ids.includes(div.id)}
                    onChange={() => toggleDivision(div.id)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-primary-600 peer-checked:bg-primary-600 transition-all duration-200 flex items-center justify-center">
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
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 transition-colors">
                  {div.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Positions Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Positions</h3>
          </div>
          <div className="p-6 space-y-2 max-h-96 overflow-y-auto">
            {positions.map((pos) => (
              <label
                key={pos.id}
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 transition-all duration-200 cursor-pointer"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.position_ids.includes(pos.id)}
                    onChange={() => togglePosition(pos.id)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-primary-600 peer-checked:bg-primary-600 transition-all duration-200 flex items-center justify-center">
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
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 transition-colors">
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