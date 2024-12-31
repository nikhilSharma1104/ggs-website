import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

interface WhatsAppWidgetProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ 
  phoneNumber,
  message = "Hello! I'm interested in knowing more about Gurukulam Global School."
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleWhatsAppClick = () => {
    // Format the phone number and message for WhatsApp API
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-16 right-0 bg-white text-gray-800 rounded-lg shadow-lg p-3 mb-2 w-64"
          >
            <button
              onClick={() => setTooltipVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={12} />
            </button>
            <p className="text-sm">Chat with us on WhatsApp for quick responses!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        className="bg-[#25D366] hover:bg-[#1da851] text-white rounded-full p-4 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp size={32} />
      </motion.button>
    </div>
  );
};

export default WhatsAppWidget;
