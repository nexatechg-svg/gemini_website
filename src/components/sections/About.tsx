import Container from "../common/Container";
import { useAboutManager } from "./about/AboutManager";
import { useAboutAnimations } from "./about/AboutAnimations";

const StatCard = ({
  value,
  numericValue,
  suffix,
  label,
}: {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}) => (
  <div className="relative group">
    <div className="bg-gradient-to-b from-[#0047AB] to-[#002861] p-4 xs:p-6 sm:p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,71,171,0.2)] transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,71,171,0.4)] border border-white/10 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px] relative overflow-hidden">
      <div className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1 xs:mb-2 tracking-tight group-hover:scale-110 transition-transform duration-500">
        <span className="stat-number" data-target={numericValue}>
          {value.replace(suffix, "")}
        </span>
        <span>{suffix}</span>
      </div>
      <div className="text-blue-100 text-[10px] xs:text-xs sm:text-sm lg:text-[15px] font-medium text-center leading-tight">
        {label}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-500 rounded-full"></div>
    </div>
  </div>
);

const About = () => {
  const { title, description, stats } = useAboutManager();
  const { sectionRef, statsRef, textRef } = useAboutAnimations();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-14 sm:py-18 lg:py-22 bg-[#000A16]"
    >
      <Container>
        <div ref={textRef} className="mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-center">
            {title.main}{" "}
            <span className="text-[#FF8C00]">{title.highlight}</span>
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            {description}
          </p>
        </div>

        <div
          ref={statsRef}
          className="w-full bg-[#00152F]/80 backdrop-blur-md rounded-[40px] p-6 sm:p-12 border border-white/5 shadow-2xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 xs:gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              // Check if it's the last item and we have an odd number of items
              const isLastOdd =
                index === stats.length - 1 && stats.length % 2 !== 0;

              return (
                <div
                  key={index}
                  className={`${isLastOdd ? "col-span-2 flex justify-center lg:col-span-1" : ""}`}
                >
                  <div
                    className={
                      isLastOdd
                        ? "w-[calc(50%-6px)] xs:w-[calc(50%-12px)] lg:w-full"
                        : "w-full"
                    }
                  >
                    <StatCard
                      value={stat.value}
                      numericValue={stat.numericValue}
                      suffix={stat.suffix}
                      label={stat.label}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
