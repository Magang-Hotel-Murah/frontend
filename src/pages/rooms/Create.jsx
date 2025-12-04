import React, { useState, useEffect, useMemo } from "react";
import { useGetRooms } from "@hooks/meeting-room/useGetRooms";
import { useCreateRoom } from "@hooks/meeting-room/useCreateRoom";
import { CreateForm } from "@contentroom";
import { useNavigate } from "react-router-dom";

const Create = ({ onSuccess }) => {
  const navigate = useNavigate();
  
  const { data: rooms = [], refetch, isLoading: roomsLoading } = useGetRooms();
  const createRoom = useCreateRoom();

  const [user, setUser] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    parent_id: "",
    capacity: "",
    facilities: [],
    images: [],
  });
  const [facilityInput, setFacilityInput] = useState("");
  const [errors, setErrors] = useState({});

  const loading = createRoom.isPending || roomsLoading;

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setCompanyName(parsed?.company?.name || "");
      }
    } catch (err) {
      console.error("Error loading user:", err);
    }
  }, []);

  const filteredMainRooms = useMemo(() => {
    if (!Array.isArray(rooms)) return [];
    return rooms.filter((r) => r?.type?.toLowerCase() === "main");
  }, [rooms]);

  const handleInputChange = (e, isFile = false) => {
    const { name, value } = e.target;

    if (isFile) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        [name]: filesArray,
      }));
    } else {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "type" && value === "main" ? { parent_id: "" } : {}),
      }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
    }
  };

  const handleFacilityInputChange = (e) => {
    setFacilityInput(e.target.value);
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nama ruangan wajib diisi";
    else if (formData.name.length > 255)
      newErrors.name = "Nama ruangan maksimal 255 karakter";

    if (!formData.type) newErrors.type = "Tipe ruangan wajib dipilih";

    if (formData.type === "sub" && !formData.parent_id)
      newErrors.parent_id = "Ruangan sub harus memiliki ruangan utama";

    if (formData.type === "main" && formData.parent_id)
      newErrors.parent_id = "Ruangan utama tidak boleh memiliki parent";

    if (!formData.capacity) newErrors.capacity = "Kapasitas wajib diisi";
    else if (formData.capacity < 1) newErrors.capacity = "Kapasitas minimal 1";

    if (formData.location && formData.location.length > 255)
      newErrors.location = "Lokasi maksimal 255 karakter";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("type", formData.type);
    submitData.append("location", formData.location || "");
    if (formData.parent_id) {
      submitData.append("parent_id", formData.parent_id);
    }
    submitData.append("capacity", formData.capacity);
    formData.facilities.forEach((f, i) => {
      submitData.append(`facilities[${i}]`, f);
    });
    if (formData.images.length > 0) {
      formData.images.forEach((file) => {
        submitData.append("images[]", file);
      });
    }

    try {
      await createRoom.mutateAsync(submitData);
      await refetch();

      setFormData({
        name: "",
        type: "",
        location: "",
        parent_id: "",
        capacity: "",
        facilities: [],
        images: [],
      });
      setFacilityInput("");
      setErrors({});

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("❌ Submit error:", error);
      console.error("❌ Error message:", error.message);

      setErrors({
        submit: error.message || "Terjadi kesalahan saat menyimpan data",
      });
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      type: "",
      location: "",
      parent_id: "",
      capacity: "",
      facilities: [],
    });
    setErrors({});
    setFacilityInput("");
  };

  return (
    <CreateForm
      formData={formData}
      errors={errors}
      loading={loading}
      companyName={companyName}
      filteredMainRooms={filteredMainRooms}
      facilityInput={facilityInput}
      onInputChange={handleInputChange}
      onFacilityInputChange={handleFacilityInputChange}
      onAddFacility={addFacility}
      onRemoveFacility={removeFacility}
      onSubmit={handleSubmit}
      onReset={handleReset}
    />
  );
};

export default Create;
