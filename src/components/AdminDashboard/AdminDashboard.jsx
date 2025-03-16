"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./AdminDashboard.module.css";
import Link from "next/link";

export default function AdminDashboard() {
  const t = useTranslations();
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    guests: "",
    comment: "",
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    fetchRSVPs();
  }, [hydrated]);

  const fetchRSVPs = async () => {
    try {
      const response = await fetch("/api/get-rsvps");
      const data = await response.json();
      setRsvps(data);
    } catch (error) {
      console.error("❌ Error fetching RSVPs:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Calculate Total Guests
  const totalGuests = rsvps.reduce((sum, rsvp) => sum + (rsvp.guests || 0), 0);

  // ✅ Download CSV File
  const handleDownloadCSV = async () => {
    try {
      const response = await fetch("/api/export-rsvps");
      if (!response.ok) throw new Error("Failed to generate CSV");

      const csvBlob = await response.blob();
      const csvUrl = URL.createObjectURL(csvBlob);
      const a = document.createElement("a");
      a.href = csvUrl;
      a.download = "RSVPs.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("❌ Error downloading CSV:", error);
      alert(t("csvDownloadError"));
    }
  };

  // ✅ Delete RSVP
  const handleDelete = async (id) => {
    if (!confirm(t("deleteConfirmation"))) return;

    await fetch("/api/get-rsvps", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchRSVPs();
  };

  // ✅ Edit RSVP
  const handleEdit = (rsvp) => {
    setEditId(rsvp._id);
    setEditData({
      name: rsvp.name,
      guests: rsvp.guests,
      comment: rsvp.comment || "",
    });
  };

  // ✅ Save Edited RSVP
  const handleUpdate = async () => {
    await fetch("/api/get-rsvps", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editId, ...editData }),
    });

    setEditId(null);
    fetchRSVPs();
  };

  if (!hydrated) return null;

  return (
    <div className={styles.container}>
      <Link href="/admin/invitationGenerator">
        <button className={styles.inviteButton}>🎟 Generate Invitations</button>
      </Link>
      <h2 className={styles.title}>📋 {t("adminTitle")}</h2>

      {/* ✅ Display Total Guest Count */}
      <p className={styles.totalGuests}>
        {t("totalGuests")}: <strong>{totalGuests}</strong>
      </p>

      {/* ✅ CSV Export Button */}
      <button onClick={handleDownloadCSV} className={styles.exportButton}>
        📥 {t("exportCSV")}
      </button>

      {loading ? (
        <p className={styles.loading}>{t("loadingMessage")}</p>
      ) : rsvps.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t("nameLabel")}</th>
              <th>{t("guestsLabel")}</th>
              <th>{t("commentLabel")}</th>
              <th>{t("submittedAtLabel")}</th>
              <th>{t("actionsLabel")}</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((rsvp) => (
              <tr key={rsvp._id}>
                <td>
                  {editId === rsvp._id ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className={styles.input}
                    />
                  ) : (
                    rsvp.name
                  )}
                </td>
                <td>
                  {editId === rsvp._id ? (
                    <input
                      type="number"
                      value={editData.guests}
                      onChange={(e) =>
                        setEditData({ ...editData, guests: e.target.value })
                      }
                      className={styles.input}
                    />
                  ) : (
                    rsvp.guests
                  )}
                </td>
                <td>
                  {editId === rsvp._id ? (
                    <textarea
                      value={editData.comment}
                      onChange={(e) =>
                        setEditData({ ...editData, comment: e.target.value })
                      }
                      className={styles.input}
                    />
                  ) : (
                    rsvp.comment || "N/A"
                  )}
                </td>
                <td>
                  {hydrated ? new Date(rsvp.createdAt).toLocaleString() : "..."}
                </td>
                <td>
                  {editId === rsvp._id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className={styles.saveButton}
                      >
                        💾 {t("saveButton")}
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className={styles.cancelButton}
                      >
                        ❌ {t("cancelButton")}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(rsvp)}
                        className={styles.editButton}
                      >
                        ✏️ {t("editButton")}
                      </button>
                      <button
                        onClick={() => handleDelete(rsvp._id)}
                        className={styles.deleteButton}
                      >
                        🗑 {t("deleteButton")}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noData}>{t("noRSVPsMessage")}</p>
      )}
    </div>
  );
}
