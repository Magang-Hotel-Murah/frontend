import React, { useState } from "react";
import { Upload, X } from "lucide-react";

const ImageUploadInput = ({ 
  label = "Foto Ruangan",
  onChange,
  maxFiles = 5,
  maxSizeMB = 5,
  accept = "image/jpeg,image/png,image/jpg"
}) => {
  const [previews, setPreviews] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const handleFiles = (files) => {
    setError("");
    const fileArray = Array.from(files);
    
    if (previews.length + fileArray.length > maxFiles) {
      setError(`Maksimal ${maxFiles} foto`);
      return;
    }

    const validFiles = [];
    for (const file of fileArray) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File ${file.name} terlalu besar. Maksimal ${maxSizeMB}MB`);
        continue;
      }
      if (!accept.split(',').some(type => file.type === type.trim())) {
        setError(`Format file ${file.name} tidak didukung`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    const newPreviews = validFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36)
    }));

    const updatedPreviews = [...previews, ...newPreviews];
    setPreviews(updatedPreviews);

    if (onChange) {
      const event = {
        target: {
          name: 'images',
          files: updatedPreviews.map(p => p.file)
        }
      };
      onChange(event, true);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (id) => {
    const updatedPreviews = previews.filter(p => p.id !== id);
    setPreviews(updatedPreviews);

    if (onChange) {
      const event = {
        target: {
          name: 'images',
          files: updatedPreviews.map(p => p.file)
        }
      };
      onChange(event, true);
    }
  };

  const clearAll = () => {
    previews.forEach(preview => URL.revokeObjectURL(preview.url));
    setPreviews([]);
    setError("");
    
    if (onChange) {
      const event = {
        target: {
          name: 'images',
          files: []
        }
      };
      onChange(event, true);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        <span className="text-gray-500 text-xs ml-2">
          (Maks {maxFiles} foto, {maxSizeMB}MB per foto)
        </span>
      </label>

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-primary-400 bg-primary-50"
            : "border-gray-300 hover:border-gray-400"
        } ${previews.length >= maxFiles ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept={accept}
          onChange={handleChange}
          disabled={previews.length >= maxFiles}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold text-primary-600">Klik untuk upload</span> atau drag & drop
        </p>
        <p className="text-xs text-gray-500">
          PNG, JPG atau JPEG (maks. {maxSizeMB}MB per file)
        </p>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}

      {previews.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-700">
              {previews.length} foto dipilih
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Hapus Semua
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previews.map((preview) => (
              <div
                key={preview.id}
                className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
              >
                <img
                  src={preview.url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeImage(preview.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transform hover:scale-110"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-xs text-white truncate">
                    {(preview.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;