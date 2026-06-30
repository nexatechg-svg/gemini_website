import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export const CONTACT_DATA = {
    info: [
        {
            icon: FaEnvelope,
            title: "Email",
            value: "contact@gemininexatech.com"
        },
        {
            icon: FaPhone,
            title: "Phone",
            value: "+971 55 513 3884"
        },
        {
            icon: FaMapMarkerAlt,
            title: "Address",
            value: "Dubai, United Arab Emirates"
        }
    ],
    labels: {
        name: "Name",
        email: "Email",
        message: "Message",
        button: "Send Message"
    }
};
