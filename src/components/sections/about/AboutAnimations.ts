import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const useAboutAnimations = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const stats = gsap.utils.toArray<HTMLElement>(".stat-number");

        stats.forEach((stat) => {
            const targetValue = parseInt(stat.getAttribute("data-target") || "0", 10);

            gsap.fromTo(stat,
                { innerText: 0 },
                {
                    innerText: targetValue,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 90%",
                        once: true,
                    }
                }
            );
        });

        // Entrance animation for the container
        gsap.from(statsRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: statsRef.current,
                start: "top 85%",
            }
        });

        // Entrance animation for text
        gsap.from(textRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: textRef.current,
                start: "top 80%",
            }
        });
    }, { scope: sectionRef });

    return {
        sectionRef,
        statsRef,
        textRef
    };
};
