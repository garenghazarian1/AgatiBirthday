"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./UserComments.module.css";
import confetti from "canvas-confetti";

export default function UserComments() {
  const t = useTranslations();
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [userCommentId, setUserCommentId] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const commentListRef = useRef(null);
  const [recentCommentId, setRecentCommentId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("user-comment-id");
    if (storedId) setUserCommentId(storedId);
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/comments");
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error("❌ Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim())
      return alert(t("commentPartFillFields"));

    const newComment = { name, comment };
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      const data = await res.json();
      localStorage.setItem("user-comment-id", data.commentId);
      setUserCommentId(data.commentId);
      setRecentCommentId(data.commentId);

      setComments([data, ...comments]);

      setName("");
      setComment("");

      // 🎉 Trigger confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        setRecentCommentId(null);
      }, 4000);
    } catch (error) {
      console.error("❌ Error posting comment:", error);
    }
  };

  const handleEdit = (id, currentText) => {
    setEditCommentId(id);
    setEditText(currentText);
  };

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

  const handleDelete = async (id) => {
    if (!confirm(t("commentPartConfirmDelete"))) return;
    try {
      await fetch("/api/comments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      setComments(comments.filter((c) => c._id !== id));
      localStorage.removeItem("user-comment-id");
    } catch (error) {
      console.error("❌ Error deleting comment:", error);
    }
  };

  useEffect(() => {
    const list = commentListRef.current;
    if (!list) return;

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

  // CONFETTI

  // CONFETTI END

  return (
    <div className={styles.container}>
      <div className={styles.headline}>
        <h2 className={styles.title}>📝 {t("commentPartTitle")}</h2>
        <p className={styles.titleText}>{t("commentPartSubtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder={t("commentPartNamePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
        <textarea
          placeholder={t("commentPartCommentPlaceholder")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={styles.textarea}
          required
        ></textarea>
        <button type="submit" className={styles.button}>
          {t("commentPartSubmit")}
        </button>
      </form>

      <h3 className={styles.commentTitle}>
        💬 {t("commentPartCommentSection")}
      </h3>
      {comments.length === 0 ? (
        <p>{t("commentPartNoComments")}</p>
      ) : (
        <ul className={styles.commentList} ref={commentListRef}>
          {comments.map((c) => (
            <li
              key={c._id}
              className={`${styles.comment} ${
                c._id === recentCommentId ? styles.recentHighlight : ""
              }`}
            >
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
                      {t("commentPartSave")}
                    </button>
                    <button
                      onClick={() => setEditCommentId(null)}
                      className={styles.cancelButton}
                    >
                      {t("commentPartCancel")}
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
                        {t("commentPartEdit")}
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className={styles.deleteButton}
                      >
                        {t("commentPartDelete")}
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
