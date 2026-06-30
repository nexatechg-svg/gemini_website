interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`w-full px-2 sm:px-4 lg:px-8 xl:px-12 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
