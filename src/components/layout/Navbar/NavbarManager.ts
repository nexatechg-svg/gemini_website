import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SERVICES_MENU, INDUSTRIES_MENU, NAV_LINKS, INSIGHTS_MENU } from "./navbarData";
import { PRODUCTS_DATA } from "../../sections/products/productsData";

export const useNavbarManager = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const internalScrollToSection = useCallback((id: string) => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);

        const targetId = id.replace("#", "");

        if (location.pathname !== "/") {
            navigate("/#" + targetId);
        } else {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location.pathname, navigate]);

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);

        if (href.startsWith("#")) {
            internalScrollToSection(href);
        } else {
            navigate(href);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const toggleDropdown = (name: string) => {
        if (activeDropdown === name) setActiveDropdown(null);
        else setActiveDropdown(name);
    };

    const scrollToTop = () => {
        if (location.pathname !== "/") navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    };

    return {
        isMobileMenuOpen,
        activeDropdown,
        isScrolled,
        location,
        services: SERVICES_MENU,
        industries: INDUSTRIES_MENU,
        insights: INSIGHTS_MENU,
        products: PRODUCTS_DATA,
        navLinks: NAV_LINKS,
        scrollToSection: handleNavClick,
        toggleMobileMenu,
        toggleDropdown,
        scrollToTop,
    };
};
