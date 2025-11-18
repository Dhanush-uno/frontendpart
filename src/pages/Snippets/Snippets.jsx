import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Snippets.module.css";

export default function Snippets() {
  const [snippets, setSnippets] = useState([]);

  // Load snippets
  const loadSnippets = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://backendofdevault.onrender.com/api/snippets",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSnippets(res.data);
    } catch (err) {
      console.error("Failed to load snippets:", err);
    }
  };

  useEffect(() => {
    loadSnippets();
  }, []);

  // Delete function
  const deleteSnippet = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `https://backendofdevault.onrender.com/api/snippets/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Snippet deleted!");
    setSnippets((prev) => prev.filter((s) => s._id !== id));
  } catch (err) {
    console.error(err);
    alert("Failed to delete snippet");
  }
};


  return (
    <div className={styles.wrapper}>
      <h1>My Snippets</h1>

      {snippets.length === 0 ? (
        <p>No snippets yet!</p>
      ) : (
        <div className={styles.list}>
          {snippets.map((s) => (
            <div key={s._id} className={styles.card}>
              <h3>{s.title}</h3>
              <pre>{s.code}</pre>

              <button onClick={() => deleteSnippet(s._id)}>Delete</button>


            </div>
          ))}
        </div>
      )}
    </div>
  );
}
