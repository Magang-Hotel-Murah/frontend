import React from "react";
import { AlertCircle, Plus, X } from "lucide-react";

const BaseFormInput = ({
  type = "text",
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  options = [],
  disabled = false,
  inputProps = {},
  tags = [],
  onAddTag,
  onRemoveTag,
  tagInputValue = "",
  onTagInputChange,
  className = "",
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && type === "tags") {
      e.preventDefault();
      onAddTag?.();
    }
  };

  const baseInputClass = `w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
    error ? "border-red-500" : "border-gray-300"
  } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`;

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={baseInputClass}
            {...inputProps}
          >
            {options.map((opt, idx) => (
              <option key={idx} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "textarea":
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${baseInputClass} min-h-[100px] resize-y`}
            {...inputProps}
          />
        );

      case "tags":
        return (
          <div>
            <div className="flex gap-2 mb-3">
              <input
                value={tagInputValue}
                onChange={onTagInputChange}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                disabled={disabled}
                className={`flex-1 ${baseInputClass}`}
                {...inputProps}
              />
              <button
                type="button"
                onClick={onAddTag}
                disabled={!tagInputValue?.trim() || disabled}
                className="px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 transition"
              >
                <Plus className="w-4 h-4" /> Tambah
              </button>
            </div>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => onRemoveTag?.(index)}
                      className="hover:bg-blue-200 rounded-full p-0.5 transition"
                      disabled={disabled}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      case "number":
        return (
          <input
            type="number"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={baseInputClass}
            {...inputProps}
          />
        );

      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={baseInputClass}
            {...inputProps}
          />
        );
    }
  };

  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {renderInput()}
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

export default BaseFormInput;