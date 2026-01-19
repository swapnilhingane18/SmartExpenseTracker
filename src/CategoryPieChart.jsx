function CategoryPieChart({ data }) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);

  if (total === 0) return <p>No data to display</p>;

  let cumulativePercent = 0;

  const colors = {
    Food: "#4f46e5",
    Shopping: "#22c55e",
    Travel: "#f97316",
    Bills: "#ef4444",
    Other: "#6b7280",
  };

  const slices = Object.entries(data).map(([category, amount]) => {
    const percent = (amount / total) * 100;
    const slice = `
      ${colors[category] || "#999"} ${cumulativePercent}% 
      ${cumulativePercent + percent}%
    `;
    cumulativePercent += percent;
    return slice;
  });

  return (
    <div className="pie-container">
      <h3>Category-wise Expense Breakdown</h3>

      <div
        className="pie-chart"
        style={{
          background: `conic-gradient(${slices.join(",")})`,
        }}
      />

      <ul className="pie-legend">
        {Object.entries(data).map(([cat, amt]) => (
          <li key={cat}>
            <span
              className="legend-color"
              style={{ background: colors[cat] || "#999" }}
            />
            {cat}: ₹ {amt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPieChart;
