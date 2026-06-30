import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 1. Temporarily disable smooth scrolling on HTML element to force instant jump
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    // 2. Force scroll to top instantly (multiple methods for cross-browser safety)
    window.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
    html.scrollTo(0, 0);
    ScrollTrigger.clearScrollMemory();

    // 3. Restore scroll behavior and refresh layout helpers after content has likely rendered
    const timeoutId = setTimeout(() => {
      html.style.scrollBehavior = originalScrollBehavior;
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
      ScrollTrigger.clearScrollMemory();
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
