import Container from "../common/Container";
import { useContactManager } from "./contact/ContactManager";
import { useContactAnimations } from "./contact/ContactAnimations";

const Contact = () => {
  const { formData, contactInfo, labels, updateField, handleSubmit } =
    useContactManager();
  const { containerRef } = useContactAnimations();

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#011C3D] to-[#000510] border-t border-white/10"
    >
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Get In <span className="text-[#FF8C00]">Touch</span>
          </h2>
          <p className="text-gray-200 text-base sm:text-lg max-w-3xl mx-auto">
            Let's discuss how we can help transform your business
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white font-semibold mb-2"
                >
                  {labels.name}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF8C00] transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white font-semibold mb-2"
                >
                  {labels.email}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF8C00] transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white font-semibold mb-2"
                >
                  {labels.message}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF8C00] transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 text-white font-semibold py-4 px-8 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                {labels.button}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-start">
                  <item.icon className="text-[#FF8C00] text-2xl mt-1 mr-4" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
