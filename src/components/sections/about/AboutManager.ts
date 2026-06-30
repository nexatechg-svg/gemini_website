import { ABOUT_DATA } from "./aboutData";

export const useAboutManager = () => {
    return {
        aboutData: ABOUT_DATA,
        stats: ABOUT_DATA.stats,
        title: ABOUT_DATA.title,
        description: ABOUT_DATA.description
    };
};
