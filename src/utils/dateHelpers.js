export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString('id-ID'),
    time: date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  };
};

export const formatDateTimeLocal = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
};

export const isValidTimeRange = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const now = new Date();
  
  return start > now && end > start;
};