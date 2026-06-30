interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
}: ButtonProps) => {
  const baseStyles =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl";

  const variantStyles = {
    primary: "bg-[#0047AB] text-white hover:bg-[#003580]",
    secondary: "bg-[#FF8C00] text-white hover:bg-[#E67E00]",
    outline:
      "border-2 border-[#0047AB] text-[#0047AB] hover:bg-[#0047AB] hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
