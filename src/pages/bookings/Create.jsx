import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateReservation } from "@hooks/reservation-meeting-room";
import { useGetPosition } from "@hooks/position";
import { useGetDivisions } from "@hooks/division";
import { useGetRooms } from "@hooks/meeting-room";
import { useListUsers } from "@hooks/user";
import { CreateForm } from "@contentbooking";

const Create = () => {
  const navigate = useNavigate("");
  const { data: room = [], isLoading: roomLoading } = useGetRooms();
  const { data: users = [], isLoading: userLoading } = useListUsers();
  const { data: position = [], isLoading: positionLoading } = useGetPosition();
  const { data: division = [], isLoading: divisionLoading } = useGetDivisions();
  const { mutateAsync: createReservation } = useCreateReservation();

  const loading =
    roomLoading || userLoading || positionLoading || divisionLoading;

  const [formData, setFormData] = useState({
    meeting_room_id: "",
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    participants: [],
    division_ids: [],
    position_ids: [],
    all_users: false,
    request: {
      funds_amount: "",
      funds_reason: "",
      snacks: [],
      equipment: [],
    },
  });

  const [errors, setErrors] = useState({});
  const [newParticipant, setNewParticipant] = useState({
    type: "user",
    user_id: "",
    name: "",
    email: "",
    whatsapp_number: "",
  });
  const [newSnack, setNewSnack] = useState("");
  const [newEquipment, setNewEquipment] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
    }
  };

  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      request: {
        ...prev.request,
        [name]: value,
      },
    }));
  };

  const addParticipant = () => {
    if (newParticipant.type === "user" && newParticipant.user_id) {
      setFormData((prev) => ({
        ...prev,
        participants: [
          ...prev.participants,
          { user_id: parseInt(newParticipant.user_id) },
        ],
      }));
    } else if (
      newParticipant.type === "guest" &&
      newParticipant.name &&
      newParticipant.email &&
      newParticipant.whatsapp_number
    ) {
      setFormData((prev) => ({
        ...prev,
        participants: [
          ...prev.participants,
          {
            name: newParticipant.name,
            email: newParticipant.email,
            whatsapp_number: newParticipant.whatsapp_number,
          },
        ],
      }));
    }
    setNewParticipant({
      type: "user",
      user_id: "",
      name: "",
      email: "",
      whatsapp_number: "",
    });
  };

  const removeParticipant = (index) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index),
    }));
  };

  const toggleDivision = (divId) => {
    setFormData((prev) => ({
      ...prev,
      division_ids: prev.division_ids.includes(divId)
        ? prev.division_ids.filter((id) => id !== divId)
        : [...prev.division_ids, divId],
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

  const addSnack = () => {
    if (newSnack.trim()) {
      setFormData((prev) => ({
        ...prev,
        request: {
          ...prev.request,
          snacks: [...prev.request.snacks, newSnack.trim()],
        },
      }));
      setNewSnack("");
    }
  };

  const removeSnack = (index) => {
    setFormData((prev) => ({
      ...prev,
      request: {
        ...prev.request,
        snacks: prev.request.snacks.filter((_, i) => i !== index),
      },
    }));
  };

  const addEquipment = () => {
    if (newEquipment.trim()) {
      setFormData((prev) => ({
        ...prev,
        request: {
          ...prev.request,
          equipment: [...prev.request.equipment, newEquipment.trim()],
        },
      }));
      setNewEquipment("");
    }
  };

  const removeEquipment = (index) => {
    setFormData((prev) => ({
      ...prev,
      request: {
        ...prev.request,
        equipment: prev.request.equipment.filter((_, i) => i !== index),
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.meeting_room_id)
      newErrors.meeting_room_id = "Ruangan wajib dipilih";

    if (!formData.title.trim()) newErrors.title = "Title wajib diisi";
    else if (formData.title.length > 255)
      newErrors.title = "Title maksimal 255 karakter";

    if (!formData.description.trim())
      newErrors.description = "Deskripsi wajib diisi";
    else if (formData.description.length > 255)
      newErrors.description = "Deskripsi maksimal 255 karakter";

    if (!formData.start_time || !formData.end_time) {
      newErrors.datetime = "Waktu mulai dan selesai wajib diisi";
    } else {
      const start = new Date(formData.start_time);
      const end = new Date(formData.end_time);

      if (end <= start) {
        newErrors.datetime = "Waktu selesai harus lebih dari waktu mulai";
      }
    }

    if (
      !formData.all_users &&
      formData.participants.length === 0 &&
      formData.division_ids.length === 0 &&
      formData.position_ids.length === 0
    ) {
      newErrors.participants = "Minimal satu peserta harus dipilih";
    }

    const { name, email, whatsapp_number } = newParticipant;
    const isManualParticipant =
      name.trim() || email.trim() || whatsapp_number.trim();

    if (isManualParticipant) {
      if (!name.trim() || !email.trim() || !whatsapp_number.trim()) {
        newErrors.newParticipant =
          "Jika ingin menambahkan peserta manual, semua kolom wajib diisi (Nama, Email, dan Nomor WhatsApp)";
      }
    }

    if (
      formData.request.funds_amount &&
      !formData.request.funds_reason.trim()
    ) {
      newErrors.funds_reason =
        "Alasan penggunaan dana wajib diisi jika dana diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const jsonData = {
        meeting_room_id: parseInt(formData.meeting_room_id),
        title: formData.title,
        description: formData.description,
        start_time: formData.start_time,
        end_time: formData.end_time,
        participants: formData.participants,
        division_ids: formData.division_ids,
        position_ids: formData.position_ids,
        all_users: formData.all_users,
        request: {
          funds_amount: parseInt(formData.request.funds_amount) || 0,
          funds_reason: formData.request.funds_reason,
          snacks: formData.request.snacks,
          equipment: formData.request.equipment,
        },
      };

      const response = await createReservation(jsonData);

      setErrors({});

      // Reset form atau redirect setelah sukses
      // navigate('/reservations'); // jika menggunakan react-router
      // atau reset form:
      // resetForm();
    } catch (error) {
      setErrors({
        submit: error.message || "Terjadi Kesalahan saat menyimpan data",
      })
    }
  };

  const handleReset = () => {
    setFormData({
      meeting_room_id: "",
      title: "",
      description: "",
      start_time: "",
      end_time: "",
      participants: [],
      division_ids: [],
      position_ids: [],
      all_users: false,
      request: {
        funds_amount: "",
        funds_reason: "",
        snacks: [],
        equipment: [],
      },
    });
    setNewParticipant({
      type: "user",
      user_id: "",
      name: "",
      email: "",
      whatsapp_number: "",
    });
    setNewEquipment("");
    setNewParticipant("");
  };

  return (
    <CreateForm
      formData={formData}
      errors={errors}
      handleInputChange={handleInputChange}
      handleRequestChange={handleRequestChange}
      addParticipant={addParticipant}
      removeParticipant={removeParticipant}
      newParticipant={newParticipant}
      setNewParticipant={setNewParticipant}
      users={users}
      toggleDivision={toggleDivision}
      togglePosition={togglePosition}
      addSnack={addSnack}
      removeSnack={removeSnack}
      newSnack={newSnack}
      setNewSnack={setNewSnack}
      addEquipment={addEquipment}
      removeEquipment={removeEquipment}
      newEquipment={newEquipment}
      setNewEquipment={setNewEquipment}
      handleSubmit={handleSubmit}
      divisions={division}
      positions={position}
      rooms={room}
      loading={loading}
      onReset={handleReset}
    />
  );
};

export default Create;
