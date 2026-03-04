import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { booksAPI } from "../api";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import BookCard from "../components/BookCard";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetchBooks();
  }, [category, search]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await booksAPI.getAll({ category, search });
      setBooks(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const bgCategory = category === "all" ? "default" : category;

  return (
    <div className="library-page">
      <AnimatedBackground category={bgCategory} />
      <Navbar />
      
      <div className="library-container">
        <motion.div 
          className="library-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">Your Library</h1>
          <p className="page-subtitle">Explore your collection of wisdom</p>
        </motion.div>

        <div className="library-controls glass">
          <SearchBar search={search} setSearch={setSearch} />
          <CategoryFilter active={category} setActive={setCategory} />
        </div>

        {loading ? (
          <div className="loading-state">Loading books...</div>
        ) : (
          <motion.div 
            className="books-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {books.length > 0 ? (
              books.map((book) => <BookCard key={book._id} book={book} />)
            ) : (
              <div className="empty-state glass">
                <h3>No books found</h3>
                <p>Try adjusting your search or filter.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}