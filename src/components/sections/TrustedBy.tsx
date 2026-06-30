import Container from "../common/Container";

const companies = [
  { name: "Expo 2020 Dubai", logo: "EXPO 2020" },
  { name: "Isuzu", logo: "ISUZU" },
  { name: "KW", logo: "KW" },
  { name: "Al Tayer", logo: "AL TAYER" },
  { name: "Namshi", logo: "NAMSHI" },
  { name: "Majid Al Futtaim", logo: "MAJID AL FUTTAIM" },
];

const TrustedBy = () => {
  return (
    <section className="bg-[#003580] py-8 border-t border-white/10">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <h3 className="text-white text-lg font-semibold whitespace-nowrap">
            Trusted by
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12">
            {companies.map((company, index) => (
              <div
                key={index}
                className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <span className="text-gray-300 font-semibold text-xs sm:text-sm tracking-wider">
                  {company.logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrustedBy;
