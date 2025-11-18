import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@ui";
import { BaseFormInput } from "@common";

const UpdateForm = ({
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
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0-mt-0.5" />
            <span className="text-red-700 text-sm">{errors.submit}</span>
          </div>
        )}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            size="medium"
            variant="submit"
            type="submit"
            disable={loading}
          ></Button>
        </div>
      </div>
    </div>
  );
};
