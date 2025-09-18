import React from 'react';

export const useAlert = () => {
  const [alerts, setAlerts] = React.useState([]);

  const showAlert = (alertConfig) => {
    const id = Date.now();
    setAlerts(prev => [...prev, { ...alertConfig, id, show: true }]);
    return id;
  };

  const closeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const closeAllAlerts = () => {
    setAlerts([]);
  };

  return {
    alerts,
    showAlert,
    closeAlert,
    closeAllAlerts,
    showSuccess: (message, options = {}) => showAlert({ type: 'success', message, ...options }),
    showError: (message, options = {}) => showAlert({ type: 'error', message, ...options }),
    showWarning: (message, options = {}) => showAlert({ type: 'warning', message, ...options }),
    showInfo: (message, options = {}) => showAlert({ type: 'info', message, ...options }),
  };
};
