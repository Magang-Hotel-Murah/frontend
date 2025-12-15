import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; 
import {
  useCreateReservation,
  useGetReservations,
} from "@hooks/reservation-meeting-room";
import { useGetPosition } from "@hooks/position";
import { useGetDivisions } from "@hooks/division";
import { useGetRooms } from "@hooks/meeting-room";
import { useGetAvailableSlots } from "@hooks/meeting-room";
import { useListUsers } from "@hooks/user";
import { CreateForm } from "@contentbooking";

const Create = () => {
  const navigate = useNavigate();
  const { data: room = [], isLoading: roomLoading } = useGetRooms();
  const { data: users = [], isLoading: userLoading } = useListUsers();
  const { data: position = [], isLoading: positionLoading } = useGetPosition();
  const { data: division = [], isLoading: divisionLoading } = useGetDivisions();
  const { mutateAsync: createReservation } = useCreateReservation();

  const loading =
    roomLoading || userLoading || positionLoading || divisionLoading;

  const {
    fetchAvailableSlots,
    loading: slotsLoading,
    error: slotsError,
  } = useGetAvailableSlots();

  const [availableSlots, setAvailableSlots] = useState([]);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  
  const fetchSlotsRef = useRef(fetchAvailableSlots);
  
  useEffect(() => {
    fetchSlotsRef.current = fetchAvailableSlots;
  }, [fetchAvailableSlots]);

  const [formData, setFormData] = useState({
    meeting_room_id: "",
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    time_slot: "",
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

  const {
    data: reservationResponse,
    isLoading: reservationsLoading,
    refetch: refetchReservations,
  } = useGetReservations(
    formData.meeting_room_id
      ? { meeting_room_id: formData.meeting_room_id }
      : {},
    { enabled: !!formData.meeting_room_id }
  );

  const existingReservations = reservationResponse?.data ?? [];

  useEffect(() => {
    const bookingData = localStorage.getItem("bookingData");
    if (!bookingData) return;

    try {
      const data = JSON.parse(bookingData);
      const toDateTimeLocal = (date, time) =>
        date && time ? `${date}T${time}` : "";

      setFormData(prev => ({
        ...prev,
        meeting_room_id: data.meeting_room_id || "",
        start_time: toDateTimeLocal(data.date, data.start_time),
        end_time: toDateTimeLocal(data.date, data.end_time),
        time_slot: data.time_slot || "",
      }));

      localStorage.removeItem("bookingData");
    } catch (error) {
      console.error("Error parsing booking data:", error);
      localStorage.removeItem("bookingData");
    }
  }, []);

  useEffect(() => {
    if (formData.meeting_room_id) {
      refetchReservations();
    }
  }, [formData.meeting_room_id, refetchReservations]);

  useEffect(() => {
    if (!formData.meeting_room_id || !formData.start_time) {
      setAvailableSlots([]);
      return;
    }

    const dateMatch = formData.start_time.match(/^(\d{4}-\d{2}-\d{2})/);
    if (!dateMatch) {
      setAvailableSlots([]);
      return;
    }

    const date = dateMatch[1];
    const params = {
      room_id: Number(formData.meeting_room_id),
      date,
      participants_count: 1,
    };

    fetchSlotsRef.current(params)
      .then(res => {
        if (res?.success && Array.isArray(res.data)) {
          setAvailableSlots(res.data);
        } else {
          setAvailableSlots([]);
        }
      })
      .catch(() => {
        setAvailableSlots([]);
      });
  }, [formData.meeting_room_id, formData.start_time]);

  const handleDateSelected = useCallback((selectedDate) => {
    if (!formData.meeting_room_id || !selectedDate) {
      setAvailableSlots([]);
      return;
    }

    const params = {
      room_id: Number(formData.meeting_room_id),
      date:selectedDate,
      participants_count: 1,
    };

    setIsFetchingSlots(true);

    fetchSlotsRef.current(params)
      .then(res => {
        if (res?.success && Array.isArray(res.data)) {
          setAvailableSlots(res.data);
        } else {
          setAvailableSlots([]);
        }
      })
      .catch(() => {
        setAvailableSlots([]);
      })
      .finally(() => {
        setIsFetchingSlots(false);
      });
  }, [formData.meeting_room_id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "all_users") {
      if (checked) {
        const selectedRoom = room.find(r => r.id === Number(formData.meeting_room_id));
        
        if (!selectedRoom) {
          toast.error("Silakan pilih ruangan terlebih dahulu");
          setErrors(prev => ({
            ...prev,
            all_users: "Silakan pilih ruangan terlebih dahulu"
          }));
          return; 
        }
        
        if (users.length > selectedRoom.capacity) {
          toast.warning(`Tidak dapat mengundang semua user. Total user (${users.length}) melebihi kapasitas ruangan (${selectedRoom.capacity}).`);
          setErrors(prev => ({
            ...prev,
            all_users: `Tidak dapat mengundang semua user. Total user (${users.length}) melebihi kapasitas ruangan (${selectedRoom.capacity}).`
          }));
          return;
        }
      }
      
      setFormData((prev) => ({
        ...prev,
        all_users: checked,
      }));
      
      if (errors.all_users) {
        setErrors(prev => {
          const newErr = { ...prev };
          delete newErr.all_users;
          return newErr;
        });
      }
      return;
    }

    if (name === "meeting_room_id") {
      setAvailableSlots([]);
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        start_time: "",
        end_time: "",
        time_slot: "",
        all_users: false, 
      }));
    } else if (name === "start_time") {
      setAvailableSlots([]);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
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
      const userId = parseInt(newParticipant.user_id);
      
      if (formData.participants.some(p => p.user_id === userId)) {
        toast.warning("Peserta ini sudah ditambahkan");
        setErrors(prev => ({
          ...prev,
          newParticipant: "Peserta ini sudah ditambahkan"
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        participants: [...prev.participants, { user_id: userId }],
      }));
      
      toast.success("Peserta berhasil ditambahkan");
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
      
      toast.success("Tamu berhasil ditambahkan");
    } else {
      return;
    }

    setNewParticipant({
      type: "user",
      user_id: "",
      name: "",
      email: "",
      whatsapp_number: "",
    });

    if (errors.newParticipant) {
      setErrors(prev => {
        const newErr = { ...prev };
        delete newErr.newParticipant;
        return newErr;
      });
    }
  };

  const removeParticipant = (index) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index),
    }));
    
    toast.info("Peserta berhasil dihapus");
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
      toast.success("Snack berhasil ditambahkan");
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
    toast.info("Snack berhasil dihapus");
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
      toast.success("Peralatan berhasil ditambahkan");
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
    toast.info("Peralatan berhasil dihapus");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.meeting_room_id) {
      newErrors.meeting_room_id = "Ruangan wajib dipilih";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Title wajib diisi";
    } else if (formData.title.length > 255) {
      newErrors.title = "Title maksimal 255 karakter";
    }

    if (!formData.start_time || !formData.end_time) {
      newErrors.datetime = "Waktu mulai dan selesai wajib diisi";
    } else {
      const start = new Date(formData.start_time);
      const end = new Date(formData.end_time);
      const now = new Date();

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        newErrors.datetime = "Format tanggal dan waktu tidak valid";
      } else if (start < now) {
        newErrors.datetime = "Waktu mulai tidak boleh di masa lalu";
      } else if (end <= start) {
        newErrors.datetime = "Waktu selesai harus lebih dari waktu mulai";
      } else {
        const hasConflict = existingReservations.some((reservation) => {
          const resStart = new Date(reservation.start_time);
          const resEnd = new Date(reservation.end_time);
          return start < resEnd && end > resStart;
        });

        if (hasConflict) {
          newErrors.datetime = "Waktu yang dipilih bentrok dengan reservasi lain";
        }
      }
    }

    const selectedRoom = room.find(r => r.id === Number(formData.meeting_room_id));
    
    if (selectedRoom) {
      let totalParticipants = 0;

      if (formData.all_users) {
        totalParticipants = users.length;
      } else {
        const userIdsFromParticipants = formData.participants
          .filter(p => p.user_id)
          .map(p => p.user_id);

        const userIdsFromDivisions = users
          .filter(user => formData.division_ids.includes(user.division_id))
          .map(user => user.id);

        const userIdsFromPositions = users
          .filter(user => formData.position_ids.includes(user.position_id))
          .map(user => user.id);

        const uniqueUserIds = new Set([
          ...userIdsFromParticipants,
          ...userIdsFromDivisions,
          ...userIdsFromPositions,
        ]);

        const guestCount = formData.participants.filter(p => !p.user_id).length;

        totalParticipants = uniqueUserIds.size + guestCount;
      }

      if (totalParticipants > selectedRoom.capacity) {
        newErrors.capacity =
          `Jumlah peserta (${totalParticipants}) melebihi kapasitas ruangan (${selectedRoom.capacity}).`;
      }
    }

    if (!formData.all_users) {
      if (
        formData.participants.length === 0 &&
        formData.division_ids.length === 0 &&
        formData.position_ids.length === 0
      ) {
        newErrors.participants = "Minimal satu peserta harus dipilih";
      }
    }

    const { name, email, whatsapp_number } = newParticipant;
    const isManualParticipant =
      name.trim() || email.trim() || whatsapp_number.trim();

    if (isManualParticipant) {
      if (!name.trim() || !email.trim() || !whatsapp_number.trim()) {
        newErrors.newParticipant =
          "Jika ingin menambahkan peserta manual, semua kolom wajib diisi (Nama, Email, dan Nomor WhatsApp)";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          newErrors.newParticipant = "Format email tidak valid";
        }
      }
    }

    if (formData.request.funds_amount && !formData.request.funds_reason.trim()) {
      newErrors.funds_reason =
        "Alasan penggunaan dana wajib diisi jika dana diisi";
    }

    setErrors(newErrors);

    if (newErrors.capacity) {
      toast.error(newErrors.capacity);
      return false;
    }

    if (Object.keys(newErrors).length > 0) {
      toast.error("Mohon lengkapi semua field yang diperlukan");
      return false;
    }

    return true;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return null;
    if (dateTimeString.match(/\d{2}:\d{2}:\d{2}/)) {
      return dateTimeString;
    }
    return dateTimeString + ':00';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const loadingToast = toast.loading("Menyimpan reservasi...");
    
    try {
      const jsonData = {
        meeting_room_id: Number(formData.meeting_room_id),
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        start_time: formatDateTime(formData.start_time),
        end_time: formatDateTime(formData.end_time),     
        all_users: formData.all_users,
      };

      if (!formData.all_users) {
        jsonData.participants = formData.participants;
        jsonData.division_ids = formData.division_ids;
        jsonData.position_ids = formData.position_ids;
      } else {
        jsonData.participants = [];
        jsonData.division_ids = [];
        jsonData.position_ids = [];
      }

      jsonData.request = {
        funds_amount: formData.request?.funds_amount
          ? Number(formData.request.funds_amount)
          : null,
        funds_reason: formData.request?.funds_reason?.trim() || null,
        snacks:
          formData.request?.snacks?.length > 0 ? formData.request.snacks : [],
        equipment:
          formData.request?.equipment?.length > 0
            ? formData.request.equipment
            : [],
      };

      await createReservation(jsonData);
      
      toast.update(loadingToast, {
        render: "Reservasi berhasil dibuat!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      handleReset();
      
      setTimeout(() => {
        navigate("/reservations", { 
          state: { 
            success: true, 
            message: 'Reservasi berhasil dibuat!' 
          } 
        });
      }, 1000);
      
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response?.data);
      
      let errorMessage = "Terjadi kesalahan saat menyimpan data";
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.message) {
          errorMessage = errorData.message;
        }
        else if (errorData.errors) {
          const firstError = Object.values(errorData.errors)[0];
          errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
        }
        else if (errorData.error) {
          errorMessage = errorData.error;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.update(loadingToast, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      
      setErrors({
        submit: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = useCallback(() => {
    setFormData({
      meeting_room_id: "",
      title: "",
      description: "",
      start_time: "",
      end_time: "",
      time_slot: "",
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
    setNewSnack("");
    setNewEquipment("");
    setErrors({});
    setAvailableSlots([]);
    
    toast.info("Form berhasil direset");
  }, []);

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
      loading={loading || isSubmitting} 
      onReset={handleReset}
      existingReservations={existingReservations}
      reservationsLoading={reservationsLoading}
      availableSlots={availableSlots}
      slotsLoading={isFetchingSlots || slotsLoading}
      slotsError={slotsError}
      onDateSelected={handleDateSelected}
    />
  );
};

export default Create;