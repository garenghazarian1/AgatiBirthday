"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./UserComments.module.css";

export default function UserComments() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [userCommentId, setUserCommentId] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  // ✅ Create ref for the comment list container
  const commentListRef = useRef(null);

  // ✅ Load user comment ID from localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("user-comment-id");
    if (storedId) {
      setUserCommentId(storedId);
    }
    fetchComments();
  }, []);

  // ✅ Fetch all comments
  const fetchComments = async () => {
    try {
      const res = await fetch("/api/comments");
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error("❌ Error fetching comments:", error);
    }
  };

  // ✅ Submit a new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim())
      return alert("Please fill in all fields.");

    const newComment = { name, comment };

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      const data = await res.json();

      // ✅ Save comment ID in localStorage so only this user can edit or delete it
      localStorage.setItem("user-comment-id", data.commentId);
      setUserCommentId(data.commentId);

      setComments([...comments, data]); // Add new comment to state
      setName("");
      setComment("");
    } catch (error) {
      console.error("❌ Error posting comment:", error);
    }
  };

  // ✅ Start editing a comment
  const handleEdit = (id, currentText) => {
    setEditCommentId(id);
    setEditText(currentText);
  };

  // ✅ Save the edited comment
  const handleSaveEdit = async (id) => {
    try {
      await fetch("/api/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, comment: editText }),
      });

      setComments(
        comments.map((c) => (c._id === id ? { ...c, comment: editText } : c))
      );
      setEditCommentId(null);
    } catch (error) {
      console.error("❌ Error updating comment:", error);
    }
  };

  // ✅ Delete comment (only if it belongs to the user)
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      await fetch("/api/comments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      setComments(comments.filter((c) => c._id !== id));
      localStorage.removeItem("user-comment-id"); // Remove ID from storage
    } catch (error) {
      console.error("❌ Error deleting comment:", error);
    }
  };

  //   swipe
  useEffect(() => {
    const list = commentListRef.current;
    if (!list) return; // ✅ Fix null issue (ensure list exists)

    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;

    const startTouch = (e) => {
      isDragging = true;
      startX = e.touches[0].pageX;
      scrollLeft = list.scrollLeft;
    };

    const moveTouch = (e) => {
      if (!isDragging) return;
      const walk = startX - e.touches[0].pageX;
      list.scrollLeft = scrollLeft + walk;
    };

    const endTouch = () => {
      isDragging = false;
    };

    list.addEventListener("touchstart", startTouch);
    list.addEventListener("touchmove", moveTouch);
    list.addEventListener("touchend", endTouch);

    return () => {
      list.removeEventListener("touchstart", startTouch);
      list.removeEventListener("touchmove", moveTouch);
      list.removeEventListener("touchend", endTouch);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headline}>
        <h2 className={styles.title}>📝Express your joy,</h2>
        <p className={styles.titleText}>
          send your best wishes, or leave a heartfelt message for Ani & Agati’s
          special day!
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={styles.textarea}
          required
        ></textarea>
        <button type="submit" className={styles.button}>
          Share Message
        </button>
      </form>

      <h3 className={styles.commentTitle}>💬 Comments:</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className={styles.commentList} ref={commentListRef}>
          {comments.map((c) => (
            <li key={c._id} className={styles.comment}>
              <strong className={styles.liStrong}>{c.name}:</strong>
              {editCommentId === c._id ? (
                <>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className={styles.textareaEdit}
                  />
                  <div className={styles.textareaEditB}>
                    <button
                      onClick={() => handleSaveEdit(c._id)}
                      className={styles.saveButton}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditCommentId(null)}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className={styles.liStrongP}>{c.comment}</p>
                  {userCommentId === c._id && (
                    <div className={styles.actions}>
                      <button
                        onClick={() => handleEdit(c._id, c.comment)}
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
