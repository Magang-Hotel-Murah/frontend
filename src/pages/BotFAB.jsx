import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
// import { useGetBot } from "@hooks/bot";

const BotFAB = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  // const { data: whatsappData, isLoading } = useGetWhatsAppSupport();
  
  const [loading, setLoading] = useState(null);
  const handleWhatsAppClick = () => {
    const phone = import.meta.env.VITE_WHATSAPP_NUMBER;

    if (phone) {
      const message = encodeURIComponent(
        whatsappData.default_message || "Halo, saya butuh bantuan"
      );
      const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
      window.open(whatsappUrl, "_blank");
      setIsExpanded(false);
    }
  };

  // if (isLoading || !whatsappData?.phone_number) {
  //   return null;
  // }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Card */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 mb-2 w-72 bg-white rounded-lg shadow-2xl p-4 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Customer Support</h4>
                <p className="text-xs text-green-600">● Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">
            {whatsappData.description || "Kami siap membantu Anda. Klik tombol di bawah untuk chat via WhatsApp."}
          </p>
          
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Mulai Chat</span>
          </button>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`group relative flex items-center justify-center w-14 h-14 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
          isExpanded ? "bg-gray-500 hover:bg-gray-600" : "bg-green-500 hover:bg-green-600"
        }`}
        aria-label="WhatsApp Support"
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-25 group-hover:animate-ping"></span>
      </button>
    </div>
  );
};

export default BotFAB;