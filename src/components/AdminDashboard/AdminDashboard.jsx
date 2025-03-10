"use client";

import { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: "",
    comment: "",
  });

  useEffect(() => {
    fetchRSVPs();
  }, []);

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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this RSVP?")) return;

    await fetch("/api/get-rsvps", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchRSVPs();
  };

  const handleEdit = (rsvp) => {
    setEditId(rsvp._id);
    setEditData({
      name: rsvp.name,
      phone: rsvp.phone || "",
      email: rsvp.email || "",
      guests: rsvp.guests,
      comment: rsvp.comment || "",
    });
  };

  const handleUpdate = async () => {
    await fetch("/api/get-rsvps", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editId, ...editData }),
    });

    setEditId(null);
    fetchRSVPs();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📋 Admin RSVP Dashboard</h2>

      {loading ? (
        <p className={styles.loading}>Loading RSVPs...</p>
      ) : rsvps.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Guests</th>
              <th>Comment</th>
              <th>Submitted At</th>
              <th>Actions</th>
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
                      type="text"
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                      className={styles.input}
                    />
                  ) : (
                    rsvp.phone || "N/A"
                  )}
                </td>
                <td>
                  {editId === rsvp._id ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className={styles.input}
                    />
                  ) : (
                    rsvp.email || "N/A"
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
                <td>{new Date(rsvp.createdAt).toLocaleString()}</td>
                <td>
                  {editId === rsvp._id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className={styles.saveButton}
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className={styles.cancelButton}
                      >
                        ❌ Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(rsvp)}
                        className={styles.editButton}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(rsvp._id)}
                        className={styles.deleteButton}
                      >
                        🗑 Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noData}>No RSVPs yet.</p>
      )}
    </div>
  );
}
