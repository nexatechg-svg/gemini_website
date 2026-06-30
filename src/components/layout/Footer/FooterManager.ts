import { FOOTER_DATA } from "./footerData";

export const useFooterManager = () => {
    const currentYear = new Date().getFullYear();

    return {
        about: FOOTER_DATA.about,
        sections: FOOTER_DATA.sections,
        socials: FOOTER_DATA.socials,
        currentYear,
    };
};
