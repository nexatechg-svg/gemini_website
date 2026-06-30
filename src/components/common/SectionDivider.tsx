import { motion } from "framer-motion";

const SectionDivider = ({
  direction = "right",
  colorType = "mix",
}: {
  direction?: "left" | "right" | "both";
  colorType?: "blue" | "orange" | "mix";
}) => {
  const getGradient = () => {
    switch (colorType) {
      case "blue":
        return "from-transparent via-gemini-blue to-transparent";
      case "orange":
        return "from-transparent via-gemini-orange to-transparent";
      default:
        return "from-transparent via-gemini-blue via-gemini-orange to-transparent";
    }
  };

  const getAnimation = () => {
    switch (direction) {
      case "left":
        return "animate-glow-line reverse";
      case "both":
        return "animate-scanner";
      default:
        return "animate-glow-line";
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="relative w-full h-px bg-white/5 overflow-hidden rounded-full">
        {/* LED Flash Light Animation */}
        <motion.div
          className={`absolute top-0 w-1/3 h-full bg-gradient-to-r ${getGradient()} blur-sm ${getAnimation()}`}
          style={{ animationDuration: "3s" }}
        />
        {/* Secondary sharper line for core glow */}
        <motion.div
          className={`absolute top-0 w-1/4 h-full bg-gradient-to-r ${getGradient()} ${getAnimation()}`}
          style={{ animationDuration: "3s" }}
        />
      </div>
    </div>
  );
};

export default SectionDivider;
