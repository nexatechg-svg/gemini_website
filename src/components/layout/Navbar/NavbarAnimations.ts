import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Maps a pathname to the nav data-section that should be active
function getActiveSectionFromPath(pathname: string): string | null {
    if (pathname === "/contact") return "contact";
    if (pathname.startsWith("/services")) return "services";
    if (pathname.startsWith("/products")) return "products";
    if (pathname.startsWith("/industries")) return "industries";
    if (pathname.startsWith("/video-library") || pathname.startsWith("/blogs") || pathname.startsWith("/insights")) return "insights";
    return null;
}

export const useNavbarAnimations = (isMobileMenuOpen: boolean, pathname: string) => {
    const navRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLButtonElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!navRef.current) return;

        const links = Array.from(navRef.current.querySelectorAll(".nav-link-container"));

        // Reset all links first
        links.forEach(l => {
            l.classList.remove("is-active");
        });

        if (isMobileMenuOpen) return;

        function updateActiveLink(id: string) {
            const targetLink = navRef.current?.querySelector(`[data-section="${id}"]`) as HTMLElement;
            if (targetLink) {
                links.forEach(l => l.classList.remove("is-active"));
                const container = targetLink.closest(".nav-link-container") as HTMLElement;
                if (container) container.classList.add("is-active");
            }
        }

        // On sub-pages: kill ALL stale scroll triggers first, then set active by path
        if (pathname !== "/") {
            ScrollTrigger.getAll().forEach(t => t.kill());

            const activeSection = getActiveSectionFromPath(pathname);
            if (activeSection) {
                updateActiveLink(activeSection);
            }
            return;
        }

        // On Home page: use scroll-based active tracking
        const sections = ["about", "services", "products", "industries", "insights"];
        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                ScrollTrigger.create({
                    trigger: element,
                    start: "top center+=100",
                    end: "bottom center",
                    onEnter: () => updateActiveLink(id),
                    onEnterBack: () => updateActiveLink(id),
                });
            }
        });

    }, { scope: navRef, dependencies: [isMobileMenuOpen, pathname] });

    return {
        navRef,
        logoRef,
        pillRef
    };
};
