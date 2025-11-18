import React from "react";
import { AlertCircle, Briefcase } from "lucide-react";
import { Button } from "@ui";
import { BaseFormInput } from "@common";

const CreateForm = ({
  formData,
  errors,
  loading,
  onSubmit,
  positions,
  onAddNewPosition,
  onNewPositionInput,
  onRemoveNewPosition,
  newPositionInput,
  onInputChange,
  togglePosition,
  onReset,
}) => {
  const isDisabled = loading;
  return (
    <div className="mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        {errors.submit && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <span className="text-red-700 text-sm">{errors.submit}</span>
          </div>
        )}

        <form onSubmit={onSubmit}>
          <BaseFormInput
            type="text"
            name="name"
            label="Nama Divisi"
            value={formData.name}
            onChange={onInputChange}
            error={errors.name}
            required
            placeholder="Nama Divisi"
            inputProps={{ maxLength: 255 }}
          />

          <div className="mx-auto">
            <div className="mb-2">
              <h3 className="block text-sm font-medium text-gray-700 mb-3">
                Plih Posisi
              </h3>
            </div>
            <div className="p-6 space-y-2 max-h-96 overflow-y-auto mb-3">
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

          <BaseFormInput
            type="tags"
            name="new_positions"
            label="Buat Posisi Baru"
            tags={formData.new_positions}
            tagInputValue={newPositionInput}
            onTagInputChange={onNewPositionInput}
            onAddTag={onAddNewPosition}
            onRemoveTag={onRemoveNewPosition}
            placeholder="Buat posisi baru jika posisi yang diinginkan tidak ada"
            inputProps={{ maxLength: 100 }}
          />

          <div className="flex gap-3 pt-4 border-t">
            <Button
              size="medium"
              variant="submit"
              type="submit"
              disabed={isDisabled}
            >
              {loading ? "Menyimpan..." : "Simpan Divisi"}
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
