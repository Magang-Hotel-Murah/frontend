import React from "react";
import { DateTimePicker } from "@common";
import { BaseFormInput } from "@common";
import { InfoIcon } from "lucide-react";

const InformationForm = ({ rooms, formData, handleInputChange, errors }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center gap-1">
        <InfoIcon className="w-5 h-5" />
        Informasi Dasar
      </h3>

      <DateTimePicker
        startTime={formData.start_time}
        endTime={formData.end_time}
        onStartTimeChange={(value) =>
          handleInputChange({ target: { name: "start_time", value } })
        }
        onEndTimeChange={(value) =>
          handleInputChange({ target: { name: "end_time", value } })
        }
        errors={errors.start_time || errors.end_time}
      />

      <BaseFormInput
        type="select"
        name="meeting_room_id"
        label="Ruangan Meeting"
        required
        value={formData.meeting_room_id}
        onChange={handleInputChange}
        options={[
          { value: "", label: "Pilih Ruangan" },
          ...rooms.map((r) => ({ value: r.id, label: r.name })),
        ]}
        errors={errors.meeting_room_id}
      />

      <BaseFormInput
        type="text"
        name="title"
        label="Title"
        required
        placeholder="e.g., Rapat Koordinasi Tahunan"
        value={formData.title}
        onChange={handleInputChange}
        inputProps={{ maxLength: 255 }}
        errors={errors.title}
      />

      <BaseFormInput
        type="textarea"
        name="description"
        label="Keterangan"
        placeholder="Keterangan reservasi dibuat"
        value={formData.description}
        onChange={handleInputChange}
        inputProps={{ maxLength: 255 }}
        errors={errors.description}
      />
    </div>
  );
};

export default InformationForm;
