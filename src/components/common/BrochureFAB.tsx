import { useState, useEffect } from "react";
import { usePDF } from "@react-pdf/renderer";
import { BrochurePDF } from "./BrochurePDF";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilePdf, FaSpinner } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const PDFGenerator = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Explicitly generate the PDF instance
  const [instance, updateInstance] = usePDF({
    document: <BrochurePDF />,
  });

  // Debug Logging for PDF System
  useEffect(() => {
    if (instance.loading) {
      console.log("📄 [PDF Engine]: Building document...");
    } else if (instance.error) {
      console.error("❌ [PDF Engine] Error:", instance.error);
    } else if (instance.url) {
      console.log("✅ [PDF Engine]: Ready for download!");
    }
  }, [instance.loading, instance.error, instance.url]);

  // Refresh PDF if data changes (though it shouldn't often)
  useEffect(() => {
    updateInstance(<BrochurePDF />);
  }, [updateInstance]);

  const handleDownload = () => {
    if (instance.loading || !instance.url) {
      console.log("PDF not ready yet...");
      return;
    }

    try {
      const link = document.createElement("a");
      link.href = instance.url;
      link.download = "Gemini_Nexatech_Brochure.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      if (instance.url) window.open(instance.url, "_blank");
    }
  };

  return (
    <div
      className="relative flex items-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Text Label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-full mr-4 px-4 py-2 bg-[#013299] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-lg shadow-xl whitespace-nowrap hidden md:block pointer-events-none"
          >
            Download Profile
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#013299] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Circle */}
      <motion.button
        onClick={handleDownload}
        disabled={instance.loading}
        whileHover={!instance.loading ? { scale: 1.1 } : {}}
        whileTap={!instance.loading ? { scale: 0.95 } : {}}
        className={`p-2.5 sm:p-4 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 relative overflow-hidden ${
          instance.loading
            ? "bg-gray-800 cursor-wait"
            : "bg-[#fd8e18] hover:bg-[#013299] animate-ripple-orange"
        }`}
        aria-label="Download Profile PDF"
      >
        {instance.loading ? (
          <FaSpinner className="text-xl sm:text-2xl text-white animate-spin" />
        ) : (
          <FaFilePdf className="text-xl sm:text-2xl text-white group-hover:scale-110 transition-transform" />
        )}

        {/* Background Shine for Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </div>
  );
};

const BrochureFAB = () => {
  const location = useLocation();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") return;

    // Wait until CPU is idle or 3 seconds to avoid block during performance tests
    const delayBuild = () => setShouldLoad(true);
    let idleId: any;

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(delayBuild, {
        timeout: 3000,
      });
    } else {
      idleId = setTimeout(delayBuild, 3000);
    }

    return () => {
      if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
    };
  }, [location.pathname]);

  if (location.pathname !== "/") return null;

  if (!shouldLoad) {
    return (
      <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[100]">
        <button
          className="p-2.5 sm:p-4 rounded-full flex items-center justify-center bg-[#fd8e18] shadow-lg animate-ripple-orange cursor-wait w-10 h-10 sm:w-14 sm:h-14"
          aria-label="Preparing Profile"
        >
          <FaSpinner className="text-xl sm:text-2xl text-white animate-spin" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[100]">
      <PDFGenerator />
    </div>
  );
};

export default BrochureFAB;
