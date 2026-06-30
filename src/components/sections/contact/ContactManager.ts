import { useState } from "react";
import { CONTACT_DATA } from "./contactData";

export const useContactManager = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return {
        formData,
        contactInfo: CONTACT_DATA.info,
        labels: CONTACT_DATA.labels,
        updateField,
        handleSubmit,
    };
};
