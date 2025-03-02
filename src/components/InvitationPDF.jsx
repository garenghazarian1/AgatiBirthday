"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

export default function InvitationPDF({ name, email, guests }) {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 14,
      backgroundColor: "#f4f1e9", // Soft warm background
    },
    section: {
      padding: 30,
      backgroundColor: "#fff",
      borderRadius: 12,
      textAlign: "center",
      border: "2px solid #d4af37", // Gold border
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 15,
      color: "#b8860b", // Deep gold
      textTransform: "uppercase",
      textDecoration: "underline",
    },
    text: {
      marginBottom: 10,
      fontSize: 16,
      color: "#2c3e50", // Dark blue for contrast
    },
    highlight: {
      fontWeight: "bold",
      color: "#c0392b", // Elegant red accent
    },
    footer: {
      marginTop: 20,
      fontSize: 12,
      color: "#7f8c8d",
      fontStyle: "italic",
    },
  });

  const InvitationDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>
            {" "}
            Invitation to Ani & Agati&apos;s Baptism{" "}
          </Text>
          <Text style={styles.text}>
            Dear <Text style={styles.highlight}>{name}</Text>,
          </Text>
          <Text style={styles.text}>
            We are delighted to invite you to this special occasion.
          </Text>
          <Text style={styles.text}>
            {" "}
            Email: <Text style={styles.highlight}>{email}</Text>
          </Text>
          <Text style={styles.text}>
            {" "}
            Guests: <Text style={styles.highlight}>{guests}</Text>
          </Text>
          <Text style={styles.text}>
            {" "}
            Date: <Text style={styles.highlight}>July 30, 2025</Text>
          </Text>
          <Text style={styles.text}>
            {" "}
            Location:{" "}
            <Text style={styles.highlight}>Etchmiadzin Cathedral, Armenia</Text>
          </Text>
          <Text style={styles.footer}>
            We look forward to celebrating this moment with you!
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <PDFDownloadLink
        document={<InvitationDocument />}
        fileName={`invitation_${name}.pdf`}
      >
        {({ loading }) =>
          loading ? "Generating PDF..." : "📄 Download Your Invitation"
        }
      </PDFDownloadLink>
    </div>
  );
}
