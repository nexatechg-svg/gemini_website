import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

const WhatsAppFAB = () => {
  const [isHovered, setIsHovered] = useState(false);

  const openWhatsApp = () => {
    window.open("https://wa.me/918590899899", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-3 left-3 sm:bottom-6 sm:left-6 z-[100]">
      <div
        className="relative flex items-center group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover Text Label */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute left-full ml-4 px-4 py-2 bg-[#25D366] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-lg shadow-xl whitespace-nowrap hidden md:block pointer-events-none"
            >
              Chat on WhatsApp
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#25D366] rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB Circle */}
        <motion.button
          onClick={openWhatsApp}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 sm:p-4 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 relative overflow-hidden bg-[#25D366] hover:bg-[#128C7E] animate-ripple-green"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="text-xl sm:text-2xl text-white group-hover:scale-110 transition-transform" />

          {/* Background Shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      </div>
    </div>
  );
};

export default WhatsAppFAB;
