import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import "./App.css";

// Lazy loaded page components
const Home = lazy(() => import("./pages/Home"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const IndustryDetail = lazy(() => import("./pages/IndustryDetail"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const VideoLibraryPage = lazy(() => import("./pages/VideoLibraryPage"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));

import ScrollToTop from "./components/common/ScrollToTop";
import BrochureFAB from "./components/common/BrochureFAB";
import WhatsAppFAB from "./components/common/WhatsAppFAB";

// Sleek loading fallback spinner
const PageLoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-t-orange-500 border-r-orange-500 rounded-full animate-spin"></div>
    </div>
    <p className="text-sm font-medium text-gray-500 animate-pulse">Loading NexaTech Experience...</p>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <BrochureFAB />
        <WhatsAppFAB />
        <div className="min-h-screen flex flex-col justify-between">
          <div>
            <Navbar />
            <main>
              <Suspense fallback={<PageLoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services/:id" element={<ServiceDetail />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/industries/:id" element={<IndustryDetail />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/video-library" element={<VideoLibraryPage />} />
                  <Route path="/blogs" element={<BlogsPage />} />
                </Routes>
              </Suspense>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
