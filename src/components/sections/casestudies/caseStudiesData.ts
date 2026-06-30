import { FaShieldAlt, FaTruckLoading, FaTachometerAlt, FaLayerGroup, FaBus, FaUsers } from "react-icons/fa";

export const CASE_STUDIES = [
    {
        id: 1,
        title: "ProtectEx – Integrity Software",
        client: "Dubai Petroleum",
        impact: "25% Downtime Reduction",
        desc: "Digitized maintenance workflows and automated preventive schedules to improve regulatory adherence.",
        icon: FaShieldAlt,
        color: "from-blue-600 to-cyan-500"
    },
    {
        id: 2,
        title: "TrackPro – Asset Management",
        client: "Daleel Petroleum",
        impact: "20% Resource Optimization",
        desc: "Full visibility of asset lifecycles from inventory tracking to maintenance planning.",
        icon: FaLayerGroup,
        color: "from-orange-600 to-amber-500"
    },
    {
        id: 3,
        title: "Tyre Sense 360 – TPMS",
        client: "Al Tasneem",
        impact: "15% Cost Reduction",
        desc: "Real-time tyre monitoring extended lifespan and improved safety across the fleet.",
        icon: FaTachometerAlt,
        color: "from-red-600 to-rose-500"
    },
    {
        id: 4,
        title: "CargoVision – Loading Software",
        client: "Ittihad Paper Mill",
        impact: "Reduced Operational Losses",
        desc: "Digital tracking of container movement improved accountability and reduced cargo damage.",
        icon: FaTruckLoading,
        color: "from-emerald-600 to-teal-500"
    },
    {
        id: 5,
        title: "TrackBus – Transport Mgmt",
        client: "Muscat Indian School",
        impact: "30% Efficiency Increase",
        desc: "GPS tracking and route optimization increased student safety and reduced travel time.",
        icon: FaBus,
        color: "from-indigo-600 to-violet-500"
    },
    {
        id: 6,
        title: "NexTrace – Evacuation Management",
        client: "Oman LNG",
        impact: "Critical Safety Uplift",
        desc: "Real-time personnel monitoring and automated evacuation planning during emergencies.",
        icon: FaUsers,
        color: "from-blue-800 to-indigo-900"
    }
];
