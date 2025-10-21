// src/utils/formatters.js

/**
 * Format tanggal lengkap (contoh: Senin, 21 Oktober 2025, 13:45)
 * @param {string | Date} dateString
 * @returns {string}
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Format waktu singkat (contoh: 13:45)
 * @param {string | Date} dateString
 * @returns {string}
 */
export const formatTime = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export  const formatDateTimeHour = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("id-ID"),
      time: date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };
