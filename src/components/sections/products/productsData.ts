import {
    FaBrain,
    FaMapMarkerAlt,
    FaRss,
    FaTruck,
    FaMicrochip,
    FaVideo,
    FaCogs,
    FaExclamationTriangle,
    FaChartLine,
    FaUserCog,
    FaSatellite,
    FaBluetooth,
    FaMobileAlt,
    FaEye,
    FaSdCard,
    FaBroadcastTower,
    FaLayerGroup,
    FaGasPump,
    FaThermometerHalf,
    FaTshirt,
    FaServer,
    FaNetworkWired,
    FaHardHat,
} from "react-icons/fa";

export const PRODUCTS_DATA = [
    {
        id: "ai-analytics",
        title: "AI & Analytics",
        desc: "Leverage artificial intelligence and advanced data analytics to enable predictive insights, automated monitoring, and intelligent decision-making.",
        icon: FaBrain,
        color: "#FF8C00",
        products: [
            { name: "AI Video Analytics", icon: FaVideo },
            { name: "Predictive Maintenance", icon: FaCogs },
            { name: "Anomaly Detection", icon: FaExclamationTriangle },
            { name: "Data Intelligence", icon: FaChartLine },
            { name: "Behavioral Analytics", icon: FaUserCog }
        ]
    },
    {
        id: "tracking-rtls",
        title: "Tracking & RTLS",
        desc: "Real-time tracking solutions that provide precise location visibility of assets, personnel, and equipment to improve efficiency and safety.",
        icon: FaMapMarkerAlt,
        color: "#0047AB",
        products: [
            { name: "RTLS Systems", icon: FaSatellite },
            { name: "UWB Trackers", icon: FaBroadcastTower },
            { name: "BLE Beacons", icon: FaBluetooth },
            { name: "Asset Tags", icon: FaLayerGroup },
            { name: "Geofencing", icon: FaMapMarkerAlt }
        ]
    },
    {
        id: "rfid-smartid",
        title: "RFID & Smart ID",
        desc: "Smart identification and automated tracking technologies that enhance asset visibility, inventory control, and personnel identification.",
        icon: FaRss,
        color: "#00C2FF",
        products: [
            { name: "RFID Tags", icon: FaRss },
            { name: "UHF Readers", icon: FaBroadcastTower },
            { name: "RFID Printers", icon: FaSdCard },
            { name: "NFC Solutions", icon: FaMobileAlt },
            { name: "Smart ID Cards", icon: FaUserCog }
        ]
    },
    {
        id: "gps-fleet",
        title: "GPS & Fleet",
        desc: "Advanced vehicle tracking and fleet intelligence solutions that optimize route planning, improve safety, and enhance operational control.",
        icon: FaTruck,
        color: "#FFBD00",
        products: [
            { name: "GPS Trackers", icon: FaSatellite },
            { name: "Telematics Systems", icon: FaTruck },
            { name: "OBD Devices", icon: FaMicrochip },
            { name: "Fuel Sensors", icon: FaGasPump },
            { name: "Dashcams", icon: FaVideo }
        ]
    },
    {
        id: "iot-devices",
        title: "IoT Devices",
        desc: "Connected smart devices and sensors that enable real-time monitoring, automation, and data-driven operational management.",
        icon: FaMicrochip,
        color: "#00FFC2",
        products: [
            { name: "IoT Gateways", icon: FaServer },
            { name: "Env. Sensors", icon: FaThermometerHalf },
            { name: "Smart Wearables", icon: FaTshirt },
            { name: "Edge Computing", icon: FaNetworkWired },
            { name: "Industrial Sensors", icon: FaMicrochip }
        ]
    },
    {
        id: "industrial-safety",
        title: "Industrial Safety",
        desc: "Certified safety solutions designed for hazardous and high-risk environments to protect workers, assets, and infrastructure.",
        icon: FaHardHat,
        color: "#FF3E00",
        products: [
            { name: "IS Tablets", icon: FaMobileAlt },
            { name: "ATEX Readers", icon: FaRss },
            { name: "Gas Detectors", icon: FaGasPump },
            { name: "Worker Monitoring", icon: FaUserCog },
            { name: "Ex-Proof Cameras", icon: FaEye }
        ]
    }
];
