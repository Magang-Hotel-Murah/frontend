import React from "react";
import { DateTimePicker } from "@common";
import { BaseFormInput } from "@common";
import { InfoIcon, CheckCircle2, Calendar } from "lucide-react";
import { SearchableRoomDropdown } from "@common";

const InformationForm = ({ 
  rooms, 
  formData, 
  handleInputChange, 
  errors,
  existingReservations = [],
  reservationsLoading = false,
  availableSlots = [],
  slotsLoading = false,
  onDateSelected,
}) => {
  
  const selectedDate = formData.start_time ? formData.start_time.split('T')[0] : '';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg">
          <InfoIcon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Informasi Dasar
          </h3>
          <p className="text-xs text-gray-500">
            Lengkapi detail reservasi meeting Anda
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Room Selection */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ruangan Meeting <span className="text-red-500">*</span>
          </label>
          <SearchableRoomDropdown
            rooms={rooms}
            value={formData.meeting_room_id}
            onChange={(roomId) =>
              handleInputChange({ target: { name: "meeting_room_id", value: roomId } })
            }
            placeholder="Pilih Ruangan"
          />
          {errors.meeting_room_id && (
            <p className="mt-1 text-sm text-red-600">{errors.meeting_room_id}</p>
          )}
          {formData.meeting_room_id && (
            <p className="mt-2 text-xs text-blue-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Ruangan dipilih. Lanjutkan ke langkah berikutnya.
            </p>
          )}
        </div>

        {/* Date & Time Selection */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-gray-700" />
            <label className="block text-sm font-medium text-gray-700">
              Pilih Tanggal & Waktu
            </label>
          </div>
          
          {!formData.meeting_room_id && (
            <div className="mb-3 p-3 bg-yellow-50 text-yellow-700 text-sm rounded-lg border border-yellow-200">
              ⚠️ Pilih ruangan terlebih dahulu
            </div>
          )}

          {reservationsLoading && formData.meeting_room_id && (
            <div className="mb-3 p-3 bg-blue-50 text-blue-600 text-sm rounded-lg flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span>Memuat data reservasi...</span>
            </div>
          )}

          <DateTimePicker
            startTime={formData.start_time}
            endTime={formData.end_time}
            onStartTimeChange={(value) =>
              handleInputChange({ target: { name: "start_time", value } })
            }
            onEndTimeChange={(value) =>
              handleInputChange({ target: { name: "end_time", value } })
            }
            errors={errors.start_time || errors.end_time || errors.datetime}
            existingReservations={existingReservations}
            selectedRoomId={formData.meeting_room_id}
            availableSlots={availableSlots}
            slotsLoading={slotsLoading}
            onDateSelected={onDateSelected}
          />

          {/* Info after date selected */}
          {selectedDate && formData.meeting_room_id && (
            <div className="mt-3 p-2 bg-green-50 text-green-700 text-xs rounded border border-green-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>
                <strong>Tanggal dipilih:</strong> {new Date(selectedDate).toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <BaseFormInput
            type="text"
            name="title"
            label="Tujuan Meeting"
            required
            placeholder="e.g., Rapat Koordinasi Tahunan"
            value={formData.title}
            onChange={handleInputChange}
            inputProps={{ maxLength: 255 }}
            error={errors.title} 
          />
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <BaseFormInput
            type="textarea"
            name="description"
            label="Keterangan"
            placeholder="Tambahkan keterangan atau agenda meeting (opsional)"
            value={formData.description}
            onChange={handleInputChange}
            inputProps={{ maxLength: 255, rows: 4 }}
            error={errors.description}
          />
        </div>
      </div>
    </div>
  );
};

export default InformationForm;