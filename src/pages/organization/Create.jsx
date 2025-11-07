import React, { useState, useEffect, useMemo, use } from "react";
import { useGetPosition } from "@hooks/position";
import { useCreateDivision } from "@hooks/division";
import { CreateForm } from "@contentorganization";

const Create = () => {
  const {
    data: position = [],
    refetch,
    isLoading: positionLoading,
  } = useGetPosition();
  const createDivision = useCreateDivision();
  const [formData, setFormData] = useState({
    name: "",
    position_ids: [],
    new_positions: [],
  });
  const [newPositionInput, setNewPositionInput] = useState("");
  const [errors, setErrors] = useState({});

  const loading = createDivision.isPending || positionLoading;

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type"),
    }));
  };

  const handleNewPositionInputChange = (e) => {
    setNewPositionInput(e.target.value);
  };

  const addNewPosition = () => {
    if (!newPositionInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      new_positions: [...prev.new_positions, newPositionInput.trim()],
    }));
    setNewPositionInput("");
  };

  const removeNewPosition = (index) => {
    setFormData((prev) => ({
      ...prev,
      new_positions: prev.new_positions.filter((_, i) => i !== index),
    }));
  };

  const togglePosition = (posId) => {
    setFormData((prev) => ({
      ...prev,
      position_ids: prev.position_ids.includes(posId)
        ? prev.position_ids.filter((id) => id !== posId)
        : [...prev.position_ids, posId],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nama divisi wajib diisi";
    else if (formData.name.length > 255)
      newErrors.name = "Nama divisi maksimal 255 karakter";

    if (formData.position_ids.length === 0)
      newErrors.position_ids = "Minimal satu posisi harus dipilih";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const submitData = { ...formData };
    try {
      await createDivision.mutateAsync(submitData);
      await refetch();

      setFormData({
        name: "",
        position_ids: [],
        new_positions: [],
      });
      setNewPositionInput("");
      setErrors({});
    } catch (error) {
      setErrors({
        submit: error.message || "Terjadi kesalahan saat menyimpan data",
      });
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      position_ids: [],
      new_positions: [],
    });
    setNewPositionInput("");
  };

  return (
    <CreateForm
      formData={formData}
      errors={errors}
      loading={loading}
      positions={position}
      onInputChange={handleInputChange}
      newPositionInput={newPositionInput}
      onAddNewPosition={addNewPosition}
      onNewPositionInput={handleNewPositionInputChange}
      onRemoveNewPosition={removeNewPosition}
      onSubmit={handleSubmit}
      onReset={handleReset}
      togglePosition={togglePosition}
    />
  );
};

export default Create;
