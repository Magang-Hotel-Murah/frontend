import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRooms } from "@hooks/meeting-room/useGetRooms";
import { useGetRoomById } from "@hooks/meeting-room/useGetRoomById";
import { useUpdateRoom } from "@hooks/meeting-room/useUpdateRoom";
import { UpdateForm } from "@contentroom";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: rooms = [], isLoading: roomsLoading } = useGetRooms();
  const { data: roomData, isLoading: roomLoading } = useGetRoomById(id);
  const updateRoom = useUpdateRoom();

  const [user, setUser] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    parent_id: "",
    capacity: "",
    facilities: [],
    
  });
  const [facilityInput, setFacilityInput] = useState("");
  const [errors, setErrors] = useState({});

  const loading = updateRoom.isPending || roomsLoading || roomLoading;

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

  useEffect(() => {
    if (roomData) {
      setFormData({
        name: roomData.name || "",
        type: roomData.type || "",
        location: roomData.location || "",
        parent_id: roomData.parent_id || "",
        capacity: roomData.capacity || "",
        facilities: roomData.facilities || [],
      });
    }
  }, [roomData]);

  const filteredMainRooms = useMemo(() => {
    if (!Array.isArray(rooms)) return [];
    return rooms.filter(
      (r) => r?.type?.toLowerCase() === "main" && r.id !== Number(id)
    );
  }, [rooms, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && value === "main" ? { parent_id: "" } : {}),
    }));

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
    else if (formData.capacity < 1)
      newErrors.capacity = "Kapasitas minimal 1";

    if (formData.location && formData.location.length > 255)
      newErrors.location = "Lokasi maksimal 255 karakter";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = {
      ...formData,
      capacity: parseInt(formData.capacity),
      parent_id: formData.parent_id ? parseInt(formData.parent_id) : null,
      facilities: formData.facilities.length > 0 ? formData.facilities : [],
    };

    Object.keys(submitData).forEach((key) => {
      if (
        submitData[key] === "" ||
        (submitData[key] === null && key !== "parent_id")
      ) {
        delete submitData[key];
      }
    });

    try {
      await updateRoom.mutateAsync({ id, updatedData: submitData });
      navigate("/room");
    } catch (error) {
      setErrors({
        submit: error.message || "Terjadi kesalahan saat mengupdate data",
      });
    }
  };

  const handleCancel = () => {
    navigate("/room");
  };

  return (
    <UpdateForm
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
      onCancel={handleCancel}
    />
  );
};

export default Update;