import { useRef } from "react";

export const useFooterAnimations = () => {
    const footerRef = useRef<HTMLElement>(null);

    return {
        footerRef,
    };
};
