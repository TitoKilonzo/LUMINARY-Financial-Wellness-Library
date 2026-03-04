import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { booksAPI } from "../api";
import PDFReader from "../components/PDFReader";
import AnimatedBackground from "../components/AnimatedBackground";
import Navbar from "../components/Navbar";

export default function Reader() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await booksAPI.getById(id);
      setBook(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-state">Loading book...</div>;

  if (!book) return (
    <div className="error-state">
      <h2>Book not found</h2>
      <Link to="/library" className="btn-primary">Back to Library</Link>
    </div>
  );

  return (
    <div className="reader-page">
      <AnimatedBackground category={book.category} />
      <Navbar />
      
      <div className="reader-container">
        <motion.div 
          className="reader-header glass"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="reader-top-row">
             <Link to="/library" className="back-link">← Back to Library</Link>
             <button 
               className="read-more-btn"
               onClick={() => setShowInfo(!showInfo)}
             >
               {showInfo ? "Hide Details" : "Read More"}
             </button>
          </div>

          <div className="reader-info">
            <span className="reader-emoji">{book.coverEmoji}</span>
            <div>
              <h2>{book.title}</h2>
              <p>by {book.author}</p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              className="reader-details glass"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p><strong>Category:</strong> {book.category}</p>
              <p><strong>Rating:</strong> ⭐ {book.rating}</p>
              <p><strong>Description:</strong></p>
              <p className="reader-desc">{book.description}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="reader-content glass">
          <PDFReader url={book.pdfUrl} />
        </div>
      </div>
    </div>
  );
}