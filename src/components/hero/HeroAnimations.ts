import { useRef } from "react";

export const useHeroAnimations = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    return {
        containerRef,
        backgroundRef,
        contentRef
    };
};
