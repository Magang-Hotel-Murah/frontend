import React from "react";
import { X } from "lucide-react";
import { Button, Card } from "@ui";

const BaseModal = ({
  isOpen,
  onClose,
  title,
  icon,
  children,
  footer,
  maxWidth = "max-w-2xl",
  showCloseButton = true,
  closeOnBackdropClick = true,
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div
        className="absolute inset-0 backdrop-blur-xl transition-opacity"
        onClick={handleBackdropClick}
      />

      <div className={`relative w-full ${maxWidth} shadow-lg max-h-screen overflow-y-auto`}>
        <Card className="overflow-hidden">
          <div className={`bg-white border-b border-gray-200 p-4 ${headerClassName}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {icon && <div className="text-gray-600">{icon}</div>}
                <h2 className="text-m font-bold text-gray-900">{title}</h2>
              </div>
              {showCloseButton && (
                <Button variant="ghost" size="small" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>

          <div className={`p-4 ${bodyClassName}`}>
            {children}
          </div>

          {footer && (
            <div className={`px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 ${footerClassName}`}>
              {footer}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BaseModal;