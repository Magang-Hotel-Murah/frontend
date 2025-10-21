import React, { useState, useEffect } from "react";
import { AlertCircle, Plus, X } from "lucide-react";
import { Button } from '@ui'; 

const Create = ({ onSubmit, companies = [], mainRooms = [] }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    parent_id: "",
    capacity: "",
    company_id: "",
    facilities: [],
  });

  const [facilityInput, setFacilityInput] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [filteredMainRooms, setFilteredMainRooms] = useState([]);

  useEffect(() => {
    if (formData.company_id && formData.type === "sub") {
      const filtered = mainRooms.filter(
        (room) =>
          room.company_id === parseInt(formData.company_id) &&
          room.type === "main"
      );
      setFilteredMainRooms(filtered);

      if (filtered.length === 0) {
        setFormData((prev) => ({ ...prev, parent_id: "" }));
      }
    }
  }, [formData.company_id, formData.type, mainRooms]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "type" && value === "main") {
      setFormData((prev) => ({ ...prev, parent_id: "" }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const addFacility = () => {
    if (facilityInput.trim() && facilityInput.length <= 100) {
      setFormData((prev) => ({
        ...prev,
        facilities: [...prev.facilities, facilityInput.trim()],
      }));
      setFacilityInput("");
    }
  };

  const removeFacility = (index) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFacility();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama ruangan wajib diisi";
    } else if (formData.name.length > 255) {
      newErrors.name = "Nama ruangan maksimal 255 karakter";
    }

    if (!formData.type) {
      newErrors.type = "Tipe ruangan wajib dipilih";
    }

    if (formData.type === "sub" && !formData.parent_id) {
      newErrors.parent_id = "Ruangan sub harus memiliki ruangan utama";
    }

    if (formData.type === "main" && formData.parent_id) {
      newErrors.parent_id = "Ruangan utama tidak boleh memiliki parent";
    }

    if (!formData.capacity) {
      newErrors.capacity = "Kapasitas wajib diisi";
    } else if (formData.capacity < 1) {
      newErrors.capacity = "Kapasitas minimal 1";
    }

    if (formData.location && formData.location.length > 255) {
      newErrors.location = "Lokasi maksimal 255 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        capacity: parseInt(formData.capacity),
        parent_id: formData.parent_id ? parseInt(formData.parent_id) : null,
        company_id: formData.company_id ? parseInt(formData.company_id) : null,
      };

      Object.keys(submitData).forEach((key) => {
        if (submitData[key] === "" || submitData[key] === null) {
          delete submitData[key];
        }
      });

      await onSubmit(submitData);

      setFormData({
        name: "",
        type: "",
        location: "",
        parent_id: "",
        capacity: "",
        company_id: "",
        facilities: [],
      });
      setErrors({});
    } catch (error) {
      setErrors({
        submit: error.message || "Terjadi kesalahan saat menyimpan data",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        {errors.submit && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <span className="text-red-700 text-sm">{errors.submit}</span>
          </div>
        )}

        {companies.length > 0 && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Perusahaan
            </label>
            <select
              name="company_id"
              value={formData.company_id}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Pilih Perusahaan (Opsional)</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipe Ruangan <span className="text-red-500">*</span>
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              errors.type ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Pilih Tipe Ruangan</option>
            <option value="main">Ruangan Utama</option>
            <option value="sub">Ruangan Sub</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-500">{errors.type}</p>
          )}
        </div>

        {formData.type === "sub" && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ruangan Utama <span className="text-red-500">*</span>
            </label>
            <select
              name="parent_id"
              value={formData.parent_id}
              onChange={handleInputChange}
              disabled={filteredMainRooms.length === 0}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed ${
                errors.parent_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">
                {filteredMainRooms.length === 0
                  ? "Tidak ada ruangan utama tersedia"
                  : "Pilih Ruangan Utama"}
              </option>
              {filteredMainRooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
            {filteredMainRooms.length === 0 && formData.type === "sub" && (
              <p className="mt-1 text-sm text-amber-600">
                Perusahaan ini belum memiliki ruangan utama. Buat ruangan utama
                terlebih dahulu.
              </p>
            )}
            {errors.parent_id && (
              <p className="mt-1 text-sm text-red-500">{errors.parent_id}</p>
            )}
          </div>
        )}

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Ruangan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Contoh: Ruang Meeting A"
            maxLength={255}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lokasi
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Contoh: Lantai 2, Gedung A"
            maxLength={255}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-500">{errors.location}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kapasitas <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            placeholder="Jumlah orang"
            min="1"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              errors.capacity ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.capacity && (
            <p className="mt-1 text-sm text-red-500">{errors.capacity}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fasilitas
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={facilityInput}
              onChange={(e) => setFacilityInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Contoh: Proyektor, Whiteboard"
              maxLength={100}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <Button
            variant="tambah"
              type="button"
              onClick={addFacility}
              disabled={!facilityInput.trim()}
            >
              <Plus className="w-4 h-4" />
              Tambah
            </Button>
          </div>
          {formData.facilities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.facilities.map((facility, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm"
                >
                  {facility}
                  <button
                    type="button"
                    onClick={() => removeFacility(index)}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            size="medium"
            variant="submit"
            type="button"
            onClick={handleSubmit}
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
            onClick={() => {
              setFormData({
                name: "",
                type: "",
                location: "",
                parent_id: "",
                capacity: "",
                company_id: "",
                facilities: [],
              });
              setErrors({});
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;
