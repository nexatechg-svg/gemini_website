import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const useProductsAnimations = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // 1. Staggered Entrance Animation
        const cards = containerRef.current.querySelectorAll(".product-card");

        gsap.from(cards, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
        });

        // 2. Magnetic Tilt Effect
        cards.forEach((card) => {
            const cardInner = card.querySelector(".card-inner") as HTMLElement;
            const glow = card.querySelector(".card-glow") as HTMLElement;

            card.addEventListener("mousemove", (e: any) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                gsap.to(cardInner, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    duration: 0.5,
                    ease: "power2.out",
                    transformPerspective: 1000,
                });

                gsap.to(glow, {
                    opacity: 1,
                    x: x - 50,
                    y: y - 50,
                    duration: 0.2,
                });
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(cardInner, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.5)",
                });

                gsap.to(glow, {
                    opacity: 0,
                    duration: 0.5,
                });
            });
        });

    }, { scope: containerRef });

    return {
        containerRef
    };
};
