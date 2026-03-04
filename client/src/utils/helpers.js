export const formatDate = (date) => new Date(date).toLocaleDateString();

export const getCategoryColor = (category) => {
  const colors = {
    finance: "#f5c518",
    investment: "#00b4d8",
    savings: "#10b981",
    cashflow: "#f59e0b",
    health: "#ef4444",
  };
  return colors[category] || "#7c3aed";
};