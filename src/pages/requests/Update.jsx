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
    images: [],
    images_to_remove: [],
    replace_images: false,
  });
  const [facilityInput, setFacilityInput] = useState("");
  const [newImageFiles, setNewImageFiles] = useState([]);
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
        images: roomData.images || [],
        images_to_remove: [],
        replace_images: false,
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 2048 * 1024;
      
      if (!isValidType) {
        setErrors(prev => ({...prev, images: 'Format gambar harus JPG, JPEG, atau PNG'}));
        return false;
      }
      if (!isValidSize) {
        setErrors(prev => ({...prev, images: 'Ukuran gambar maksimal 2MB'}));
        return false;
      }
      return true;
    });

    setNewImageFiles(prev => [...prev, ...validFiles]);
    
    if (errors.images) {
      setErrors(prev => {
        const newErr = { ...prev };
        delete newErr.images;
        return newErr;
      });
    }
  };

  const removeExistingImage = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter(img => img !== imageUrl),
      images_to_remove: [...prev.images_to_remove, imageUrl],
    }));
  };

  const removeNewImage = (index) => {
    setNewImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleReplaceImagesToggle = (e) => {
    setFormData(prev => ({
      ...prev,
      replace_images: e.target.checked
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

    const submitData = new FormData();

    submitData.append('name', formData.name);
    submitData.append('type', formData.type);
    submitData.append('capacity', parseInt(formData.capacity));
    
    if (formData.location) {
      submitData.append('location', formData.location);
    }

    if (formData.type === 'sub' && formData.parent_id) {
      submitData.append('parent_id', parseInt(formData.parent_id));
    }

    if (formData.facilities.length > 0) {
      formData.facilities.forEach((facility, index) => {
        submitData.append(`facilities[${index}]`, facility);
      });
    }

    if (formData.images_to_remove.length > 0) {
      formData.images_to_remove.forEach((url, index) => {
        submitData.append(`images_to_remove[${index}]`, url);
      });
    }

    if (newImageFiles.length > 0) {
      newImageFiles.forEach((file) => {
        submitData.append('images[]', file);
      });
    }

    submitData.append('replace_images', formData.replace_images ? 'true' : 'false');

    try {
      await updateRoom.mutateAsync({ id, updatedData: submitData });
      navigate("/room");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Terjadi kesalahan saat mengupdate data";
      
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        const formattedErrors = {};
        
        Object.keys(backendErrors).forEach(key => {
          formattedErrors[key] = Array.isArray(backendErrors[key]) 
            ? backendErrors[key][0] 
            : backendErrors[key];
        });
        
        setErrors(formattedErrors);
      } else {
        setErrors({ submit: errorMessage });
      }
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
      newImageFiles={newImageFiles}
      onInputChange={handleInputChange}
      onFacilityInputChange={handleFacilityInputChange}
      onAddFacility={addFacility}
      onRemoveFacility={removeFacility}
      onImageUpload={handleImageUpload}
      onRemoveExistingImage={removeExistingImage}
      onRemoveNewImage={removeNewImage}
      onReplaceImagesToggle={handleReplaceImagesToggle}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default Update;