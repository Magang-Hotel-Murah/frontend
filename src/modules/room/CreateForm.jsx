import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@ui";
import { BaseFormInput } from "@common";

const CreateForm = ({
  formData,
  errors,
  loading,
  companyName,
  filteredMainRooms,
  facilityInput,
  onInputChange,
  onFacilityInputChange,
  onAddFacility,
  onRemoveFacility,
  onSubmit,
  onReset,
}) => {
  return (
    <div className="mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        {errors.submit && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <span className="text-red-700 text-sm">{errors.submit}</span>
          </div>
        )}

        <div className="mb-12 text-center">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-2 tracking-tight">
              {companyName}
            </h2>
            <div className="h-1 bg-gradient-to-r from-transparent via-primary-600 to-transparent rounded-full"></div>
          </div>
        </div>

        <form onSubmit={onSubmit}>
          <BaseFormInput
            type="select"
            name="type"
            label="Tipe Ruangan"
            value={formData.type}
            onChange={onInputChange}
            error={errors.type}
            required
            options={[
              { value: "", label: "Pilih Tipe Ruangan" },
              { value: "main", label: "Ruangan Utama" },
              { value: "sub", label: "Ruangan Sub" },
            ]}
          />

          {formData.type === "sub" && (
            <BaseFormInput
              type="select"
              name="parent_id"
              label="Ruangan Utama"
              value={formData.parent_id}
              onChange={onInputChange}
              error={errors.parent_id}
              required
              disabled={filteredMainRooms.length === 0}
              options={[
                {
                  value: "",
                  label:
                    filteredMainRooms.length === 0
                      ? "Tidak ada ruangan utama tersedia"
                      : "Pilih Ruangan Utama",
                },
                ...filteredMainRooms.map((r) => ({
                  value: r.id,
                  label: r.name,
                })),
              ]}
            />
          )}

          <BaseFormInput
            type="text"
            name="name"
            label="Nama Ruangan"
            value={formData.name}
            onChange={onInputChange}
            error={errors.name}
            required
            placeholder="Contoh: Ruang Meeting A"
            inputProps={{ maxLength: 255 }}
          />

          <BaseFormInput
            type="text"
            name="location"
            label="Lokasi"
            value={formData.location}
            onChange={onInputChange}
            error={errors.location}
            placeholder="Contoh: Lantai 2, Gedung A"
            inputProps={{ maxLength: 255 }}
          />

          <BaseFormInput
            type="number"
            name="capacity"
            label="Kapasitas"
            value={formData.capacity}
            onChange={onInputChange}
            error={errors.capacity}
            required
            placeholder="Jumlah orang"
            inputProps={{ min: 1 }}
          />

          <BaseFormInput
            type="tags"
            name="facilities"
            label="Fasilitas"
            tags={formData.facilities}
            tagInputValue={facilityInput}
            onTagInputChange={onFacilityInputChange}
            onAddTag={onAddFacility}
            onRemoveTag={onRemoveFacility}
            placeholder="Contoh: Proyektor, Whiteboard"
            inputProps={{ maxLength: 100 }}
          />

          <div className="flex gap-3 pt-4 border-t">
            <Button
              size="medium"
              variant="submit"
              type="submit"
              disabled={
                loading ||
                (formData.type === "sub" && filteredMainRooms.length === 0)
              }
            >
              {loading ? "Menyimpan..." : "Simpan Ruangan"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="medium"
              onClick={onReset}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;