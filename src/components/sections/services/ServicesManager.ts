import { useState } from "react";
import { servicesData } from "./servicesData";

export const useServicesManager = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState(0);
    const activeService = servicesData[activeIndex];
    const previousService = servicesData[previousIndex];

    const handleTabChange = (index: number) => {
        setPreviousIndex(activeIndex);
        setActiveIndex(index);
    };

    return {
        activeIndex,
        previousIndex,
        activeService,
        previousService,
        servicesData,
        handleTabChange,
    };
};
