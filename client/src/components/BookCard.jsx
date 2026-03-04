import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getCategoryColor } from "../utils/helpers";

export default function BookCard({ book }) {
  return (
    <motion.div
      className="book-card glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header">
        <span className="card-emoji">{book.coverEmoji}</span>
        <span 
          className="card-category" 
          style={{ background: `${getCategoryColor(book.category)}22`, color: getCategoryColor(book.category) }}
        >
          {book.category}
        </span>
      </div>
      
      <h3 className="card-title">{book.title}</h3>
      <p className="card-author">by {book.author}</p>
      <p className="card-desc">{book.description.substring(0, 80)}...</p>
      
      <div className="card-footer">
        <div className="card-meta">
          <span>📄 {book.pages} pages</span>
          <span>⭐ {book.rating}</span>
        </div>
        <Link to={`/read/${book._id}`} className="btn-primary card-btn">Read Now</Link>
      </div>
    </motion.div>
  );
}