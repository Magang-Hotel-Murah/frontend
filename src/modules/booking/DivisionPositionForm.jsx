import React from 'react';
import { Users, Briefcase, UserCheck, Building2, AlertCircle } from 'lucide-react';

const DivisionPositionForm = ({
  divisions,
  positions,
  toggleDivision,
  togglePosition,
  handleInputChange,
  formData,
  errors,
}) => {

  const showDivisionOnly =
    formData.division_ids.length > 0 &&
    formData.position_ids.length === 0 &&
    !formData.all_users;

  const showDivisionAndPosition =
    formData.division_ids.length > 0 &&
    formData.position_ids.length > 0 &&
    !formData.all_users;

  const showPositionOnly =
    formData.division_ids.length === 0 &&
    formData.position_ids.length > 0 &&
    !formData.all_users;

  return (
    <div className="space-y-6">
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

            {errors?.all_users && (
              <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-700 font-medium">
                  {errors.all_users}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {showDivisionOnly && (
          <div className="lg:col-span-2 flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
            <AlertCircle className="w-4 h-4" />
            Semua karyawan di divisi yang dipilih akan diundang
          </div>
        )}

        {showDivisionAndPosition && (
          <div className="lg:col-span-2 flex items-center gap-2 p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-700">
            <AlertCircle className="w-4 h-4" />
            Semua karyawan di divisi yang dipilih ATAU posisi yang dipilih akan diundang
          </div>
        )}

        {showPositionOnly && (
          <div className="lg:col-span-2 flex items-center gap-2 p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs text-purple-700">
            <AlertCircle className="w-4 h-4" />
            Semua karyawan dengan posisi yang dipilih akan diundang
          </div>
        )}

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
                className={`group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 border border-transparent ${
                  formData.all_users 
                    ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                    : 'hover:bg-blue-50 hover:border-blue-200 cursor-pointer'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={formData.division_ids.includes(div.id)}
                    onChange={() => !formData.all_users && toggleDivision(div.id)}
                    className="peer sr-only"
                    disabled={formData.all_users}
                  />
                  <div className={`w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                    formData.all_users 
                      ? 'border-gray-300 bg-gray-100' 
                      : 'border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600'
                  }`}>
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
                <span className={`text-sm font-medium transition-colors ${
                  formData.all_users 
                    ? 'text-gray-400' 
                    : 'text-gray-700 group-hover:text-blue-700'
                }`}>
                  {div.name}
                </span>
              </label>
            ))}
          </div>
        </div>

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
                className={`group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 border border-transparent ${
                  formData.all_users 
                    ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                    : 'hover:bg-indigo-50 hover:border-indigo-200 cursor-pointer'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={formData.position_ids.includes(pos.id)}
                    onChange={() => !formData.all_users && togglePosition(pos.id)}
                    className="peer sr-only"
                    disabled={formData.all_users}
                  />
                  <div className={`w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                    formData.all_users 
                      ? 'border-gray-300 bg-gray-100' 
                      : 'border-gray-300 peer-checked:border-indigo-600 peer-checked:bg-indigo-600'
                  }`}>
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
                <span className={`text-sm font-medium transition-colors ${
                  formData.all_users 
                    ? 'text-gray-400' 
                    : 'text-gray-700 group-hover:text-indigo-700'
                }`}>
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