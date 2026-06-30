// BrochurePDF.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import {
  services,
  products,
  industries,
  coreValues,
} from "../../data/websiteData";
import logo from "../../assets/GN.png";

/**
 * GEMINI NEXATECH PDF DESIGN SYSTEM
 * Blue: #013299
 * Orange: #fd8e18
 */

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },

  // --- HEADER SECTIONS ---
  coverHeader: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#013299",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  logoImage: {
    width: 45,
    height: 45,
    marginRight: 8,
  },
  brandContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  brandName: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    letterSpacing: -0.5,
    lineHeight: 1,
  },
  geminiText: { color: "#0047AB" },
  nexatechText: { color: "#FF8C00" },
  tagline: {
    fontSize: 8,
    color: "#666666",
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontFamily: "Helvetica-Bold",
  },

  // --- CONTENT CONTAINER ---
  content: {
    paddingY: 10,
  },

  sectionHeader: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#013299",
    marginBottom: 12,
    marginTop: 20,
    textTransform: "uppercase",
    borderBottomWidth: 1.5,
    borderBottomColor: "#013299",
    paddingBottom: 5,
  },
  mainDescription: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#333333",
    marginBottom: 20,
    textAlign: "justify",
  },

  // --- MISSION/VISION GRID ---
  mvContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 15,
    marginTop: 5,
  },
  mvBox: {
    flex: 1,
    padding: 15,
    borderRadius: 6,
    backgroundColor: "#F8FAFC",
    borderLeftWidth: 3,
  },
  mvLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#fd8e18",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  mvText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#475569",
    fontFamily: "Helvetica-Oblique",
    marginTop: 2,
  },

  // --- GRID SYSTEM ---
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    borderLeftWidth: 3,
    borderLeftColor: "#013299",
  },
  gridTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  gridDesc: {
    fontSize: 9,
    color: "#64748B",
    lineHeight: 1.4,
  },

  // --- FOOTER & CONTACT ---
  contactStrip: {
    marginTop: "auto",
    backgroundColor: "#013299",
    padding: 20,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactCol: { flex: 1 },
  contactHeading: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  contactDetail: {
    fontSize: 10,
    color: "#E2E8F0",
    marginBottom: 3,
  },

  // --- DYNAMIC PAGE NUMBER ---
  pageNum: {
    position: "absolute",
    bottom: 20,
    right: 40,
    fontSize: 9,
    color: "#94A3B8",
  },
});

export const BrochurePDF = () => (
  <Document author="Gemini Nexatech" title="Company Brochure 2024">
    {/* PAGE 1: IDENTITY & FOUNDATION */}
    <Page size="A4" style={styles.page}>
      <View style={styles.coverHeader}>
        <Image src={logo} style={styles.logoImage} />
        <View style={styles.brandContainer}>
          <Text style={styles.brandName}>
            <Text style={styles.geminiText}>GEMINI </Text>
            <Text style={styles.nexatechText}>NEXATECH</Text>
          </Text>
          <Text style={styles.tagline}>Where Ideas Meet Innovation</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionHeader}>About Us</Text>
        <Text style={styles.mainDescription}>
          Gemini Nexatech is a premier technology solutions provider dedicated
          to transforming business operations through smart security, precise
          tracking, and industrial automation. We leverage cutting-edge
          technology to deliver scalable, secure, and future-ready solutions
          tailored to the unique challenges of our global clients. Our expertise
          spans from high-end software development to mission-critical
          industrial monitoring.
        </Text>

        <View style={styles.mvContainer}>
          <View style={[styles.mvBox, { borderLeftColor: "#013299" }]}>
            <Text style={styles.mvLabel}>Our Mission</Text>
            <Text style={styles.mvText}>
              "Empowering businesses with innovative technology solutions that
              drive efficiency, safety, and growth across industries worldwide."
            </Text>
          </View>
          <View style={[styles.mvBox, { borderLeftColor: "#fd8e18" }]}>
            <Text style={styles.mvLabel}>Our Vision</Text>
            <Text style={styles.mvText}>
              "To be a global leader in smart, integrated, and sustainable tech
              solutions that transform operations and create lasting value."
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={styles.pageNum}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
    </Page>

    {/* PAGE 2: CORE VALUES & PRODUCTS */}
    <Page size="A4" style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.sectionHeader}>Core Corporate Values</Text>
        <View style={styles.grid}>
          {(coreValues || []).map((val, i) => (
            <View
              key={i}
              style={[styles.gridItem, { borderLeftColor: "#fd8e18" }]}
            >
              <Text style={styles.gridTitle}>{val.title}</Text>
              <Text style={styles.gridDesc}>{val.description}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionHeader}>Flagship Product Suites</Text>
        <View style={styles.grid}>
          {(products || []).map((prod, i) => (
            <View
              key={i}
              style={[styles.gridItem, { borderLeftColor: "#013299" }]}
            >
              <Text style={styles.gridTitle}>{prod.title}</Text>
              <Text style={styles.gridDesc}>{prod.subtitle}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text
        style={styles.pageNum}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
    </Page>

    {/* PAGE 3+: SERVICES (NO SLICE) */}
    <Page size="A4" style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.sectionHeader}>Our Technology Services</Text>
        <Text style={styles.mainDescription}>
          We engineer competitive advantages through a comprehensive digital
          ecosystem. Our full spectrum of services ensures that your business
          stays ahead of the technology curve.
        </Text>
        <View style={styles.grid}>
          {(services || []).map((svc, i) => (
            <View key={i} style={styles.gridItem}>
              <Text style={styles.gridTitle}>{svc.title}</Text>
              <Text style={styles.gridDesc}>{svc.description}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text
        style={styles.pageNum}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
    </Page>

    {/* LAST PAGE: INDUSTRIES & CONTACT FOOTER */}
    <Page size="A4" style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.sectionHeader}>Industries We Serve</Text>
        <View style={styles.grid}>
          {(industries || []).map((ind, i) => (
            <View
              key={i}
              style={[
                styles.gridItem,
                {
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  borderLeftColor: "#fd8e18",
                  marginBottom: 12,
                },
              ]}
            >
              <View
                style={{
                  width: 4,
                  height: 25,
                  backgroundColor: "#fd8e18",
                  borderRadius: 2,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.gridTitle}>{ind.title}</Text>
                <Text style={styles.gridDesc}>{ind.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.contactStrip}>
        <View style={styles.contactCol}>
          <Text style={styles.contactHeading}>LETS CONNECT</Text>
          <Text style={styles.contactDetail}>sales@gemininexatech.com</Text>
          <Text style={styles.contactDetail}>+91 90032 75271</Text>
        </View>
        <View style={[styles.contactCol, { textAlign: "right" }]}>
          <Text style={styles.contactHeading}>HEADQUARTERS</Text>
          <Text style={styles.contactDetail}>
            Campus-1a, Millenia Business Park-I
          </Text>
          <Text style={styles.contactDetail}>
            Perungudi, Chennai, TN 600096
          </Text>
        </View>
      </View>
      <Text
        style={[styles.pageNum, { bottom: 10 }]}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
    </Page>
  </Document>
);
