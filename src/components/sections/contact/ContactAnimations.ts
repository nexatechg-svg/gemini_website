import { useRef } from "react";

export const useContactAnimations = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return {
        containerRef,
    };
};
