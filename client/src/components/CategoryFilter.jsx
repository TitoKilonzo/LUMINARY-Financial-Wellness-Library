import { getCategoryColor } from "../utils/helpers";

const categories = ["all", "finance", "investment", "savings", "cashflow", "health"];

export default function CategoryFilter({ active, setActive }) {
  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`filter-btn ${active === cat ? "active" : ""}`}
          style={active === cat ? { borderColor: getCategoryColor(cat), color: getCategoryColor(cat) } : {}}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
}