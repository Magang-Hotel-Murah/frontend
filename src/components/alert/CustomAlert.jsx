import React from 'react';
import {
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Info,
  X,
  Trash2,
  Download,
  Upload,
  Save,
  Mail,
  Bell,
  Settings
} from 'lucide-react';

const BaseAlert = ({ 
  show, 
  onClose, 
  children, 
  showCloseButton = true, 
  backdropBlur = true,
  size = 'md',
  animation = 'scale',
  position = 'center'
}) => {
  if (!show) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-2xl'
  };

  const animationClasses = {
    scale: 'animate-scale-in',
    slide: 'animate-slide-in',
    fade: 'animate-fade-in',
    bounce: 'animate-bounce-in'
  };

  const positionClasses = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-16',
    bottom: 'items-end justify-center pb-16'
  };

  return (
    <div className={`fixed inset-0 ${backdropBlur ? 'backdrop-blur-xl bg-white/10' : 'bg-black/50'} flex ${positionClasses[position]} p-4 z-50`}>
      <div className={`bg-white rounded-2xl shadow-2xl ${sizeClasses[size]} w-full mx-4 transform transition-all duration-300 ${animationClasses[animation]}`}>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export const SuccessAlert = ({ 
  show, 
  onClose, 
  title = "Berhasil!", 
  message, 
  buttonText = "OK",
  showIcon = true,
  customIcon = null
}) => (
  <BaseAlert show={show} onClose={onClose}>
    <div className="p-6 text-center">
      {showIcon && (
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          {customIcon || <CheckCircle className="h-8 w-8 text-green-600" />}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
      >
        {buttonText}
      </button>
    </div>
  </BaseAlert>
);

export const ErrorAlert = ({ 
  show, 
  onClose, 
  title = "Error!", 
  message, 
  buttonText = "Coba Lagi",
  showIcon = true 
}) => (
  <BaseAlert show={show} onClose={onClose}>
    <div className="p-6 text-center">
      {showIcon && (
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
      >
        {buttonText}
      </button>
    </div>
  </BaseAlert>
);

export const WarningAlert = ({ 
  show, 
  onClose, 
  title = "Peringatan!", 
  message, 
  buttonText = "Mengerti",
  showIcon = true 
}) => (
  <BaseAlert show={show} onClose={onClose}>
    <div className="p-6 text-center">
      {showIcon && (
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
          <AlertTriangle className="h-8 w-8 text-yellow-600" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors duration-200 font-medium"
      >
        {buttonText}
      </button>
    </div>
  </BaseAlert>
);

export const InfoAlert = ({ 
  show, 
  onClose, 
  title = "Informasi", 
  message, 
  buttonText = "OK",
  showIcon = true 
}) => (
  <BaseAlert show={show} onClose={onClose}>
    <div className="p-6 text-center">
      {showIcon && (
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
          <Info className="h-8 w-8 text-blue-600" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        {buttonText}
      </button>
    </div>
  </BaseAlert>
);

export const ConfirmationAlert = ({ 
  show, 
  onClose, 
  onConfirm,
  title = "Konfirmasi", 
  message, 
  confirmText = "Ya",
  cancelText = "Batal",
  confirmColor = "red",
  showIcon = true,
  isLoading = false
}) => {
  const colorClasses = {
    red: 'bg-red-600 hover:bg-red-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    yellow: 'bg-yellow-600 hover:bg-yellow-700'
  };

  return (
    <BaseAlert show={show} onClose={onClose} showCloseButton={false}>
      <div className="p-6 text-center">
        {showIcon && (
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 ${colorClasses[confirmColor]} text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50 flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Memproses...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </BaseAlert>
  );
};

export const LoadingAlert = ({ 
  show, 
  title = "Memproses...", 
  message = "Mohon tunggu sebentar" 
}) => (
  <BaseAlert show={show} onClose={() => {}} showCloseButton={false} backdropBlur={true}>
    <div className="p-6 text-center">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  </BaseAlert>
);

export const ActionAlert = ({ 
  show, 
  onClose, 
  title, 
  message, 
  actions = [],
  icon = null,
  iconBgColor = 'bg-blue-100',
  size = 'md'
}) => (
  <BaseAlert show={show} onClose={onClose} size={size}>
    <div className="p-6 text-center">
      {icon && (
        <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${iconBgColor} mb-4`}>
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{message}</p>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`w-full py-3 px-4 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center ${action.className || 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  </BaseAlert>
);

export const ToastAlert = ({ 
  show, 
  onClose, 
  message, 
  type = 'info',
  position = 'top-right',
  duration = 3000
}) => {
  React.useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white'
  };

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 animate-slide-in-right`}>
      <div className={`${typeClasses[type]} px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 min-w-64 max-w-sm`}>
        {icons[type]}
        <span className="text-sm font-medium flex-1">{message}</span>
        <button onClick={onClose} className="ml-2 hover:bg-white/20 rounded p-1">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export const AlertStyles = () => (
  <style>{`
    @keyframes scale-in {
      0% {
        transform: scale(0.8);
        opacity: 0;
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    @keyframes slide-in {
      0% {
        transform: translateY(-100%);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes slide-in-right {
      0% {
        transform: translateX(100%);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes bounce-in {
      0% {
        transform: scale(0.3);
        opacity: 0;
      }
      50% {
        transform: scale(1.2);
      }
      70% {
        transform: scale(0.9);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .animate-scale-in {
      animation: scale-in 0.3s ease-out;
    }

    .animate-slide-in {
      animation: slide-in 0.3s ease-out;
    }

    .animate-slide-in-right {
      animation: slide-in-right 0.3s ease-out;
    }

    .animate-fade-in {
      animation: fade-in 0.3s ease-out;
    }

    .animate-bounce-in {
      animation: bounce-in 0.5s ease-out;
    }
  `}</style>
);

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

export default {
  SuccessAlert,
  ErrorAlert,
  WarningAlert,
  InfoAlert,
  ConfirmationAlert,
  LoadingAlert,
  ActionAlert,
  ToastAlert,
  AlertStyles,
  useAlert
};