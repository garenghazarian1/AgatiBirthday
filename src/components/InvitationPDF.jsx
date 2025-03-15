"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

export default function InvitationPDF({ name, guests, comment }) {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 14,
      backgroundColor: "#FAF3E0", // Soft beige background
    },
    section: {
      padding: 30,
      backgroundColor: "#fff",
      borderRadius: 10,
      textAlign: "center",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      border: "2px solid #E5C07B",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#2C3E50",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    subtitle: {
      fontSize: 18,
      marginBottom: 15,
      color: "#34495E",
      fontStyle: "italic",
    },
    text: {
      marginBottom: 10,
      fontSize: 16,
      color: "#2C3E50",
    },
    highlight: {
      fontWeight: "bold",
      color: "#D35400",
    },
    separator: {
      borderBottom: "1px solid #E5C07B",
      marginVertical: 10,
    },
    footer: {
      marginTop: 15,
      fontSize: 12,
      color: "#7F8C8D",
      fontStyle: "italic",
    },
  });

  const InvitationDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Invitation to Ani & Agati's Baptism</Text>
          <Text style={styles.subtitle}>
            A special day filled with love & joy
          </Text>

          <Text style={styles.text}>
            Dear <Text style={styles.highlight}>{name}</Text>,
          </Text>

          <View style={styles.separator} />

          <Text style={styles.text}>
            We are delighted to invite you to this special occasion.
          </Text>

          <Text style={styles.text}>
            Guests: <Text style={styles.highlight}>{guests}</Text>
          </Text>

          <Text style={styles.text}>
            Date: <Text style={styles.highlight}>July 30, 2025</Text>
          </Text>

          <Text style={styles.text}>
            Location:{" "}
            <Text style={styles.highlight}>Etchmiadzin Cathedral, Armenia</Text>
          </Text>

          {comment && (
            <Text style={styles.text}>
              Comment: <Text style={styles.highlight}>{comment}</Text>
            </Text>
          )}

          <View style={styles.separator} />

          <Text style={styles.footer}>
            We look forward to celebrating this moment with you!
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <PDFDownloadLink
        document={<InvitationDocument />}
        fileName={`invitation_${name}.pdf`}
        style={{
          textDecoration: "none",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "#D35400",
          color: "white",
          borderRadius: "8px",
          display: "inline-block",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
        }}
      >
        {({ loading }) =>
          loading ? "Generating PDF..." : "📄 Download Your Invitation"
        }
      </PDFDownloadLink>
    </div>
  );
}
