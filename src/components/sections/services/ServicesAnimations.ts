import { useRef } from "react";
import gsap from "gsap";
import Flip from "gsap/dist/Flip";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Flip, ScrollTrigger, ScrollToPlugin);

export const useServicesAnimations = (
    activeIndex: number,
    previousIndex: number,
    totalServices: number,
    onTabChange: (index: number) => void,
    headerRef: React.RefObject<HTMLDivElement | null>,
    cardRef: React.RefObject<HTMLDivElement | null>,
    oldContentRef: React.RefObject<HTMLDivElement | null>,
    newContentRef: React.RefObject<HTMLDivElement | null>,
    scanlineRef: React.RefObject<HTMLDivElement | null>,
    onScrollUpdate?: (progress: number, direction: number) => void
) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const scrollTriggerRef = useRef<globalThis.ScrollTrigger | null>(null);
    const latestIndexRef = useRef(activeIndex);

    latestIndexRef.current = activeIndex;

    // 1. RESPONSIVE ANIMATION LOGIC (Split Mobile vs Desktop)
    useGSAP(() => {
        if (!containerRef.current) return;

        const mm = gsap.matchMedia();

        // DESKTOP ONLY: Pinning and Scrub logic
        mm.add("(min-width: 1024px)", () => {
            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 0",
                end: `+=${totalServices * 300}`, // Reduced from 450 to remove the huge air gap below
                pin: true,
                scrub: 0.7,
                onUpdate: (self) => {
                    const progress = self.progress;

                    if (onScrollUpdate) {
                        onScrollUpdate(progress, self.direction);
                    }

                    // Header stays visible — no fade out
                    if (headerRef.current) {
                        gsap.set(headerRef.current, {
                            opacity: 1,
                            y: 0,
                            pointerEvents: "auto",
                            force3D: true
                        });
                    }

                    const newIndex = Math.min(
                        Math.floor(progress * totalServices),
                        totalServices - 1
                    );

                    if (newIndex !== latestIndexRef.current) {
                        onTabChange(newIndex);
                    }
                }
            });
        });

        // MOBILE ONLY: Simple Fade animations, NO PINNING
        mm.add("(max-width: 1023px)", () => {
            gsap.from(cardRef.current, {
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power2.out"
            });
        });

        return () => {
            mm.revert();
            if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
        };
    }, { scope: containerRef });

    // 2. PILL & WIPE LOGIC (Shared, but mobile-optimized)
    useGSAP(() => {
        const pill = containerRef.current?.querySelector(".active-tab-pill") as HTMLElement;
        const activeTab = containerRef.current?.querySelector(`.tab-btn-${activeIndex}`) as HTMLElement;
        const scanline = scanlineRef.current;
        const oldContent = oldContentRef.current;
        const newContent = newContentRef.current;

        if (!pill || !activeTab) return;

        const updatePillPosition = () => {
            const tabRect = activeTab.getBoundingClientRect();
            const gridRect = tabsRef.current?.getBoundingClientRect();
            if (gridRect) {
                gsap.set(pill, {
                    x: tabRect.left - gridRect.left,
                    y: tabRect.top - gridRect.top,
                    width: tabRect.width,
                    height: tabRect.height,
                    force3D: true,
                    overwrite: "auto"
                });

                // AUTO-SCROLL TABS ON MOBILE: Keep the active one in view
                if (window.innerWidth < 1024 && tabsRef.current) {
                    const scrollContainer = tabsRef.current;
                    const scrollLeft = tabRect.left - scrollContainer.getBoundingClientRect().left + scrollContainer.scrollLeft - (scrollContainer.clientWidth / 2) + (tabRect.width / 2);

                    gsap.to(scrollContainer, {
                        scrollTo: { x: scrollLeft },
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                }
            }
        };

        // 1. CLEAR PREVIOUS ANIMATIONS: Reset scales to avoid capturing a "stretched" state
        gsap.killTweensOf(pill);
        gsap.set(pill, { scaleX: 1, scaleY: 1, overwrite: "auto" });

        if (pill.style.opacity === "0") {
            updatePillPosition();
            gsap.to(pill, { opacity: 1, duration: 0.3, overwrite: "auto" });
        } else {
            const state = Flip.getState(pill);
            updatePillPosition();
            Flip.from(state, {
                duration: 0.35, // Faster transition
                ease: "power2.out", // Clean, no-bounce ease for maximum consistency
                overwrite: "auto",
                onStart: () => {
                    // Very subtle liquid stretch that doesn't affect width calculations
                    gsap.to(pill, { scaleX: 1.05, duration: 0.15, yoyo: true, repeat: 1 });
                }
            });
        }

        if (scanline && oldContent && newContent) {
            gsap.killTweensOf([scanline, oldContent, newContent]);
            const tl = gsap.timeline({ overwrite: true });
            const isForward = activeIndex >= previousIndex;
            tl.set(scanline, { display: "block", top: isForward ? "0%" : "100%", opacity: 1 })
                .set(newContent, { clipPath: isForward ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)", opacity: 1 })
                .set(oldContent, { opacity: 1, filter: "blur(0px) grayscale(0)" })
                .to(scanline, { top: isForward ? "100%" : "0%", duration: 0.8, ease: "power2.inOut", force3D: true })
                .to(newContent, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power2.inOut", force3D: true }, "<")
                .to(oldContent, { opacity: 0.1, filter: "blur(8px) grayscale(1)", duration: 0.6, ease: "power2.in", force3D: true }, "<")
                .to(scanline, { opacity: 0, duration: 0.2 })
                .set(scanline, { display: "none" });
        }

    }, { dependencies: [activeIndex], scope: containerRef });

    const syncScrollToTab = (index: number) => {
        // Desktop handles scroll syncing, Mobile just switches content
        if (window.innerWidth >= 1024 && scrollTriggerRef.current) {
            const progress = index / totalServices;
            const scrollPos = scrollTriggerRef.current.start + (scrollTriggerRef.current.end - scrollTriggerRef.current.start) * progress;
            gsap.to(window, { scrollTo: scrollPos, duration: 0.8, ease: "power2.inOut" });
        } else {
            onTabChange(index);
        }
    };

    return { containerRef, tabsRef, syncScrollToTab };
};
