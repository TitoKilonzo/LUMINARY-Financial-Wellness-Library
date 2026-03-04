export default function SearchBar({ search, setSearch }) {
  return (
    <div className="search-bar glass">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search books, authors, or topics..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
}