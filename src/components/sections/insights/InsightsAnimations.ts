import { useRef } from "react";

export const useInsightsAnimations = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return {
        containerRef,
    };
};
