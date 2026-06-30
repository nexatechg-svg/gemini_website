import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMessage,
  FaChevronDown,
} from "react-icons/fa6";

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const countries = [
  { name: "United Arab Emirates", code: "+971", iso: "ae", digits: 9 },
  { name: "India", code: "+91", iso: "in", digits: 10 },
  { name: "United States", code: "+1", iso: "us", digits: 10 },
  { name: "United Kingdom", code: "+44", iso: "gb", digits: 10 },
  { name: "Saudi Arabia", code: "+966", iso: "sa", digits: 9 },
];

const ScheduleCallModal = ({ isOpen, onClose }: ScheduleCallModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requirements: "",
  });
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset after animation
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", requirements: "" });
        setErrors({});
      }, 300);
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Name validation: alphabets only
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s.]+$/.test(formData.name)) {
      newErrors.name = "Only alphabets, spaces and dots allowed";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation: numbers only, check length based on country
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Numbers only";
    } else if (formData.phone.length !== selectedCountry.digits) {
      newErrors.phone = `Must be ${selectedCountry.digits} digits`;
    }

    if (!formData.requirements) {
      newErrors.requirements = "Please enter your requirements";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      // In a real app, you'd send data to server here
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-[#001024]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[98vh] sm:max-h-[93vh]"
          >
            {/* Header - Fixed */}
            <div className="relative p-6 sm:p-8 border-b border-white/5 bg-[#001024]/80 backdrop-blur-md z-30">
              <button
                onClick={onClose}
                className="absolute text-white cursor-pointer rounded-full p-2 hover:rounded-full hover:bg-[#FF8C00] top-6 right-6 hover:text-white transition-colors z-20 group"
              >
                <div className="hover:rotate-180 transition-transform duration-500">
                  <IoClose size={28} />
                </div>
              </button>

              <div className="pr-12">
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight uppercase">
                  Schedule <span className="text-gemini-orange">a Call</span>
                </h2>
                <p className="text-gray-400 text-sm font-medium">
                  Expert guidance is just a message away.
                </p>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 bg-transparent">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs mb-2 font-black uppercase tracking-[0.2em] text-gray-300 ml-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gemini-blue" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`w-full bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"} rounded-2xl py-3.5 sm:py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gemini-blue transition-all placeholder:text-gray-500 text-sm`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-wider ml-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs mb-2 font-black uppercase tracking-[0.2em] text-gray-300 ml-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gemini-blue" />
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"} rounded-2xl py-3.5 sm:py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gemini-blue transition-all placeholder:text-gray-500 text-sm`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-wider ml-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Input with Country Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs mb-2 font-black uppercase tracking-[0.2em] text-gray-300 ml-1">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <div className="relative">
                        <div
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="bg-white/5 border border-white/10 rounded-2xl px-3 py-3.5 sm:py-4 flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors"
                        >
                          <div className="w-6 h-3.5 overflow-hidden rounded-sm bg-white/10">
                            <img
                              src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                              alt={selectedCountry.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-white font-bold text-sm">
                            {selectedCountry.code}
                          </span>
                          <FaChevronDown
                            size={10}
                            className="text-gemini-orange"
                          />
                        </div>
                        {isDropdownOpen && (
                          <div className="absolute top-full left-0 mt-2 bg-[#001D3D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 min-w-[260px]">
                            {countries.map((c) => (
                              <div
                                key={c.code}
                                onClick={() => {
                                  setSelectedCountry(c);
                                  setIsDropdownOpen(false);
                                }}
                                className="px-4 py-3 hover:bg-gray-800 cursor-pointer flex items-center gap-2 border-b border-white/5 last:border-0 transition-colors"
                              >
                                <div className="w-6 h-4 overflow-hidden rounded-sm bg-white/10 shrink-0">
                                  <img
                                    src={`https://flagcdn.com/w40/${c.iso}.png`}
                                    alt={c.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-white text-sm font-bold">
                                    {c.name}
                                  </span>
                                  <span className="text-gemini-blue text-sm font-black italic">
                                    {c.code}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="relative flex-1">
                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gemini-blue" />
                        <input
                          type="tel"
                          placeholder="Numbers only"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          className={`w-full bg-white/5 border ${errors.phone ? "border-red-500" : "border-white/10"} rounded-2xl py-3.5 sm:py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gemini-blue transition-all placeholder:text-gray-500 text-sm`}
                        />
                      </div>
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-wider ml-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Requirements Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs mb-2 font-black uppercase tracking-[0.2em] text-gray-300 ml-1">
                      Project Requirements
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-5">
                        <FaMessage className="text-gemini-blue" />
                      </div>
                      <textarea
                        rows={3}
                        placeholder="Tell us about what you need..."
                        value={formData.requirements}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            requirements: e.target.value,
                          })
                        }
                        className={`w-full bg-white/5 border ${errors.requirements ? "border-red-500" : "border-white/10"} rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gemini-blue transition-all placeholder:text-gray-500 text-sm resize-none`}
                      />
                    </div>
                    {errors.requirements && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-wider ml-1">
                        {errors.requirements}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gemini-blue to-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-900/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all transform active:scale-[0.98] uppercase tracking-[0.3em] text-xs"
                  >
                    Send Message
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="mb-8 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gemini-blue/20 blur-2xl rounded-full" />
                      <h1 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 leading-tight tracking-tighter">
                        THANK YOU
                      </h1>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                    Expert response in{" "}
                    <span className="text-gemini-blue">5 minutes!</span>
                  </h3>
                  <p className="text-gray-400 text-sm mb-10 max-w-xs mx-auto italic font-medium">
                    Speed. Innovation. Precision. <br />
                    We're already reviewing your request.
                  </p>

                  <div className="bg-gemini-blue/10 border border-gemini-blue/20 p-6 rounded-2xl relative overflow-hidden group mb-4">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gemini-blue group-hover:w-full transition-all duration-500 ease-in-out -z-10 opacity-30" />
                    <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px] relative z-10">
                      Check your phone & email shortly.
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className="mt-6 text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-[0.3em]"
                  >
                    Close Window
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ScheduleCallModal;
